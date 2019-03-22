import {Sprite} from "../base/Sprite";
import {DataStore} from "../base/DataStore";

//倒计时
export class Timing extends Sprite {
    constructor() {
        const num0 = Sprite.getImage('zero');
        const num1 = Sprite.getImage('one');
        const num2 = Sprite.getImage('two');
        const num3 = Sprite.getImage('three');
        const num4 = Sprite.getImage('four');
        const num5 = Sprite.getImage('five');
        const num6 = Sprite.getImage('six');
        const num7 = Sprite.getImage('seven');
        const num8 = Sprite.getImage('eight');
        super(num8, //super是调用父类的构造方法
            0, 0,
            num8.width, num8.height,
            DataStore.getInstance().width * 0.4, DataStore.getInstance().height * 0.1,
            DataStore.getInstance().width * 0.2, DataStore.getInstance().width * 0.2)
        this.nums = [num8, num7, num6, num5, num4, num3, num2, num1, num0];
        this.index = 0;
    }

    draw() {
        if(DataStore.getInstance().time_state === true) {
            const speed = 0.0166;
            DataStore.getInstance().time_count = DataStore.getInstance().time_count + speed;
            this.index = parseInt(DataStore.getInstance().time_count)
            super.draw(this.nums[this.index],
                this.srcX,
                this.srcY,
                this.srcW,
                this.srcH,
                this.x,
                this.y,
                this.width,
                this.height)
            if (DataStore.getInstance().time_count >= 8.2) {
                DataStore.getInstance().time_count = 0;
                DataStore.getInstance().touch_state = false;
                DataStore.getInstance().time_state = false;
                DataStore.getInstance().miss_state = true;
            }
        }
    }
}