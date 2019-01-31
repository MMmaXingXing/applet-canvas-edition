const app = getApp();
const baseUrl = "https://jewelry.xxjwxc.cn/jewelryserver/api/v1/";

const requestBase = (component, data, method, application, dataType) => {

  !application ? application = 'application/json' : application;

  !method ? method = "POST" : '';

  return new Promise((resolve, reject) => {
    wx.request({
      url: component,
      data: data,
      method: method,
      success: resolve,
      fail: function(){
        wx.showToast({
          title: "网络错误，请刷新重试！",
          icon: "none",
          mask: true,
        })
        typeof reject == "function" ? reject() : reject;
      },
      header: application,
      dataType: dataType
    })
  })
}
//公共错误处理
const pub_err = (res, transfer, params1, params2, params3,_idx_call) => {
  if (!res.data.state) {
    
    if (res.data.code == 1049) {
      wx.clearStorageSync();
      wxOauth(transfer, params1, params2, params3, _idx_call);
    }else if(res.data.code == 1001){
    }else{
      wx.showToast({
        title: res.data.error, //1056已保存
        icon: "none"
      });
    }
    return;
  }
}

// 全局验证seccionId
const pub_auth = () => {
  var auth = wx.getStorageSync("ouath");
  if (new Date().getTime() - auth.time * 1000 > 0 || !auth) {
    return false;
  } else {
    return true;
  }
}

// 1.获取用户sessionid
const wxOauth = (reslove, params1, params2, params3, _idx_call, reject) => {
  if (pub_auth()) {
    return;
  }
  wx.login({
    success: function(res) {
      requestBase(`${baseUrl}wx/oauth`, {
        jscode: res.code
      }).then((res) => {
        pub_err(res);
        let data = {
          sessionId: res.data.data.sessionId,
          time: res.data.data.time - 1800
        }
        wx.setStorageSync("ouath", data)
        if (_idx_call < 2){
          ++_idx_call
          typeof reslove == "function" ? reslove(params1, params2, params3, _idx_call) : reslove;
        }else{
          wx.showToast({
            title: res.data.error,
            icon: "none"
          });
        }
      }, (res) => {
        typeof reject == "function" ? reject() : reject;
      })
    }
  })
}

// 2. 更新全部用户信息
const wxUpdateUserInfo = (params, _idx_call, reslove, reject) => {
  if (!pub_auth()) {
    wxOauth(wxUpdateUserInfo, params, reslove, reject, _idx_call)
  }
  requestBase(`${baseUrl}wx/update_user_info`, params).then((res) => {
    pub_err(res, wxUpdateUserInfo, params, reslove, reject, _idx_call);
    typeof reslove == "function" ? reslove() : reslove;
  }, (res) => {
    typeof reject == "function" ? reject() : reject;
  })
}


//3.获取全部有效的微官网首页展示
const indexGetItem = (reslove, reject, place, _idx_call) => {
  if (!pub_auth()) {
    wxOauth(indexGetItem, "", reslove, reject, _idx_call )
  }
  requestBase(`${baseUrl}wx/index/get_item`, "", "GET").then((res) => {
    pub_err(res, indexGetItem, "", reslove, reject, _idx_call);
    typeof reslove == "function" ? reslove(res) : reslove;
  }, (res) => {
    typeof reject == "function" ? reject() : reject;
  })
}

//4.获取有效的banner信息
const indexGetBanner = (reslove, reject, place, _idx_call) => {
  if (!pub_auth()) {
    wxOauth(indexGetBanner, "", reslove, reject, _idx_call)
  }
  requestBase(`${baseUrl}wx/index/get_banner`, "", "GET").then((res) => {
    pub_err(res, indexGetBanner, "", reslove, reject, _idx_call);
    typeof reslove == "function" ? reslove(res) : reslove;
  }, (res) => {
    typeof reject == "function" ? reject() : reject;
  })
}

