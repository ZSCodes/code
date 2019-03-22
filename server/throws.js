import {DataStore} from "../js/base/DataStore";
import {Skill} from "../js/skill/Skill";

//显示投掷过程
export class throws {
    constructor(data) {
        DataStore.getInstance().aim_state = false;
        DataStore.getInstance().time_state = false;
        Skill.getInstance().restart();
        if (data.state == 'miss') {
            //投掷丢失
            DataStore.getInstance().miss_state = true;
        } else if (data.state == 'mingzhong') {
            //投掷命中
            DataStore.getInstance().throw_x = DataStore.getInstance().width * (data.aim[0] - 1);   //投掷过程的X轴坐标（起始位置）
            DataStore.getInstance().throw_y = DataStore.getInstance().width * (data.aim[1] - 1);   //投掷过程的Y轴坐标（起始位置）
            DataStore.getInstance().hit_x = data.aim[0];
            DataStore.getInstance().hit_y = data.aim[1];
            if (data.player == DataStore.getInstance().openid) {
                // DataStore.getInstance().throw_x = DataStore.getInstance().width * data.aim[0];
                // DataStore.getInstance().throw_y = DataStore.getInstance().width * data.aim[1];
                // DataStore.getInstance().hit_x = data.aim[0];
                // DataStore.getInstance().hit_y = data.aim[1];
                DataStore.getInstance().OurAim.push(data.dipan);
                DataStore.getInstance().throw_state = 'our';
            } else {
                // DataStore.getInstance().throw_x = DataStore.getInstance().width * data.aim[0];
                // DataStore.getInstance().throw_y = DataStore.getInstance().width * data.aim[1];
                // DataStore.getInstance().hit_x = data.aim[0];
                // DataStore.getInstance().hit_y = data.aim[1];
                DataStore.getInstance().EnemyAim.push(data.dipan);
                DataStore.getInstance().throw_state = 'enemy';
            }
        } else if (data.state == 'wuxiao') {
            //投掷无效
            wx.sendSocketMessage({
                data: JSON.stringify({
                    type: 'throw_over',
                    roomID: DataStore.getInstance().roomID,
                    round_player: DataStore.getInstance().user_round == 'our' ? DataStore.getInstance().other_player : DataStore.getInstance().openid,
                }),
            });
        }
    }
}