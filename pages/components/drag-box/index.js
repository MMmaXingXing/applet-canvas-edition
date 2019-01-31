Component({
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    properties: {
        w: {
            type: Number,
            value: 0,
        },
        h: {
            type: Number,
            value: 0,
        },
        type: String,
        dragx: String,
        dragy: String
    },
    attached() {
        var self = this;
        var dragx, dragy = "0"
        if (!!self.data.dragx) {
            dragx = self.data.dragx;
        }

        if (!!self.data.dragy) {
            dragy = self.data.dragy;
        }
        self.setData({
            drag_style: {
                x: dragx,
                y: dragy
            }
        })
    },
    ready() {
        var self = this;
        wx.getSystemInfo({
            success: function(res) {
                // 可使用窗口宽度、高度
                // console.log('height=' + res.windowHeight);
                // console.log('width=' + res.windowWidth);
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
    methods: {
        // 内部方法建议以下划线开头
        touchMoveChange(e) {
            var _e$currentTarget = e.currentTarget,
                currentTarget = _e$currentTarget === undefined ? {} : _e$currentTarget;
            var _currentTarget$datase = currentTarget.dataset,
                dataset = _currentTarget$datase === undefined ? {} : _currentTarget$datase;

            var tmpx = parseInt(e.touches[0].clientX);
            var tmpy = parseInt(e.touches[0].clientY);
            if (tmpx <= 0 || tmpy <= 0 || tmpx >= this.data.screen.width || tmpy >= this.data.screen.height) {

            } else {

                if (tmpx != this.data.preX || tmpy != this.data.preY) {
                    // console.log(e.touches[0].clientX, "-X-", e.touches[0].pageX)
                    // console.log(e.touches[0].clientY, "-Y-", e.touches[0].pageY)
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
            // this.triggerEvent('touchMove', {});
        },
        formSubmit() {
            this.triggerEvent('formAddEmit', {});
        }
    },
    data: {
        //内部属性 
        drag_style: {
            x: 0,
            y: 0
        },
        preX: "",
        preY: "",
        screen: {
            width: "",
            height: ""
        }
    }
})