//5.获取商品类别
const goodsTypeAll = (reslove, reject, place, _idx_call) => {
  if (!pub_auth()) {
    wxOauth(goodsTypeAll, "", reslove, reject, _idx_call)
  }
  requestBase(`${baseUrl}goods/type_all`, "", "GET").then((res) => {
    pub_err(res, goodsTypeAll, "", reslove, reject, _idx_call);
    typeof reslove == "function" ? reslove(res) : reslove;
  }, (res) => {
    typeof reject == "function" ? reject() : reject;
  })
}

// 6.获取某一类别商品信息
const goodsGetByType = (params, _idx_call, reslove, reject) => {
  if (!pub_auth()) {
    wxOauth(goodsGetByType, params, reslove, reject, _idx_call)
  }
  requestBase(`${baseUrl}wx/goods/get_by_type`, params).then((res) => {
    pub_err(res, goodsGetByType, params, reslove, reject, _idx_call);
    typeof reslove == "function" ? reslove(res) : reslove;
  })
}

//7.获取最近收货人信息
const orderGetReserve = (params, _idx_call, reslove, reject) => {
  if (!pub_auth()) {
    wxOauth(orderGetReserve, params, reslove, reject, _idx_call)
  }
  requestBase(`${baseUrl}wx/order/get_receiver`, params).then((res) => {
    pub_err(res, orderGetReserve, params, reslove, reject, _idx_call);
    typeof reslove == "function" ? reslove(res) : reslove;
  })
}

//8.获取收藏，点赞操作
const goodsDoAction = (params, _idx_call, reslove, reject) => {
  if (!pub_auth()) {
    wxOauth(goodsDoAction, params, reslove, reject, _idx_call)
  }
  requestBase(`${baseUrl}wx/goods/do_action`, params).then((res) => {
    pub_err(res, goodsDoAction, params, reslove, reject, _idx_call);
    typeof reslove == "function" ? reslove(res) : reslove;
  })
}

//9.下单
const orderCreat = (params, _idx_call, reslove, reject) => {
  if (!pub_auth()) {
    wxOauth(orderCreat, params, reslove, reject, _idx_call)
  }
  requestBase(`${baseUrl}wx/order/create`, params).then((res) => {
    pub_err(res, orderCreat, params, reslove, reject, _idx_call);
    typeof reslove == "function" ? reslove(res) : reslove;
  })
}
//10.查询订单
const orderQuery = (params, _idx_call, reslove, reject) => {
  if (!pub_auth()) {
    wxOauth(orderQuery, params, reslove, reject, _idx_call)
  }
  requestBase(`${baseUrl}wx/order/query`, params).then((res) => {
    pub_err(res, orderQuery, params, reslove, reject, _idx_call);
    typeof reslove == "function" ? reslove(res) : reslove;
  })
}
//11.获取某一商品详情
const goodsGetOne = (params, _idx_call, reslove, reject) => {
  if (!pub_auth()) {
    wxOauth(goodsGetOne, params, reslove, reject, _idx_call)
  }
  requestBase(`${baseUrl}wx/goods/get_one`, params).then((res) => {
    pub_err(res, goodsGetOne, params, reslove, reject, _idx_call);
    typeof reslove == "function" ? reslove(res) : reslove;
  })
}
//12.个人中心
const mineCenter = (params, _idx_call, reslove, reject) => {
  if (!pub_auth()) {
    wxOauth(mineCenter, params, reslove, reject, _idx_call)
  }
  requestBase(`${baseUrl}wx/mine/center`, params).then((res) => {
    pub_err(res, mineCenter, params, reslove, reject, _idx_call);
    typeof reslove == "function" ? reslove(res) : reslove;
  })
}
//13.获取某一订单详情
const orderGetOne = (params, _idx_call, reslove, reject) => {
  if (!pub_auth()) {
    wxOauth(orderGetOne, params, reslove, reject, _idx_call)
  }
  requestBase(`${baseUrl}wx/order/get_one`, params).then((res) => {
    pub_err(res, orderGetOne, params, reslove, reject, _idx_call);
    typeof reslove == "function" ? reslove(res) : reslove;
  })
}
//14.获取订单自定义信息
const orderGetAttach = (params, _idx_call, reslove, reject) => {
  if (!pub_auth()) {
    wxOauth(orderGetAttach, params, reslove, reject, _idx_call)
  }
  requestBase(`${baseUrl}wx/order/get_attach`, params).then((res) => {
    pub_err(res, orderGetAttach, params, reslove, reject, _idx_call);
    typeof reslove == "function" ? reslove(res) : reslove;
  })
}

