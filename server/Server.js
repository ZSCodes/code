import {DataStore} from "../js/base/DataStore.js";
// import {Director} from "../js/Director";
// import {Skill} from "../js/skill/Skill";
import {user_already} from "./user_already";
import {play_start} from "./play_start";
import {play} from "./play";
import {playing} from "./playing";
import {throws} from "./throws";
import {game_over} from "./game_over";
import {reconnect} from "./reconnect";
import {offline} from "./offline";
import {robot} from "./robot";

export class Server {
    constructor() {
        this.lockReconnect = false; //重连锁，true是上锁，false是无锁
        this.limit = 0;  //重连次数
        this.timer = null; //重连定时器
        this.timeout = 4000;  //发送心跳时间间隔
        this.timeoutObj = null;  //发送心跳定时器
        this.serverTimeoutObj = null;  //关闭与服务器连接定时器
    }

    //初始化
    onload() {
        this.connect();
    }

    //连接
    connect() {
        wx.connectSocket({
            // url: 'wss://lingak.com:8080',
            url: 'ws://127.0.0.1:8080',
            method: 'GET',
            success: res => {
                this.initEventHandle();
            }
        })
    }

    //监听事件
    initEventHandle() {
        wx.onSocketMessage(res => {
            const data = JSON.parse(res.data);
            switch (data.type) {
                case 'pong':
                    //发送心跳
                    // console.log('接收heart')
                    this.reset().start();
                    break;
                case 'user-already':
                    //用户已加入玩家列表，可以开始匹配
                    new user_already();
                    break;
                case 'waitting':
                    //没有其他玩家在匹配，创建房间等待其他玩家进入
                    DataStore.getInstance().roomID = data.roomID;
                    console.log('等待玩家加入')
                    DataStore.getInstance().robot_timer = setTimeout(() => {
                        wx.sendSocketMessage({
                            data: JSON.stringify({
                                type: 'robot',
                                roomID: DataStore.getInstance().roomID,
                            }),
                        });
                    }, 6000)
                    break;
                case 'play_start':
                    //房间人齐，可以开对战
                    clearTimeout(DataStore.getInstance().robot_timer);
                    console.log('play_start')
                    new play_start(data);
                    break;
                case 'play':
                    //双方准备好了，开始倒计时
                    new play(data);
                    break;
                case 'time':
                    //获取倒计时信息
                    if (DataStore.getInstance().offline) {
                        clearTimeout(DataStore.getInstance().offline);
                    }
                    DataStore.getInstance().time_num = data.time;
                    if (data.time == 9) {
                        DataStore.getInstance().aim_state = true;
                        DataStore.getInstance().time_state = true;
                        DataStore.getInstance().touch_state = true;
                    }
                    break;
                case 'playing':
                    //获取对战时的信息
                    new playing(data);
                    break;
                case 'throw':
                    //显示投掷过程
                    new throws(data);
                    break;
                case 'skill':
                    //显示道具效果
                    DataStore.getInstance().skill.set(data.skill, true);
                    break;
                case 'game_over':
                    //游戏结束
                    new game_over(data);
                    break;
                case 'reconnect':
                    //重连后，对接数据
                    new reconnect(data);
                    break;
                case 'offline':
                    //对方掉线处理
                    new offline(data);
                    break;
                case 'robot':
                    new robot(data);
                    break;
            }
            // if (data.type == 'pong') {
            //     //发送心跳
            //     console.log('接收heart')
            //     this.reset().start();
            // } else if (data.type == 'user-already') {
            //     //用户已加入玩家列表，可以开始匹配
            //     new user_already();
            //     // DataStore.getInstance().game_over = false;
            //     // DataStore.getInstance().roomID == '';
            //     // DataStore.getInstance().round_num == '';
            //     // wx.sendSocketMessage({
            //     //     data: JSON.stringify({
            //     //         type: 'pipei',
            //     //         openid: DataStore.getInstance().openid,
            //     //     }),
            //     //     success() {
            //     //         DataStore.getInstance().waitting = true;
            //     //     }
            //     // });
            // } else if (data.type == 'waitting') {
            //     //没有其他玩家在匹配，创建房间等待其他玩家进入
            //     DataStore.getInstance().roomID = data.roomID;
            //     console.log(data.roomID)
            //     console.log('等待玩家加入')
            // } else if (data.type == 'play_start') {
            //     console.log('对战开始')
            //     //房间人齐，可以开对战
            //     new play_start(data);
            //     // if (data.round_player == DataStore.getInstance().openid) {
            //     //     DataStore.getInstance().user_round = 'our';
            //     // } else {
            //     //     DataStore.getInstance().user_round = 'enemy';
            //     // }
            //     // DataStore.getInstance().roomID = data.roomID;
            //     // if (data.player[0] == DataStore.getInstance().openid) {
            //     //     DataStore.getInstance().other_player = data.player[1];
            //     // } else if (data.player[1] == DataStore.getInstance().openid) {
            //     //     DataStore.getInstance().other_player = data.player[0];
            //     // }
            //     // DataStore.getInstance().round_num = data.round_;
            //     // DataStore.getInstance().waitting = false;
            //     // DataStore.getInstance().time_num = data.time;
            //     // if (data.roomID == DataStore.getInstance().openid) {
            //     //     DataStore.getInstance().OurAim = data.player1;
            //     //     DataStore.getInstance().EnemyAim = data.player2;
            //     // } else {
            //     //     DataStore.getInstance().OurAim = data.player2;
            //     //     DataStore.getInstance().EnemyAim = data.player1;
            //     // }
            //     // DataStore.getInstance().game_state = 'play';
            //     // DataStore.getInstance().aim_speed = 3;
            //     // DataStore.getInstance().aim_X = DataStore.getInstance().width * 0.08;
            //     // DataStore.getInstance().aim_Y = DataStore.getInstance().width * 0.45;
            //     // if (DataStore.getInstance().ready_timer) {
            //     //     clearTimeout(DataStore.getInstance().ready_timer);
            //     // }
            //     // DataStore.getInstance().ready_timer = setTimeout(function () {
            //     //     wx.sendSocketMessage({
            //     //         data: JSON.stringify({
            //     //             type: 'play',
            //     //             roomID: DataStore.getInstance().roomID,
            //     //             round_player: DataStore.getInstance().user_round == 'our' ? DataStore.getInstance().other_player : DataStore.getInstance().openid,
            //     //         }),
            //     //     });
            //     // }, 2500)
            // } else if (data.type == 'play') {
            //     //双方准备好了，开始倒计时
            //     new play(data);
            //     // wx.sendSocketMessage({
            //     //     data: JSON.stringify({
            //     //         type: 'time',
            //     //         roomID: DataStore.getInstance().roomID,
            //     //         time_num: DataStore.getInstance().time_num,
            //     //         round: DataStore.getInstance().round_num,
            //     //         round_player: data.round_player,
            //     //     }),
            //     //     success() {
            //     //         if (DataStore.getInstance().offline) {
            //     //             clearTimeout(DataStore.getInstance().offline);
            //     //         }
            //     //         DataStore.getInstance().offline = setTimeout(() => {
            //     //             wx.sendSocketMessage({
            //     //                 data: JSON.stringify({
            //     //                     type: 'offline',
            //     //                     roomID: DataStore.getInstance().roomID,
            //     //                     other_player: DataStore.getInstance().other_player,
            //     //                 }),
            //     //             });
            //     //         }, 6000)
            //     //         // setInterval(() => {
            //     //         //     console.log(DataStore.getInstance().aim_X / DataStore.getInstance().width)
            //     //         //     console.log(DataStore.getInstance().aim_Y / DataStore.getInstance().width)
            //     //         // }, 1000)
            //     //     }
            //     // });
            // } else if (data.type == 'time') {
            //     //获取倒计时信息
            //     if (DataStore.getInstance().offline) {
            //         clearTimeout(DataStore.getInstance().offline);
            //     }
            //     DataStore.getInstance().time_num = data.time;
            //     if (data.time == 9) {
            //         DataStore.getInstance().aim_state = true;
            //         DataStore.getInstance().time_state = true;
            //         DataStore.getInstance().touch_state = true;
            //     }
            // } else if (data.type == 'playing') {
            //     //获取对战时的信息
            //     new playing(data);
            //     // console.log("第" + data.round_ + "回合")
            //     // if (DataStore.getInstance().offline) {
            //     //     clearTimeout(DataStore.getInstance().offline);
            //     // }
            //     // Skill.getInstance().restart();
            //     // DataStore.getInstance().aim_state = false;
            //     // DataStore.getInstance().time_state = false;
            //     // DataStore.getInstance().touch_state = false;
            //     // DataStore.getInstance().round_num = data.round_;
            //     // DataStore.getInstance().time_num = data.time;
            //     // DataStore.getInstance().aim_speed = 3;
            //     // DataStore.getInstance().aim_X = DataStore.getInstance().width * 0.08;
            //     // DataStore.getInstance().aim_Y = DataStore.getInstance().width * 0.45;
            //     // if (data.round_player == DataStore.getInstance().openid) {
            //     //     DataStore.getInstance().user_round = 'our';
            //     // } else {
            //     //     DataStore.getInstance().user_round = 'enemy';
            //     // }
            //     // if (DataStore.getInstance().ready_timer) {
            //     //     if (DataStore.getInstance().ready_timer) {
            //     //         clearTimeout(DataStore.getInstance().ready_timer);
            //     //     }
            //     // }
            //     // DataStore.getInstance().ready_timer = setTimeout(() => {
            //     //     wx.sendSocketMessage({
            //     //         data: JSON.stringify({
            //     //             type: 'play',
            //     //             roomID: DataStore.getInstance().roomID,
            //     //             round_player: DataStore.getInstance().user_round == 'our' ? DataStore.getInstance().other_player : DataStore.getInstance().openid,
            //     //         }),
            //     //     });
            //     // }, 2000)
            // } else if (data.type == 'throw') {
            //     //显示投掷过程
            //     new throws(data);
            //     // DataStore.getInstance().aim_state = false;
            //     // DataStore.getInstance().time_state = false;
            //     // Skill.getInstance().restart();
            //     // if (data.state == 'miss') {
            //     //     //投掷丢失
            //     //     DataStore.getInstance().miss_state = true;
            //     // } else if (data.state == 'mingzhong') {
            //     //     //投掷命中
            //     //     if (data.player == DataStore.getInstance().openid) {
            //     //         DataStore.getInstance().throw_x = DataStore.getInstance().width * data.aim[0];
            //     //         DataStore.getInstance().throw_y = DataStore.getInstance().width * data.aim[1];
            //     //         DataStore.getInstance().hit_x = data.aim[0];
            //     //         DataStore.getInstance().hit_y = data.aim[1];
            //     //         DataStore.getInstance().OurAim.push(data.dipan);
            //     //         DataStore.getInstance().throw_state = 'our';
            //     //     } else {
            //     //         DataStore.getInstance().throw_x = DataStore.getInstance().width * data.aim[0];
            //     //         DataStore.getInstance().throw_y = DataStore.getInstance().width * data.aim[1];
            //     //         DataStore.getInstance().hit_x = data.aim[0];
            //     //         DataStore.getInstance().hit_y = data.aim[1];
            //     //         DataStore.getInstance().EnemyAim.push(data.dipan);
            //     //         DataStore.getInstance().throw_state = 'enemy';
            //     //     }
            //     // } else if (data.state == 'wuxiao') {
            //     //     //投掷无效
            //     //     wx.sendSocketMessage({
            //     //         data: JSON.stringify({
            //     //             type: 'throw_over',
            //     //             roomID: DataStore.getInstance().roomID,
            //     //             round_player: DataStore.getInstance().user_round == 'our' ? DataStore.getInstance().other_player : DataStore.getInstance().openid,
            //     //         }),
            //     //     });
            //     // }
            // } else if (data.type == 'skill') {
            //     //显示道具效果
            //     DataStore.getInstance().skill.set(data.skill, true);
            // } else if (data.type == 'game_over') {
            //     //游戏结束
            //     new game_over(data);
            //     // if (data.winner == DataStore.getInstance().openid) {
            //     //     Director.getInstance().createLine(DataStore.getInstance().line.get(data.line)[0], DataStore.getInstance().line.get(data.line)[1], DataStore.getInstance().line.get(data.line)[2], DataStore.getInstance().line.get(data.line)[3], DataStore.getInstance().line.get(data.line)[4]);
            //     //     DataStore.getInstance().game_result = 'our_win';
            //     // } else {
            //     //     Director.getInstance().createLine(DataStore.getInstance().line.get(data.line)[0], DataStore.getInstance().line.get(data.line)[1], DataStore.getInstance().line.get(data.line)[2], DataStore.getInstance().line.get(data.line)[3], DataStore.getInstance().line.get(data.line)[4]);
            //     //     DataStore.getInstance().game_result = 'enemy_win';
            //     // }
            //     // DataStore.getInstance().game_over = true;
            //     // wx.closeSocket();
            // } else if (data.type == 'reconnect') {
            //     //重连后，对接数据
            //     new reconnect(data);
            //     // if (data.round_player == DataStore.getInstance().openid) {
            //     //     DataStore.getInstance().user_round = 'enemy';
            //     // } else {
            //     //     DataStore.getInstance().user_round = 'our';
            //     // }
            //     //
            //     // if (data.player.indexOf(DataStore.getInstance().openid) == 0) {
            //     //     DataStore.getInstance().OurAim = data.player1;
            //     //     DataStore.getInstance().EnemyAim = data.player2;
            //     // } else {
            //     //     DataStore.getInstance().OurAim = data.player2;
            //     //     DataStore.getInstance().EnemyAim = data.player1;
            //     // }
            //     //
            //     // DataStore.getInstance().round_num = data.round_;
            //     // DataStore.getInstance().time_num = data.time;
            //     //
            //     // if (data.room_type == 'time') {
            //     //     if (DataStore.getInstance().offline) {
            //     //         clearTimeout(DataStore.getInstance().offline);
            //     //     }
            //     //     switch (data.time) {
            //     //         case 10:
            //     //             if (DataStore.getInstance().offline) {
            //     //                 clearTimeout(DataStore.getInstance().offline);
            //     //             }
            //     //             Skill.getInstance().restart();
            //     //             DataStore.getInstance().aim_state = false;
            //     //             DataStore.getInstance().time_state = false;
            //     //             DataStore.getInstance().touch_state = false;
            //     //             DataStore.getInstance().round_num = data.round_;
            //     //             DataStore.getInstance().time_num = data.time;
            //     //             DataStore.getInstance().aim_speed = 3;
            //     //             DataStore.getInstance().aim_X = DataStore.getInstance().width * 0.08;
            //     //             DataStore.getInstance().aim_Y = DataStore.getInstance().width * 0.45;
            //     //             // if (data.round_player == DataStore.getInstance().openid) {
            //     //             //     DataStore.getInstance().user_round = 'our';
            //     //             // } else {
            //     //             //     DataStore.getInstance().user_round = 'enemy';
            //     //             // }
            //     //             if (DataStore.getInstance().ready_timer) {
            //     //                 if (DataStore.getInstance().ready_timer) {
            //     //                     clearTimeout(DataStore.getInstance().ready_timer);
            //     //                 }
            //     //             }
            //     //             wx.sendSocketMessage({
            //     //                 data: JSON.stringify({
            //     //                     type: 'play',
            //     //                     roomID: DataStore.getInstance().roomID,
            //     //                     round_player: 11,
            //     //                 }),
            //     //             });
            //     //             break;
            //     //         case 9:
            //     //             DataStore.getInstance().aim_state = true;
            //     //             DataStore.getInstance().time_state = true;
            //     //             DataStore.getInstance().touch_state = true;
            //     //             DataStore.getInstance().aim_X = DataStore.getInstance().width * 0.08;
            //     //             DataStore.getInstance().aim_Y = DataStore.getInstance().width * 0.45;
            //     //             break;
            //     //         case 8:
            //     //             DataStore.getInstance().aim_X = DataStore.getInstance().width * 0.56;
            //     //             DataStore.getInstance().aim_Y = DataStore.getInstance().width * 0.45;
            //     //             break;
            //     //         case 7:
            //     //             DataStore.getInstance().aim_X = DataStore.getInstance().width * 0.632;
            //     //             DataStore.getInstance().aim_Y = DataStore.getInstance().width * 0.746;
            //     //             break;
            //     //         case 6:
            //     //             DataStore.getInstance().aim_X = DataStore.getInstance().width * 0.152;
            //     //             DataStore.getInstance().aim_Y = DataStore.getInstance().width * 0.746;
            //     //             break;
            //     //         case 5:
            //     //             DataStore.getInstance().aim_X = DataStore.getInstance().width * 0.2;
            //     //             DataStore.getInstance().aim_Y = DataStore.getInstance().width * 1.034;
            //     //             break;
            //     //         case 4:
            //     //             DataStore.getInstance().aim_X = DataStore.getInstance().width * 0.68;
            //     //             DataStore.getInstance().aim_Y = DataStore.getInstance().width * 1.034;
            //     //             break;
            //     //         case 3:
            //     //             DataStore.getInstance().aim_X = DataStore.getInstance().width * 0.544;
            //     //             DataStore.getInstance().aim_Y = DataStore.getInstance().width * 0.45;
            //     //             break;
            //     //         case 2:
            //     //             DataStore.getInstance().aim_X = DataStore.getInstance().width * 0.64;
            //     //             DataStore.getInstance().aim_Y = DataStore.getInstance().width * 0.746;
            //     //             break;
            //     //         case 1:
            //     //             DataStore.getInstance().aim_state = false;
            //     //             DataStore.getInstance().time_state = false;
            //     //             DataStore.getInstance().touch_state = false;
            //     //             DataStore.getInstance().aim_X = DataStore.getInstance().width * 0.16;
            //     //             DataStore.getInstance().aim_Y = DataStore.getInstance().width * 0.746;
            //     //             break;
            //     //     }
            //     //     // if (data.time == 9) {
            //     //     //     DataStore.getInstance().aim_state = true;
            //     //     //     DataStore.getInstance().time_state = true;
            //     //     //     DataStore.getInstance().touch_state = true;
            //     //     // }
            //     // } else if (data.room_type == 'playing') {
            //     //     if (DataStore.getInstance().offline) {
            //     //         clearTimeout(DataStore.getInstance().offline);
            //     //     }
            //     //     Skill.getInstance().restart();
            //     //     DataStore.getInstance().aim_state = false;
            //     //     DataStore.getInstance().time_state = false;
            //     //     DataStore.getInstance().touch_state = false;
            //     //     DataStore.getInstance().round_num = data.round_;
            //     //     DataStore.getInstance().time_num = data.time;
            //     //     DataStore.getInstance().aim_speed = 3;
            //     //     DataStore.getInstance().aim_X = DataStore.getInstance().width * 0.08;
            //     //     DataStore.getInstance().aim_Y = DataStore.getInstance().width * 0.45;
            //     //     if (data.round_player == DataStore.getInstance().openid) {
            //     //         DataStore.getInstance().user_round = 'our';
            //     //     } else {
            //     //         DataStore.getInstance().user_round = 'enemy';
            //     //     }
            //     //     if (DataStore.getInstance().ready_timer) {
            //     //         if (DataStore.getInstance().ready_timer) {
            //     //             clearTimeout(DataStore.getInstance().ready_timer);
            //     //         }
            //     //     }
            //     //     wx.sendSocketMessage({
            //     //         data: JSON.stringify({
            //     //             type: 'play',
            //     //             roomID: DataStore.getInstance().roomID,
            //     //             round_player: DataStore.getInstance().user_round == 'our' ? DataStore.getInstance().other_player : DataStore.getInstance().openid,
            //     //         }),
            //     //     });
            //     // } else if (data.room_type == 'play') {
            //     //     if (DataStore.getInstance().offline) {
            //     //         clearTimeout(DataStore.getInstance().offline);
            //     //     }
            //     //     wx.sendSocketMessage({
            //     //         data: JSON.stringify({
            //     //             type: 'time',
            //     //             roomID: DataStore.getInstance().roomID,
            //     //             time_num: DataStore.getInstance().time_num,
            //     //             round: DataStore.getInstance().round_num,
            //     //             round_player: data.round_player,
            //     //         }),
            //     //         success() {
            //     //             if (DataStore.getInstance().offline) {
            //     //                 clearTimeout(DataStore.getInstance().offline);
            //     //             }
            //     //             DataStore.getInstance().offline = setTimeout(() => {
            //     //                 wx.sendSocketMessage({
            //     //                     data: JSON.stringify({
            //     //                         type: 'offline',
            //     //                         roomID: DataStore.getInstance().roomID,
            //     //                         other_player: DataStore.getInstance().other_player,
            //     //                     }),
            //     //                 });
            //     //             }, 6000)
            //     //         }
            //     //     });
            //     // } else if (data.room_type == 'throw') {
            //     //     if (DataStore.getInstance().offline) {
            //     //         clearTimeout(DataStore.getInstance().offline);
            //     //     }
            //     //     DataStore.getInstance().aim_state = false;
            //     //     DataStore.getInstance().time_state = false;
            //     //     wx.sendSocketMessage({
            //     //         data: JSON.stringify({
            //     //             type: 'throw_over',
            //     //             roomID: DataStore.getInstance().roomID,
            //     //             round_player: DataStore.getInstance().user_round == 'our' ? DataStore.getInstance().other_player : DataStore.getInstance().openid,
            //     //         }),
            //     //     });
            //     // } else if (data.room_type == 'game_over') {
            //     //     if (DataStore.getInstance().offline) {
            //     //         clearTimeout(DataStore.getInstance().offline);
            //     //     }
            //     //     console.log('游戏已结束')
            //     //     DataStore.getInstance().game_over = true;
            //     //     wx.closeSocket();
            //     //     DataStore.getInstance().roomID == '';
            //     //     DataStore.getInstance().round_num == '';
            //     // }
            // } else if (data.type == 'offline') {
            //     //对方掉线处理
            //     new offline(data);
            //     // console.log(data.player_state)
            //     // if (data.player_state === false) {
            //     //     //对方玩家掉线了
            //     //     DataStore.getInstance().win_background = 'offline';
            //     //     DataStore.getInstance().game_over = true;
            //     //     wx.closeSocket();
            //     //     DataStore.getInstance().roomID == '';
            //     //     DataStore.getInstance().round_num == '';
            //     // } else {
            //     //     //对方玩家还在
            //     //     if (DataStore.getInstance().offline) {
            //     //         clearTimeout(DataStore.getInstance().offline);
            //     //     }
            //     // }
            // }
        })
        wx.onSocketOpen(() => {
            console.log('WebSocket连接打开')
            if (this.timer) {
                clearInterval(this.timer);
            }
            DataStore.getInstance().level_touch = true;
            if (DataStore.getInstance().roomID == '' && DataStore.getInstance().round_num == '') {
                if (DataStore.getInstance().invite === true) {
                    //邀请好友对战
                    wx.sendSocketMessage({
                        data: JSON.stringify({
                            type: 'invite',
                            openid: DataStore.getInstance().openid,
                        }),
                    });
                } else if (DataStore.getInstance().invite_ === true) {
                    //被好友邀请对战
                    wx.sendSocketMessage({
                        data: JSON.stringify({
                            type: 'invite_',
                            openid: DataStore.getInstance().openid,
                            roomID: DataStore.getInstance().roomID,
                        }),
                    });
                } else {
                    //还没开始对战，第一次连接或重新连接
                    wx.sendSocketMessage({
                        data: JSON.stringify({
                            type: 'websocketopen',
                            openid: DataStore.getInstance().openid,
                        }),
                    });
                }
            } else {
                //在对战中重连
                wx.sendSocketMessage({
                    data: JSON.stringify({
                        type: 'reconnect',
                        openid: DataStore.getInstance().openid,
                        roomID: DataStore.getInstance().roomID,
                    }),
                });
            }
            this.reset().start();   //执行发送心跳包保持连接
        })
        wx.onSocketError(res => {
            console.log('WebSocket连接打开失败')
            if (this.timer) {
                clearInterval(this.timer);
            }
            if (DataStore.getInstance().game_over === false && DataStore.getInstance().robot === false) {
                this.reconnect();
            }
        })
        wx.onSocketClose(res => {
            console.log('WebSocket 已关闭！')
            if (this.timer) {
                clearInterval(this.timer);
            }
            if (DataStore.getInstance().game_over === false && DataStore.getInstance().robot === false) {
                this.reconnect();
            }
        })
    }

    //重连
    reconnect() {
        if (this.lockReconnect) return;
        this.lockReconnect = true;
        if (this.timer) {
            clearInterval(this.timer)
        }
        if (this.limit < 3) {
            console.log('重连' + this.limit + '次')
            this.timer = setInterval(() => {
                this.connect();
                this.lockReconnect = false;
            }, 2500);
            this.limit = this.limit + 1;
        }
    }

    //重置定时器
    reset() {
        clearTimeout(this.timeoutObj);
        clearTimeout(this.serverTimeoutObj);
        return this;
    }

    //发送心跳
    start() {
        this.timeoutObj = setTimeout(() => {
            // console.log("发送heart");
            wx.sendSocketMessage({
                data: JSON.stringify({
                    type: 'ping',
                    openid: DataStore.getInstance().openid,
                }),
            });
            this.serverTimeoutObj = setTimeout(() => {
                wx.closeSocket();
            }, this.timeout);
        }, this.timeout);
    }
}