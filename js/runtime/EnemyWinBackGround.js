import {Sprite} from "../base/Sprite";
import {DataStore} from "../base/DataStore";

//敌方赢了页面
export class EnemyWinBackGround extends Sprite {
    constructor() {
        const bg1 = Sprite.getImage('enemywin')
        super(bg1, //super是调用父类的构造方法
            0, 0,
            bg1.width, bg1.height,
            DataStore.getInstance().width*0.1, DataStore.getInstance().height*0.2,
            DataStore.getInstance().width*0.8, DataStore.getInstance().width*0.8)
    }

    draw() {
        if(DataStore.getInstance().win_background == 'enemy'){
            super.draw(this.img,
                this.srcX,
                this.srcY,
                this.srcW,
                this.srcH,
                this.x,
                this.y,
                this.width,
                this.height)
        }
    }
}