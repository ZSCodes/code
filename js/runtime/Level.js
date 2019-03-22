import {Sprite} from "../base/Sprite";
import {DataStore} from "../base/DataStore";

export class Level extends Sprite {
    constructor() {
        const bg = Sprite.getImage('level_bg');
        super(bg, //super是调用父类的构造方法
            0, 0,
            bg.width, bg.height,
            0, 0,
            DataStore.getInstance().width, DataStore.getInstance().height);
        this.level1 = Sprite.getImage('level_level1');
        this.level2 = Sprite.getImage('level_level2');
        this.level3 = Sprite.getImage('level_level3');
        this.level4 = Sprite.getImage('level_level4');
        this.star1 = Sprite.getImage('level_star1');
        this.star2 = Sprite.getImage('level_star2');
    }

    draw() {
        const ctx = DataStore.getInstance().ctx;

        super.draw(this.img,
            this.srcX,
            this.srcY,
            this.srcW,
            this.srcH,
            this.x,
            this.y,
            this.width,
            this.height);
        //level
        ctx.drawImage(
            this.level1,
            0,
            0,
            this.level1.width,
            this.level1.height,
            DataStore.getInstance().width * 0.097,
            DataStore.getInstance().width * 0.55,
            DataStore.getInstance().width * 0.8,
            DataStore.getInstance().width * 0.8 / 3.045
        );

        ctx.drawImage(
            this.level2,
            0,
            0,
            this.level2.width,
            this.level2.height,
            DataStore.getInstance().width * 0.097,
            DataStore.getInstance().width * 0.85,
            DataStore.getInstance().width * 0.8,
            DataStore.getInstance().width * 0.8 / 3.045
        );

        ctx.drawImage(
            this.level3,
            0,
            0,
            this.level3.width,
            this.level3.height,
            DataStore.getInstance().width * 0.097,
            DataStore.getInstance().width * 1.15,
            DataStore.getInstance().width * 0.8,
            DataStore.getInstance().width * 0.8 / 3.045
        );

        ctx.drawImage(
            this.level4,
            0,
            0,
            this.level4.width,
            this.level4.height,
            DataStore.getInstance().width * 0.097,
            DataStore.getInstance().width * 1.45,
            DataStore.getInstance().width * 0.8,
            DataStore.getInstance().width * 0.8 / 3.045
        );
        //星星
        ctx.drawImage(
            this.star2,
            0,
            0,
            this.star2.width,
            this.star2.height,
            DataStore.getInstance().width * 0.6,
            DataStore.getInstance().width * 0.695,
            DataStore.getInstance().width * 0.08,
            DataStore.getInstance().width * 0.08
        );
        ctx.drawImage(
            this.star2,
            0,
            0,
            this.star2.width,
            this.star2.height,
            DataStore.getInstance().width * 0.69,
            DataStore.getInstance().width * 0.695,
            DataStore.getInstance().width * 0.08,
            DataStore.getInstance().width * 0.08
        );
        ctx.drawImage(
            this.star2,
            0,
            0,
            this.star2.width,
            this.star2.height,
            DataStore.getInstance().width * 0.78,
            DataStore.getInstance().width * 0.695,
            DataStore.getInstance().width * 0.08,
            DataStore.getInstance().width * 0.08
        );
        ctx.drawImage(
            this.star2,
            0,
            0,
            this.star2.width,
            this.star2.height,
            DataStore.getInstance().width * 0.6,
            DataStore.getInstance().width * 0.995,
            DataStore.getInstance().width * 0.08,
            DataStore.getInstance().width * 0.08
        );
        ctx.drawImage(
            this.star2,
            0,
            0,
            this.star2.width,
            this.star2.height,
            DataStore.getInstance().width * 0.69,
            DataStore.getInstance().width * 0.995,
            DataStore.getInstance().width * 0.08,
            DataStore.getInstance().width * 0.08
        );
        ctx.drawImage(
            this.star2,
            0,
            0,
            this.star2.width,
            this.star2.height,
            DataStore.getInstance().width * 0.78,
            DataStore.getInstance().width * 0.995,
            DataStore.getInstance().width * 0.08,
            DataStore.getInstance().width * 0.08
        );
        ctx.drawImage(
            this.star2,
            0,
            0,
            this.star2.width,
            this.star2.height,
            DataStore.getInstance().width * 0.6,
            DataStore.getInstance().width * 1.295,
            DataStore.getInstance().width * 0.08,
            DataStore.getInstance().width * 0.08
        );
        ctx.drawImage(
            this.star2,
            0,
            0,
            this.star2.width,
            this.star2.height,
            DataStore.getInstance().width * 0.69,
            DataStore.getInstance().width * 1.295,
            DataStore.getInstance().width * 0.08,
            DataStore.getInstance().width * 0.08
        );
        ctx.drawImage(
            this.star2,
            0,
            0,
            this.star2.width,
            this.star2.height,
            DataStore.getInstance().width * 0.78,
            DataStore.getInstance().width * 1.295,
            DataStore.getInstance().width * 0.08,
            DataStore.getInstance().width * 0.08
        );
        ctx.drawImage(
            this.star2,
            0,
            0,
            this.star2.width,
            this.star2.height,
            DataStore.getInstance().width * 0.6,
            DataStore.getInstance().width * 1.595,
            DataStore.getInstance().width * 0.08,
            DataStore.getInstance().width * 0.08
        );
        ctx.drawImage(
            this.star2,
            0,
            0,
            this.star2.width,
            this.star2.height,
            DataStore.getInstance().width * 0.69,
            DataStore.getInstance().width * 1.595,
            DataStore.getInstance().width * 0.08,
            DataStore.getInstance().width * 0.08
        );
        ctx.drawImage(
            this.star2,
            0,
            0,
            this.star2.width,
            this.star2.height,
            DataStore.getInstance().width * 0.78,
            DataStore.getInstance().width * 1.595,
            DataStore.getInstance().width * 0.08,
            DataStore.getInstance().width * 0.08
        );
        //1星星
        if(DataStore.getInstance().grade_ >= 'a') {
            if(DataStore.getInstance().grade_ > 'a' || DataStore.getInstance().star >= '1') {
                ctx.drawImage(
                    this.star1,
                    0,
                    0,
                    this.star1.width,
                    this.star1.height,
                    DataStore.getInstance().width * 0.6,
                    DataStore.getInstance().width * 0.695,
                    DataStore.getInstance().width * 0.08,
                    DataStore.getInstance().width * 0.08
                );
            }
            if(DataStore.getInstance().grade_ > 'a' || DataStore.getInstance().star >= 2) {
                ctx.drawImage(
                    this.star1,
                    0,
                    0,
                    this.star1.width,
                    this.star1.height,
                    DataStore.getInstance().width * 0.69,
                    DataStore.getInstance().width * 0.695,
                    DataStore.getInstance().width * 0.08,
                    DataStore.getInstance().width * 0.08
                );
            }
            if(DataStore.getInstance().grade_ > 'a' || DataStore.getInstance().star >= 3) {
                ctx.drawImage(
                    this.star1,
                    0,
                    0,
                    this.star1.width,
                    this.star1.height,
                    DataStore.getInstance().width * 0.78,
                    DataStore.getInstance().width * 0.695,
                    DataStore.getInstance().width * 0.08,
                    DataStore.getInstance().width * 0.08
                );
            }
        }
        //2星星
        if(DataStore.getInstance().grade_ >= 'b') {
            if(DataStore.getInstance().grade_ > 'b' || DataStore.getInstance().star >= '1') {
                ctx.drawImage(
                    this.star1,
                    0,
                    0,
                    this.star1.width,
                    this.star1.height,
                    DataStore.getInstance().width * 0.6,
                    DataStore.getInstance().width * 0.995,
                    DataStore.getInstance().width * 0.08,
                    DataStore.getInstance().width * 0.08
                );
            }
            if(DataStore.getInstance().grade_ > 'b' || DataStore.getInstance().star >= 2) {
                ctx.drawImage(
                    this.star1,
                    0,
                    0,
                    this.star1.width,
                    this.star1.height,
                    DataStore.getInstance().width * 0.69,
                    DataStore.getInstance().width * 0.995,
                    DataStore.getInstance().width * 0.08,
                    DataStore.getInstance().width * 0.08
                );
            }
            if(DataStore.getInstance().grade_ > 'b' || DataStore.getInstance().star >= 3) {
                ctx.drawImage(
                    this.star1,
                    0,
                    0,
                    this.star1.width,
                    this.star1.height,
                    DataStore.getInstance().width * 0.78,
                    DataStore.getInstance().width * 0.995,
                    DataStore.getInstance().width * 0.08,
                    DataStore.getInstance().width * 0.08
                );
            }
        }
        //3星星
        if(DataStore.getInstance().grade_ >= 'c') {
            if(DataStore.getInstance().grade_ > 'c' || DataStore.getInstance().star >= '1') {
                ctx.drawImage(
                    this.star1,
                    0,
                    0,
                    this.star1.width,
                    this.star1.height,
                    DataStore.getInstance().width * 0.6,
                    DataStore.getInstance().width * 1.295,
                    DataStore.getInstance().width * 0.08,
                    DataStore.getInstance().width * 0.08
                );
            }
            if(DataStore.getInstance().grade_ > 'c' || DataStore.getInstance().star >= 2) {
                ctx.drawImage(
                    this.star1,
                    0,
                    0,
                    this.star1.width,
                    this.star1.height,
                    DataStore.getInstance().width * 0.69,
                    DataStore.getInstance().width * 1.295,
                    DataStore.getInstance().width * 0.08,
                    DataStore.getInstance().width * 0.08
                );
            }
            if(DataStore.getInstance().grade_ > 'c' || DataStore.getInstance().star >= 3) {
                ctx.drawImage(
                    this.star1,
                    0,
                    0,
                    this.star1.width,
                    this.star1.height,
                    DataStore.getInstance().width * 0.78,
                    DataStore.getInstance().width * 1.295,
                    DataStore.getInstance().width * 0.08,
                    DataStore.getInstance().width * 0.08
                );
            }
        }
        //4星星
        if(DataStore.getInstance().grade_ >= 'd') {
            if(DataStore.getInstance().grade_ > 'd' || DataStore.getInstance().star >= '1') {
                ctx.drawImage(
                    this.star1,
                    0,
                    0,
                    this.star1.width,
                    this.star1.height,
                    DataStore.getInstance().width * 0.6,
                    DataStore.getInstance().width * 1.595,
                    DataStore.getInstance().width * 0.08,
                    DataStore.getInstance().width * 0.08
                );
            }
            if(DataStore.getInstance().grade_ > 'd' || DataStore.getInstance().star >= 2) {
                ctx.drawImage(
                    this.star1,
                    0,
                    0,
                    this.star1.width,
                    this.star1.height,
                    DataStore.getInstance().width * 0.69,
                    DataStore.getInstance().width * 1.595,
                    DataStore.getInstance().width * 0.08,
                    DataStore.getInstance().width * 0.08
                );
            }
            if(DataStore.getInstance().grade_ > 'd' || DataStore.getInstance().star >= 3) {
                ctx.drawImage(
                    this.star1,
                    0,
                    0,
                    this.star1.width,
                    this.star1.height,
                    DataStore.getInstance().width * 0.78,
                    DataStore.getInstance().width * 1.595,
                    DataStore.getInstance().width * 0.08,
                    DataStore.getInstance().width * 0.08
                );
            }
        }
    }
}