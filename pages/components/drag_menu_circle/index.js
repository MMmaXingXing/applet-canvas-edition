// pages/components/drag_menu_circle/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    isPopping: false, //是否已经弹出
    animPlus: {}, //旋转动画
    animCollect: {}, //item位移,透明度
    animTranspond: {}, //item位移,透明度
    animInput: {}, //item位移,透明度
    //内部属性 
    drag_style: {
      x: "32px",
      y: "480px"
    },
    preX: "",
    preY: "",
    screen: {
      width: "",
      height: ""
    },
    w: 50,
    h: 50,
    type: "",
    dragx: "",
    dragy: ""
  },

  ready() {
    var self = this;
    this.pubMove = 0;
    wx.getSystemInfo({
      success: function (res) {
        // 可使用窗口宽度、高度
        console.log('height=' + res.windowHeight);
        console.log('width=' + res.windowWidth);
        // Math.ceil()

        if (res.platform == "android") {
          res.windowHeight = res.screenHeight;
        }


        self.setData({
          screen: {
            width: res.windowWidth,
            height: res.windowHeight,
            pixelRatio: res.pixelRatio,
            ratio: res.windowWidth * res.pixelRatio / 750
          }
        })
      }
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //点击弹出
    plus: function() {
      if (this.data.isPopping) {
        //缩回动画
        this.popp();
        this.setData({
          isPopping: false
        })
      } else if (!this.data.isPopping) {
        //弹出动画
        this.takeback();
        this.setData({
          isPopping: true
        })
      }
    },
    // 内部方法建议以下划线开头
    touchMoveChange(e) {

      if (this.pubMove >= 3) {
        this.pubMove = 0;
      } else {
        ++this.pubMove;
        return;
      }
      this.takeback();
      this.setData({
        isPopping: true
      })
      var _e$currentTarget = e.currentTarget,
        currentTarget = _e$currentTarget === undefined ? {} : _e$currentTarget;
      var _currentTarget$datase = currentTarget.dataset,
        dataset = _currentTarget$datase === undefined ? {} : _currentTarget$datase;

      var tmpx = parseInt(e.touches[0].clientX);
      var tmpy = parseInt(e.touches[0].clientY);
      if (tmpx <= 0 || tmpy <= 0 || tmpx >= this.data.screen.width-50 || tmpy >= this.data.screen.height-60) {

      } else {
        if (tmpx != this.data.preX || tmpy != this.data.preY) {
          this.data.preX = tmpx
          this.data.preY = tmpy
          this.setData({
            drag_style: {
              x: tmpx - this.data.w + "px",
              y: tmpy - this.data.h + "px",
            }
          })
        }
      }
    },
    input: function() {
      console.log("input")
    },
    transpond: function() {
      console.log("transpond")
    },
    collect: function() {
      console.log("collect")
    },

    //弹出动画
    popp: function() {

      //plus顺时针旋转
      var animationPlus = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease-out'
      })
      var animationcollect = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease-out'
      })
      var animationTranspond = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease-out'
      })
      var animationInput = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease-out'
      })
      var animTopOne = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease-out'
      })
      var animTopFive = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease-out'
      })
      var x = (typeof this.data.drag_style.x) == 'number' ? 0 : this.data.drag_style.x.slice(0, -2);
      if (this.data.screen.width / 2 > x) {
        animationPlus.rotateZ(180).step();
        animTopOne.translate(0, -100).rotateZ(180).opacity(1).step();
        animationcollect.translate(60, 60).rotateZ(180).opacity(1).step();
        animationTranspond.translate(100, 0).rotateZ(180).opacity(1).step();
        animationInput.translate(60, -60).rotateZ(180).opacity(1).step();
        animTopFive.translate(0, 100).rotateZ(180).opacity(1).step();
      } else {
        animationPlus.rotateZ(180).step();
        animTopOne.translate(0, -100).rotateZ(180).opacity(1).step();
        animationcollect.translate(-60, -60).rotateZ(180).opacity(1).step();
        animationTranspond.translate(-100, 0).rotateZ(180).opacity(1).step();
        animationInput.translate(-60, 60).rotateZ(180).opacity(1).step();
        animTopFive.translate(0, 100).rotateZ(180).opacity(1).step();
      }
      this.setData({
        animPlus: animationPlus.export(),
        animCollect: animationcollect.export(),
        animTranspond: animationTranspond.export(),
        animInput: animationInput.export(),
        animTopOne: animTopOne.export(),
        animTopFive: animTopFive.export(),
      })
    },
    //收回动画
    takeback: function() {
      //plus逆时针旋转
      var animationPlus = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease-out'
      })
      var animationcollect = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease-out'
      })
      var animationTranspond = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease-out'
      })
      var animationInput = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease-out'
      })
      var animTopOne = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease-out'
      })
      var animTopFive = wx.createAnimation({
        duration: 500,
        timingFunction: 'ease-out'
      })
      animationPlus.rotateZ(0).step();
      animTopOne.translate(0, 0).rotateZ(0).opacity(0).step();
      animTopFive.translate(0, 0).rotateZ(0).opacity(0).step();
      animationcollect.translate(0, 0).rotateZ(0).opacity(0).step();
      animationTranspond.translate(0, 0).rotateZ(0).opacity(0).step();
      animationInput.translate(0, 0).rotateZ(0).opacity(0).step();
      this.setData({
        animPlus: animationPlus.export(),
        animCollect: animationcollect.export(),
        animTranspond: animationTranspond.export(),
        animInput: animationInput.export(),
        animTopOne: animTopOne.export(),
        animTopFive: animTopFive.export(),
      })
    },
    triggrtEventClick(e){
      // console.log(e.currentTarget.dataset.type)
      this.triggerEvent("eventTrigger",e.currentTarget.dataset.type);
    }
  }
})