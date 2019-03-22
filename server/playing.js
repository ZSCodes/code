import {DataStore} from "../js/base/DataStore";
import {Skill} from "../js/skill/Skill";

//获取对战时的信息
export class playing {
    constructor(data) {
        console.log("第" + data.round_ + "回合")
        if (DataStore.getInstance().offline) {
            clearTimeout(DataStore.getInstance().offline);
        }
        if (DataStore.getInstance().time_num != 10) {
            DataStore.getInstance().actions.push('none');
            wx.request({
                url: 'http://127.0.0.1:4000/update-act',
                data: {
                    id: DataStore.getInstance().actionId,
                    actions: DataStore.getInstance().actions,
                },
                success(res) {
                    //
                }
            })
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
        // if (DataStore.getInstance().ready_timer) {
            if (DataStore.getInstance().ready_timer) {
                clearTimeout(DataStore.getInstance().ready_timer);
            }
        // }
        DataStore.getInstance().speak = true;
        DataStore.getInstance().ready_timer = setTimeout(() => {
            // wx.sendSocketMessage({
            //     data: JSON.stringify({
            //         type: 'play',
            //         openid: DataStore.getInstance().openid,
            //         roomID: DataStore.getInstance().roomID,
            //         round_player: DataStore.getInstance().user_round == 'our' ? DataStore.getInstance().other_player : DataStore.getInstance().openid,
            //     }),
            //     success() {
            //         DataStore.getInstance().speak = false;
            //     }
            // });
            DataStore.getInstance().speak = false;
            wx.sendSocketMessage({
                data: JSON.stringify({
                    type: 'time',
                    openid: DataStore.getInstance().openid,
                    roomID: DataStore.getInstance().roomID,
                    time_num: DataStore.getInstance().time_num,
                    round: DataStore.getInstance().round_num,
                    round_player: DataStore.getInstance().user_round == 'our' ? DataStore.getInstance().other_player : DataStore.getInstance().openid,
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
                    // setInterval(() => {
                    //     console.log(DataStore.getInstance().aim_X / DataStore.getInstance().width)
                    //     console.log(DataStore.getInstance().aim_Y / DataStore.getInstance().width)
                    // }, 1000)
                }
            });
        }, 2000)
    }
}