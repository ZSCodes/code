import {Sprite} from "../base/Sprite";
import {DataStore} from "../base/DataStore";

//首页
export class StartBackGround extends Sprite {
    constructor() {
        const bg1 = Sprite.getImage('start_bg1')
        super(bg1, //super是调用父类的构造方法
            0, 0,
            bg1.width, bg1.height,
            0, 0,
            DataStore.getInstance().width, DataStore.getInstance().height)
        this.bg2 = Sprite.getImage('start_bg2')
    }

    draw() {
        const ctx = DataStore.getInstance().ctx
        super.draw(this.img,
            this.srcX,
            this.srcY,
            this.srcW,
            this.srcH,
            this.x,
            this.y,
            this.width,
            this.height)
        ctx.drawImage(this.bg2,
            0,
            0,
            this.bg2.width,
            this.bg2.height,
            DataStore.getInstance().width * 0.25,
            DataStore.getInstance().height * 0.4,
            DataStore.getInstance().width * 0.5,
            DataStore.getInstance().width * 0.3
        )
    }
}