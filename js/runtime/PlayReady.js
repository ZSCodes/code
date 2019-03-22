import {Sprite} from "../base/Sprite";
import {DataStore} from "../base/DataStore";

export class PlayReady extends Sprite {
    constructor() {
        const bg1 = Sprite.getImage('play_ready_bg1');
        super(bg1, //super是调用父类的构造方法
            0, 0,
            bg1.width, bg1.height,
            0, 0,
            DataStore.getInstance().width, DataStore.getInstance().height);
        this.bg2 = Sprite.getImage('play_ready_bg2');
        this.bg3 = Sprite.getImage('play_ready_bg3');
        this.bg4 = Sprite.getImage('play_ready_bg4');
        this.bg5 = Sprite.getImage('play_ready_bg5');
        this.bg6 = Sprite.getImage('play_ready_bg6');
        this.bg7 = Sprite.getImage('play_ready_bg7');
        this.vs = Sprite.getImage('play_ready_vs');
        this.pet1 = Sprite.getImage('play_ready_pet1');
        this.pet2 = Sprite.getImage('play_ready_pet2');
    }

    draw() {
        const ctx = DataStore.getInstance().ctx;

        const image = wx.createImage();
        const image2 = wx.createImage();
        image.src = DataStore.getInstance().userimg;
        image2.src = DataStore.getInstance().otherimg;

        super.draw(this.img,
            this.srcX,
            this.srcY,
            this.srcW,
            this.srcH,
            this.x,
            this.y,
            this.width,
            this.height);

        ctx.drawImage(
            this.bg2,
            0,
            0,
            this.bg2.width,
            this.bg2.height,
            0,
            0,
            DataStore.getInstance().width,
            DataStore.getInstance().height
        );

        ctx.drawImage(
            this.bg3,
            0,
            0,
            this.bg3.width,
            this.bg3.height,
            0,
            0,
            DataStore.getInstance().width,
            DataStore.getInstance().height
        );

        ctx.drawImage(
            this.bg4,
            0,
            0,
            this.bg4.width,
            this.bg4.height,
            0,
            0,
            DataStore.getInstance().width,
            DataStore.getInstance().height
        );

        ctx.drawImage(
            this.bg5,
            0,
            0,
            this.bg5.width,
            this.bg5.height,
            0,
            0,
            DataStore.getInstance().width,
            DataStore.getInstance().height
        );

        ctx.drawImage(
            this.bg6,
            0,
            0,
            this.bg6.width,
            this.bg6.height,
            0,
            0,
            DataStore.getInstance().width,
            DataStore.getInstance().height
        );

        ctx.drawImage(
            this.bg7,
            0,
            0,
            this.bg7.width,
            this.bg7.height,
            0,
            0,
            DataStore.getInstance().width,
            DataStore.getInstance().height
        );

        ctx.drawImage(
            this.vs,
            0,
            0,
            this.vs.width,
            this.vs.height,
            0,
            0,
            DataStore.getInstance().width,
            DataStore.getInstance().height
        );

        ctx.drawImage(
            this.pet1,
            0,
            0,
            this.pet1.width,
            this.pet1.height,
            0,
            0,
            DataStore.getInstance().width,
            DataStore.getInstance().height
        );

        ctx.drawImage(
            this.pet2,
            0,
            0,
            this.pet2.width,
            this.pet2.height,
            0,
            0,
            DataStore.getInstance().width,
            DataStore.getInstance().height
        );

        ctx.save() //保存上下文
        ctx.beginPath()//开始绘制
        ctx.arc(DataStore.getInstance().width * 0.064 + DataStore.getInstance().width * 0.0375,
            DataStore.getInstance().width * 0.064 + DataStore.getInstance().width * 1.62,
            DataStore.getInstance().width * 0.064, 0, 2 * Math.PI, false)//画一个圆
        ctx.clip()//裁剪这个圆
        ctx.drawImage(image, DataStore.getInstance().width * 0.0375, DataStore.getInstance().width * 1.62, DataStore.getInstance().width * 0.14, DataStore.getInstance().width * 0.14)//将图片绘制进圆
        ctx.restore()

        ctx.font = "40px Microsoft-YaHei"
        ctx.fillText(
            DataStore.getInstance().username,
            DataStore.getInstance().width * 0.18,
            DataStore.getInstance().width * 1.7,
            DataStore.getInstance().width * 0.35
        )

        ctx.save() //保存上下文
        ctx.beginPath()//开始绘制
        ctx.arc(DataStore.getInstance().width * 0.064 + DataStore.getInstance().width * 0.832,
            DataStore.getInstance().width * 0.064 + DataStore.getInstance().width * 0.13,
            DataStore.getInstance().width * 0.064, 0, 2 * Math.PI, false)//画一个圆
        ctx.clip()//裁剪这个圆
        ctx.drawImage(image2, DataStore.getInstance().width * 0.832, DataStore.getInstance().width * 0.13, DataStore.getInstance().width * 0.14, DataStore.getInstance().width * 0.14)//将图片绘制进圆
        ctx.restore()

        ctx.font = "40px Microsoft-YaHei"
        ctx.fillText(
            DataStore.getInstance().othername,
            DataStore.getInstance().width * 0.61,
            DataStore.getInstance().width * 0.21,
            DataStore.getInstance().width * 0.35
        )
    }
}