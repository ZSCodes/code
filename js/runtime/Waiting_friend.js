import {Sprite} from "../base/Sprite";
import {DataStore} from "../base/DataStore";

//邀请好友对战页面
export class Waiting_friend extends Sprite {
    constructor() {
        const bg1 = Sprite.getImage('waiting_friend_bg');
        super(bg1, //super是调用父类的构造方法
            0, 0,
            bg1.width, bg1.height,
            0, 0,
            DataStore.getInstance().width, DataStore.getInstance().height)
        this.bg2 = Sprite.getImage('waiting_friend_land');
        this.bg3 = Sprite.getImage('waiting_friend_botton1');
        this.bg4 = Sprite.getImage('waiting_friend_botton2');
        this.bg5 = Sprite.getImage('waiting_friend_shadow');
        this.bg6 = Sprite.getImage('waiting_friend_money');

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
            DataStore.getInstance().width * 0.17, DataStore.getInstance().width * 0.51,
            DataStore.getInstance().width * 0.7,
            DataStore.getInstance().width * 0.7 / 1.3
        )

        ctx.drawImage(this.bg5,
            0, 0,
            this.bg5.width,
            this.bg5.height,
            DataStore.getInstance().width * 0.4, DataStore.getInstance().width * 0.67,
            DataStore.getInstance().width * 0.28,
            DataStore.getInstance().width * 0.28 / 3.1
        )

        ctx.drawImage(this.bg3,
            0, 0,
            this.bg3.width,
            this.bg3.height,
            DataStore.getInstance().width * 0.2, DataStore.getInstance().width * 1.19,
            DataStore.getInstance().width * 0.64,
            DataStore.getInstance().width * 0.64 * 0.3
        )

        ctx.drawImage(this.bg4,
            0, 0,
            this.bg4.width,
            this.bg4.height,
            DataStore.getInstance().width * 0.2, DataStore.getInstance().width * 1.41,
            DataStore.getInstance().width * 0.64,
            DataStore.getInstance().width * 0.64 * 0.3
        )

        ctx.drawImage(this.bg6,
            0, 0,
            this.bg6.width,
            this.bg6.height,
            DataStore.getInstance().width * 0.6, DataStore.getInstance().width * 0.23,
            DataStore.getInstance().width * 0.36,
            DataStore.getInstance().width * 0.36 / 3.25
        )

        //宠物图像
        ctx.drawImage(this.pet1,
            0, 0,
            this.pet1.width,
            this.pet1.height,
            DataStore.getInstance().width * 0.355, DataStore.getInstance().width * 0.37,
            DataStore.getInstance().width * 0.38,
            DataStore.getInstance().width * 0.38 / 1.07
        )

        // 头像
        ctx.save() //保存上下文
        ctx.beginPath()//开始绘制
        ctx.arc(DataStore.getInstance().width * 0.075 + DataStore.getInstance().width * 0.057,
            DataStore.getInstance().width * 0.075 + DataStore.getInstance().width * 0.2,
            DataStore.getInstance().width * 0.075, 0, 2 * Math.PI, false)//画一个圆
        ctx.clip()//裁剪这个圆
        ctx.drawImage(image, DataStore.getInstance().width * 0.057, DataStore.getInstance().width * 0.2, DataStore.getInstance().width * 0.15, DataStore.getInstance().width * 0.15)//将图片绘制进圆
        ctx.restore()
        // 用户名字
        ctx.font = "21px Microsoft-YaHei"
        ctx.fillText(
            DataStore.getInstance().username,
            DataStore.getInstance().width * 0.228,
            DataStore.getInstance().width * 0.26,
            DataStore.getInstance().width * 0.35
        )
        // 用户等级
        ctx.font = "17px Microsoft-YaHei";
        ctx.fillText(
            DataStore.getInstance().grade,
            DataStore.getInstance().width * 0.228,
            DataStore.getInstance().width * 0.32,
            DataStore.getInstance().width * 0.35
        )
        // 文字 + 时间
        ctx.font = "17px Microsoft-YaHei";
        ctx.fillText(
            '等待好友加入中',
            DataStore.getInstance().width * 0.36,
            DataStore.getInstance().width * 1.07,
            DataStore.getInstance().width * 0.35
        )
        ctx.font = "38px Microsoft-YaHei";
        ctx.fillText(
            '1:45',
            DataStore.getInstance().width * 0.42,
            DataStore.getInstance().width * 1.17,
            DataStore.getInstance().width * 0.35
        )
        //用户金钱
        ctx.fillStyle = "#9e5609"
        ctx.font = "17px Microsoft-YaHei";
        ctx.fillText(
            DataStore.getInstance().money,
            DataStore.getInstance().width * 0.75,
            DataStore.getInstance().width * 0.305,
            DataStore.getInstance().width * 0.35
        )
    }
}