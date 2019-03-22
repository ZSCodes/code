import {DataStore} from "../js/base/DataStore";

//用户已加入玩家列表，可以开始匹配
export class user_already {
    constructor() {
        DataStore.getInstance().game_over = false;
        DataStore.getInstance().roomID == '';
        DataStore.getInstance().round_num == '';
        wx.sendSocketMessage({
            data: JSON.stringify({
                type: 'pipei',
                openid: DataStore.getInstance().openid,
                pet: DataStore.getInstance().pet,
                img: DataStore.getInstance().userimg,
                pipei_grade: DataStore.getInstance().pipei_grade,
                grade: DataStore.getInstance().grade,
                name: DataStore.getInstance().username,
            }),
            success() {
                DataStore.getInstance().game_state = 'waiting';
            }
        });
    }
}