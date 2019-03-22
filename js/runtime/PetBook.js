import {Sprite} from "../base/Sprite";
import {DataStore} from "../base/DataStore";

export class PetBook extends Sprite {
    constructor() {
        const bg1 = Sprite.getImage('pet_book_bg1');
        super(bg1, //super是调用父类的构造方法
            0, 0,
            bg1.width, bg1.height,
            0, 0,
            DataStore.getInstance().width, DataStore.getInstance().height);
        this.bg2 = Sprite.getImage('pet_book_bg2');
        this.word = Sprite.getImage('pet_book_word');
        this.used = Sprite.getImage('pet_book_used');
        this.unused = Sprite.getImage('pet_book_unused');
        this.buy = Sprite.getImage('pet_book_buy');
        this.unlock = Sprite.getImage('pet_book_unlock');
        this.lock = Sprite.getImage('pet_book_lock');
        this.money = Sprite.getImage('pet_book_money');
        this.land = Sprite.getImage('pet_book_land');
        this.shadow = Sprite.getImage('pet_book_shadow');
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

    }
}