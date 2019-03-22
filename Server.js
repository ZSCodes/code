export class Server {
    on(){
        wx.connectSocket({
          url: 'wss://t2kzwlsk.ws.qcloud.la',
            success: function (res) {
                console.log(res)

                wx.onSocketOpen(()=>{
                    console.log('WebSocket连接打开')
                })

                wx.onSocketMessage(function (res) {
                    console.log(res)
                })
            },
            fail: function (res1) {
                console.log(res1)
            }
        })
    }
}