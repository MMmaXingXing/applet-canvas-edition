//index.js
//获取应用实例
const app = getApp()
const Dialog = require("../components/dialog/dialog/dialog");
import {
  wxOauth,
  wxUpdateUserInfo,
  indexGetItem,
  indexGetBanner,
  indexGetName
} from "../../utils/api.js"

let itemList = [{
  id: 3,
  type: "img",
  image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541404732&di=ee13e6dedbc72c8a5306f21d82a52aef&imgtype=jpg&er=1&src=http%3A%2F%2Fpic.qiantucdn.com%2F58pic%2F13%2F17%2F96%2F89R58PICwZJ_1024.jpg',
  top: 50,
  left: 50,
  shape: "",
  x: 155,
  y: 155,
  scale: 1,
  angle: 0,
  active: false,
  new_rotate: 0,
  rotate: 0,
  width: 50,
  height: 50,
}, {
  id: 0,
  type: "img",
  image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541404732&di=ee13e6dedbc72c8a5306f21d82a52aef&imgtype=jpg&er=1&src=http%3A%2F%2Fpic.qiantucdn.com%2F58pic%2F13%2F17%2F96%2F89R58PICwZJ_1024.jpg', //图片地址
  shape: "round", // 形状 round 原型
  top: 100, //初始图片的位置 
  left: 100,
  x: 155, //初始圆心位置，可再downImg之后又宽高和初始的图片位置得出
  y: 155,
  scale: 1, //缩放比例  1为不缩放
  angle: 0, //旋转角度
  active: false, //判定点击状态,
  new_rotate: 0,
  rotate: 0,
  width: 100,
  height: 100,
}, {
  id: 1,
  type: "img",
  shape: "",
  image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541404732&di=ee13e6dedbc72c8a5306f21d82a52aef&imgtype=jpg&er=1&src=http%3A%2F%2Fpic.qiantucdn.com%2F58pic%2F13%2F17%2F96%2F89R58PICwZJ_1024.jpg',
  top: 50,
  left: 50,
  x: 155,
  y: 155,
  scale: 1,
  angle: 0,
  active: false,
  new_rotate: 0,
  rotate: 0,
  width: 50,
  height: 50,
}, {
  id: 2,
  type: "text",
  shape: "",
  image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541404732&di=ee13e6dedbc72c8a5306f21d82a52aef&imgtype=jpg&er=1&src=http%3A%2F%2Fpic.qiantucdn.com%2F58pic%2F13%2F17%2F96%2F89R58PICwZJ_1024.jpg',
  top: 50,
  left: 50,
  x: 155,
  y: 155,
  scale: 1,
  angle: 0,
  active: false,
  new_rotate: 0,
  rotate: 0,
  width: 0,
  height: 0,
  content: "12345613"
}]
var allImageCount = 0;
var items = [];
var index = 0;
var windowWidth = 750;

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    allList: itemList,
    baseCircleData: {
      id: 2,
      type: "img",
      shape: "",
      image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1541404732&di=ee13e6dedbc72c8a5306f21d82a52aef&imgtype=jpg&er=1&src=http%3A%2F%2Fpic.qiantucdn.com%2F58pic%2F13%2F17%2F96%2F89R58PICwZJ_1024.jpg',
      top: 50,
      left: 50,
      x: 155,
      y: 155,
      scale: 1,
      angle: 0,
      active: false,
      new_rotate: 0,
      rotate: 0,
      width: 50,
      height: 50,
    },
    item: {
      color: "",
    },
    canvasPre: 100,
    hasActive: false,
    edition: true,
    canvas_show: false,
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onLoad: function() {
    var self = this;
    this.pubRotate = 0;
    items = this.data.allList;
    wx.getSystemInfo({
      success: function(res) {
        // itemList[0].width = res.windowWidth;
        // itemList[0].height = res.windowHeight;
        // self.setData({
        //   allList: itemList,
        // })
      }
    })
    allImageCount = 0;
    items.forEach((item, index) => {
      if (item.type == "img") {
        ++allImageCount;
      }
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  /**
   * 删除组件
   */
  onDel() {
    var self = this;
    for (let i = 0; i < items.length; i++) { //旋转数据找到点击的
      if (items[i].active === true) {
        index = i; //记录下标
      }
    }
    if (items[index].type == "img") {
      --allImageCount;
    }
    items.splice(index, 1);
    this.setData({
      allList: items,
      hasActive: false
    })
  },
  blur() {
    var self = this;
    for (let i = 0; i < items.length; i++) { //旋转数据找到点击的
      items[i].active = false;
    }
    this.setData({
      allList: items,
      hasActive: false
    })
  },
  onShow() {
    var self = this;
    this.maskCanvas = wx.createCanvasContext("showImage", this);
    wx.getSystemInfo({
      success: function(res) {
        // 可使用窗口宽度、高度
        console.log('height=' + res.windowHeight);
        console.log('width=' + res.windowWidth);
        // Math.ceil()

        if (res.platform == "android") {
          res.windowHeight = res.screenHeight;
        }

        self.sysData = {
          windowWidth: res.windowWidth,
          windowHeight: res.windowHeight
        }

        // self.setData({
        //   screen: {
        //     width: res.windowWidth,
        //     height: res.windowHeight,
        //     pixelRatio: res.pixelRatio,
        //     ratio: res.windowWidth * res.pixelRatio / 750
        //   }
        // })
      }
    })
  },
  /**
   * 移动组件函数 start
   */
  moveStart(e) {
    var self = this;
    for (let i = 0; i < items.length; i++) { //旋转数据找到点击的
      items[i].active = false;
      if (e.currentTarget.dataset.id == items[i].id) {
        index = i; //记录下标
        items[index].active = true; //开启点击属性
      }
    }

    items[index].lx = e.touches[0].clientX; // 记录点击时的坐标值
    items[index].ly = e.touches[0].clientY;

    var query = wx.createSelectorQuery()

    if (items[index].width == 0) {
      query.select('#drag-' + items[index].id + " .drag-text").fields({
        dataset: true,
        size: true,
        scrollOffset: true,
        rect: true,
        properties: ['scrollX', 'scrollY'],
        computedStyle: ['fontSize', 'color', 'transform']
      }, function(res) {
        items[index].width = res.width || 50;
        items[index].height = res.height || 50;
      }).exec(function(res) {});
    }

    this.setData({ //赋值 
      allList: items,
      hasActive: true
    })
  },
  onMove(e) {
    //移动时的坐标值也写图片的属性里
    items[index]._lx = e.touches[0].clientX;
    items[index]._ly = e.touches[0].clientY;

    //追加改动值
    items[index].left += items[index]._lx - items[index].lx; // x方向
    items[index].top += items[index]._ly - items[index].ly; // y方向
    items[index].x += items[index]._lx - items[index].lx;
    items[index].y += items[index]._ly - items[index].ly;

    //把新的值赋给老的值
    items[index].lx = e.touches[0].clientX;
    items[index].ly = e.touches[0].clientY;
    this.setData({ //赋值就移动了
      allList: items
    })
  },
  //获取数据移动前的角度
  countDeg(cx, cy, pointer_x, pointer_y) {
    var ox = pointer_x - cx;
    var oy = pointer_y - cy;
    var to = Math.abs(ox / oy);
    var angle = Math.atan(to) / (2 * Math.PI) * 360; //鼠标相对于旋转中心的角度
    if (ox < 0 && oy < 0) //相对在左上角，第四象限，js中坐标系是从左上角开始的，这里的象限是正常坐标系  
    {
      angle = -angle;
    } else if (ox <= 0 && oy >= 0) //左下角,3象限  
    {
      angle = -(180 - angle)
    } else if (ox > 0 && oy < 0) //右上角，1象限  
    {
      angle = angle;
    } else if (ox > 0 && oy > 0) //右下角，2象限  
    {
      angle = 180 - angle;
    }
    return angle;
  },
  //计算触摸点到圆心的距离

  getDistancs(cx, cy, pointer_x, pointer_y) {
    var ox = pointer_x - cx;
    var oy = pointer_y - cy;
    return Math.sqrt(
      ox * ox + oy * oy
    );
  }, //旋转放大缩小事件

  // 触摸开始事件  items是this.data.itemList的全局变量，便于赋值  所有的值都应给到对应的对象里
  touchStart: function(e) {
    //找到点击的那个图片对象，并记录
    for (let i = 0; i < items.length; i++) {
      items[i].active = false;

      if (e.currentTarget.dataset.id == items[i].id) {
        console.log('e.currentTarget.dataset.id', e.currentTarget.dataset.id)
        index = i;
        items[index].active = true;
      }
    }
    //获取作为移动前角度的坐标
    items[index].tx = e.touches[0].clientX;
    items[index].ty = e.touches[0].clientY;

    items.pre_width = items.width;
    items.pre_height = items.height;
    //移动前的角度
    items[index].anglePre = this.countDeg(items[index].x, items[index].y, items[index].tx, items[index].ty)
    //获取图片半径
    items[index].r = this.getDistancs(items[index].x, items[index].y, items[index].left, items[index].top)
  },
  // 触摸移动事件  
  touchMove: function(e) {

    //记录移动后的位置
    items[index]._tx = e.touches[0].clientX;
    items[index]._ty = e.touches[0].clientY;
    //移动的点到圆心的距离  * 因为圆心的坐标是相对与父元素定位的 ，所有要减去父元素的OffsetLeft和OffsetTop来计算移动的点到圆心的距离
    items[index].disPtoO = this.getDistancs(items[index].x, items[index].y, items[index]._tx - windowWidth * 0.125, items[index]._ty - 10)

    // //计算移动后的宽高
    items[index].width += (items[index]._tx - items[index].tx);
    items[index].height += (items[index]._ty - items[index].ty);

    if (items[index].shape == "round") {
      if ((items[index]._tx - items[index].tx) > 0) {
        items[index].width = items[index].height;
      } else {
        items[index].width = items[index].height;
      }
    }


    //用过移动后的坐标赋值为移动前坐标
    items[index].tx = e.touches[0].clientX;
    items[index].ty = e.touches[0].clientY;
    items[index].anglePre = this.countDeg(items[index].x, items[index].y, items[index].tx, items[index].ty)

    //赋值setData渲染
    this.setData({
      allList: items
    })
  },
  touchRotate: function(e) {

    if (this.pubRotate >= 3) {
      this.pubRotate = 0;
    } else {
      ++this.pubRotate;
      return;
    }
    // //记录移动后的位置
    items[index]._tx = e.touches[0].clientX;
    items[index]._ty = e.touches[0].clientY;
    //移动的点到圆心的距离  * 因为圆心的坐标是相对与父元素定位的 ，所有要减去父元素的OffsetLeft和OffsetTop来计算移动的点到圆心的距离
    items[index].disPtoO = this.getDistancs(items[index].x, items[index].y, items[index]._tx - windowWidth * 0.125, items[index]._ty - 10)
    // items[index].scale = items[index].disPtoO / items[index].r; //手指滑动的点到圆心的距离与半径的比值作为图片的放大比例
    // items[index].oScale = 1 / items[index].scale; //图片放大响应的右下角按钮同比缩小

    //移动后位置的角度
    items[index].angleNext = this.countDeg(items[index].x, items[index].y, items[index]._tx, items[index]._ty)
    //角度差
    items[index].new_rotate = items[index].angleNext - items[index].anglePre;

    //叠加的角度差
    items[index].rotate += items[index].new_rotate;
    items[index].angle = items[index].rotate; //赋值


    //用过移动后的坐标赋值为移动前坐标
    items[index].tx = e.touches[0].clientX;
    items[index].ty = e.touches[0].clientY;
    items[index].anglePre = this.countDeg(items[index].x, items[index].y, items[index].tx, items[index].ty)

    //赋值setData渲染
    this.setData({
      allList: items
    })
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  eventTrigger(e) {
    let item = "";
    switch (e.detail) {
      case "template":

        break;
      case "circle":
        this.data.baseCircleData.id = this.data.allList.length;
        this.data.baseCircleData.type = "img";
        this.data.baseCircleData.shape = "round";
        item = Object.assign({}, this.data.baseCircleData);
        ++allImageCount
        items.push(item);
        this.setData({
          allList: items
        })
        break;
      case "square":
        this.data.baseCircleData.id = this.data.allList.length;
        this.data.baseCircleData.type = "img";
        this.data.baseCircleData.shape = "";
        item = Object.assign({}, this.data.baseCircleData);
        ++allImageCount
        items.push(item);
        this.setData({
          allList: items
        })
        break;
      case "text":
        this.data.baseCircleData.id = this.data.allList.length;
        this.data.baseCircleData.width = 0;
        this.data.baseCircleData.height = 0;
        this.data.baseCircleData.type = "text";
        this.data.baseCircleData.shape = "";
        this.data.baseCircleData.content = "22222222";
        item = Object.assign({}, this.data.baseCircleData);
        items.push(item);
        this.setData({
          allList: items
        })
        break;
      case "save":
        this.downImage();
        break;
    }
  },
  save: function() {
    var self = this;
    let maskCanvas = this.maskCanvas;
    var query = wx.createSelectorQuery()

    var num = 1; // 追加到canvas的比例
    maskCanvas.save();
    maskCanvas.beginPath();
    maskCanvas.setFillStyle('pink');
    maskCanvas.fillRect(0, 0, self.sysData.windowWidth, self.sysData.windowHeight);
    maskCanvas.closePath();
    maskCanvas.stroke();
    maskCanvas.draw();

    //获取当前元素dom节点
    items.forEach((currentValue, index) => {
      console.log(currentValue)
      let query = wx.createSelectorQuery();
      if (currentValue.type == "img") {
        if (currentValue.shape == 'round') {
          query.select('#drag-' + currentValue.id + " .drag-content-image").boundingClientRect(function(res) {
            maskCanvas.save();
            maskCanvas.beginPath();
            maskCanvas.translate((currentValue.left + 6 + currentValue.width / 2), (currentValue.top + 6 + currentValue.height / 2))
            maskCanvas.rotate(currentValue.angle * Math.PI / 180); // 旋转值
            maskCanvas.arc(0, 0, (currentValue.width / 2) * num, 0, 2 * Math.PI, false);
            maskCanvas.clip(); //截取
            maskCanvas.drawImage(currentValue.downImage, -(currentValue.width / 2), -(currentValue.height / 2), currentValue.width * num, currentValue.height * num);
            maskCanvas.restore();
            maskCanvas.draw(true);
          }).exec(function(res) {});
        } else {
          query.select('#drag-' + currentValue.id + " .drag-content-image").boundingClientRect(function(res) {
            maskCanvas.save();
            maskCanvas.beginPath();
            maskCanvas.translate((currentValue.left + 6 + currentValue.width / 2), (currentValue.top + 6 + currentValue.height / 2))
            maskCanvas.rotate(currentValue.angle * Math.PI / 180); // 旋转值
            maskCanvas.translate(-(currentValue.width / 2), -(currentValue.height / 2))
            console.log(currentValue.angle + "---" + currentValue.angle * Math.PI / 180)
            maskCanvas.drawImage(currentValue.downImage, 0, 0, currentValue.width * num, currentValue.height * num);
            maskCanvas.restore();
            maskCanvas.draw(true);
          }).exec(function(res) {});

        }
      } else if (currentValue.type == "text") {
        query.select('#drag-' + currentValue.id + " .drag-text").fields({
          dataset: true,
          size: true,
          scrollOffset: true,
          rect: true,
          properties: ['scrollX', 'scrollY'],
          computedStyle: ['fontSize', 'color', 'transform']
        }, function(res) {
          maskCanvas.save();
          maskCanvas.beginPath();
          // let fontSize = this.sysData.screenWidth / 375 * 15;
          // let textColor = obj.color || '#000';
          let textColor = res.color;
          maskCanvas.setFontSize(res.fontSize.substr(0, res.fontSize.length - 2));
          maskCanvas.translate((currentValue.left + (currentValue.width / 2) + 6), (currentValue.top + (currentValue.height / 2) + 6));
          maskCanvas.rotate(currentValue.angle * Math.PI / 180); // 旋转值
          maskCanvas.translate(-(currentValue.width / 2), (res.fontSize.substr(0, res.fontSize.length - 2)) - (currentValue.height / 2));
          //y转换规则为 －元素的高的一半 加上文字的行高 行高的计算规则是 文字所在盒子的高度 - 文字字体大小  
          maskCanvas.setFillStyle(textColor)
          maskCanvas.setTextAlign('left')
          maskCanvas.fillText(currentValue.content, 0, 0, res.width);
          maskCanvas.stroke();
          maskCanvas.restore();
          maskCanvas.draw(true);
        }).exec(function(res) {});
      }
    })

    maskCanvas.draw(true);
    setTimeout(function() {
      wx.canvasToTempFilePath({
        canvasId: 'showImage',
        success: res => {
          console.log(res.tempFilePath);
          self.setData({
            canvasTemImg: res.tempFilePath
          })
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success() {
              wx.showToast({
                title: '图片已保存至相册'
              });
              self.setData({
                dataImaage: res.tempFilePath,
              })
            }
          });
        }
      })
    }, 2000);

    this.setData({
      canvas_show: true
    })
  },
  downImage() {
    var downImageList = [];
    var self = this;
    items.forEach((currentValue, index) => {
      if (currentValue.type == "img") {
        wx.downloadFile({
          url: currentValue.image, //仅为示例，并非真实的资源
          fileType: "jpg",
          quality: 1,
          success(res) {
            // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
            if (res.statusCode === 200) {
              items[index].downImage = res.tempFilePath;
              downImageList.push(res.tempFilePath);
              console.log(res.tempFilePath);
              if (downImageList.length == allImageCount) {
                self.save();
              }
            }
          }
        })
      }
    })
  },
  closeCanvas() {
    this.setData({
      canvas_show: false
    })
  },
  getUser: function() {
    app.getUser(function(res) {

    }, (res) => {
      app.getNewUser(Dialog, "");
    });
    wx.getUserInfo({
      lang: "zh_CN",
      success: function(res) {
        console.log(wx.getStorageSync("ouath").sessionId);
        let params = {
          sessionId: wx.getStorageSync("ouath").sessionId,
          nick_name: res.userInfo.nickName,
          headimg_url: res.userInfo.avatarUrl,
          city: res.userInfo.city,
          sex: res.userInfo.gender,
          province: res.userInfo.province,
          country: res.userInfo.country,
        }
        wxUpdateUserInfo(params, 1);
        wx.setStorageSync("userInfo", res.userInfo)
      },
    })
  },
})