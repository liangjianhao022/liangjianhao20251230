<template>
  <div 
    class="detail-page" 
    :style="{ backgroundImage: `url(${flagUrl})` }"
  >
    <button class="back-home-btn" @click="goBackHome">返回首页</button>

    <div class="detail-content" v-if="character">
      <h2 class="character-title">{{ character.name }}</h2>

      <div class="info-layout">
        <img :src="imgUrl" :alt="character.name" class="character-img" />
        <div class="info-text">
          <p class="info-item">队伍：<span>{{ character.team }}</span></p>
          <p class="info-item">位置：<span>{{ character.position }}</span></p>
          <p class="info-item">号码：<span>{{ character.number }}</span></p>
          <p class="info-item">简介：<span>{{ character.intro }}</span></p>
        </div>
      </div>

      <div class="radar-section">
        <h3 class="radar-title">综合能力图（5分满分）</h3>
        <div class="radar-container">
          <svg width="400" height="400" viewBox="0 0 200 200">
            <!-- 辅助网格：仅保留线条，删除数字标注 -->
            <circle cx="100" cy="100" r="16" fill="none" stroke="#eee" stroke-width="1" stroke-dasharray="2" />
            <circle cx="100" cy="100" r="32" fill="none" stroke="#eee" stroke-width="1" stroke-dasharray="2" />
            <circle cx="100" cy="100" r="48" fill="none" stroke="#ddd" stroke-width="1.2" />
            <circle cx="100" cy="100" r="64" fill="none" stroke="#ccc" stroke-width="1.2" />
            <circle cx="100" cy="100" r="80" fill="none" stroke="#999" stroke-width="1.5" />

            <!-- 轴线 -->
            <line x1="100" y1="20" x2="100" y2="180" stroke="#bbb" stroke-width="1.2" />
            <line x1="30" y1="150" x2="170" y2="50" stroke="#bbb" stroke-width="1.2" />
            <line x1="30" y1="50" x2="170" y2="150" stroke="#bbb" stroke-width="1.2" />

            <!-- 雷达图多边形 -->
            <polygon
              :points="radarPoints"
              fill="rgba(66, 185, 131, 0.3)"
              stroke="#42b983"
              stroke-width="1.5"
              class="radar-polygon"
              stroke-linejoin="round"
            ></polygon>

            <!-- 仅保留维度名称标签，无数字 -->
            <text x="100" y="18" class="radar-label">力量</text>
            <text x="182" y="72" class="radar-label">速度</text>
            <text x="182" y="142" class="radar-label">跳跃</text>
            <text x="100" y="192" class="radar-label">体力</text>
            <text x="18" y="142" class="radar-label">技术</text>
            <text x="18" y="72" class="radar-label">头脑</text>
          </svg>
        </div>
      </div>

      <div class="story-section">
        <h3 class="section-title">📖 角色故事</h3>
        <button class="story-toggle-btn" @click="showStory = !showStory">
          {{ showStory ? '收起故事' : '查看故事' }}
          <span class="arrow-icon">{{ showStory ? '▲' : '▼' }}</span>
        </button>
        <div class="story-content" v-show="showStory">
          <div class="story-text" v-html="characterStory"></div>
        </div>
      </div>
    </div>
    <div class="empty-tip" v-else>角色信息不存在</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import characterList from '../data/characterList.json';

const route = useRoute();
const router = useRouter();
const character = ref(null);
const showStory = ref(false);

const processPath = (path) => {
  if (path.startsWith('../')) {
    return path.replace('../', '/liangjianhao20251230/');
  }
  return path;
};

