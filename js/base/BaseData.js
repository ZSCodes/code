import {DataStore} from "./DataStore";

//基础变量
export class BaseData{
    constructor(){
        this.dataStore = DataStore.getInstance();
        this.dataStore.game_result = '';  //游戏结果,our_win我方胜利，enemy_win敌方胜利，tie平局
        this.dataStore.win_background = '';  //控制游戏结果背景，our我方，enemy敌方，tie平局
        this.dataStore.game_state = 'play';  //控制显示那个页面
        this.dataStore.touch_state = true;  //true出手键有效，false出手键无效
        this.dataStore.shade_state = false;  //控制遮罩是否显示
        this.dataStore.OurAim = [];  //我方投中的地盘
        this.dataStore.EnemyAim = [];  //敌方投中的地盘
        this.dataStore.throw_state = '';  //控制投掷轨迹显示，our我方投掷，enemy敌方投掷
        this.dataStore.throw_x = 0;  //投掷终点的X轴坐标
        this.dataStore.throw_y = 0;  //投掷终点的Y轴坐标
        this.dataStore.hit_x = 0;  //命中的X轴坐标
        this.dataStore.hit_y = 0;  //命中的Y轴坐标
        this.dataStore.miss_state = false;  //控制miss是否显示
        this.dataStore.time_count = 0;  //计算倒计时数字图片数组的下标的值
        this.dataStore.time_state = true;  //控制倒计时是否显示
        this.dataStore.OurAimImage = 'yuan';  //我方棋子
        this.dataStore.EnemyAimImage = 'cha';  //敌方棋子
        this.dataStore.OurPet = 'cat';  //我方宠物
        this.dataStore.EnemyPet = 'dog';  //敌方宠物
        this.dataStore.Aim_our_image = 'aim';  //我方瞄准器样式
        this.dataStore.Aim_Enemy_image = 'aim';  //敌方瞄准器样式
        this.dataStore.round_ = 'enemy'; //回合，our我方，enemy敌方
        this.dataStore.round_num = '';  //第几回合
        this.dataStore.line = new Map([   //胜利连线的参数
            [1,['heng',0.08,0.5,0.85,0.15]],
            [2,['heng',0.08,0.79,0.85,0.15]],
            [3,['heng',0.08,1.08,0.85,0.15]],
            [4,['shu',0.13,0.45,0.15,0.85]],
            [5,['shu',0.43,0.45,0.15,0.85]],
            [6,['shu',0.73,0.45,0.15,0.85]],
            [7,['xie',0.08,0.45,0.85,0.85]],
            [8,['xie2',0.08,0.45,0.85,0.85]],
        ])
    }

}