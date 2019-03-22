import {DataStore} from "../js/base/DataStore";
import {Director} from "../js/Director";

//游戏结束
export class game_over {
    constructor(data) {
        if (data.winner == DataStore.getInstance().openid) {
            Director.getInstance().createLine(DataStore.getInstance().line.get(data.line)[0], DataStore.getInstance().line.get(data.line)[1], DataStore.getInstance().line.get(data.line)[2], DataStore.getInstance().line.get(data.line)[3], DataStore.getInstance().line.get(data.line)[4]);
            DataStore.getInstance().game_result = 'our_win';
        }else if(data.winner == 'tie'){
            DataStore.getInstance().game_state = 'tie';
        } else {
            Director.getInstance().createLine(DataStore.getInstance().line.get(data.line)[0], DataStore.getInstance().line.get(data.line)[1], DataStore.getInstance().line.get(data.line)[2], DataStore.getInstance().line.get(data.line)[3], DataStore.getInstance().line.get(data.line)[4]);
            DataStore.getInstance().game_result = 'enemy_win';
        }
        DataStore.getInstance().game_over = true;
        wx.closeSocket();
        DataStore.getInstance().roomID == '';
        DataStore.getInstance().round_num == '';
        DataStore.getInstance().actionId = '';
        DataStore.getInstance().actions = [];
        DataStore.getInstance().robot_data = new Object();
    }
}