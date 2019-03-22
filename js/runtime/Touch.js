import {DataStore} from "../base/DataStore";

//按钮控制
export class Touch {
    constructor() {
        this.dataStore = DataStore.getInstance();
        wx.onTouchStart((res) => {
            // console.log(res.touches[0].clientX);
            // console.log(res.touches[0].clientY);
        })
        wx.onTouchEnd((res) => {
            this.clientX = res.changedTouches[0].clientX;  //手指触摸屏幕的X轴坐标
            this.clientY = res.changedTouches[0].clientY;  //手指触摸屏幕的Y轴坐标
            this.touch();
        })
        wx.onTouchCancel((res) => {
            console.log(res);
        })
    }

    //触摸屏幕触发的事件
    touch() {
        if (this.dataStore.game_state == 'start') {
            // console.log('start')
            if (this.clientX >= DataStore.getInstance().width * 0.25 && this.clientX <= DataStore.getInstance().width * 0.75 && this.clientY >= DataStore.getInstance().height * 0.4 && this.clientY <= (DataStore.getInstance().height * 0.4 + DataStore.getInstance().width * 0.3)) {
                this.dataStore.waitting = true;
            }
        } else if (this.dataStore.game_state == 'play') {
            //点击出手按钮
            if (this.clientX >= DataStore.getInstance().width * 0.78 && this.clientX <= DataStore.getInstance().width * 0.96 && this.clientY >= DataStore.getInstance().height * 0.78 && this.clientY <= (DataStore.getInstance().height * 0.78 + DataStore.getInstance().width * 0.18)) {
                if (this.dataStore.touch_state === true) {
                    if (this.dataStore.aim_X < DataStore.getInstance().width * 0.2 && this.dataStore.aim_Y == DataStore.getInstance().width * 0.45) {
                        // console.log('命中1号格')
                        this.dataStore.touch_state = false;
                        if (this.dataStore.OurAim.findIndex((value)=>{return value == 1}) == -1) {
                            this.dataStore.OurAim.push(1);
                            this.dataStore.throw_x = DataStore.getInstance().width * 0.08;
                            this.dataStore.throw_y = DataStore.getInstance().width * 0.45;
                            this.dataStore.throw_state = true;
                            this.dataStore.hit_x = 0.08;
                            this.dataStore.hit_y = 0.45;
                            this.dataStore.time_state = false;
                            this.dataStore.shade_state = false;
                        } else {
                            this.dataStore.aim_speed = 3;
                            this.dataStore.aim_X = DataStore.getInstance().width * 0.08;
                            this.dataStore.aim_Y = DataStore.getInstance().width * 0.45;
                            DataStore.getInstance().touch_state = true;
                            DataStore.getInstance().time_count = 0;
                            this.dataStore.shade_state = false;
                        }
                    } else if (this.dataStore.aim_X > DataStore.getInstance().width * 0.26 && this.dataStore.aim_X < DataStore.getInstance().width * 0.5 && this.dataStore.aim_Y == DataStore.getInstance().width * 0.45) {
                        // console.log('命中2号格')
                        this.dataStore.touch_state = false;
                        if (this.dataStore.OurAim.findIndex((value)=>{return value == 2}) == -1) {
                            this.dataStore.OurAim.push(2);
                            this.dataStore.throw_x = DataStore.getInstance().width * 0.38;
                            this.dataStore.throw_y = DataStore.getInstance().width * 0.45;
                            this.dataStore.throw_state = true;
                            this.dataStore.hit_x = 0.38;
                            this.dataStore.hit_y = 0.45;
                            this.dataStore.time_state = false;
                            this.dataStore.shade_state = false;
                        } else {
                            this.dataStore.aim_speed = 3;
                            this.dataStore.aim_X = DataStore.getInstance().width * 0.08;
                            this.dataStore.aim_Y = DataStore.getInstance().width * 0.45;
                            this.dataStore.touch_state = true;
                            DataStore.getInstance().time_count = 0;
                            this.dataStore.shade_state = false;
                        }
                    } else if (this.dataStore.aim_X > DataStore.getInstance().width * 0.56 && this.dataStore.aim_Y < DataStore.getInstance().width * 0.56) {
                        // console.log('命中3号格')
                        this.dataStore.touch_state = false;
                        if (this.dataStore.OurAim.findIndex((value)=>{return value == 3}) == -1) {
                            this.dataStore.OurAim.push(3);
                            this.dataStore.throw_x = DataStore.getInstance().width * 0.68;
                            this.dataStore.throw_y = DataStore.getInstance().width * 0.45;
                            this.dataStore.throw_state = true;
                            this.dataStore.hit_x = 0.68;
                            this.dataStore.hit_y = 0.45;
                            this.dataStore.time_state = false;
                            this.dataStore.shade_state = false;
                        } else {
                            this.dataStore.aim_speed = 3;
                            this.dataStore.aim_X = DataStore.getInstance().width * 0.08;
                            this.dataStore.aim_Y = DataStore.getInstance().width * 0.45;
                            this.dataStore.touch_state = true;
                            DataStore.getInstance().time_count = 0;
                            this.dataStore.shade_state = false;
                        }
                    } else if (this.dataStore.aim_X > DataStore.getInstance().width * 0.56 && this.dataStore.aim_Y > DataStore.getInstance().width * 0.63 && this.dataStore.aim_Y < DataStore.getInstance().width * 0.85) {
                        // console.log('命中6号格')
                        this.dataStore.touch_state = false;
                        if (this.dataStore.OurAim.findIndex((value)=>{return value == 6}) == -1) {
                            this.dataStore.OurAim.push(6);
                            this.dataStore.throw_x = DataStore.getInstance().width * 0.68;
                            this.dataStore.throw_y = DataStore.getInstance().width * 0.74;
                            this.dataStore.throw_state = true;
                            this.dataStore.hit_x = 0.68;
                            this.dataStore.hit_y = 0.74;
                            this.dataStore.time_state = false;
                            this.dataStore.shade_state = false;
                        } else {
                            this.dataStore.aim_speed = 3;
                            this.dataStore.aim_X = DataStore.getInstance().width * 0.08;
                            this.dataStore.aim_Y = DataStore.getInstance().width * 0.45;
                            this.dataStore.touch_state = true;
                            DataStore.getInstance().time_count = 0;
                            this.dataStore.shade_state = false;
                        }
                    } else if (this.dataStore.aim_X < DataStore.getInstance().width * 0.5 && this.dataStore.aim_X > DataStore.getInstance().width * 0.26 && this.dataStore.aim_Y > DataStore.getInstance().width * 0.63 && this.dataStore.aim_Y < DataStore.getInstance().width * 0.85) {
                        // console.log('命中5号格')
                        this.dataStore.touch_state = false;
                        if (this.dataStore.OurAim.findIndex((value)=>{return value == 5}) == -1) {
                            this.dataStore.OurAim.push(5);
                            this.dataStore.throw_x = DataStore.getInstance().width * 0.38;
                            this.dataStore.throw_y = DataStore.getInstance().width * 0.74;
                            this.dataStore.throw_state = true;
                            this.dataStore.hit_x = 0.38;
                            this.dataStore.hit_y = 0.74;
                            this.dataStore.time_state = false;
                            this.dataStore.shade_state = false;
                        } else {
                            this.dataStore.aim_speed = 3;
                            this.dataStore.aim_X = DataStore.getInstance().width * 0.08;
                            this.dataStore.aim_Y = DataStore.getInstance().width * 0.45;
                            this.dataStore.touch_state = true;
                            DataStore.getInstance().time_count = 0;
                            this.dataStore.shade_state = false;
                        }
                    } else if (this.dataStore.aim_X < DataStore.getInstance().width * 0.2 && this.dataStore.aim_Y > DataStore.getInstance().width * 0.63 && this.dataStore.aim_Y < DataStore.getInstance().width * 0.85) {
                        // console.log('命中4号格')
                        this.dataStore.touch_state = false;
                        if (this.dataStore.OurAim.findIndex((value)=>{return value == 4}) == -1) {
                            this.dataStore.OurAim.push(4);
                            this.dataStore.throw_x = DataStore.getInstance().width * 0.08;
                            this.dataStore.throw_y = DataStore.getInstance().width * 0.74;
                            this.dataStore.throw_state = true;
                            this.dataStore.hit_x = 0.08;
                            this.dataStore.hit_y = 0.74;
                            this.dataStore.time_state = false;
                            this.dataStore.shade_state = false;
                        } else {
                            this.dataStore.aim_speed = 3;
                            this.dataStore.aim_X = DataStore.getInstance().width * 0.08;
                            this.dataStore.aim_Y = DataStore.getInstance().width * 0.45;
                            this.dataStore.touch_state = true;
                            DataStore.getInstance().time_count = 0;
                            this.dataStore.shade_state = false;
                        }
                    } else if (this.dataStore.aim_X < DataStore.getInstance().width * 0.2 && this.dataStore.aim_Y > DataStore.getInstance().width * 0.92) {
                        // console.log('命中7号格')
                        this.dataStore.touch_state = false;
                        if (this.dataStore.OurAim.findIndex((value)=>{return value == 7}) == -1) {
                            this.dataStore.OurAim.push(7);
                            this.dataStore.throw_x = DataStore.getInstance().width * 0.08;
                            this.dataStore.throw_y = DataStore.getInstance().width * 1.03;
                            this.dataStore.throw_state = true;
                            this.dataStore.hit_x = 0.08;
                            this.dataStore.hit_y = 1.03;
                            this.dataStore.time_state = false;
                            this.dataStore.shade_state = false;
                        } else {
                            this.dataStore.aim_speed = 3;
                            this.dataStore.aim_X = DataStore.getInstance().width * 0.08;
                            this.dataStore.aim_Y = DataStore.getInstance().width * 0.45;
                            this.dataStore.touch_state = true;
                            DataStore.getInstance().time_count = 0;
                            this.dataStore.shade_state = false;
                        }
                    } else if (this.dataStore.aim_X > DataStore.getInstance().width * 0.26 && this.dataStore.aim_X < DataStore.getInstance().width * 0.5 && this.dataStore.aim_Y > DataStore.getInstance().width * 0.92) {
                        // console.log('命中8号格')
                        this.dataStore.touch_state = false;
                        if (this.dataStore.OurAim.findIndex((value)=>{return value == 8}) == -1) {
                            this.dataStore.OurAim.push(8);
                            this.dataStore.throw_x = DataStore.getInstance().width * 0.38;
                            this.dataStore.throw_y = DataStore.getInstance().width * 1.03;
                            this.dataStore.throw_state = true;
                            this.dataStore.hit_x = 0.38;
                            this.dataStore.hit_y = 1.03;
                            this.dataStore.time_state = false;
                            this.dataStore.shade_state = false;
                        } else {
                            this.dataStore.aim_speed = 3;
                            this.dataStore.aim_X = DataStore.getInstance().width * 0.08;
                            this.dataStore.aim_Y = DataStore.getInstance().width * 0.45;
                            this.dataStore.touch_state = true;
                            DataStore.getInstance().time_count = 0;
                            this.dataStore.shade_state = false;
                        }
                    } else if (this.dataStore.aim_X > DataStore.getInstance().width * 0.56 && this.dataStore.aim_Y > DataStore.getInstance().width * 0.92) {
                        // console.log('命中9号格')
                        this.dataStore.touch_state = false;
                        if (this.dataStore.OurAim.findIndex((value)=>{return value == 9}) == -1) {
                            this.dataStore.OurAim.push(9);
                            this.dataStore.throw_x = DataStore.getInstance().width * 0.68;
                            this.dataStore.throw_y = DataStore.getInstance().width * 1.03;
                            this.dataStore.throw_state = true;
                            this.dataStore.hit_x = 0.68;
                            this.dataStore.hit_y = 1.03;
                            this.dataStore.time_state = false;
                            this.dataStore.shade_state = false;
                        } else {
                            this.dataStore.aim_speed = 3;
                            this.dataStore.aim_X = DataStore.getInstance().width * 0.08;
                            this.dataStore.aim_Y = DataStore.getInstance().width * 0.45;
                            this.dataStore.touch_state = true;
                            DataStore.getInstance().time_count = 0;
                            this.dataStore.shade_state = false;
                        }
                    } else {
                        this.dataStore.touch_state = false;
                        this.dataStore.miss_state = true;
                        this.dataStore.time_state = false;
                        this.dataStore.shade_state = false;
                    }
                }
            }
            //加速道具
            else if (this.clientX >= DataStore.getInstance().width * 0.61 && this.clientX <= DataStore.getInstance().width * 0.74 && this.clientY >= DataStore.getInstance().height * 0.91 && this.clientY <= (DataStore.getInstance().height * 0.91 + DataStore.getInstance().width * 0.13)) {
                // this.dataStore.aim_speed = 10;
                this.dataStore.touch_state = false;
                if (this.dataStore.EnemyAim.findIndex((value)=>{return value == 1}) == -1) {
                    this.dataStore.EnemyAim.push(1);
                    this.dataStore.throw_x = DataStore.getInstance().width * 0.08;
                    this.dataStore.throw_y = DataStore.getInstance().width * 0.45;
                    this.dataStore.throw_state = 'enemy';
                    this.dataStore.hit_x = 0.08;
                    this.dataStore.hit_y = 0.45;
                    this.dataStore.time_state = false;
                    this.dataStore.shade_state = false;
                } else {
                    this.dataStore.aim_speed = 3;
                    this.dataStore.aim_X = DataStore.getInstance().width * 0.08;
                    this.dataStore.aim_Y = DataStore.getInstance().width * 0.45;
                    DataStore.getInstance().touch_state = true;
                    DataStore.getInstance().time_count = 0;
                    this.dataStore.shade_state = false;
                }
            }
            //遮罩道具
            else if (this.clientX >= DataStore.getInstance().width * 0.78 && this.clientX <= DataStore.getInstance().width * 0.91 && this.clientY >= DataStore.getInstance().height * 0.91 && this.clientY <= (DataStore.getInstance().height * 0.91 + DataStore.getInstance().width * 0.13)) {
                // this.dataStore.shade_state = true;
                wx.sendSocketMessage({
                    data: "nihao"
                })
            }
        }
    }
}