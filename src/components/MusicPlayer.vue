<template>
  <div class="music-player" :class="{ minimized: isMinimized }">
    <div class="player-header" @click="toggleMinimize">
      <div class="player-title">
        <span class="icon">🎵</span>
        <span>音乐播放器</span>
      </div>
      <button class="toggle-btn">{{ isMinimized ? '▲' : '▼' }}</button>
    </div>

    <div class="player-body" v-show="!isMinimized">
      <div class="song-info">
        <div class="song-name">{{ currentSongName }}</div>
        <div class="song-progress">{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</div>
      </div>

      <audio
        ref="audioRef"
        :src="currentSongUrl"
        @timeupdate="handleTimeUpdate"
        @loadedmetadata="handleLoadedMetadata"
        @ended="playNext"
      ></audio>

      <div class="progress-bar">
        <div class="progress" :style="{ width: progressPercentage + '%' }"></div>
      </div>

      <div class="controls">
        <button class="control-btn" @click="playPrev" title="上一首">⏮</button>
        <button class="control-btn play-btn" @click="togglePlay" :title="isPlaying ? '暂停' : '播放'">
          {{ isPlaying ? '⏸' : '▶' }}
        </button>
        <button class="control-btn" @click="playNext" title="下一首">⏭</button>
        <button class="control-btn volume-btn" @click="toggleMute" title="静音/取消静音">
          {{ isMuted ? '🔇' : '🔊' }}
        </button>
      </div>

      <div class="playlist">
        <div class="playlist-title">播放列表 ({{ songs.length }}首)</div>
        <div
          v-for="(song, index) in songs"
          :key="index"
          :class="['playlist-item', { active: currentIndex === index }]"
          @click="playSong(index)"
        >
          <span class="song-index">{{ index + 1 }}</span>
          <span class="song-list-name">{{ song.name }}</span>
          <span class="playing-icon" v-if="currentIndex === index && isPlaying">▶</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import song1 from '../assets/music/M500000HKI552GSWth.mp3'
import song2 from '../assets/music/M500000QffjZ1sbERq.mp3'
import song3 from '../assets/music/M500001OD8lT23nZY5.mp3'
import song4 from '../assets/music/M500002n6qUf0YQ1RY.mp3'
import song5 from '../assets/music/M500003azFoc3BB41P.mp3'
import song6 from '../assets/music/M500004TpgPn1wSQUd.mp3'

const songs = [
  { url: song1, name: '歌曲 1' },
  { url: song2, name: '歌曲 2' },
  { url: song3, name: '歌曲 3' },
  { url: song4, name: '歌曲 4' },
  { url: song5, name: '歌曲 5' },
  { url: song6, name: '歌曲 6' },
]

const audioRef = ref(null)
const currentIndex = ref(0)
const isPlaying = ref(false)
const isMuted = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const isMinimized = ref(false)

const currentSongUrl = computed(() => songs[currentIndex.value].url)
const currentSongName = computed(() => songs[currentIndex.value].name)

const progressPercentage = computed(() => {
  if (duration.value === 0) return 0
  return (currentTime.value / duration.value) * 100
})

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

const togglePlay = () => {
  const audio = audioRef.value
  if (isPlaying.value) {
    audio.pause()
  } else {
    audio.play().catch(err => console.error('播放失败:', err))
  }
  isPlaying.value = !isPlaying.value
}

const playSong = (index) => {
  currentIndex.value = index
  audioRef.value.play().catch(err => console.error('播放失败:', err))
  isPlaying.value = true
}

const playPrev = () => {
  currentIndex.value = (currentIndex.value - 1 + songs.length) % songs.length
  audioRef.value.play().catch(err => console.error('播放失败:', err))
  isPlaying.value = true
}

const playNext = () => {
  currentIndex.value = (currentIndex.value + 1) % songs.length
  audioRef.value.play().catch(err => console.error('播放失败:', err))
  isPlaying.value = true
}

const toggleMute = () => {
  isMuted.value = !isMuted.value
  audioRef.value.muted = isMuted.value
}

const handleTimeUpdate = (e) => {
  currentTime.value = e.target.currentTime
}

const handleLoadedMetadata = (e) => {
  duration.value = e.target.duration
}

const toggleMinimize = () => {
  isMinimized.value = !isMinimized.value
}

onMounted(() => {
  audioRef.value.volume = 0.5
})
</script>

<style scoped>
.music-player {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 360px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.98) 0%, rgba(118, 75, 162, 0.98) 100%);
  border-radius: 24px;
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.4), 0 0 100px rgba(102, 126, 234, 0.2);
  z-index: 1000;
  backdrop-filter: blur(20px);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: playerAppear 0.6s ease-out;
}

