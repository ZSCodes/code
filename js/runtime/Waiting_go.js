import {Sprite} from "../base/Sprite";
import {DataStore} from "../base/DataStore";

export class Waiting_go extends Sprite {
    constructor() {
        const bg1 = Sprite.getImage('waiting_go_bg1');
        super(bg1, //super是调用父类的构造方法
            0, 0,
            bg1.width, bg1.height,
            0,
            0,
            DataStore.getInstance().width,
            DataStore.getInstance().height);
        this.bg2 = Sprite.getImage('waiting_go_bg2');
        this.button = Sprite.getImage('waiting_go_button');
        this.land = Sprite.getImage('waiting_go_land');
        this.shadow = Sprite.getImage('waiting_go_shadow');
    }

    draw() {
        const ctx = DataStore.getInstance().ctx;
        const image = wx.createImage();

        image.src = DataStore.getInstance().userimg;

        this.pet1 = Sprite.getImage(DataStore.getInstance().pet);

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
            0, 0,
            this.bg2.width,
            this.bg2.height,
            DataStore.getInstance().width * 0.01, DataStore.getInstance().width * 0.37,
            DataStore.getInstance().width * 0.98,
            DataStore.getInstance().width * 0.98 / 0.88
        )

        ctx.drawImage(this.land,
            0, 0,
            this.land.width,
            this.land.height,
            DataStore.getInstance().width * 0.5, DataStore.getInstance().width * 0.915,
            DataStore.getInstance().width * 0.36,
            DataStore.getInstance().width * 0.36 / 1.3
        )

        ctx.drawImage(this.shadow,
            0, 0,
            this.shadow.width,
            this.shadow.height,
            DataStore.getInstance().width * 0.58, DataStore.getInstance().width * 0.98,
            DataStore.getInstance().width * 0.2,
            DataStore.getInstance().width * 0.2 / 3.1
        )

        //宠物图像
        ctx.drawImage(this.pet1,
            0, 0,
            this.pet1.width,
            this.pet1.height,
            DataStore.getInstance().width * 0.56, DataStore.getInstance().width * 0.8,
            DataStore.getInstance().width * 0.25,
            DataStore.getInstance().width * 0.25 / 1.07
        )

        //头像
        ctx.save() //保存上下文
        ctx.beginPath()//开始绘制
        ctx.arc(DataStore.getInstance().width * 0.06 + DataStore.getInstance().width * 0.15,
            DataStore.getInstance().width * 0.06 + DataStore.getInstance().width * 0.83,
            DataStore.getInstance().width * 0.06, 0, 2 * Math.PI, false)//画一个圆
        ctx.clip()//裁剪这个圆
        ctx.drawImage(image, DataStore.getInstance().width * 0.15, DataStore.getInstance().width * 0.83, DataStore.getInstance().width * 0.12, DataStore.getInstance().width * 0.12)//将图片绘制进圆
        ctx.restore()
        //用户名字
        ctx.fillStyle = "#fff"
        ctx.font = "35px Microsoft-YaHei"
        ctx.fillText(
            DataStore.getInstance().username,
            DataStore.getInstance().width * 0.29,
            DataStore.getInstance().width * 0.875,
            DataStore.getInstance().width * 0.35
        )
        //用户等级
        ctx.font = "30px Microsoft-YaHei";
        ctx.fillText(
            DataStore.getInstance().grade,
            DataStore.getInstance().width * 0.29,
            DataStore.getInstance().width * 0.93,
            DataStore.getInstance().width * 0.35
        )

        ctx.drawImage(this.button,
            0, 0,
            this.button.width,
            this.button.height,
            DataStore.getInstance().width * 0.15, DataStore.getInstance().width * 1.15,
            DataStore.getInstance().width * 0.7,
            DataStore.getInstance().width * 0.7 / 3.4
        )
    }
}