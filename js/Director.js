import {DataStore} from "./base/DataStore.js";
import {OurAim} from "./player/OurAim.js";
import {EnemyAim} from "./player/EnemyAim.js";
import {Line} from "./player/Line";

//导演类，控制游戏的逻辑
export class Director {
    static getInstance() {
        if (!Director.instance) {
            Director.instance = new Director();
        }
        return Director.instance;
    }

    constructor() {
        this.dataStore = DataStore.getInstance();
    }

    //创建我方命中地盘
    createOurAim(X, Y) {
        this.dataStore.get('ourAim').push(new OurAim(X, Y));
    }

    //创建敌方命中地盘
    createEnemyAim(X, Y) {
        this.dataStore.get('enemyAim').push(new EnemyAim(X, Y));
    }

    //创建胜利连线
    createLine(img, X, Y, width_, height_) {
        this.dataStore.get('line').push(new Line(img, X, Y, width_, height_));
    }

    run() {
        if (this.dataStore.game_state == 'start') {
            this.dataStore.get('start_background').draw();
            if (this.dataStore.waitting === true) {
                this.dataStore.get('waitting').draw();
            }
        } else if (this.dataStore.game_state == 'play') {
            this.dataStore.get('play_background').draw();
            this.dataStore.get('aim_our').draw();
            this.dataStore.get('aim_enemy').draw();
            this.dataStore.get('enemy').draw();
            this.dataStore.get('our').draw();
            this.dataStore.get('ourAim').forEach((value) => {
                value.draw();
            });
            this.dataStore.get('enemyAim').forEach((value) => {
                value.draw();
            });
            this.dataStore.get('line').forEach((value) => {
                value.draw();
            });
            this.dataStore.get('timing').draw();
            this.dataStore.get('ourthrow').draw();
            this.dataStore.get('enemythrow').draw();
            this.dataStore.get('shade').draw();
            this.dataStore.get('miss').draw();
            this.dataStore.get('ourwin_background').draw();
            this.dataStore.get('enemywin_background').draw();
            this.dataStore.get('tie_background').draw();
        }
        let timer = requestAnimationFrame(() => this.run());
        this.dataStore.put('timer', timer);
        // cancelAnimationFrame(this.dataStore.get('timer'));
    }
}