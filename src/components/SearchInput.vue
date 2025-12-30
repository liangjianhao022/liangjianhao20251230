<template>
  <div class="search-container">
    <div class="search-wrapper">
      <span class="search-icon">🔎</span>
      <input
        v-model="searchValue"
        type="text"
        placeholder="搜索角色名称（如：日向翔阳、影山飞雄）..."
        class="search-input"
        @input="handleSearch"
      />
      <button
        v-if="searchValue"
        class="clear-btn"
        @click="clearSearch"
      >
        ✕
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const searchValue = ref('')
const emit = defineEmits(['search'])

const handleSearch = () => {
  emit('search', searchValue.value)
}

const clearSearch = () => {
  searchValue.value = ''
  emit('search', '')
}
</script>

<style scoped>
.search-container {
  max-width: 700px;
  margin: 0 auto 40px;
  padding: 0 20px;
}

.search-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 50px;
  padding: 8px 8px 8px 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  border: 2px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
}

.search-wrapper:focus-within {
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
  border-color: rgba(102, 126, 234, 0.5);
  transform: translateY(-3px);
}

.search-icon {
  font-size: 1.5rem;
  margin-right: 12px;
  animation: searchPulse 2s infinite;
}

@keyframes searchPulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}

.search-input {
  flex: 1;
  border: none;
  background: transparent;
  font-size: 1.1rem;
  color: #2c3e50;
  outline: none;
  padding: 10px 0;
  font-weight: 500;
}

.search-input::placeholder {
  color: #999;
  font-weight: 400;
}

.clear-btn {
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
}

.clear-btn:hover {
  transform: scale(1.1) rotate(90deg);
  box-shadow: 0 4px 12px rgba(240, 147, 251, 0.5);
}

@media (max-width: 768px) {
  .search-container {
    max-width: 100%;
    margin: 0 auto 30px;
  }

  .search-input {
    font-size: 1rem;
  }

  .search-icon {
    font-size: 1.3rem;
  }
}
</style>