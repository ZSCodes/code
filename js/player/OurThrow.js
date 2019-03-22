import {Sprite} from "../base/Sprite";
import {DataStore} from "../base/DataStore";
import {Director} from "../Director";
import {Win} from "../base/Win";

//我方投掷过程
export class OurThrow extends Sprite {
    constructor() {
        const image = Sprite.getImage(DataStore.getInstance().OurAimImage)
        super(image, //super是调用父类的构造方法
            0, 0,
            image.width, image.height,
            0, 0,
            DataStore.getInstance().width, DataStore.getInstance().height)
        this.throw_x = DataStore.getInstance().width * 0.04;   //投掷过程的X轴坐标（起始位置）
        this.throw_y = DataStore.getInstance().height * 0.73;   //投掷过程的Y轴坐标（起始位置）
        this.throw_width = DataStore.getInstance().width * 0.13;   //投掷过程的宽度（起始宽度）
        this.throw_height = DataStore.getInstance().width * 0.13;   //投掷过程的高度（起始高度）
        this.wait_time = 0;
        this.wait_state = false;
    }

    draw() {
        //投掷过程
        if (DataStore.getInstance().throw_state == 'our') {
            let t;  //投掷的移动速度
            let img_v;  //投掷过程宽高变化的速度
            super.draw(
                this.img,
                0,
                0,
                this.srcW,
                this.srcH,
                this.throw_x,
                this.throw_y,
                this.throw_width,
                this.throw_height
            );
            if (DataStore.getInstance().throw_x >= DataStore.getInstance().throw_y) {
                t = (DataStore.getInstance().throw_x - this.throw_x) / 4;
            } else {
                t = (this.throw_y - DataStore.getInstance().throw_y) / 4;
            }
            img_v = (DataStore.getInstance().width * 0.25 - DataStore.getInstance().width * 0.13) / t;
            if (this.throw_width < DataStore.getInstance().width * 0.25) {
                this.throw_width = this.throw_width + img_v / 4.5;
            }
            if (this.throw_height < DataStore.getInstance().width * 0.25) {
                this.throw_height = this.throw_height + img_v / 4.5;
            }
            if (this.throw_x < DataStore.getInstance().throw_x) {
                this.throw_x = this.throw_x + ((DataStore.getInstance().throw_x - this.throw_x) / t);
            }
            if (this.throw_y > DataStore.getInstance().throw_y) {
                this.throw_y = this.throw_y - ((this.throw_y - DataStore.getInstance().throw_y) / t);
            }
            if (this.throw_x >= DataStore.getInstance().throw_x && this.throw_y <= DataStore.getInstance().throw_y) {
                DataStore.getInstance().throw_state = '';
                this.throw_x = DataStore.getInstance().width * 0.04;
                this.throw_y = DataStore.getInstance().height * 0.73;
                this.throw_width = DataStore.getInstance().width * 0.13;
                this.throw_height = DataStore.getInstance().width * 0.13;
                Director.getInstance().createOurAim(DataStore.getInstance().hit_x, DataStore.getInstance().hit_y);
                this.wait_state = true;
            }
        }
        if (this.wait_state === true) {
            if (this.wait_time >= 1) {
                this.wait_state = false;
                this.wait_time = 0;
                switch (new Win().checkOurWin()) {
                    case 1:
                        Director.getInstance().createLine(DataStore.getInstance().line.get(1)[0], DataStore.getInstance().line.get(1)[1], DataStore.getInstance().line.get(1)[2], DataStore.getInstance().line.get(1)[3], DataStore.getInstance().line.get(1)[4]);
                        DataStore.getInstance().game_result = 'our_win';
                        break;
                    case 2:
                        Director.getInstance().createLine(DataStore.getInstance().line.get(2)[0], DataStore.getInstance().line.get(2)[1], DataStore.getInstance().line.get(2)[2], DataStore.getInstance().line.get(2)[3], DataStore.getInstance().line.get(2)[4]);
                        DataStore.getInstance().game_result = 'our_win';
                        break;
                    case 3:
                        Director.getInstance().createLine(DataStore.getInstance().line.get(3)[0], DataStore.getInstance().line.get(3)[1], DataStore.getInstance().line.get(3)[2], DataStore.getInstance().line.get(3)[3], DataStore.getInstance().line.get(3)[4]);
                        DataStore.getInstance().game_result = 'our_win';
                        break;
                    case 4:
                        Director.getInstance().createLine(DataStore.getInstance().line.get(4)[0], DataStore.getInstance().line.get(4)[1], DataStore.getInstance().line.get(4)[2], DataStore.getInstance().line.get(4)[3], DataStore.getInstance().line.get(4)[4]);
                        DataStore.getInstance().game_result = 'our_win';
                        break;
                    case 5:
                        Director.getInstance().createLine(DataStore.getInstance().line.get(5)[0], DataStore.getInstance().line.get(5)[1], DataStore.getInstance().line.get(5)[2], DataStore.getInstance().line.get(5)[3], DataStore.getInstance().line.get(5)[4]);
                        DataStore.getInstance().game_result = 'our_win';
                        break;
                    case 6:
                        Director.getInstance().createLine(DataStore.getInstance().line.get(6)[0], DataStore.getInstance().line.get(6)[1], DataStore.getInstance().line.get(6)[2], DataStore.getInstance().line.get(6)[3], DataStore.getInstance().line.get(6)[4]);
                        DataStore.getInstance().game_result = 'our_win';
                        break;
                    case 7:
                        Director.getInstance().createLine(DataStore.getInstance().line.get(7)[0], DataStore.getInstance().line.get(7)[1], DataStore.getInstance().line.get(7)[2], DataStore.getInstance().line.get(7)[3], DataStore.getInstance().line.get(7)[4]);
                        DataStore.getInstance().game_result = 'our_win';
                        break;
                    case 8:
                        Director.getInstance().createLine(DataStore.getInstance().line.get(8)[0], DataStore.getInstance().line.get(8)[1], DataStore.getInstance().line.get(8)[2], DataStore.getInstance().line.get(8)[3], DataStore.getInstance().line.get(8)[4]);
                        DataStore.getInstance().game_result = 'our_win';
                        break;
                    case 'going':
                        if (DataStore.getInstance().OurAim.length + DataStore.getInstance().EnemyAim.length == 9) {
                            DataStore.getInstance().game_result = 'tie';
                        } else {
                            DataStore.getInstance().time_count = 0;
                            DataStore.getInstance().time_state = true;
                            DataStore.getInstance().touch_state = true;
                        }
                        break;
                }
            }
            else {
                this.wait_time = this.wait_time + 0.02;
            }
        }
    }
}