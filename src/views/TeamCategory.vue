<template>
  <div class="team-page">
    <div class="header-section">
      <div class="title-wrapper">
        <span class="title-icon">🏆</span>
        <h1 class="page-title">队伍分类</h1>
        <span class="title-icon">🏫</span>
      </div>
      <div class="subtitle">按学校查看所有角色</div>
      <button @click="$router.push('/')" class="back-btn">
        <span class="btn-icon">←</span> 返回首页
      </button>
    </div>

    <div class="tabs-wrapper">
      <el-tabs v-model="activeTeam" class="team-tabs">
        <el-tab-pane label="乌野高校" name="乌野高校"></el-tab-pane>
        <el-tab-pane label="青城高校" name="青城高校"></el-tab-pane>
        <el-tab-pane label="音驹高校" name="音驹高校"></el-tab-pane>
        <el-tab-pane label="枭谷学园" name="枭谷学园"></el-tab-pane>
        <el-tab-pane label="稻荷崎高校" name="稻荷崎高校"></el-tab-pane>
        <el-tab-pane label="井闼山高校" name="井闼山高校"></el-tab-pane>
        <el-tab-pane label="白鸟泽学园" name="白鸟泽学园"></el-tab-pane>
        <el-tab-pane label="鸥台高中" name="鸥台高中"></el-tab-pane>
        <el-tab-pane label="伊达工" name="伊达工"></el-tab-pane>
      </el-tabs>
    </div>

    <div class="results-count" v-if="filteredTeamCharacters.length > 0">
      <span class="team-badge-mini">{{ activeTeam }}</span>
      显示 <strong>{{ filteredTeamCharacters.length }}</strong> 位角色
    </div>

    <div class="team-character-list" v-if="filteredTeamCharacters.length > 0">
      <CharacterCard
        v-for="item in filteredTeamCharacters"
        :key="item.id"
        :character="item"
      ></CharacterCard>
    </div>
    <div class="empty-state" v-else>
      <div class="empty-icon">📋</div>
      <p>该队伍暂无角色数据</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import CharacterCard from '../components/CharacterCard.vue'
import characterList from '../data/characterList.json'

const activeTeam = ref('乌野高校')
const allCharacters = ref([])
const filteredTeamCharacters = ref([])

onMounted(() => {
  allCharacters.value = characterList
  filterCharactersByTeam()
})

watch(activeTeam, () => {
  filterCharactersByTeam()
})

const filterCharactersByTeam = () => {
  filteredTeamCharacters.value = allCharacters.value.filter(item =>
    item.team === activeTeam.value
  )
}
</script>

<style scoped>
.team-page {
  padding: 20px;
}

.header-section {
  text-align: center;
  margin-bottom: 30px;
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
  font-size: 2.5rem;
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
  font-size: 2.5rem;
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
  font-size: 1rem;
  margin-bottom: 25px;
  letter-spacing: 1px;
}

.back-btn {
  padding: 12px 32px;
  border-radius: 30px;
  font-size: 15px;
  font-weight: 700;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(79, 172, 254, 0.4);
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.back-btn:hover {
  transform: translateY(-3px) scale(1.05);
  box-shadow: 0 8px 24px rgba(79, 172, 254, 0.5);
}

.btn-icon {
  font-weight: 700;
  font-size: 1.2rem;
}

.tabs-wrapper {
  max-width: 1000px;
  margin: 0 auto 30px;
  padding: 0 20px;
}

.team-tabs {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 20px 25px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.team-tabs :deep(.el-tabs__nav-wrap::after) {
  display: none;
}

.team-tabs :deep(.el-tabs__item) {
  font-size: 16px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
  padding: 0 25px;
}

.team-tabs :deep(.el-tabs__item:hover) {
  color: white;
  transform: translateY(-2px);
}

.team-tabs :deep(.el-tabs__item.is-active) {
  color: #f093fb;
  font-weight: 700;
  font-size: 17px;
}

.team-tabs :deep(.el-tabs__active-bar) {
  background: linear-gradient(90deg, #f093fb 0%, #f5576c 100%);
  height: 4px;
  border-radius: 2px;
}

.results-count {
  text-align: center;
  color: rgba(255, 255, 255, 0.9);
  font-size: 1rem;
  margin-bottom: 20px;
  padding: 12px 24px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 25px;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  left: 50%;
  transform: translateX(-50%);
  position: relative;
  backdrop-filter: blur(5px);
}

.team-badge-mini {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  padding: 4px 12px;
  border-radius: 15px;
  font-size: 0.85rem;
  font-weight: 600;
}

.results-count strong {
  color: #f093fb;
  font-weight: 700;
  font-size: 1.2rem;
}

.team-character-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 28px;
  padding: 10px;
}

.empty-state {
  text-align: center;
  padding: 80px 20px;
  color: rgba(255, 255, 255, 0.9);
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

@media (max-width: 768px) {
  .title-wrapper {
    flex-direction: column;
    gap: 10px;
  }

  .title-icon {
    font-size: 2rem;
  }

  .page-title {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 0.9rem;
  }

  .team-character-list {
    grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
    gap: 20px;
  }

  .team-tabs :deep(.el-tabs__item) {
    font-size: 14px;
    padding: 0 15px;
  }

  .team-tabs {
    padding: 15px;
  }
}
</style>