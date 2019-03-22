import {Sprite} from "../base/Sprite";
import {DataStore} from "../base/DataStore";

export class Line extends Sprite {
    constructor(img, X, Y, width_, height_) {
        const image = Sprite.getImage(img);
        const faded = Sprite.getImage('faded');
        super(image,
            0, 0,
            image.width, image.height,
            DataStore.getInstance().width * X, DataStore.getInstance().width * Y,
            DataStore.getInstance().width * width_, DataStore.getInstance().width * height_);
        this.images = [image,faded,image,faded,image]
        this.count = 0;
    }

    draw() {
        const speed = 0.06;
        this.count = this.count + speed;
        super.draw(
            this.images[parseInt(this.count)],
            this.srcX, this.srcY,
            this.srcW, this.srcH,
            this.x, this.y,
            this.width, this.height);
        if(this.count >= 6){
            if(DataStore.getInstance().game_result == 'our_win'){
                DataStore.getInstance().win_background = 'our';
            }else if(DataStore.getInstance().game_result == 'enemy_win'){
                DataStore.getInstance().win_background = 'enemy';
            }else if(DataStore.getInstance().game_result == 'tie'){
                DataStore.getInstance().win_background = 'tie';
            }
            this.count = 0;
            DataStore.getInstance().get('line').shift();
        }
    }
}