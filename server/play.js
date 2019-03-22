import {DataStore} from "../js/base/DataStore";

//双方准备好了，开始倒计时
export class play {
    constructor(data) {
        wx.sendSocketMessage({
            data: JSON.stringify({
                type: 'time',
                openid: DataStore.getInstance().openid,
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
                // setInterval(() => {
                //     console.log(DataStore.getInstance().aim_X / DataStore.getInstance().width)
                //     console.log(DataStore.getInstance().aim_Y / DataStore.getInstance().width)
                // }, 1000)
            }
        });
    }
}