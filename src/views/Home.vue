<template>
  <div class="home-page">
    <div class="header-section">
      <div class="title-wrapper">
        <span class="title-icon">🏐</span>
        <h1 class="page-title">排球少年角色档案</h1>
        <span class="title-icon">🔥</span>
      </div>
      <div class="subtitle">《Haikyuu!!》动画角色信息大全</div>
      <SearchInput @search="handleSearch"></SearchInput>
    </div>

    <div class="team-filter-section">
      <div class="section-header">
        <span class="section-icon">🏫</span>
        <h3 class="section-title">按学校筛选</h3>
      </div>
      <div class="team-buttons">
        <button
          v-for="team in teams"
          :key="team"
          :class="['team-btn', { active: selectedTeam === team }]"
          @click="filterByTeam(team)"
        >
          <span class="team-icon">{{ getTeamIcon(team) }}</span>
          {{ team }}
        </button>
      </div>
      <button
        v-if="selectedTeam"
        class="reset-btn"
        @click="resetFilter"
      >
        <span>✨</span> 显示全部
      </button>
    </div>

    <div class="results-count" v-if="filteredCharacters.length > 0">
      显示 <strong>{{ filteredCharacters.length }}</strong> 位角色
    </div>

    <div class="character-list" v-if="filteredCharacters.length > 0">
      <CharacterCard
        v-for="item in filteredCharacters"
        :key="item.id"
        :character="item"
      ></CharacterCard>
    </div>
    <div class="empty-state" v-else>
      <div class="empty-icon">🔍</div>
      <p>未找到相关角色</p>
      <button class="empty-btn" @click="resetFilter">清除筛选条件</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import SearchInput from '../components/SearchInput.vue'
import CharacterCard from '../components/CharacterCard.vue'
import characterList from '../data/characterList.json'

const allCharacters = ref([])
const searchKeyword = ref('')
const selectedTeam = ref('')

const teams = [
  '乌野高校',
  '青城高校',
  '音驹高校',
  '枭谷学园',
  '稻荷崎高校',
  '井闼山高校',
  '白鸟泽学园',
  '鸥台高中',
  '伊达工'
]

const teamIcons = {
  '乌野高校': '🦅',
  '青城高校': '🌙',
  '音驹高校': '🐱',
  '枭谷学园': '🦊',
  '稻荷崎高校': '🌾',
  '井闼山高校': '⛰️',
  '白鸟泽学园': '🦅',
  '鸥台高中': '🌊',
  '伊达工': '🏭'
}

const filteredCharacters = computed(() => {
  let result = allCharacters.value

  if (searchKeyword.value) {
    result = result.filter(item =>
      item.name.includes(searchKeyword.value)
    )
  }

  if (selectedTeam.value) {
    result = result.filter(item =>
      item.team === selectedTeam.value
    )
  }

  return result
})

onMounted(() => {
  allCharacters.value = characterList
})

const handleSearch = (keyword) => {
  searchKeyword.value = keyword
}

const filterByTeam = (team) => {
  selectedTeam.value = team
}

const resetFilter = () => {
  selectedTeam.value = ''
  searchKeyword.value = ''
}

const getTeamIcon = (team) => {
  return teamIcons[team] || '🏫'
}
</script>

<style scoped>
.home-page {
  padding: 20px;
}

.header-section {
  text-align: center;
  margin-bottom: 40px;
  animation: fadeInDown 0.6s ease-out;
}

.title-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 10px;
}

.title-icon {
  font-size: 3rem;
  animation: bounce 2s infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.page-title {
  font-size: 2.8rem;
  font-weight: 800;
  background: linear-gradient(135deg, #fff 0%, #f0f0f0 50%, #fff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 30px rgba(255, 255, 255, 0.3);
  margin: 0;
}

.subtitle {
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  margin-bottom: 30px;
  letter-spacing: 2px;
}

.team-filter-section {
  max-width: 1000px;
  margin: 0 auto 40px;
  text-align: center;
  animation: fadeInUp 0.6s ease-out 0.2s both;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 30px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.section-icon {
  font-size: 1.5rem;
}

.section-title {
  font-size: 1.4rem;
  color: white;
  margin-bottom: 20px;
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.team-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin-bottom: 20px;
}

.team-btn {
  padding: 12px 28px;
  border-radius: 30px;
  font-size: 15px;
  font-weight: 600;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.team-btn:hover {
  background: rgba(255, 255, 255, 0.35);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.team-btn.active {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  border-color: transparent;
  box-shadow: 0 8px 24px rgba(240, 147, 251, 0.5);
}

.team-icon {
  font-size: 1.2rem;
}

.reset-btn {
  padding: 10px 24px;
  border-radius: 25px;
  font-size: 14px;
  font-weight: 600;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.reset-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(79, 172, 254, 0.4);
}

.results-count {
  text-align: center;
  color: rgba(255, 255, 255, 0.9);
  font-size: 1.1rem;
  margin-bottom: 20px;
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  display: inline-block;
  left: 50%;
  transform: translateX(-50%);
  position: relative;
}

.results-count strong {
  color: #f093fb;
  font-weight: 700;
  font-size: 1.3rem;
}

.character-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 28px;
  padding: 10px;
}

.empty-state {
  text-align: center;
  padding: 80px 20px;
  color: rgba(255, 255, 255, 0.9);
  animation: fadeIn 0.6s ease-out;
}

.empty-icon {
  font-size: 5rem;
  margin-bottom: 20px;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.empty-btn {
  margin-top: 20px;
  padding: 12px 30px;
  border-radius: 25px;
  font-size: 15px;
  font-weight: 600;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.empty-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .title-wrapper {
    flex-direction: column;
    gap: 10px;
  }

  .title-icon {
    font-size: 2.5rem;
  }

  .page-title {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 0.95rem;
  }

  .character-list {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 20px;
  }

  .team-btn {
    padding: 10px 20px;
    font-size: 13px;
  }

  .team-filter-section {
    padding: 20px;
  }
}
</style>