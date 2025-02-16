
function getRandomVal(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null,
            logMessages : [],
        }
    },
    computed: {
        monsterBarStyles() {
            if (this.monsterHealth < 0) {
                return { width: '0%' };
            }
            return { width: this.monsterHealth + '%' };
        },
        playerBarStyles() {
            if (this.playerHealth < 0) {
                return { width: '0%' };
            }
            return { width: this.playerHealth + "%" };
        },
        mayUseSpecialAttack() {
            return this.currentRound % 3 !== 0;
        }
    },
    methods: {
        startGame() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.winner = null;
            this.currentRound = 0;
            this.logMessages = [];
        },
        attackMonster() {
            console.log("player attack");
            this.currentRound++;
            const attackValue = getRandomVal(5, 12);
            this.monsterHealth -= attackValue;
            this.addLogMessage('player','attack', attackValue);
            this.attackPlayer();
        },
        attackPlayer() {
            console.log("moster attack");
            const attackValue = getRandomVal(8, 15);
            this.playerHealth -= attackValue;
            this.addLogMessage('monster','attack', attackValue);
        },
        specialAttackMonster() {
            console.log("special attack");
            this.currentRound++;
            const attackValue = getRandomVal(10, 25);
            this.monsterHealth -= attackValue;
            this.addLogMessage('player','special-attack', attackValue);
            this.attackPlayer();
        },
        healPlayer() {
            console.log("heal");
            this.currentRound++;
            const healValue = getRandomVal(10, 20);
            if (this.playerHealth + healValue > 100) {
                this.playerHealth = 100;
            }
            else {
                this.playerHealth += healValue;
            }
            this.addLogMessage('player','heal', healValue);
            this.attackPlayer();
        },
        surrender(){
            this.winner = "monster";
        },
        addLogMessage(who ,action , value){
            this.logMessages.unshift({
                actionByWho : who ,
                actionType : action ,
                actionValue : value 
            })
        }
    },
    watch: {
        playerHealth(value) {
            if (value <= 0 && this.monsterHealth <= 0) {
                // draw
                this.winner = "draw";
            }
            else if (value <= 0) {
                // player lost
                this.winner = "monster";
            }
        },
        monsterHealth(value) {
            if (value <= 0 && this.playerHealth <= 0) {
                // draw
                this.winner = "draw";
            }
            else if (value <= 0) {
                // monster lost
                this.winner = "player";
            }
        }
    }
});


app.mount("#game");