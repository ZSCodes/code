import {
    Sprite
} from "../base/Sprite.js";
import {DataStore} from "../base/DataStore";


//我方
export class Our extends Sprite {
    constructor() {
        const image = Sprite.getImage(DataStore.getInstance().OurPet);
        super(image,
            0, 0,
            image.width, image.height,
            DataStore.getInstance().width*0.04, DataStore.getInstance().height*0.73,
            DataStore.getInstance().width*0.8, DataStore.getInstance().width*0.4);
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