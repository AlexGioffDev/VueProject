function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      round: 0,
      winner: null,
      logMessages: [],
    };
  },
  computed: {
    monsterBarStyles() {
      if (this.monsterHealth <= 0) {
        return { width: "0%" };
      }
      return { width: this.monsterHealth + "%" };
    },
    playerBarStyles() {
      if (this.playerHealth <= 0) {
        return { width: "0%" };
      }
      return { width: this.playerHealth + "%" };
    },
    canUseSpecialAttack() {
      return this.round < 3;
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        // Draw
        this.winner = "draw";
      } else if (value <= 0) {
        // Player Lost!
        this.winner = "monster";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        // Draw
        this.winner = "draw";
      } else if (value <= 0) {
        // Monster Lost!
        this.winner = "player";
      }
    },
  },
  methods: {
    attackMonster() {
      this.round++;
      let damage = getRandomValue(5, 12);
      this.monsterHealth -= damage;
      this.addLogMessage("player", "attack", damage);
      this.attackPlayer();
    },
    attackPlayer() {
      let damage = getRandomValue(8, 15);
      this.playerHealth -= damage;
      this.addLogMessage("monster", "attack", damage);
    },
    specialAttack() {
      let damage = getRandomValue(10, 25);
      this.monsterHealth -= damage;
      this.attackPlayer();
      this.addLogMessage("player", "special-attack", damage);
      this.round = 0;
    },
    healPlayer() {
      this.round++;
      const value = getRandomValue(10, 20);
      this.playerHealth += value;
      if (this.playerHealth > 100) {
        this.playerHealth = 100;
      }
      this.addLogMessage("player", "heal", value);
      this.attackPlayer();
    },
    startGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.round = 0;
      this.winner = null;
    },
    surrender() {
      this.winner = "monster";
    },
    addLogMessage(user, type, value) {
      let message = {
        actionBy: user,
        actionType: type,
        actionValue: value,
      };
      this.logMessages.unshift(message);
    },
  },
});

app.mount("#game");
