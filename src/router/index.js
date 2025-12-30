import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import CharacterDetail from '../views/CharacterDetail.vue'; // 确保正确导入
import TeamCategory from '../views/TeamCategory.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  // 确认name是CharacterDetail
  { path: '/character/:id', name: 'CharacterDetail', component: CharacterDetail },
  { path: '/team', name: 'TeamCategory', component: TeamCategory }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router;