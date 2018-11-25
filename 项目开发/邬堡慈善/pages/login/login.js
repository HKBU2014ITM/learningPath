// pages/login/login.js
var app = getApp()
Page({
  data: {
    motto: '欢迎登录\n',
    userName:'',
    userPassword:'',
    id_token:'',//方便存在本地的locakStorage
    response:'' //存取返回数据
  },
  userNameInput:function(e){
    this.setData({
      userName: e.detail.value
    })
  },
  userPasswordInput:function(e){
    this.setData({
      userPassword: e.detail.value
    })
    console.log(e.detail.value)
  },
  logIn:function(){
    var that = this
    if(this.data.userName.length == 0 || this.data.userPassword.length == 0){
      wx.showToast({  
        title: '用户名密码为空',  
        icon: 'loading',  
        duration: 2000  
      })  
}else {

  // 这里修改成跳转的页面
      wx.showToast({  
        title: '登录成功',  
        icon: 'success',  
        duration: 2000  
      })  
    }  
  wx.request({
      url: 'http://localhost:8000/admin',
      data: {
        username: this.data.userName,
        password: this.data.userPassword,
      },
      method: 'GET',
      success: function (res) {
        that.setData({
          id_token: res.data.id_token,
          response:res
        })
        try {
          wx.setStorageSync('id_token', res.data.id_token)
        } catch (e) {
        }
        wx.navigateTo({
          url: 'pages/approve/approve'
        })
        console.log(res.data);
      },
      fail: function (res) {
        console.log(res.data);
        console.log('is failed')
      }
    })

  }
})


