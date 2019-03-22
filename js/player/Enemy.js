import {
    Sprite
} from "../base/Sprite.js";
import {DataStore} from "../base/DataStore";


//敌方
export class Enemy extends Sprite {
    constructor() {
        const image = Sprite.getImage(DataStore.getInstance().EnemyPet);
        super(image,
            0, 0,
            image.width, image.height,
            DataStore.getInstance().width*0.72, DataStore.getInstance().height*0.07,
            DataStore.getInstance().width*0.28, DataStore.getInstance().width*0.28);
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