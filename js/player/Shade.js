import {Sprite} from "../base/Sprite";
import {DataStore} from "../base/DataStore";

//遮罩
export class Shade extends Sprite {
    constructor() {
        const image = Sprite.getImage('shade_bg')
        super(image, //super是调用父类的构造方法
            0, 0,
            image.width, image.height,
            DataStore.getInstance().width * 0.08, DataStore.getInstance().width * 0.45,
            DataStore.getInstance().width * 0.87, DataStore.getInstance().width * 0.87)
    }

    draw() {
        if(DataStore.getInstance().shade_state === true){
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