import {DataStore} from "../js/base/DataStore";
import {Skill} from "../js/skill/Skill";

//重连后，对接数据
export class reconnect {
    constructor(data) {
        if (data.round_player == DataStore.getInstance().openid) {
            DataStore.getInstance().user_round = 'enemy';
        } else {
            DataStore.getInstance().user_round = 'our';
        }

        if (data.player.indexOf(DataStore.getInstance().openid) == 0) {
            DataStore.getInstance().OurAim = data.player1;
            DataStore.getInstance().EnemyAim = data.player2;
        } else {
            DataStore.getInstance().OurAim = data.player2;
            DataStore.getInstance().EnemyAim = data.player1;
        }

        DataStore.getInstance().round_num = data.round_;
        DataStore.getInstance().time_num = data.time;

        if (data.room_type == 'time') {
            if (DataStore.getInstance().offline) {
                clearTimeout(DataStore.getInstance().offline);
            }
            switch (data.time) {
                case 10:
                    if (DataStore.getInstance().offline) {
                        clearTimeout(DataStore.getInstance().offline);
                    }
                    Skill.getInstance().restart();
                    DataStore.getInstance().aim_state = false;
                    DataStore.getInstance().time_state = false;
                    DataStore.getInstance().touch_state = false;
                    DataStore.getInstance().round_num = data.round_;
                    DataStore.getInstance().time_num = data.time;
                    DataStore.getInstance().aim_speed = 6;
                    DataStore.getInstance().aim_X = DataStore.getInstance().width * 0.08;
                    DataStore.getInstance().aim_Y = DataStore.getInstance().width * 0.5;
                    // if (data.round_player == DataStore.getInstance().openid) {
                    //     DataStore.getInstance().user_round = 'our';
                    // } else {
                    //     DataStore.getInstance().user_round = 'enemy';
                    // }
                    if (DataStore.getInstance().ready_timer) {
                        if (DataStore.getInstance().ready_timer) {
                            clearTimeout(DataStore.getInstance().ready_timer);
                        }
                    }
                    wx.sendSocketMessage({
                        data: JSON.stringify({
                            type: 'play',
                            roomID: DataStore.getInstance().roomID,
                            round_player: 'reconnect',
                        }),
                    });
                    break;
                case 9:
                    DataStore.getInstance().aim_state = true;
                    DataStore.getInstance().time_state = true;
                    DataStore.getInstance().touch_state = true;
                    DataStore.getInstance().aim_X = DataStore.getInstance().width * 0.08;
                    DataStore.getInstance().aim_Y = DataStore.getInstance().width * 0.5;
                    break;
                case 8:
                    DataStore.getInstance().aim_X = DataStore.getInstance().width * 0.56;
                    DataStore.getInstance().aim_Y = DataStore.getInstance().width * 0.5;
                    break;
                case 7:
                    DataStore.getInstance().aim_X = DataStore.getInstance().width * 0.632;
                    DataStore.getInstance().aim_Y = DataStore.getInstance().width * 0.796;
                    break;
                case 6:
                    DataStore.getInstance().aim_X = DataStore.getInstance().width * 0.152;
                    DataStore.getInstance().aim_Y = DataStore.getInstance().width * 0.796;
                    break;
                case 5:
                    DataStore.getInstance().aim_X = DataStore.getInstance().width * 0.2;
                    DataStore.getInstance().aim_Y = DataStore.getInstance().width * 1.084;
                    break;
                case 4:
                    DataStore.getInstance().aim_X = DataStore.getInstance().width * 0.68;
                    DataStore.getInstance().aim_Y = DataStore.getInstance().width * 1.084;
                    break;
                case 3:
                    DataStore.getInstance().aim_X = DataStore.getInstance().width * 0.544;
                    DataStore.getInstance().aim_Y = DataStore.getInstance().width * 0.5;
                    break;
                case 2:
                    DataStore.getInstance().aim_X = DataStore.getInstance().width * 0.64;
                    DataStore.getInstance().aim_Y = DataStore.getInstance().width * 0.796;
                    break;
                case 1:
                    DataStore.getInstance().aim_state = false;
                    DataStore.getInstance().time_state = false;
                    DataStore.getInstance().touch_state = false;
                    DataStore.getInstance().aim_X = DataStore.getInstance().width * 0.16;
                    DataStore.getInstance().aim_Y = DataStore.getInstance().width * 0.796;
                    break;
            }
            // if (data.time == 9) {
            //     DataStore.getInstance().aim_state = true;
            //     DataStore.getInstance().time_state = true;
            //     DataStore.getInstance().touch_state = true;
            // }
        } else if (data.room_type == 'playing') {
            if (DataStore.getInstance().offline) {
                clearTimeout(DataStore.getInstance().offline);
            }
            Skill.getInstance().restart();
            DataStore.getInstance().aim_state = false;
            DataStore.getInstance().time_state = false;
            DataStore.getInstance().touch_state = false;
            DataStore.getInstance().round_num = data.round_;
            DataStore.getInstance().time_num = data.time;
            DataStore.getInstance().aim_speed = 6;
            DataStore.getInstance().aim_X = DataStore.getInstance().width * 0.08;
            DataStore.getInstance().aim_Y = DataStore.getInstance().width * 0.5;
            if (data.round_player == DataStore.getInstance().openid) {
                DataStore.getInstance().user_round = 'our';
            } else {
                DataStore.getInstance().user_round = 'enemy';
            }
            if (DataStore.getInstance().ready_timer) {
                if (DataStore.getInstance().ready_timer) {
                    clearTimeout(DataStore.getInstance().ready_timer);
                }
            }
            wx.sendSocketMessage({
                data: JSON.stringify({
                    type: 'play',
                    roomID: DataStore.getInstance().roomID,
                    round_player: DataStore.getInstance().user_round == 'our' ? DataStore.getInstance().other_player : DataStore.getInstance().openid,
                }),
            });
        } else if (data.room_type == 'play') {
            if (DataStore.getInstance().offline) {
                clearTimeout(DataStore.getInstance().offline);
            }
            wx.sendSocketMessage({
                data: JSON.stringify({
                    type: 'time',
                    roomID: DataStore.getInstance().roomID,
                    time_num: DataStore.getInstance().time_num,
                    round: DataStore.getInstance().round_num,
                    round_player: data.round_player,
                }),
                success() {
                    if (DataStore.getInstance().offline) {
                        clearTimeout(DataStore.getInstance().offline);
                    }
                    DataStore.getInstance().offline = setTimeout(() => {
                        wx.sendSocketMessage({
                            data: JSON.stringify({
                                type: 'offline',
                                roomID: DataStore.getInstance().roomID,
                                other_player: DataStore.getInstance().other_player,
                            }),
                        });
                    }, 6000)
                }
            });
        } else if (data.room_type == 'throw') {
            if (DataStore.getInstance().offline) {
                clearTimeout(DataStore.getInstance().offline);
            }
            DataStore.getInstance().aim_state = false;
            DataStore.getInstance().time_state = false;
            wx.sendSocketMessage({
                data: JSON.stringify({
                    type: 'throw_over',
                    roomID: DataStore.getInstance().roomID,
                    round_player: DataStore.getInstance().user_round == 'our' ? DataStore.getInstance().other_player : DataStore.getInstance().openid,
                }),
            });
        } else if (data.room_type == 'game_over') {
            if (DataStore.getInstance().offline) {
                clearTimeout(DataStore.getInstance().offline);
            }
            console.log('游戏已结束')
            DataStore.getInstance().game_over = true;
            wx.closeSocket();
            DataStore.getInstance().roomID == '';
            DataStore.getInstance().round_num == '';
            DataStore.getInstance().actionId = '';
            DataStore.getInstance().actions = [];
            DataStore.getInstance().robot_data = new Object();
        }
    }
}