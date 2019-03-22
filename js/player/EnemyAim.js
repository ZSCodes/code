import {
    Sprite
} from "../base/Sprite.js";
import {DataStore} from "../base/DataStore";


//敌方地盘
export class EnemyAim extends Sprite {
    constructor(X,Y) {
        const image = Sprite.getImage(DataStore.getInstance().EnemyAimImage);
        super(image,
            0, 0,
            image.width, image.height,
            DataStore.getInstance().width*X, DataStore.getInstance().width*Y,
            DataStore.getInstance().width*0.25, DataStore.getInstance().width*0.25);
    }

    draw() {
        super.draw(
            this.img,
            this.srcX, this.srcY,
            this.srcW, this.srcH,
            this.x, this.y,
            this.width, this.height);
    }
}