const characterStories = {

const route = useRoute();
const router = useRouter();
const character = ref(null);
const imgUrl = ref('');
const flagUrl = ref('');
const radarPoints = ref('');
const showStory = ref(false);

const characterStories = {
  1: `<h4>🏐 日向翔阳的故事</h4>
    <p>日向翔阳是乌野高校排球部的"小巨人"，身高只有162.8cm，但拥有惊人的弹跳力和敏捷性。</p>
    <p><strong>初遇排球：</strong>小时候在便利店偶然看到乌野高校的"小巨人"在电视上的精彩表现，从此被排球深深吸引。虽然因为个子矮小被很多人否定，但他依然坚持练习。</p>
    <p><strong>进入乌野：</strong>初中时期因为队友太少，球队未能参加县预选赛。进入乌野高校后，遇到了宿敌兼队友影山飞雄。在练习赛中两人激烈对抗后，最终成为最佳搭档，展现出"怪人快攻"的威力。</p>
    <p><strong>成长历程：</strong>通过不断的努力和比赛，日向从只会扣球的"单细胞"选手，逐渐成长为能够思考的全能型球员。他先后学会了接球、拦网技巧。在东京集训期间，他不仅向不同队伍的前辈学习，还找到了适合自己的打法。</p>
    <p><strong>目标：</strong>日向的梦想是成为像"小巨人"那样在球场上闪闪发光的选手，并且和伙伴一起进入全国大赛的决赛赛场。</p>`,

  2: `<h4>🏐 影山飞雄的故事</h4>
    <p>影山飞雄是乌野高校的二传手，拥有超群的天赋和精准的传球技术，但性格傲娇，不擅长与他人合作。</p>
    <p><strong>"球场上的王者"：</strong>初中时期因为独断专行的打法，被称为"球场上的王者"。虽然传球技术高超，但队友无法跟上他的节奏，导致球队在县预选赛中失利。</p>
    <p><strong>改变：</strong>进入乌野后，影山遇到了日向翔阳。日向能够配合他的任何传球，这让他第一次体会到团队合作的感觉。在乌野，他学会了如何信任队友，如何根据队友的特点调整传球。</p>
    <p><strong>技能进化：</strong>影山在东京集训中向巴西选手学习，掌握了"单人托球"等高难度技术。在县预选赛的比赛中，他逐渐学会在压力下保持冷静，成为队伍的核心二传手。</p>
    <p><strong>目标：</strong>影山的梦想是成为能够最大限度发挥队友实力的二传手，带着球队走向全国大赛的顶点。</p>`,

  3: `<h4>🏐 泽村大地的故事</h4>
    <p>泽村大地是乌野高校的主攻手兼队长，性格稳重可靠，是后辈们的榜样和支柱。</p>
    <p><strong>队长的重责：</strong>大地是乌野的队长，他需要统筹全队。虽然个人技术不是最出色的，但他能够激发每个队员的潜力，将全队凝聚在一起。</p>
    <p><strong>可靠的防守：</strong>大地在后排的接球能力非常出色，是乌野防守体系的核心之一。他的存在让乌野在防守端更加稳定。</p>
    <p><strong>与后辈的关系：</strong>大地对待后辈既严格又温和。日向和影山入部时，大地给了他们很多指导。他是一名优秀的队长，是乌野的精神支柱。</p>
    <p><strong>成长：</strong>大地在县预选赛中带领乌野一路过关斩将，虽然最终输给了青城，但乌野的成长是巨大的。大地作为队长，功不可没。</p>
    <p><strong>目标：</strong>大地希望带领乌野进入全国大赛，证明"平凡的乌野"也能走到最后。</p>`,

  4: `<h4>🏐 菅原孝支的故事</h4>
    <p>菅原孝支是乌野高校的三年级二传手，性格温和善良，擅长组织进攻。</p>
    <p><strong>二传手的职责：</strong>菅原虽然是二传手，但他的天赋不如影山。他凭借细腻的传球和冷静的判断，能够将全队的实力发挥到最大。</p>
    <p><strong>与影山的关系：</strong>菅原面对影山这个"天才"，没有嫉妒，而是努力教影山如何做一名真正的二传手。他告诉影山："二传手不是主角，而是配角"，这句话深深影响了影山。</p>
    <p><strong>成长：</strong>菅原在县预选赛输给了青城，但他没有放弃。他继续努力训练，希望帮助乌野走向全国。虽然出场机会不多，但他的存在对乌野来说非常重要。</p>
    <p><strong>温柔的性格：</strong>菅原性格非常温和，对待后辈总是耐心指导。日向和影山刚入部时，菅原给了他们很多帮助。他是乌野队内的"妈妈"。</p>`,

  5: `<h4>🏐 田中龙之介的故事</h4>
    <p>田中龙之介是乌野高校的副攻手，性格热血豪爽，擅长拦网和发球，是乌野的中流砥柱。</p>
    <p><strong>乌野的活力源：</strong>田中是乌野的精神支柱之一。他的热血性格能够感染全队，在比赛低迷时带动大家。他在比赛中总是第一个站出来鼓舞士气的人。</p>
    <p><strong>与日向的关系：</strong>田中是日向的学长，也是日向憧憬的对象之一。虽然田中经常骂日向是"笨蛋后辈"，但其实非常照顾日向。他和日向的互动是队内的一大亮点。</p>
    <p><strong>成长历程：</strong>田中和西谷、菅原一起带领乌野从弱旅成长为强队。他在县预选赛的表现也十分出色，是乌野进攻的重要力量。</p>
    <p><strong>性格特点：</strong>田中性格热血，喜欢大声喊话。他对排球充满热情，是乌野不可或缺的气氛制造者。</p>
    <p><strong>目标：</strong>田中希望和队友一起进入全国大赛，证明乌野的实力。</p>`,

  6: `<h4>🏐 月岛萤的故事</h4>
    <p>月岛萤是乌野高校的副攻手，身高195.2cm，头脑冷静，擅长精准拦网。</p>
    <p><strong>加入动机：</strong>月岛最初加入排球部只是为了"好玩"，并没有特别热情。他的哥哥曾是一名排球选手，但受伤后离开了球场。这让月岛对排球产生了一种复杂的感情。</p>
    <p><strong>成长：</strong>在和音驹的练习赛中，月岛见识到了音驹主攻手的强大。但他没有被吓倒，而是冷静地分析对手的弱点，最终成功拦网。那场比赛让他找到了排球的乐趣。</p>
    <p><strong>东京集训：</strong>在东京的集训中，月岛遇到了更多实力远超自己的选手。起初他想逃避，但最终还是选择直面强敌，通过不断的学习和练习提升自己。他向白鸟泽的牛岛若利学习如何成为拦网的核心。</p>
    <p><strong>觉醒：</strong>月岛最大的武器是他的冷静和思考能力。无论面对多强的对手，他都能保持理智，找到击败对方的方法。</p>`,

  7: `<h4>🏐 东峰旭的故事</h4>
    <p>东峰旭是乌野高校的主攻手，性格热情开朗，擅长斜线扣球，是乌野的王牌。</p>
    <p><strong>王牌的觉醒：</strong>东峰从小就热爱排球，进入乌野后，凭借强大的扣球能力成为球队的王牌。他的斜线扣球威力巨大，常常能够直接得分。</p>
    <p><strong>心结与成长：</strong>在和伊达工的比赛中，东峰的扣球多次被拦，这让他产生了心结。但他没有放弃，而是通过练习和研究，找到了突破拦网的方法。在县预选赛中，他重新找回了王牌的自信。</p>
    <p><strong>与西谷的关系：</strong>东峰和西谷从初中起就是好搭档。东峰扣球，西谷接球，两人的配合默契无比。东峰经常称呼西谷为"西谷桑"，两人互相支持。</p>
    <p><strong>性格特点：</strong>东峰性格开朗热情，但内心也有脆弱的一面。他会因为扣球失误而难过，但总能在队友的鼓励下重新振作。</p>
    <p><strong>梦想：</strong>东峰梦想带领乌野进入全国大赛，成为全国最强的王牌主攻手。</p>`,

  8: `<h4>🏐 西谷夕的故事</h4>
    <p>西谷夕是乌野高校的自由人，身高159.3cm却拥有超凡的防守能力，被称为"守护神"。</p>
    <p><strong>与排球的相遇：</strong>西谷从小个子就矮，经常被否定。但他遇到了一位同样矮小的排球选手，从此坚信"矮个子也能打排球"。他进入乌野后，凭借惊人的接球能力震惊了所有人。</p>
    <p><strong>防守专家：</strong>西谷的接球技术堪称完美。无论是强力扣球、轻吊球，还是跳发球，他都能稳定地接起。他能够在瞬间判断球的轨迹，移动速度快得不可思议。</p>
    <p><strong>成长历程：</strong>在和音驹的比赛中，西谷面对音驹的强力发球毫不畏惧，一次次完美接球帮助乌野。在县预选赛对青城的比赛中，他也在关键时刻稳定了队伍的防守。</p>
    <p><strong>与队友的羁绊：</strong>西谷是乌野最可靠的防守核心。东峰扣球失误时，他会第一时间安慰；日向激动过度时，他能稳住全队的节奏。</p>
    <p><strong>目标：</strong>西谷的目标是成为"全国第一自由人"，证明矮个子也能在排球场上闪耀。</p>`,

  9: `<h4>🏐 缘下力的故事</h4>
    <p>缘下力是乌野高校的主攻手，性格温和沉稳，是团队的稳定器。</p>
    <p><strong>稳定的力量：</strong>缘下力虽然没有田中那样热血，也没有月岛那样出色，但他是最稳定的球员。无论是扣球还是接球，缘下力都能稳定地完成任务。</p>
    <p><strong>队内角色：</strong>缘下力经常在队友情绪激动时担任"刹车"的角色。当田中太激动时，他会安抚。他是乌野的"副队长"，能够很好地协调队内的关系。</p>
    <p><strong>成长：</strong>缘下力在二年级时曾一度离队，但最终还是回来了。这段经历让他更加珍惜排球。在东京集训中，他展现了稳定的实力，成为乌野不可或缺的一员。</p>
    <p><strong>性格：</strong>缘下力性格温和，不喜欢冲突。他是乌野最让人放心的队员之一，也是队内的"理性担当"。</p>
    <p><strong>信念：</strong>缘下力相信，一个稳定的队伍才能走得更远。他会继续做乌野的"稳定器"，支持队友们。</p>`,

  10: `<h4>🏐 山口忠的故事</h4>
    <p>山口忠是乌野高校的主攻手，拥有独特的跳发球技术。</p>
    <p><strong>与排球的相遇：</strong>山口从小就和月岛萤一起打球，是很好的朋友。虽然一开始技术不如月岛，但他没有放弃，而是通过不断的努力提升自己。</p>
    <p><strong>跳发球专家：</strong>山口最大的武器是跳发球。在乌青练习赛中，他的跳发球曾给青城造成不小的麻烦。经过不断的练习，他的发球技术越来越出色。</p>
    <p><strong>成长历程：</strong>山口一开始因为技术不好而感到自卑，但通过乌森教练的指导，他找到了适合自己的打法——跳发球。在县预选赛中，他的发球多次为乌野得分。</p>
    <p><strong>性格：</strong>山口性格相对温和，但也有不服输的一面。他羡慕月岛的天赋，但也相信自己可以通过努力缩小差距。</p>
    <p><strong>目标：</strong>山口希望成为乌野不可或缺的一员，用他的跳发球为队伍做出贡献。</p>`,

  11: `<h4>🏐 及川彻的故事</h4>
    <p>及川彻是青城高校排球部的队长，被誉为"天才二传"，擅长调动全队的进攻节奏。</p>
    <p><strong>天赋与努力：</strong>及川自认为比不上像影山那样的"天才"，因此付出了比常人多倍的努力。他每天早上四点起床练习传球，这种自律精神让他成为宫城县最强的二传手之一。</p>
    <p><strong>领导力：</strong>作为青城队长，及川能够准确判断每个队员的状态，并据此调整战术。他不仅是技术核心，更是球队的精神支柱。即使是比赛落后，他也能带领球队逆转局势。</p>
    <p><strong>与乌野的对决：</strong>在县预选赛中，及川带领青城击败乌野，展现了强大的实力。但他也认识到乌野是一支不容小觑的对手。</p>
    <p><strong>信念：</strong>"优秀的才能是可以造就出来的"。这是及川的人生信条，也是他对后辈们的期望。</p>`,

  12: `<h4>🏐 岩泉一的故事</h4>
    <p>岩泉一是青城高校的主攻手，及川彻的最佳搭档，被称为"青城的磐石"。</p>
    <p><strong>与及川的羁绊：</strong>岩泉从小就和及川一起打球，是最了解及川的人。他知道及川表面开朗、内心焦虑，因此总是在及川失意时给予支持和鼓励。</p>
    <p><strong>技术全面：</strong>岩泉的力量和跳跃能力都很出色，是青城进攻的稳定输出点。但他最大的价值在于接球和防守，能够在后排稳定地组织进攻。</p>
    <p><strong>性格特点：</strong>岩泉说话直来直去，经常骂及川"笨蛋"，但这其实是他表达关心的方式。在关键时刻，他总是第一个站出来承担责任的人。</p>
    <p><strong>成长：</strong>从初中到高中，岩泉一直是及川最可靠的搭档。在县预选赛中，他和及川带领青城击败乌野，展现了强队的实力。</p>`,

  13: `<h4>🏐 国见英的故事</h4>
    <p>国见英是青城高校的替补二传手，传球技术出色。</p>
    <p><strong>传球能力：</strong>国见的传球技术非常出色，能够很好地组织进攻。作为及川的替补，他能够在需要时顶上，保持队伍的进攻节奏。</p>
    <p><strong>队内角色：</strong>国见虽然出场机会不多，但他的存在让青城的二传位置有了保障。他与及川从小一起长大，是青城的重要一员。</p>
    <p><strong>性格：</strong>国见性格温和，有时显得有些懒惰，但关键时刻总能发挥作用。</p>
    <p><strong>成长：</strong>国见在县预选赛中展现了出色的传球能力，为青城的胜利做出了贡献。</p>`,

  14: `<h4>🏐 金田一勇太郎的故事</h4>
    <p>金田一勇太郎是青城高校的主攻手，拥有强大的扣球实力。</p>
    <p><strong>扣球实力：</strong>金田一拥有强大的扣球实力，是青城进攻的重要一员。他的扣球技术全面，为青城贡献了许多得分。</p>
    <p><strong>队内角色：</strong>金田一与及川、岩泉等人配合默契，是青城进攻体系的重要一环。</p>
    <p><strong>成长：</strong>金田一在县预选赛中展现了出色的扣球能力，帮助青城获得冠军。</p>`,

  15: `<h4>🏐 福永招平的故事</h4>
    <p>福永招平是音驹高校的自由人，防守稳定。</p>
    <p><strong>防守能力：</strong>福永的接球技术稳定，是音驹后防的重要一员。他能够应对各种强力扣球和发球。</p>
    <p><strong>队内角色：</strong>福永虽然出场机会不多，但他的存在让音驹的防守更加稳固。</p>
    <p><strong>性格：</strong>福永性格安静，是音驹的稳定一员。</p>
    <p><strong>成长：</strong>福永在县预选赛中展现了稳定的防守能力，为音驹的胜利做出了贡献。</p>`,

  16: `<h4>🏐 松川一静的故事</h4>
    <p>松川一静是青城高校的副攻手，拦网能力出色。</p>
    <p><strong>拦网能力：</strong>松川的拦网技术出色，身高优势让他在网前有优势。他能够准确预判对手的扣球路线，进行有效拦网。</p>
    <p><strong>队内角色：</strong>松川作为青城的副攻手，是青城防守体系的重要一环。</p>
    <p><strong>性格：</strong>松川性格冷静，是青城的稳定一员。</p>
    <p><strong>成长：</strong>松川在县预选赛中展现了出色的拦网能力，为青城的胜利做出了贡献。</p>`,

  17: `<h4>🏐 黑尾铁朗的故事</h4>
    <p>黑尾铁朗是音驹高校排球部的队长，擅长"怪人快攻"，气场强大。</p>
    <p><strong>音驹的守护者：</strong>黑尾从小就住在音驹高中的宿舍楼里，是音驹排球部的精神支柱。他和研磨从小一起长大，两人形成了完美的默契。</p>
    <p><strong>技术特点：</strong>黑尾最大的武器是"怪人快攻"，这是一种看似无规则、实则经过精密计算的快攻配合。加上他出色的拦网能力，让他成为音驹防守体系的核心。</p>
    <p><strong>对手关系：</strong>黑尾和乌野的月岛萤是表兄弟关系，两人经常交流排球心得。虽然性格不同，但他们都擅长用头脑打球，在比赛中是互相较劲的好对手。黑尾还多次指导月岛的拦网技巧。</p>
    <p><strong>领导力：</strong>作为队长，黑尾能够调动全队的情绪，在关键时刻给队友们鼓励和信心。</p>`,

  18: `<h4>🏐 孤爪研磨的故事</h4>
    <p>孤爪研磨是音驹高校的二传手，同时也是一名电竞玩家，擅长观察和分析对手。</p>
    <p><strong>与排球的相遇：</strong>研磨从小和黑尾铁朗一起长大，在黑尾的邀请下接触了排球。虽然一开始兴趣不大，但为了不让黑尾失望，他还是加入了音驹排球部。</p>
    <p><strong>独特风格：</strong>与其他热血的排球选手不同，研磨性格冷淡，对比赛的胜负不太执着。但正是这种冷静的特质，让他能够从旁观者的角度分析比赛，找到对手的弱点。</p>
    <p><strong>觉醒：</strong>在春高县预选赛的练习赛中，研磨遇到了日向。日向对排球的纯粹热情感染了他，让他第一次真正地想要"赢"一场比赛。从那以后，研磨开始积极思考如何才能发挥全队的实力。</p>
    <p><strong>特长：</strong>研磨的传球风格灵活多变，他能够根据对方拦网的情况瞬间调整传球路线，让己方主攻手在最佳位置扣球。</p>`,

  19: `<h4>🏐 夜久卫辅的故事</h4>
    <p>夜久卫辅是音驹高校的自由人，被称为"防守的守护神"。</p>
    <p><strong>防守专家：</strong>夜久的接球技术非常出色。无论是强力扣球、轻吊球还是跳发球，他都能稳定地接起。他的移动速度极快，能够在瞬间判断球的轨迹。</p>
    <p><strong>与西谷的对决：</strong>在和乌野的比赛中，夜久与西谷的"自由人对决"成为一大看点。两人都展现了顶级的防守能力，让比赛更加精彩。</p>
    <p><strong>性格：</strong>夜久性格认真，对排球充满热情。他是音驹防守体系的核心，也是研磨的好朋友。</p>
    <p><strong>成长：</strong>夜久在县预选赛中展现了出色的防守能力，帮助音驹成为强队。</p>`,

  20: `<h4>🏐 山本猛虎的故事</h4>
    <p>山本猛虎是音驹高校的主攻手，扣球实力强劲。</p>
    <p><strong>扣球实力：</strong>山本拥有强大的扣球实力，是音驹进攻的重要一员。他的扣球技术全面，无论是直线还是斜线都能准确完成。</p>
    <p><strong>队内角色：</strong>山本作为音驹的主攻手，与研磨、黑尾等人配合默契。他的扣球为音驹贡献了许多得分。</p>
    <p><strong>性格：</strong>山本性格开朗热情，是音驹的活力源之一。</p>
    <p><strong>成长：</strong>山本在县预选赛中展现了出色的扣球能力，帮助音驹一路过关斩将。</p>`,

  21: `<h4>🏐 海信行的故事</h4>
    <p>海信行是音驹高校的副攻手，身高186cm，拦网能力出色。</p>
    <p><strong>拦网能力：</strong>海的拦网技术出色，身高优势让他在网前有优势。他能够准确预判对手的扣球路线，进行有效拦网。</p>
    <p><strong>队内角色：</strong>海作为音驹的副攻手，与黑尾形成双塔。他的拦网让音驹的防守更加稳固。</p>
    <p><strong>性格：</strong>海性格温和，是音驹的稳定一员。</p>
    <p><strong>成长：</strong>海在县预选赛中展现了出色的拦网能力，为音驹的胜利做出了贡献。</p>`,

  22: `<h4>🏐 木兔光太郎的故事</h4>
    <p>木兔光太郎是枭谷学园的主攻手，性格开朗跳脱，扣球极具爆发力。</p>
    <p><strong>枭谷的王牌：</strong>木兔是枭谷学园的王牌选手，拥有强大的扣球实力。但他最大的问题是情绪化，状态好的时候能够压制对手，状态不好时会连续失误。</p>
    <p><strong>与赤苇的关系：</strong>木兔的搭档是二传手赤苇京治。赤苇能够准确地判断木兔的状态，在木兔状态不佳时安抚他，在状态好时充分利用他的进攻能力。两人是枭谷最可靠的搭档。</p>
    <p><strong>情绪管理：</strong>在东京集训和县预选中，木兔逐渐学会控制自己的情绪。虽然偶尔还是会情绪化，但他正在成长为一名更成熟的选手。</p>
    <p><strong>目标：</strong>木兔的目标是成为日本国家队的主攻手，代表日本参加奥运会。</p>`,

  23: `<h4>🏐 赤苇京治的故事</h4>
    <p>赤苇京治是枭谷学园的二传手，木兔光太郎的最佳搭档，性格冷静沉稳。</p>
    <p><strong>木兔的守护者：</strong>赤苇的工作很简单——让木兔在最佳状态扣球。他能够敏锐地观察木兔的情绪变化，在木兔状态好时大胆进攻，状态不好时稳定军心。</p>
    <p><strong>战术思考：</strong>赤苇不仅是二传手，更是枭谷的"军师"。他能够分析对手的弱点，制定相应的战术。在东京集训的练习赛中，他的战术调整帮助枭谷展现出强大实力。</p>
    <p><strong>与木兔的关系：</strong>赤苇和木兔是完全相反的类型。一个冷静理智，一个冲动跳脱。正是这种互补的特质，让他们成为最默契的搭档。</p>
    <p><strong>成长：</strong>作为高二学生，赤苇已经成长为枭谷不可或缺的核心。他将继续陪伴木兔成长，共同带领枭谷走向全国大赛。</p>`,

  24: `<h4>🏐 京谷贤太的故事</h4>
    <p>京谷贤太是青叶城西的主攻手，扣球极具爆发力。</p>
    <p><strong>强力扣球：</strong>京谷的扣球威力巨大，但问题是情绪化。状态好的时候能够压制对手，状态不好时会连续失误。</p>
    <p><strong>队内角色：</strong>京谷作为青叶城西的主攻手，是队伍的重要进攻力量。他的扣球为队伍贡献了许多得分。</p>
    <p><strong>性格：</strong>京谷性格冲动，容易情绪化。但他的实力是毋庸置疑的。</p>
    <p><strong>成长：</strong>京谷在县预选赛中展现了出色的扣球能力，但也暴露了情绪管理的问题。他正在努力成为更成熟的选手。</p>`,

  26: `<h4>🏐 宫侑的故事</h4>
    <p>宫侑是稻荷崎高校的二传手，宫治的双胞胎哥哥，擅长"光速二传"，性格张扬。</p>
    <p><strong>双子配合：</strong>宫侑和宫治是双胞胎，两人从小一起打球，形成了完美的默契。宫侑的传球、宫治的扣球，他们的"兄弟连线"是稻荷崎最强武器。</p>
    <p><strong>光速二传：</strong>宫侑的传球速度极快，常常在对手还没反应过来时就已经组织好了进攻。这种"光速二传"让稻荷崎的进攻极具威胁。</p>
    <p><strong>与影山的对决：</strong>在春高县预选赛的练习赛中，宫侑遇到了另一位天才二传手影山飞雄。两人的传球风格截然不同，宫侑凭借速度和变化展现了强大的实力，对影山造成了极大的冲击。</p>
    <p><strong>性格：</strong>宫侑性格张扬，喜欢在场上表现自己。但到了关键时刻，他总能冷静地做出正确的选择。</p>`,

  27: `<h4>🏐 宫治的故事</h4>
    <p>宫治是稻荷崎高校的主攻手，宫侑的双胞胎弟弟，擅长"假动作扣球"。</p>
    <p><strong>双子配合：</strong>宫治和宫侑从小一起长大，两人的传球和扣球配合天衣无缝。宫侑的传球总是能传到宫治最舒服的位置，而宫治总能在那里完成扣杀。</p>
    <p><strong>假动作大师：</strong>宫治最大的武器是"假动作扣球"。他能够做出扣球的假动作，骗过对手后轻巧地把球打向空档。这种技巧让他成为稻荷崎难以预测的进攻点。</p>
    <p><strong>与宫侑的关系：</strong>宫治性格比宫侑沉稳一些，但在关键时刻同样能够挺身而出。他和宫侑的关系虽然经常吵吵闹闹，但彼此信任。</p>
    <p><strong>成长：</strong>在东京集训和县预选赛的练习赛中，宫治和稻荷崎展现了强大实力。虽然经常被拿来和宫侑比较，但他正逐渐找到属于自己的打法。</p>`,

  28: `<h4>🏐 北信介的故事</h4>
    <p>北信介是稻荷崎高校的主攻手兼队长，以冷静、沉稳、自律的"普通人极致"而闻名。</p>
    <p><strong>队长的责任：</strong>作为稻荷崎的队长，北信介是球队的定海神针。无论比赛多么激烈，他总能保持冷静，带领球队前进。</p>
    <p><strong>普通人极致：</strong>北信介自认为是"普通人"，没有特别突出的天赋。但他通过极致的努力和自律，将每一项技能都训练到最高水平。他的接球、扣球、防守没有明显弱点，是全能型选手。</p>
    <p><strong>生活习惯：</strong>北信介的生活极其规律，每天准时训练、准时休息，不玩手机、不玩游戏。这种自律让他能够始终保持最佳状态。</p>
    <p><strong>与队友的关系：</strong>北信介是稻荷崎的精神领袖。在宫侑等年轻队员情绪激动时，他总能冷静地安抚大家。他是让稻荷崎成为强队的重要支柱。</p>`,

  29: `<h4>🏐 角名伦太郎的故事</h4>
    <p>角名伦太郎是稻荷崎高校的副攻手，冷静型选手，擅长技巧型拦网和扣球。</p>
    <p><strong>技术型选手：</strong>角名不是靠身体天赋吃饭的选手，而是靠精妙的技术。他能够在空中根据对手的拦网做出判断，选择最适合的扣球路线。</p>
    <p><strong>拦网技巧：</strong>角名的拦网技术非常出色。他能够观察对方二传手的习惯和眼神，预判传球方向，然后提前移动到正确位置进行拦网。</p>
    <p><strong>性格：</strong>角名性格冷静，即使比赛落后也不会慌乱。他总是能够理性地分析局势，找到解决问题的方法。这种冷静让他成为稻荷崎防守体系的重要一环。</p>
    <p><strong>与队友的配合：</strong>在稻荷崎，角名和宫侑、宫治的配合非常默契。他能够在合适的位置出现，给队伍创造得分机会。在县预选赛中，他展现了出色的拦网能力。</p>`,

  31: `<h4>🏐 佐久早圣臣的故事</h4>
    <p>佐久早圣臣是井闼山高校的主攻手，被誉为"完美先生"，打法严谨，追求完美。</p>
    <p><strong>完美主义者：</strong>佐久早对排球的要求极高，容不得半点失误。他的训练量是普通选手的数倍，为的就是在比赛中达到"完美"的状态。</p>
    <p><strong>洁癖：</strong>佐久早有轻微洁癖，不喜欢和陌生人接触。这让他被许多人误解为傲慢，但其实他只是性格比较独特。</p>
    <p><strong>技术特点：</strong>佐久早的扣球技术非常全面，无论是直线扣杀、斜线扣球，还是吊球，他都能准确完成。他的接球和防守同样出色，是井闼山的攻防核心。</p>
    <p><strong>实力：</strong>佐久早是关东地区数一数二的主攻手，在东京集训中展现了压倒性的实力。他对排球的高标准要求让他成为令人敬畏的对手。</p>
    <p><strong>目标：</strong>佐久早的目标是成为世界最强主攻手，代表日本参加奥运会并获得金牌。</p>`,

  32: `<h4>🏐 牛岛若利的故事</h4>
    <p>牛岛若利是白鸟泽学园的王牌主攻手，身高194.3cm，拥有压倒性的扣球实力。</p>
    <p><strong>压倒性的实力：</strong>牛岛的扣球威力巨大，很少有人能够拦下。他的扣球技术非常全面，无论是直线还是斜线都能准确完成。</p>
    <p><strong>成长历程：</strong>牛岛从小接受严格训练，是真正的排球世家子弟。他的天赋和努力让他成为关东地区最顶尖的主攻手之一。</p>
    <p><strong>与乌野的对决：</strong>在春高县预选赛中，牛岛带领白鸟泽击败了乌野，展现了强队的实力。他的表现让日向和影山认识到了与顶尖选手的差距。</p>
    <p><strong>目标：</strong>牛岛的目标是成为全国最强的主攻手，带领白鸟泽获得全国大赛的冠军。</p>`,

  33: `<h4>🏐 天童觉的故事</h4>
    <p>天童觉是白鸟泽学园的副攻手，被称为"铁壁"，拦网能力极强。</p>
    <p><strong>铁壁之名：</strong>天童的拦网技术被誉为"铁壁"，他能够准确预判对手的扣球路线，在瞬间移动到正确位置进行拦网。</p>
    <p><strong>与牛岛的配合：</strong>天童和牛岛是白鸟泽的双核。牛岛负责进攻，天童负责拦网，两人的配合让白鸟泽成为关东地区的强队。</p>
    <p><strong>性格：</strong>天童性格冷静沉着，即使在比赛中也面无表情。他的冷静让他能够保持最好的拦网状态。</p>
    <p><strong>成长：</strong>天童在县预选赛中展现了强大的拦网实力，多次拦下对手的进攻。他的存在让白鸟泽成为令人畏惧的队伍。</p>`,

  34: `<h4>🏐 五色工的故事</h4>
    <p>五色工是白鸟泽学园的二传手，善于调动全队进攻。</p>
    <p><strong>传球能力：</strong>五色的传球技术出色，能够根据对手的拦网情况灵活调整传球路线，让己方主攻手在最佳位置扣球。</p>
    <p><strong>与王牌的配合：</strong>五色与牛岛的配合非常默契。他能够准确地将球传给牛岛，让牛岛的扣球威力最大化。</p>
    <p><strong>成长：</strong>五色作为白鸟泽的二传手，在县预选赛中展现了出色的组织能力。他的存在让白鸟泽的进攻更加多样化和难以预测。</p>`,

  35: `<h4>🏐 大平狮音的故事</h4>
    <p>大平狮音是白鸟泽学园的王牌主攻手，身高189cm。</p>
    <p><strong>白鸟泽的王牌：</strong>大平是白鸟泽的主要得分点，拥有强大的扣球实力。他的扣球技术全面，无论是直线还是斜线都能准确完成。</p>
    <p><strong>与乌野的对决：</strong>在和乌野的比赛中，大平的扣球被东峰多次拦下，这让东峰产生了心结。但大平也展现了强队王牌的实力。</p>
    <p><strong>性格：</strong>大平性格沉稳，是白鸟泽的精神支柱之一。</p>
    <p><strong>成长：</strong>大平在县预选赛中展现了出色的扣球能力，帮助白鸟泽取得好成绩。</p>`,

  36: `<h4>🏐 二瓶坚的故事</h4>
    <p>二瓶坚是伊达工的二传手，身高183cm。</p>
    <p><strong>传球能力：</strong>二瓶的传球技术精准，善于组织进攻。他能够准确判断对手的防守，将球传到最佳位置。</p>
    <p><strong>与王牌的配合：</strong>二瓶与队友的配合非常默契。他的传球让队友能够充分发挥扣球能力。</p>
    <p><strong>成长：</strong>二瓶在县预选赛中展现了出色的组织能力，帮助伊达工成为强队。</p>`,

  37: `<h4>🏐 黄金川贯至的故事</h4>
    <p>黄金川贯至是伊达工的副攻手，拦网专家，身高188cm。</p>
    <p><strong>拦网专家：</strong>黄金川的拦网技术出色，能够准确预判对手的扣球路线。他的拦网是伊达工防守体系的重要一环。</p>
    <p><strong>与乌野的对决：</strong>在和乌野的比赛中，黄金川多次成功拦下日向和东峰的扣球，展现了强队的实力。</p>
    <p><strong>成长：</strong>黄金川在县预选赛中展现了出色的拦网能力，为伊达工的胜利做出了贡献。</p>`,

  38: `<h4>🏐 星海光来的故事</h4>
    <p>星海光来是鸥台高中的王牌主攻手，身高169.2cm，拥有惊人的弹跳力和扣球技术。</p>
    <p><strong>小个子的逆袭：</strong>星海光虽然身高只有169cm，但弹跳力惊人，扣球技术精湛。他与日向一样，证明了小个子也能在排球场上闪耀。</p>
    <p><strong>技术特点：</strong>星海光的扣球技术非常全面，无论是直线扣杀、斜线扣球，还是吊球，他都能准确完成。他的扣球速度极快，让人难以防守。</p>
    <p><strong>全国大赛：</strong>在春季高中排球大会中，星海光来带领鸥台高中展现了强大的实力，与各路强队交手。</p>
    <p><strong>目标：</strong>星海光的目标是成为日本国家队的主攻手，代表日本参加奥运会。</p>`
};




const characterStory = computed(() => {
  if (!character.value) return '';
  return characterStories[character.value.id] || '暂无故事内容';
});

const goBackHome = () => {
  router.push('/');
};

const calcRadarPoints = (dims) => {
  const centerX = 100;
  const centerY = 100;
  const maxR = 80;
  const angles = [0, 60, 120, 180, 240, 300];
  const values = [
    dims.strength,
    dims.speed,
    dims.jump,
    dims.stamina,
    dims.skill,
    dims.intellect
  ];

  return values.map((val, idx) => {
    const angleRad = (angles[idx] * Math.PI) / 180;
    const r = (val / 5) * maxR;
    const x = centerX + r * Math.sin(angleRad);
    const y = centerY - r * Math.cos(angleRad);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(' ');
};

onMounted(() => {
  const target = characterList.find(item => item.id === Number(route.params.id));
  character.value = target;

  if (target) {
    imgUrl.value = processPath(target.img);
    flagUrl.value = processPath(target.flagImg);

    radarPoints.value = '100,100 100,100 100,100 100,100 100,100 100,100';
    setTimeout(() => {
      radarPoints.value = calcRadarPoints(target.sixDims);
    }, 300);
  }
});
</script>

<style scoped>
.detail-page {
  min-height: 100vh;
  width: 100%;
  max-width: 100vw;
  padding: 30px 20px;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  box-sizing: border-box;
  overflow-x: hidden;
  margin: 0;
}

.back-home-btn {
  padding: 14px 32px;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 10;
  position: relative;
  box-shadow: 0 6px 20px rgba(240, 147, 251, 0.4), 0 0 40px rgba(240, 147, 251, 0.2);
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.back-home-btn::before {
  content: '←';
  margin-right: 8px;
  font-weight: 800;
  font-size: 1.2rem;
}

.back-home-btn:hover {
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 10px 30px rgba(240, 147, 251, 0.5), 0 0 60px rgba(240, 147, 251, 0.3);
}

.detail-content {
  max-width: 1200px;
  width: 100%;
  margin: 30px auto;
  padding: 50px;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(20px);
  border-radius: 28px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15), 0 0 100px rgba(102, 126, 234, 0.1);
  position: relative;
  z-index: 5;
  box-sizing: border-box;
  border: 1px solid rgba(255, 255, 255, 0.3);
  animation: contentAppear 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes contentAppear {
  from {
    opacity: 0;
    transform: translateY(40px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.character-title {
  margin: 0 0 40px;
  font-size: 3.5rem;
  font-family: "Microsoft YaHei", "Noto Sans SC", sans-serif;
  font-weight: 800;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #667eea 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: center;
  text-shadow: none;
  position: relative;
  animation: titleGlow 3s ease-in-out infinite;
}

@keyframes titleGlow {
  0%, 100% {
    filter: drop-shadow(0 0 20px rgba(240, 147, 251, 0.3));
  }
  50% {
    filter: drop-shadow(0 0 40px rgba(102, 126, 234, 0.4));
  }
}

.info-layout {
  display: flex;
  align-items: center;
  gap: 50px;
  flex-wrap: wrap;
  justify-content: center;
}

.character-img {
  max-width: 420px;
  height: auto;
  border-radius: 24px;
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.2), 0 0 60px rgba(102, 126, 234, 0.2);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  border: 4px solid rgba(255, 255, 255, 0.3);
}

.character-img:hover {
  transform: translateY(-10px) rotate(2deg) scale(1.03);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.3), 0 0 80px rgba(240, 147, 251, 0.3);
}

.info-text {
  font-family: "Microsoft YaHei", "Noto Sans SC", sans-serif;
  font-size: 1.2rem;
  line-height: 2.4;
  color: #34495e;
  flex: 1;
  min-width: 300px;
}

.info-item {
  margin: 12px 0;
  padding: 16px 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ed 100%);
  border-radius: 16px;
  border-left: 5px solid #f093fb;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.info-item::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, rgba(240, 147, 251, 0.1) 0%, transparent 100%);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.info-item:hover::before {
  transform: translateX(100%);
}

.info-item:hover {
  transform: translateX(8px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.info-item span {
  font-weight: 700;
  color: #f093fb;
  background: linear-gradient(135deg, #f093fb 0%, #667eea 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.radar-section {
  margin-top: 60px;
  text-align: center;
  padding-top: 40px;
  border-top: 3px dashed rgba(240, 147, 251, 0.3);
  position: relative;
}

.radar-section::before {
  content: '📊';
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 2rem;
  background: rgba(255, 255, 255, 0.96);
  padding: 0 15px;
  border-radius: 10px;
}

.radar-title {
  font-size: 2rem;
  font-family: "Microsoft YaHei", "Noto Sans SC", sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 30px;
  font-weight: 800;
  text-shadow: none;
}

.radar-container {
  display: flex;
  justify-content: center;
  padding: 30px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%);
  backdrop-filter: blur(10px);
  border-radius: 24px;
  max-width: 520px;
  margin: 0 auto;
  border: 1px solid rgba(102, 126, 234, 0.2);
  transition: all 0.3s ease;
}

.radar-container:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 32px rgba(102, 126, 234, 0.2);
}

.radar-polygon {
  transition: all 2s cubic-bezier(0.4, 0, 0.2, 1);
  transform-origin: center center;
  filter: drop-shadow(0 4px 8px rgba(66, 185, 131, 0.3));
}

.radar-label {
  font-family: "Microsoft YaHei", "Noto Sans SC", sans-serif;
  font-size: 15px;
  font-weight: 700;
  color: #2c3e50;
  text-anchor: middle;
  fill: #2c3e50;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
}

.empty-tip {
  text-align: center;
  font-size: 1.2rem;
  color: #666;
  padding: 50px;
  position: relative;
  z-index: 5;
}

.story-section {
  margin-top: 60px;
  padding-top: 40px;
  border-top: 3px dashed rgba(240, 147, 251, 0.3);
  position: relative;
}

.story-section::before {
  content: '📖';
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 2rem;
  background: rgba(255, 255, 255, 0.96);
  padding: 0 15px;
  border-radius: 10px;
}

.section-title {
  font-size: 2rem;
  font-family: "Microsoft YaHei", "Noto Sans SC", sans-serif;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 25px;
  font-weight: 800;
  text-align: center;
}

.story-toggle-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 16px 24px;
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: white;
  border: none;
  border-radius: 16px;
  font-size: 17px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 6px 20px rgba(79, 172, 254, 0.4), 0 0 40px rgba(79, 172, 254, 0.2);
  letter-spacing: 0.5px;
}

.story-toggle-btn:hover {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 10px 30px rgba(79, 172, 254, 0.5), 0 0 60px rgba(79, 172, 254, 0.3);
}

.arrow-icon {
  transition: transform 0.4s ease;
  font-size: 1.1rem;
}

.story-content {
  margin-top: 25px;
  animation: slideDown 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.story-text {
  line-height: 2.2;
  color: #444;
  font-size: 1.1rem;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
  padding: 30px;
  border-radius: 20px;
  border: 1px solid rgba(102, 126, 234, 0.15);
}

.story-text h4 {
  color: #f093fb;
  font-size: 1.5rem;
  margin-bottom: 20px;
  font-weight: 800;
  text-shadow: 0 2px 4px rgba(255, 255, 255, 0.8);
}

.story-text p {
  margin-bottom: 18px;
  text-indent: 2.5em;
  color: #555;
}

.story-text strong {
  color: #667eea;
  font-weight: 700;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(240, 147, 251, 0.1) 100%);
  padding: 2px 8px;
  border-radius: 6px;
  margin-left: 4px;
  margin-right: 4px;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .character-title {
    font-size: 2.2rem;
  }

  .info-layout {
    gap: 30px;
  }

  .detail-content {
    padding: 30px;
    border-radius: 20px;
  }

  .character-img {
    max-width: 100%;
    border-radius: 20px;
  }

  .story-text {
    font-size: 1rem;
    padding: 20px;
  }

  .back-home-btn {
    padding: 12px 24px;
    font-size: 14px;
  }

  .radar-container {
    padding: 20px;
  }
}
</style>