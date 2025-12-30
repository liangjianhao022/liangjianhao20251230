<template>
  <div class="character-card" @click="handleCardClick">
    <div class="card-image-wrapper">
      <img :src="imgUrl" :alt="character.name" class="card-img" />
      <div class="card-overlay">
        <span class="view-detail">查看详情</span>
      </div>
    </div>
    <div class="card-info">
      <h3 class="character-name">{{ character.name }}</h3>
      <div class="character-meta">
        <span class="team-badge">{{ character.team }}</span>
        <span class="position-badge">{{ character.position }}</span>
        <span class="number-badge">#{{ character.number }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  character: {
    type: Object,
    required: true
  }
});

const router = useRouter();

const handleCardClick = () => {
  router.push({
    name: 'CharacterDetail',
    params: { id: props.character.id }
  });
};

const imgUrl = new URL(props.character.img, import.meta.url).href;
</script>

<style scoped>
.character-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  animation: cardAppear 0.6s ease-out backwards;
}

.character-card:hover {
  transform: translateY(-12px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
}

@keyframes cardAppear {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card-image-wrapper {
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.card-img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  display: block;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.character-card:hover .card-img {
  transform: scale(1.15) rotate(2deg);
}

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.8) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.4s ease;
  backdrop-filter: blur(5px);
}

.character-card:hover .card-overlay {
  opacity: 1;
}

.view-detail {
  color: white;
  font-size: 1.1rem;
  font-weight: 700;
  padding: 12px 28px;
  border: 2px solid white;
  border-radius: 30px;
  background: transparent;
  transition: all 0.3s ease;
  letter-spacing: 1px;
}

.view-detail:hover {
  background: white;
  color: #667eea;
  transform: scale(1.1);
}

.card-info {
  padding: 18px;
}

.character-name {
  margin: 0 0 14px;
  font-size: 1.35rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: center;
}

.character-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
}

.team-badge,
.position-badge,
.number-badge {
  padding: 6px 14px;
  border-radius: 15px;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
}

.team-badge {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(240, 147, 251, 0.3);
}

.position-badge {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(79, 172, 254, 0.3);
}

.number-badge {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
  color: white;
  box-shadow: 0 4px 12px rgba(67, 233, 123, 0.3);
}

.team-badge:hover,
.position-badge:hover,
.number-badge:hover {
  transform: translateY(-2px) scale(1.05);
}

@media (max-width: 768px) {
  .card-img {
    height: 240px;
  }

  .character-name {
    font-size: 1.15rem;
  }

  .team-badge,
  .position-badge,
  .number-badge {
    font-size: 0.7rem;
    padding: 4px 10px;
  }
}
</style>