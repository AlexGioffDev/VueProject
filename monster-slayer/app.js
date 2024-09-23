function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      round: 0,
    };
  },
  computed: {
    monsterBarStyles() {
      return { width: this.monsterHealth + "%" };
    },
    playerBarStyles() {
      return { width: this.playerHealth + "%" };
    },
    canUseSpecialAttack() {
      return this.round < 3;
    },
  },
  methods: {
    attackMonster() {
      this.round++;
      let damage = getRandomValue(5, 12);
      this.monsterHealth -= damage;
      this.attackPlayer();
    },
    attackPlayer() {
      let damage = getRandomValue(8, 15);
      this.playerHealth -= damage;
    },
    specialAttack() {
      let damage = getRandomValue(10, 25);
      this.monsterHealth -= damage;
      this.attackPlayer();
      this.round = 0;
    },
    healPlayer() {
      this.round++;
      const value = getRandomValue(8, 12);
      this.playerHealth += value;
      if (this.playerHealth > 100) {
        this.playerHealth = 100;
      }
    },
  },
});

app.mount("#game");
