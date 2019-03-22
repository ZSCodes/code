import {DataStore} from "../js/base/DataStore";

//房间人齐，可以开对战
export class play_start {
    constructor(data) {
        if (data.round_player == DataStore.getInstance().openid) {
            DataStore.getInstance().user_round = 'our';
            DataStore.getInstance().fs_state = 'attack';
        } else {
            DataStore.getInstance().user_round = 'enemy';
            DataStore.getInstance().fs_state = 'defend';
        }
        DataStore.getInstance().roomID = data.roomID;
        if (data.player[0] == DataStore.getInstance().openid) {
            DataStore.getInstance().other_player = data.player[1];
            DataStore.getInstance().othername = data.user_name2;
            DataStore.getInstance().otherpet = data.user_pet2;
            DataStore.getInstance().otherimg = data.user_img2;
            DataStore.getInstance().othergrade = data.user_grade2;
        } else if (data.player[1] == DataStore.getInstance().openid) {
            DataStore.getInstance().other_player = data.player[0];
            DataStore.getInstance().othername = data.user_name1;
            DataStore.getInstance().otherpet = data.user_pet1;
            DataStore.getInstance().otherimg = data.user_img1;
            DataStore.getInstance().othergrade = data.user_grade1;
        }
        DataStore.getInstance().round_num = data.round_;
        // DataStore.getInstance().waitting = false;
        DataStore.getInstance().time_num = data.time;
        if (data.roomID == DataStore.getInstance().openid) {
            DataStore.getInstance().OurAim = data.player1;
            DataStore.getInstance().EnemyAim = data.player2;
        } else {
            DataStore.getInstance().OurAim = data.player2;
            DataStore.getInstance().EnemyAim = data.player1;
        }
        wx.request({
            url: 'http://127.0.0.1:4000/insert-act',
            data: {
                name: DataStore.getInstance().username,
                img_url: DataStore.getInstance().userimg,
                pet: DataStore.getInstance().pet,
                grade: DataStore.getInstance().grade,
                fs_state: DataStore.getInstance().fs_state,
            },
            success(res) {
                DataStore.getInstance().actionId = res.data;

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
                }, 5000)
            }
        })
    }
}