//15.添加订单自定义信息
const orderAddAttach = (params, _idx_call, reslove, reject) => {
  if (!pub_auth()) {
    wxOauth(orderAddAttach, params, reslove, reject, _idx_call)
  }
  requestBase(`${baseUrl}wx/order/add_attach`, params).then((res) => {
    pub_err(res, orderAddAttach, params, reslove, reject, _idx_call);
    typeof reslove == "function" ? reslove(res) : reslove;
  })
}

//16.置顶某一商品
const goodsGetOneEx = (params, _idx_call, reslove, reject) => {
  // if (!pub_auth()) {
  //   wxOauth(goodsGetOneEx, params, reslove, reject, _idx_call)
  // }
  requestBase(`${baseUrl}wx/goods/get_one_ex`, params).then((res) => {
    pub_err(res, goodsGetOneEx, params, reslove, reject, _idx_call);
    typeof reslove == "function" ? reslove(res) : reslove;
  })
}

//17.获取公众号名称
const indexGetName = (reslove, reject, place, _idx_call) => {
  if (!pub_auth()) {
    wxOauth(indexGetName, "", reslove, reject, _idx_call)
  }
  requestBase(`${baseUrl}wx/index/get_name`, "", "GET").then((res) => {
    pub_err(res, indexGetName, "", reslove, reject, _idx_call);
    typeof reslove == "function" ? reslove(res) : reslove;
  }, (res) => {
    typeof reject == "function" ? reject() : reject;
  })
}
//18.保存发布内容
const orderSaveAttach = (params, _idx_call, reslove, reject) => {
  // if (!pub_auth()) {
  //   wxOauth(goodsGetOneEx, params, reslove, reject, _idx_call)
  // }
  requestBase(`${baseUrl}wx/order/save_attach`, params).then((res) => {
    pub_err(res, goodsGetOneEx, params, reslove, reject, _idx_call);
    typeof reslove == "function" ? reslove(res) : reslove;
  })
}

//文件上传
const uploadFile = (params,success,fail) => {
  wx.uploadFile({
    url: baseUrl +"file/upload",
    filePath: params.path,
    name: params.name,
    formData: params.formData,
    success: (res) => {success(res) ||success ;},
    fail: (res) => { fail(res) || fail;},
  })
}

module.exports = {
  wxOauth,
  wxUpdateUserInfo,//更新个人信息
  indexGetItem,//获取有效官网首页展示
  indexGetBanner,//获取banner图
  goodsTypeAll,//获取商品类别
  goodsGetByType,//获取某一类别商品信息
  orderGetReserve,//获取最近收货人信息
  goodsDoAction,//收藏点赞
  orderCreat,//下单
  orderQuery,//查询订单
  goodsGetOne,//获取某一商品详情  分享进入使用 后台添加商品id使用
  mineCenter,//个人中心
  orderGetOne,//获取单个商品信息
  orderGetAttach,//获取二维码扫码信息
  orderAddAttach,//添加订单自定义信息
  goodsGetOneEx,//置顶商品信息
  uploadFile,//文件上传
  indexGetName,//获取公众号名称
  orderSaveAttach,//保存发布内容
}