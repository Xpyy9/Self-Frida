'use strict'
console.log("================动态HOOK函数===============");
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

(function (str) {
  if (ObjC.available) {
    console.log("ObjC对象已经加载！！！！");
    // for (var clsname in ObjC.classes) {
    //   console.log(clsname.$ownMethods);

    // }
  } else {
    console.log("No ObjC");
  }

  //调用类中的函数
  //var myMethod = eval(ObjC.classes._UIButtonBarTargetAction["- _invoke:forEvent:"]);
  var myMethod = findHookMethod("ANSMetadata", "- computeIsJailbroken")
  console.log(myMethod);
  //console.log("getMethod:" + getMethod);

  console.log(myMethod.implementation);
  Interceptor.attach((ptr(myMethod.implementation)), {
    onEnter: function (args) {
      console.log("on Enter .....");
      var arg2 = new ObjC.Object(args[2]);
      console.log(arg2);
    },
    onLeave: function (retval) {
      console.log("INFO :exiting .....");
    }
  });

  function findHookMethod (clsname, methname) {
    if (ObjC.available) {
      for (var classname in ObjC.classes) {
        if (ObjC.classes.hasOwnProperty(classname)) {
          if (classname == clsname) {
            console.log("findhookmethod:", ObjC.classes[clsname][methname]);
            console.log(ObjC.classes[clsname].$ownMethods);
            return ObjC.classes[clsname][methname];
          }
        }
      }
    }
    return;
  }

})