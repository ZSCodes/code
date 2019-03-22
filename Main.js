import {ResourcesLoader} from "./js/base/ResourcesLoader.js";
import {PlayBackGround} from "./js/runtime/PlayBackGround.js";
import {DataStore} from "./js/base/DataStore.js";
import {Director} from "./js/Director.js";
import {Aim_our} from "./js/player/Aim_our.js";
import {Enemy} from "./js/player/Enemy.js";
import {Our} from "./js/player/Our.js";
import {Touch} from "./js/runtime/Touch.js";
import {StartBackGround} from "./js/runtime/StartBackGround.js";
import {Waitting} from "./js/runtime/Waitting.js";
import {Shade} from "./js/player/Shade.js";
import {OurThrow} from "./js/player/OurThrow.js";
import {Timing} from "./js/player/Timing.js";
import {Miss} from "./js/player/Miss.js";
import {BaseData} from "./js/base/BaseData.js";
import {OurWinBackGround} from "./js/runtime/OurWinBackGround";
import {EnemyWinBackGround} from "./js/runtime/EnemyWinBackGround";
import {TieBackGround} from "./js/runtime/TieBackGround";
import {Aim_enemy} from "./js/player/Aim_enemy";
import {EnemyThrow} from "./js/player/EnemyThrow";
import {Server} from "./Server";

//初始化整个游戏的精灵，作为游戏开始的入口
export class Main {
    constructor() {
        new Server().on();
        this.canvas = wx.createCanvas();
        this.ctx = this.canvas.getContext('2d');
        this.dataStore = DataStore.getInstance();
        this.loader = ResourcesLoader.create();
        this.loader.onLoaded(map => this.onResourceFirstLoaded(map));
        new Touch();
        new BaseData();
    }

    onResourceFirstLoaded(map) {
        this.dataStore.width = this.canvas.width;
        this.dataStore.height = this.canvas.height;
        this.dataStore.ctx = this.ctx;
        this.dataStore.res = map;
        this.init();
    }

    init() {
        this.dataStore
            .put('start_background', StartBackGround)  //首页背景
            .put('waitting', Waitting)  //等待背景
            .put('play_background', PlayBackGround)  //对战背景
            .put('ourwin_background', OurWinBackGround)  //我方赢了背景
            .put('enemywin_background', EnemyWinBackGround)  //敌方赢了背景
            .put('tie_background', TieBackGround)  //双方平局背景
            .put('aim_our', Aim_our)  //我方瞄准器
            .put('aim_enemy', Aim_enemy)  //敌方瞄准器
            .put('enemy', Enemy) //敌方人物
            .put('our', Our) //我方人物
            .put('ourAim', []) //我方棋子
            .put('enemyAim', []) //敌方棋子
            .put('shade', Shade) //遮罩
            .put('ourthrow', OurThrow) //我方投掷过程
            .put('enemythrow', EnemyThrow) //敌方投掷过程
            .put('miss', Miss) //丢失
            .put('line', []) //胜负连线
            .put('timing', Timing); //倒计时
        this.dataStore.waitting = false;
        Director.getInstance().run();
    }
}