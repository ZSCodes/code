import {DataStore} from "../js/base/DataStore";
import {Sprite} from "../js/base/Sprite";

//获取用户信息
export class UserInfo {
    constructor() {
        // this.func__ = func__;
        this.get_userinfo();
    }

    //获取用户信息
    get_userinfo() {
        let self = this;
        wx.getSetting({
            success(res) {
                const button = wx.createUserInfoButton({
                    type: 'text',
                    text: '进入游戏',
                    style: {
                        left: DataStore.getInstance().width * 0.127,
                        top: DataStore.getInstance().height * 0.42,
                        width: 200,
                        height: 40,
                        lineHeight: 40,
                        backgroundColor: '#ff0000',
                        color: '#ffffff',
                        textAlign: 'center',
                        fontSize: 16,
                        borderRadius: 4
                    }
                })

                button.onTap((result) => {
                    if (!res.authSetting['scope.userInfo']) {
                        DataStore.getInstance().username = result.userInfo.nickName;
                        DataStore.getInstance().userimg = result.userInfo.avatarUrl + '?aaa=aa.jpg';
                        if (result.userInfo.gender == 0) {
                            DataStore.getInstance().usersex = '未知';
                        } else if (result.userInfo.gender == 1) {
                            DataStore.getInstance().usersex = '男';
                        } else {
                            DataStore.getInstance().usersex = '女';
                        }
                        button.hide();
                        self.get_openid();
                        // DataStore.getInstance().game_state = 'start';
                    } else {
                        button.hide();
                        wx.getUserInfo({
                            success(res_) {
                                // const userInfo = res.userInfo
                                // const nickName = userInfo.nickName
                                // const avatarUrl = userInfo.avatarUrl
                                // const gender = userInfo.gender // 性别 0：未知、1：男、2：女
                                // const province = userInfo.province
                                // const city = userInfo.city
                                // const country = userInfo.country
                                DataStore.getInstance().username = res_.userInfo.nickName;
                                DataStore.getInstance().userimg = res_.userInfo.avatarUrl;

                                // wx.downloadFile({
                                //     // url: res_.userInfo.avatarUrl.slice(0, -3) + '0',
                                //     url: res_.userInfo.avatarUrl,
                                //     success(res) {
                                //         // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
                                //         if (res.statusCode === 200) {
                                //             DataStore.getInstance().userimg = res.tempFilePath;
                                //             // self.get_openid();
                                //         }
                                //     }
                                // })

                                if (res_.userInfo.gender == 0) {
                                    DataStore.getInstance().usersex = '未知';
                                } else if (res_.userInfo.gender == 1) {
                                    DataStore.getInstance().usersex = '男';
                                } else {
                                    DataStore.getInstance().usersex = '女';
                                }
                                self.get_openid();
                                // DataStore.getInstance().game_state = 'start';
                            }
                        })
                    }
                })
            }
        })
    }

    //获取用户openid
    get_openid() {
        let self = this;
        wx.login({
            success(res) {
                if (res.code) {
                    // 发起网络请求
                    wx.request({
                        // url: 'https://bohepintu.com/get-openid',
                        url: 'http://127.0.0.1:4000/get-openid',
                        // url: 'http://118.24.179.164:3000/get-openid',
                        // url: 'http://39.98.75.202:3000/get-openid',
                        data: {
                            code: res.code
                        },
                        success(res) {
                            DataStore.getInstance().openid = res.data;
                            self.userMsg();
                        }
                    })
                } else {
                    console.log('登录失败！' + res.errMsg)
                }
            }
        })
    }

    //获取玩家过往的游戏信息
    userMsg() {
        let self = this;
        wx.request({
            // url: 'https://bohepintu.com/get-user',
            url: 'http://127.0.0.1:4000/get-user',
            // url: 'http://118.24.179.164:3000/get-openid',
            // url: 'http://39.98.75.202:3000/get-openid',
            data: {
                openid: DataStore.getInstance().openid
            },
            success(res) {
                if (res.data == 'nouser') {
                    self.insert_user();
                } else {
                    DataStore.getInstance().grade_ = res.data.grade;
                    switch (res.data.grade) {
                        case 'a':
                            DataStore.getInstance().grade = '萌宠小白';
                            break;
                        case 'b':
                            DataStore.getInstance().grade = '初级投食官';
                            break;
                    }
                    DataStore.getInstance().once = false;
                    DataStore.getInstance().star = res.data.star;
                    DataStore.getInstance().money = res.data.money;
                    // DataStore.getInstance().pet = res.data.pet;
                    DataStore.getInstance().dog = res.data.dog;
                    DataStore.getInstance().cat = res.data.cat;
                    switch (res.data.pet) {
                        case 1:
                            DataStore.getInstance().pet = 'dog01';
                            DataStore.getInstance().pet_name = 'dog02';
                            break;
                        // case 2:
                        //     this.pet1 = Sprite.getImage('head3');
                        //     this.pet2 = Sprite.getImage('head3');
                        //     break;
                    }
                    DataStore.getInstance().game_state = 'start';
                    // self.func__;
                }
            }
        })
    }

    //新增用户
    insert_user() {
        let self = this;
        wx.request({
            // url: 'https://bohepintu.com/insert-user',
            url: 'http://127.0.0.1:4000/insert-user',
            // url: 'http://118.24.179.164:3000/get-openid',
            // url: 'http://39.98.75.202:3000/get-openid',
            data: {
                openid: DataStore.getInstance().openid,
            },
            success(res) {
                DataStore.getInstance().grade_ = res.data.grade;
                switch (res.data.grade) {
                    case 'a':
                        DataStore.getInstance().grade = '萌宠小白';
                        break;
                    case 'b':
                        DataStore.getInstance().grade = '初级投食官';
                        break;
                }
                DataStore.getInstance().once = true;
                DataStore.getInstance().star = res.data.star;
                DataStore.getInstance().money = res.data.money;
                // DataStore.getInstance().pet = res.data.pet;
                DataStore.getInstance().dog = res.data.dog;
                DataStore.getInstance().cat = res.data.cat;
                switch (res.data.pet) {
                    case 1:
                        DataStore.getInstance().pet = 'dog01';
                        DataStore.getInstance().pet_name = 'dog02';
                        break;
                    // case 2:
                    //     this.pet1 = Sprite.getImage('head3');
                    //     this.pet2 = Sprite.getImage('head3');
                    //     break;
                }
                DataStore.getInstance().game_state = 'start';
                // self.func__;
            }
        })
    }
}