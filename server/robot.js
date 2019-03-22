import {DataStore} from "../js/base/DataStore";
import {robot_server} from "./robot_server";

export class robot {
    constructor(data) {
        clearTimeout(DataStore.getInstance().robot_timer);
        DataStore.getInstance().fs_state = data.fs_state;
        DataStore.getInstance().robot = true;
        DataStore.getInstance().robot_round = 1;
        if (data.fs_state == 'attack') {
            DataStore.getInstance().user_round = 'our';
        } else {
            DataStore.getInstance().user_round = 'enemy';
        }
        wx.request({
            url: 'http://127.0.0.1:4000/get-act',
            data: {
                grade: DataStore.getInstance().grade,
            },
            success(res) {
                DataStore.getInstance().robot_data.one = JSON.parse(res.data.one.actions);
                DataStore.getInstance().othername = res.data.one.name;
                DataStore.getInstance().otherimg = res.data.one.img_url;
                DataStore.getInstance().otherpet = res.data.one.pet;
                DataStore.getInstance().othergrade = res.data.one.grade;
                DataStore.getInstance().time_num = 10;

                wx.closeSocket();
                DataStore.getInstance().roomID == '';
                DataStore.getInstance().round_num == '';

                DataStore.getInstance().robot_time = 10;
                DataStore.getInstance().game_state = 'play_ready';
                setTimeout(function () {
                    DataStore.getInstance().game_state = 'play';
                    DataStore.getInstance().aim_speed = 6;
                    DataStore.getInstance().aim_X = DataStore.getInstance().width * 0.08;
                    DataStore.getInstance().aim_Y = DataStore.getInstance().width * 0.5;
                    DataStore.getInstance().speak = true;
                    if (DataStore.getInstance().ready_timer) {
                        clearTimeout(DataStore.getInstance().ready_timer);
                    }
                    DataStore.getInstance().ready_timer = setTimeout(function () {
                        DataStore.getInstance().speak = false;
                        DataStore.getInstance().robot_timer = setInterval(() => {
                            DataStore.getInstance().robot_time = DataStore.getInstance().robot_time - 1;
                            DataStore.getInstance().time_num = DataStore.getInstance().robot_time;
                            if (DataStore.getInstance().robot_time == 9) {
                                DataStore.getInstance().aim_state = true;
                                DataStore.getInstance().time_state = true;
                                DataStore.getInstance().touch_state = true;
                                if (DataStore.getInstance().robot_enemy) {
                                    clearTimeout(DataStore.getInstance().robot_enemy)
                                }
                                robot_server.getInstance().enemy_action();
                            } else if (DataStore.getInstance().robot_time <= 1) {
                                if (DataStore.getInstance().robot_timer) {
                                    clearInterval(DataStore.getInstance().robot_timer);
                                }
                                setTimeout(() => {
                                    robot_server.getInstance().playing();
                                }, 1000)
                            }
                        }, 1000)
                    }, 2000)
                }, 5000)
            }
        })
    }
}