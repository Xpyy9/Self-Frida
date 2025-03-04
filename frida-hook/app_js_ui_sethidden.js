console.log("================以下显示是UI界面sethidden===============");
// ObjC.schedule(ObjC.mainQueue, function () {
//   const window = ObjC.classes.UIWindow.keyWindow();
//   const ui = window.recursiveDescription().toString();
//   send({ ui: ui });
// });

// ObjC.schedule(ObjC.mainQueue, function () {
//   const window = ObjC.classes.UIWindow.keyWindow();
//   const rootControl = window.rootViewController();
//   const control = rootControl['- _printHierarchy']();
//   send({ ui: control.toString() });
// });
console.log(ObjC.available);
(function (str) {
  console.log(str);
  if (ObjC.available) {
    const window = ObjC.classes.UIWindow.keyWindow();
    const ui = window.recursiveDescription().toString();

    var view = new ObjC.Object(ptr(str));
    console.log(view);
    if (view.isHidden()) {
      // sleep(2000);
      view.setHidden_();
    } else {
      view.setHidden_('YES');
    }
    //send({ ui: ui });
    //console.log(ui);
    //const rootcontroller = window.rootViewController();
    //console.log("========");
    //调用实例方法
    /*
    const control = rootcontroller['- _printHierarchy']();
    console.log(control);
    */
    //console.log("=========");
    //通过内存地址，找controller


    // setTimeout("view.setHidden_();", 1000);

    // for (var i in view) {
    //   console.log(i);
    // }
    // var nextResponder = view.nextResponder();
    // nextResponder = new ObjC.Object(ptr(nextResponder));
    // console.log(view);

    /*
    //打印window下的所有方法
    for (var a in window) {
      console.log(a);
    }
    */

    // console.log([#0x100632fa0 subviews];
    //console.log(window.classes);
    //console.log(hexvalue);
  }
  function sleep (delay) {
    var start = (new Date()).getTime();
    while ((new Date()).getTime() - start < delay) {
      continue;
    }
  }
})