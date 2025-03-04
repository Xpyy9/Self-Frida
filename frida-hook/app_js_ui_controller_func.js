console.log("================通过UI查找对应函数===============");
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
    console.log("UI:\t\t\t:" + view);
    var nextResponder = view.nextResponder();
    nextResponder = new ObjC.Object(ptr(nextResponder));
    console.log(nextResponder);
    var deep = 0;
    var pre = '';
    while (nextResponder) {
      pre += '-';
      send({ ui: pre + '>' + nextResponder.toString() });
      nextResponder = nextResponder.nextResponder();
      nextResponder = new ObjC.Object(ptr(nextResponder));
    }

    // for (var i in view) {
    //   console.log(i);
    // }
    // console.log("alltarges=======");
    //console.log(view.allTargets().allObjects().count());

    // console.log("Events\t\t\t:" + view.allControlEvents());
    // for (var i = 0; i < view.allTargets().allObjects().count(); i++) {
    //   var target = view.allTargets().allObjects().objectAtIndex_(i)
    //   var actions = view.actionsForTarget_forControlEvent_(target, view.allControlEvents());
    //   if (actions != null) {
    //     var actioncount = actions.count();
    //     for (var j = 0; j < actioncount; j++) {
    //       var clsname = target.toString();
    //       var action = actions.objectAtIndex_(j).toString();
    //       var addr = get_object_method_address(target, action)
    //       console.log("Target Class name\t:" + clsname);
    //       console.log("Action\t\t\t:" + action);
    //       console.log("path\t\t\t:" + addr);
    //     }
    //   }



    // }

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

  function get_object_method_address (object, action) {
    var class_getMethodImplementation = new NativeFunction(Module.findExportByName(null, "class_getMethodImplementation"), "pointer", ["pointer", "pointer"]);
    var imp = class_getMethodImplementation(object.class(), ObjC.selector(action));
    var mod = Process.getModuleByAddress(imp);
    return mod['path'] + '!' + imp.sub(mod['base']) + '!' + imp.sub(mod['size']);
  }
})