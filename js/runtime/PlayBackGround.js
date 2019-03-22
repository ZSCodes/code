import {Sprite} from "../base/Sprite.js";
import {DataStore} from "../base/DataStore";
import {Director} from "../Director";

//对战画面
export class PlayBackGround extends Sprite {
    constructor() {
        const bg1 = Sprite.getImage('play_bg1');
        super(bg1, //super是调用父类的构造方法
            0, 0,
            bg1.width, bg1.height,
            0, 0,
            DataStore.getInstance().width, DataStore.getInstance().height * 0.9);
        this.bg2 = Sprite.getImage('play_bg2');
        this.bg3 = Sprite.getImage('play_bg3');
        this.bg4 = Sprite.getImage('play_bg4');
        this.bg5 = Sprite.getImage('play_bg5');
        this.miss = Sprite.getImage('miss');
        this.speedup = Sprite.getImage('speedup');
        this.shade = Sprite.getImage('shade');
    }

    draw() {
        const ctx = DataStore.getInstance().ctx;
        //背景
        super.draw(this.img,
            this.srcX,
            this.srcY,
            this.srcW,
            this.srcH,
            this.x,
            this.y,
            this.width,
            this.height);
        //底部
        ctx.drawImage(
            this.bg2,
            0,
            0,
            this.bg2.width,
            this.bg2.height,
            0,
            DataStore.getInstance().height * 0.9,
            DataStore.getInstance().width,
            DataStore.getInstance().height * 0.1
        );
        //计分板
        ctx.drawImage(
            this.bg3,
            0,
            0,
            this.bg3.width,
            this.bg3.height,
            DataStore.getInstance().width * 0.32,
            DataStore.getInstance().width * 0.02,
            DataStore.getInstance().width * 0.38,
            DataStore.getInstance().width * 0.1
        );
        //棋盘
        ctx.drawImage(
            this.bg4,
            0,
            0,
            this.bg4.width,
            this.bg4.height,
            DataStore.getInstance().width * 0.08,
            DataStore.getInstance().width * 0.45,
            DataStore.getInstance().width * 0.25,
            DataStore.getInstance().width * 0.24
        );

        ctx.drawImage(
            this.bg4,
            0,
            0,
            this.bg4.width,
            this.bg4.height,
            DataStore.getInstance().width * 0.38,
            DataStore.getInstance().width * 0.45,
            DataStore.getInstance().width * 0.25,
            DataStore.getInstance().width * 0.24
        );

        ctx.drawImage(
            this.bg4,
            0,
            0,
            this.bg4.width,
            this.bg4.height,
            DataStore.getInstance().width * 0.68,
            DataStore.getInstance().width * 0.45,
            DataStore.getInstance().width * 0.25,
            DataStore.getInstance().width * 0.24
        );

        ctx.drawImage(
            this.bg4,
            0,
            0,
            this.bg4.width,
            this.bg4.height,
            DataStore.getInstance().width * 0.08,
            DataStore.getInstance().width * 0.74,
            DataStore.getInstance().width * 0.25,
            DataStore.getInstance().width * 0.24
        );

        ctx.drawImage(
            this.bg4,
            0,
            0,
            this.bg4.width,
            this.bg4.height,
            DataStore.getInstance().width * 0.38,
            DataStore.getInstance().width * 0.74,
            DataStore.getInstance().width * 0.25,
            DataStore.getInstance().width * 0.24
        );

        ctx.drawImage(
            this.bg4,
            0,
            0,
            this.bg4.width,
            this.bg4.height,
            DataStore.getInstance().width * 0.68,
            DataStore.getInstance().width * 0.74,
            DataStore.getInstance().width * 0.25,
            DataStore.getInstance().width * 0.24
        );

        ctx.drawImage(
            this.bg4,
            0,
            0,
            this.bg4.width,
            this.bg4.height,
            DataStore.getInstance().width * 0.08,
            DataStore.getInstance().width * 1.03,
            DataStore.getInstance().width * 0.25,
            DataStore.getInstance().width * 0.24
        );

        ctx.drawImage(
            this.bg4,
            0,
            0,
            this.bg4.width,
            this.bg4.height,
            DataStore.getInstance().width * 0.38,
            DataStore.getInstance().width * 1.03,
            DataStore.getInstance().width * 0.25,
            DataStore.getInstance().width * 0.24
        );

        ctx.drawImage(
            this.bg4,
            0,
            0,
            this.bg4.width,
            this.bg4.height,
            DataStore.getInstance().width * 0.68,
            DataStore.getInstance().width * 1.03,
            DataStore.getInstance().width * 0.25,
            DataStore.getInstance().width * 0.24
        );
        //出手按钮
        ctx.drawImage(
            this.bg5,
            0,
            0,
            this.bg5.width,
            this.bg5.height,
            DataStore.getInstance().width * 0.78,
            DataStore.getInstance().height * 0.78,
            DataStore.getInstance().width * 0.18,
            DataStore.getInstance().width * 0.18
        );
        //道具
        if(DataStore.getInstance().round_ == 'enemy') {
            ctx.drawImage(
                this.speedup,
                0,
                0,
                this.speedup.width,
                this.speedup.height,
                DataStore.getInstance().width * 0.61,
                DataStore.getInstance().height * 0.91,
                DataStore.getInstance().width * 0.13,
                DataStore.getInstance().width * 0.13
            );
            ctx.drawImage(
                this.shade,
                0,
                0,
                this.shade.width,
                this.shade.height,
                DataStore.getInstance().width * 0.78,
                DataStore.getInstance().height * 0.91,
                DataStore.getInstance().width * 0.13,
                DataStore.getInstance().width * 0.13
            );
        }
    }
}
