'use strict';

var defaultData = require('./data');

// options 使用参数
// pageCtx 页面 page 上下文
function Dialog(options, pageCtx) {
  var parsedOptions = Object.assign({}, defaultData, options);

  var ctx = pageCtx;
  if (!ctx) {
    var pages = getCurrentPages();
    ctx = pages[pages.length - 1];
  }
  var dialogCtx = ctx.selectComponent(parsedOptions.selector);

  if (!dialogCtx) {
    console.error('无法找到对应的dialog组件，请于页面中注册并在 wxml 中声明 dialog 自定义组件');
    return Promise.reject({ type: 'component error' });
  }

  // 处理默认按钮的展示
  // 纵向排布确认按钮在上方
  var _parsedOptions$button = parsedOptions.buttons,
      buttons = _parsedOptions$button === undefined ? [] : _parsedOptions$button;

  var showCustomBtns = false;
  if (buttons.length === 0) {
    if (parsedOptions.showConfirmButton) {
      buttons.push({
        type: 'confirm',
        text: parsedOptions.confirmButtonText,
        color: parsedOptions.confirmButtonColor
      });
    }

    if (parsedOptions.showCancelButton) {
      var cancelButton = {
        type: 'cancel',
        text: parsedOptions.cancelButtonText,
        color: parsedOptions.cancelButtonColor
      };
      if (parsedOptions.buttonsShowVertical) {
        buttons.push(cancelButton);
      } else {
        buttons.unshift(cancelButton);
      }
    }
  } else {
    showCustomBtns = true;
  }

  return new Promise(function (resolve, reject) {
    dialogCtx.setData(Object.assign({}, parsedOptions, {
      buttons: buttons,
      showCustomBtns: showCustomBtns,
      key: '' + new Date().getTime(),
      show: true,
      promiseFunc: { resolve: resolve, reject: reject }
    }));
  });
}

module.exports = Dialog;