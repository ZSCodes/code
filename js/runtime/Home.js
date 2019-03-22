import {Sprite} from "../base/Sprite";
import {DataStore} from "../base/DataStore";

//首页
export class Home extends Sprite {
    constructor() {
        const bg = Sprite.getImage('home');

        // let scale_pic = '';
        // let scale_width = bg.width / DataStore.getInstance().width;
        // let scale_height = bg.height / DataStore.getInstance().height;
        // if (scale_width < scale_height) {
        //     scale_pic = scale_width;
        // } else {
        //     scale_pic = scale_height;
        // }

        super(bg, //super是调用父类的构造方法
            0, 0,
            bg.width, bg.height,
            0, 0,
            DataStore.getInstance().width, DataStore.getInstance().height);
    }

    draw() {
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