@keyframes playerAppear {
  from {
    opacity: 0;
    transform: translateY(100px) scale(0.8);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.music-player.minimized {
  width: 220px;
}

.player-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  cursor: pointer;
  border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  transition: all 0.3s ease;
}

.player-header:hover {
  background: rgba(255, 255, 255, 0.05);
}

.player-title {
  display: flex;
  align-items: center;
  gap: 10px;
  color: white;
  font-weight: 700;
  font-size: 16px;
  letter-spacing: 0.5px;
}

.icon {
  font-size: 20px;
  animation: musicIcon 2s infinite;
}

@keyframes musicIcon {
  0%, 100% {
    transform: rotate(-5deg);
  }
  50% {
    transform: rotate(5deg);
  }
}

.toggle-btn {
  background: rgba(255, 255, 255, 0.15);
  border: none;
  color: white;
  padding: 6px 14px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.3s ease;
}

.toggle-btn:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: scale(1.1);
}

.player-body {
  padding: 20px;
}

.song-info {
  text-align: center;
  margin-bottom: 16px;
}

.song-name {
  color: white;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 6px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  letter-spacing: 0.5px;
}

.song-progress {
  color: rgba(255, 255, 255, 0.85);
  font-size: 13px;
  font-weight: 600;
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 10px;
  margin-bottom: 20px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
}

.progress-bar:hover {
  background: rgba(255, 255, 255, 0.2);
}

.progress {
  height: 100%;
  background: linear-gradient(90deg, #f093fb 0%, #f5576c 50%, #4facfe 100%);
  border-radius: 10px;
  transition: width 0.1s linear;
  position: relative;
}

.progress::after {
  content: '';
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

.control-btn {
  background: rgba(255, 255, 255, 0.15);
  border: none;
  color: white;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 20px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.control-btn:hover {
  background: rgba(255, 255, 255, 0.25);
  transform: scale(1.15);
  box-shadow: 0 4px 16px rgba(255, 255, 255, 0.2);
}

.control-btn:active {
  transform: scale(1.05);
}

.play-btn {
  width: 60px;
  height: 60px;
  font-size: 24px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  box-shadow: 0 6px 20px rgba(240, 147, 251, 0.4);
}

.play-btn:hover {
  background: linear-gradient(135deg, #f5576c 0%, #f093fb 100%);
  box-shadow: 0 8px 28px rgba(240, 147, 251, 0.5);
}

.volume-btn {
  font-size: 18px;
}

.playlist {
  max-height: 220px;
  overflow-y: auto;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.playlist::-webkit-scrollbar {
  width: 6px;
}

.playlist::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
}

.playlist::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, #f093fb 0%, #667eea 100%);
  border-radius: 3px;
}

.playlist-title {
  color: white;
  font-size: 13px;
  font-weight: 700;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.playlist-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  color: rgba(255, 255, 255, 0.85);
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 13px;
  font-weight: 500;
}

.playlist-item:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(4px);
}

.playlist-item.active {
  background: linear-gradient(90deg, rgba(240, 147, 251, 0.3) 0%, rgba(102, 126, 234, 0.3) 100%);
  color: white;
  font-weight: 700;
  border-left: 3px solid #f093fb;
}

.song-index {
  width: 24px;
  opacity: 0.5;
  font-size: 11px;
}

.song-list-name {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.playing-icon {
  color: #f093fb;
  animation: playingPulse 0.8s infinite;
}

@keyframes playingPulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(0.9);
  }
}

@media (max-width: 768px) {
  .music-player {
    left: 10px;
    right: 10px;
    width: auto;
    bottom: 20px;
  }

  .music-player.minimized {
    width: auto;
  }

  .player-body {
    padding: 16px;
  }

  .controls {
    gap: 15px;
  }

  .control-btn {
    width: 44px;
    height: 44px;
    font-size: 18px;
  }

  .play-btn {
    width: 54px;
    height: 54px;
  }
}
</style>
