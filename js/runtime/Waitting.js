import {Sprite} from "../base/Sprite";
import {DataStore} from "../base/DataStore";

//等待动画
export class Waitting extends Sprite{
    constructor() {
        const image = Sprite.getImage('waitting');
        super(image, //super是调用父类的构造方法
            0, 0,
            image.width, image.height,
            DataStore.getInstance().width * 0.25,
            DataStore.getInstance().height * 0.4,
            DataStore.getInstance().width * 0.5,
            DataStore.getInstance().width * 0.3);
        this.time = 0;
        this.speed = 0.01;

    }

    draw(){
        if(this.time <= 1){
            this.time = this.time + this.speed;
        }else{
            this.time = 0;
            DataStore.getInstance().game_state = 'play';
            DataStore.getInstance().waitting = false;
        }
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