import {DataStore} from "../js/base/DataStore";
import {Resources} from "../js/base/Resources";
import {UserInfo} from "./UserInfo";
import {StartBackGround} from "../js/runtime/StartBackGround";
import {PetBook} from "../js/runtime/PetBook";
import {Waiting_friend} from "../js/runtime/Waiting_friend";
import {Waiting_other_play} from "../js/runtime/Waiting_other_play";
import {Waiting_go} from "../js/runtime/Waiting_go";
import {Waiting_leave} from "../js/runtime/Waiting_leave";
import {Level} from "../js/runtime/Level";
import {Waitting} from "../js/runtime/Waitting";
import {PlayReady} from "../js/runtime/PlayReady";
import {PlayBackGround} from "../js/runtime/PlayBackGround";
import {OurWinBackGround} from "../js/runtime/OurWinBackGround";
import {EnemyWinBackGround} from "../js/runtime/EnemyWinBackGround";
import {TieBackGround} from "../js/runtime/TieBackGround";
import {OfflineBackGround} from "../js/runtime/OfflineBackGround";
import {Aim_our} from "../js/player/Aim_our";
import {Aim_enemy} from "../js/player/Aim_enemy";
import {Shade} from "../js/skill/Shade";
import {Speed} from "../js/skill/Speed";
import {OurThrow} from "../js/player/OurThrow";
import {EnemyThrow} from "../js/player/EnemyThrow";
import {Miss} from "../js/player/Miss";
import {Timing} from "../js/player/Timing";
import {music} from "./music";

export class download {
    constructor() {
        this.fileManager = wx.getFileSystemManager();
        this.download_();
    }

    download_() {
        this.downloadTask = wx.downloadFile({

            url: 'http://127.0.0.1:4000/static/images/image.zip',

            success: (res) => { // 下载成功

                let filePath = res.tempFilePath; // 下载路径
                this.fileManager.unzip({

                    zipFilePath: filePath,   // 资源下载后路径

                    targetPath: wx.env.USER_DATA_PATH,  // 解压资源存放路径

                    success: (res) => {// 解压成功
                        // let url = wx.env.USER_DATA_PATH + "/pet/" + 'dog01' + '.png';
                        this.onResourceSecondLoaded(result => {
                            if (result == 'ok') {
                                this.init__();
                                new music();
                                new UserInfo();
                            }
                        });
                    },

                    fail: function (res) {// 解压失败
                        
                    },

                })

            },

            fail: function (res) { // 下载失败

            },

        })

        this.downloadTask.onProgressUpdate((res) => {
            console.log('下载进度', res.progress)
            // console.log('已经下载的数据长度', res.totalBytesWritten)
            // console.log('预期需要下载的数据总长度', res.totalBytesExpectedToWrite)
        })
    }


    onResourceSecondLoaded(callback) {
        let base = new Map(Resources);

        // console.log(DataStore.getInstance().res)

        for (let [key, value] of base) {
            const image = wx.createImage();
            image.src = value;
            DataStore.getInstance().res.set(key, image);
        }

        let loadedCount = 1;
        for (let value of DataStore.getInstance().res.values()) {
            value.onload = () => {
                loadedCount++;
                if (loadedCount >= DataStore.getInstance().res.size) {
                    callback('ok');
                }
            }
        }
    }

    init__() {
        DataStore.getInstance()
            .put('start_background', StartBackGround)  //开始背景
            .put('petbook', PetBook)   //宠物图鉴
            .put('Waiting_friend_background', Waiting_friend)   //邀请好友对战背景
            .put('Waiting_other_background', Waiting_other_play)   //被邀请好友已加入，等待开始
            .put('waiting_go', Waiting_go)  //好友已加入，可以开始对战
            .put('waiting_leave', Waiting_leave)   //好友离开房间
            .put('level', Level)   //选择段位对战
            .put('waitting', Waitting)  //等待背景
            .put('play_ready', PlayReady)  //对战准备
            .put('play_background', PlayBackGround)  //对战背景
            .put('ourwin_background', OurWinBackGround)  //我方赢了背景
            .put('enemywin_background', EnemyWinBackGround)  //敌方赢了背景
            .put('tie_background', TieBackGround)  //双方平局背景
            .put('offline_background', OfflineBackGround)  //敌方掉线，我方赢了背景
            .put('aim_our', Aim_our)  //我方瞄准器
            .put('aim_enemy', Aim_enemy)  //敌方瞄准器
            // .put('enemy', Enemy) //敌方人物
            // .put('our', Our) //我方人物
            .put('ourAim', []) //我方棋子
            .put('enemyAim', []) //敌方棋子
            .put('shade', Shade) //遮罩
            .put('speed', Speed) //加速
            .put('ourthrow', OurThrow) //我方投掷过程
            .put('enemythrow', EnemyThrow) //敌方投掷过程
            .put('miss', Miss) //丢失
            .put('line', []) //胜负连线
            .put('timing', Timing); //倒计时
    }
}