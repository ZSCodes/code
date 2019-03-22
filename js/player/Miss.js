import {Sprite} from "../base/Sprite";
import {DataStore} from "../base/DataStore";

//丢失
export class Miss extends Sprite {
    constructor() {
        const miss = Sprite.getImage('miss');
        super(miss, //super是调用父类的构造方法
            0, 0,
            miss.width, miss.height,
            DataStore.getInstance().width * 0.35, DataStore.getInstance().height * 0.14,
            DataStore.getInstance().width * 0.3, DataStore.getInstance().width * 0.3)
        this.state = 0;
    }

    draw() {
        if(DataStore.getInstance().miss_state === true) {
            this.state = this.state + 0.01;
            super.draw(this.img,
                this.srcX,
                this.srcY,
                this.srcW,
                this.srcH,
                this.x,
                this.y,
                this.width,
                this.height)
            if(this.state >= 1){
                DataStore.getInstance().miss_state = false;
                this.state = 0;
                DataStore.getInstance().aim_speed = 3;
                DataStore.getInstance().time_state = true;
                DataStore.getInstance().touch_state = true;
                DataStore.getInstance().shade_state = false;
                DataStore.getInstance().aim_X = DataStore.getInstance().width * 0.08;
                DataStore.getInstance().aim_Y = DataStore.getInstance().width * 0.45;
            }
        }
    }
}