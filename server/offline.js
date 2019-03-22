import {DataStore} from "../js/base/DataStore";

//对方掉线处理
export class offline {
    constructor(data) {
        // console.log(data.player_state)
        if (data.player_state === false) {
            //对方玩家掉线了
            DataStore.getInstance().win_background = 'offline';
            DataStore.getInstance().game_over = true;
            wx.closeSocket();
            DataStore.getInstance().roomID == '';
            DataStore.getInstance().round_num == '';
            DataStore.getInstance().actionId = '';
            DataStore.getInstance().actions = [];
            DataStore.getInstance().robot_data = new Object();
        } else {
            //对方玩家还在
            if (DataStore.getInstance().offline) {
                clearTimeout(DataStore.getInstance().offline);
            }
        }
    }
}