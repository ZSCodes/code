import {Sprite} from "../base/Sprite";
import {DataStore} from "../base/DataStore";

export class Waiting_leave extends Sprite {
    constructor() {
        const bg = Sprite.getImage('waiting_leave_bg');
        super(bg, //super是调用父类的构造方法
            0, 0,
            bg.width, bg.height,
            0,
            0,
            DataStore.getInstance().width,
            DataStore.getInstance().height);
        this.cloud = Sprite.getImage('waiting_leave_cloud');
        this.foot = Sprite.getImage('waiting_leave_foot');
        this.door1 = Sprite.getImage('waiting_leave_door1');
        this.door2 = Sprite.getImage('waiting_leave_door2');
        this.money = Sprite.getImage('waiting_leave_money');
        this.button1 = Sprite.getImage('waiting_leave_button1');
        this.button2 = Sprite.getImage('waiting_leave_button2');
        this.word = Sprite.getImage('waiting_leave_word');
    }

    draw() {
        const ctx = DataStore.getInstance().ctx;
        const image = wx.createImage();

        image.src = DataStore.getInstance().userimg;

        super.draw(this.img,
            this.srcX,
            this.srcY,
            this.srcW,
            this.srcH,
            this.x,
            this.y,
            this.width,
            this.height)

        ctx.drawImage(this.cloud,
            0, 0,
            this.cloud.width,
            this.cloud.height,
            0, 0,
            DataStore.getInstance().width,
            DataStore.getInstance().height
        )

        ctx.drawImage(this.door2,
            0, 0,
            this.door2.width,
            this.door2.height,
            DataStore.getInstance().width * 0.53, DataStore.getInstance().width * 0.44,
            DataStore.getInstance().width * 0.25,
            DataStore.getInstance().width * 0.25 / 0.615
        )

        ctx.drawImage(this.door1,
            0, 0,
            this.door1.width,
            this.door1.height,
            DataStore.getInstance().width * 0.73, DataStore.getInstance().width * 0.4,
            DataStore.getInstance().width * 0.18,
            DataStore.getInstance().width * 0.18 / 0.36
        )

        ctx.drawImage(this.word,
            0, 0,
            this.word.width,
            this.word.height,
            DataStore.getInstance().width * 0.25, DataStore.getInstance().width * 0.94,
            DataStore.getInstance().width * 0.5,
            DataStore.getInstance().width * 0.5 / 2.79
        )

        ctx.drawImage(this.foot,
            0, 0,
            this.foot.width,
            this.foot.height,
            DataStore.getInstance().width * 0.35, DataStore.getInstance().width * 0.68,
            DataStore.getInstance().width * 0.3,
            DataStore.getInstance().width * 0.3 / 1.34
        )

        ctx.drawImage(this.money,
            0, 0,
            this.money.width,
            this.money.height,
            DataStore.getInstance().width * 0.6, DataStore.getInstance().width * 0.23,
            DataStore.getInstance().width * 0.36,
            DataStore.getInstance().width * 0.36 / 3.25
        )

        ctx.drawImage(this.button1,
            0, 0,
            this.button1.width,
            this.button1.height,
            DataStore.getInstance().width * 0.2, DataStore.getInstance().width * 1.15,
            DataStore.getInstance().width * 0.64,
            DataStore.getInstance().width * 0.64 / 3.26
        )

        ctx.drawImage(this.button2,
            0, 0,
            this.button2.width,
            this.button2.height,
            DataStore.getInstance().width * 0.2, DataStore.getInstance().width * 1.37,
            DataStore.getInstance().width * 0.64,
            DataStore.getInstance().width * 0.64 / 3.35
        )

        //头像
        ctx.save() //保存上下文
        ctx.beginPath()//开始绘制
        ctx.arc(DataStore.getInstance().width * 0.075 + DataStore.getInstance().width * 0.057,
            DataStore.getInstance().width * 0.075 + DataStore.getInstance().width * 0.2,
            DataStore.getInstance().width * 0.075, 0, 2 * Math.PI, false)//画一个圆
        ctx.clip()//裁剪这个圆
        ctx.drawImage(image, DataStore.getInstance().width * 0.057, DataStore.getInstance().width * 0.2, DataStore.getInstance().width * 0.15, DataStore.getInstance().width * 0.15)//将图片绘制进圆
        ctx.restore()
        //用户名字
        ctx.font = "40px Microsoft-YaHei"
        ctx.fillText(
            DataStore.getInstance().username,
            DataStore.getInstance().width * 0.228,
            DataStore.getInstance().width * 0.26,
            DataStore.getInstance().width * 0.35
        )
        //用户等级
        ctx.font = "35px Microsoft-YaHei";
        ctx.fillText(
            DataStore.getInstance().grade,
            DataStore.getInstance().width * 0.228,
            DataStore.getInstance().width * 0.32,
            DataStore.getInstance().width * 0.35
        )
        //用户金钱
        ctx.fillStyle = "#9e5609"
        ctx.font = "35px Microsoft-YaHei";
        ctx.fillText(
            DataStore.getInstance().money,
            DataStore.getInstance().width * 0.75,
            DataStore.getInstance().width * 0.305,
            DataStore.getInstance().width * 0.35
        )
    }
}