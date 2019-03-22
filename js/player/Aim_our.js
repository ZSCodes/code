import {Sprite} from "../base/Sprite.js";
import {DataStore} from "../base/DataStore.js";

//我方的瞄准器
export class Aim_our extends Sprite {
    constructor() {
        const image = Sprite.getImage(DataStore.getInstance().Aim_our_image);
        super(image,
            0, 0,
            image.width, image.height,
            DataStore.getInstance().width * 0.08, DataStore.getInstance().width * 0.45,
            DataStore.getInstance().width * 0.25, DataStore.getInstance().width * 0.25);
        this.dataStore = DataStore.getInstance();
        this.dataStore.aim_X = DataStore.getInstance().width * 0.08;  //瞄准器X轴坐标
        this.dataStore.aim_Y = DataStore.getInstance().width * 0.45;  //瞄准器Y轴坐标
        this.dataStore.aim_speed = 3;  //瞄准器的移动速度
    }

    draw() {
        if (DataStore.getInstance().round_ == 'our') {
            const speed = this.dataStore.aim_speed; //移动的加速度
            if (this.dataStore.aim_X >= DataStore.getInstance().width * 0.08 && this.dataStore.aim_X < DataStore.getInstance().width * 0.68 && this.dataStore.aim_Y == DataStore.getInstance().width * 0.45) {
                this.dataStore.aim_X = this.dataStore.aim_X + speed;
            } else if (this.dataStore.aim_X >= DataStore.getInstance().width * 0.68 && this.dataStore.aim_Y >= DataStore.getInstance().width * 0.45 && this.dataStore.aim_Y < DataStore.getInstance().width * 0.74) {
                this.dataStore.aim_Y = this.dataStore.aim_Y + speed;
            } else if (this.dataStore.aim_X > DataStore.getInstance().width * 0.08 && this.dataStore.aim_Y >= DataStore.getInstance().width * 0.74 && this.dataStore.aim_Y < DataStore.getInstance().width * 1.03) {
                this.dataStore.aim_X = this.dataStore.aim_X - speed;
            } else if (this.dataStore.aim_X <= DataStore.getInstance().width * 0.08 && this.dataStore.aim_Y >= DataStore.getInstance().width * 0.74 && this.dataStore.aim_Y < DataStore.getInstance().width * 1.03) {
                this.dataStore.aim_Y = this.dataStore.aim_Y + speed;
            } else if (this.dataStore.aim_X >= DataStore.getInstance().width * 0.08 && this.dataStore.aim_X < DataStore.getInstance().width * 0.68 && this.dataStore.aim_Y >= DataStore.getInstance().width * 1.03) {
                this.dataStore.aim_X = this.dataStore.aim_X + speed;
            } else if (this.dataStore.aim_X >= DataStore.getInstance().width * 0.68 && this.dataStore.aim_Y >= DataStore.getInstance().width * 1.03) {
                this.dataStore.aim_X = DataStore.getInstance().width * 0.08;
                this.dataStore.aim_Y = DataStore.getInstance().width * 0.45;
            } else {
                this.dataStore.aim_X = this.dataStore.aim_X + speed;
            }
            if (DataStore.getInstance().touch_state === true) {
                super.draw(
                    this.img,
                    this.srcX, this.srcY,
                    this.srcW, this.srcH,
                    this.dataStore.aim_X, this.dataStore.aim_Y,
                    this.width, this.height);
            } else {
                this.dataStore.aim_speed = 3;
                this.dataStore.aim_X = DataStore.getInstance().width * 0.08;
                this.dataStore.aim_Y = DataStore.getInstance().width * 0.45;

            }
        }
    }
}