console.log("================以下显示是UI界面信息===============");
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
if (ObjC.available) {
  const window = ObjC.classes.UIWindow.keyWindow();
  const ui = window.recursiveDescription().toString();

  //send({ ui: ui });
  console.log(ui);
  console.log(window.rootViewController());
  console.log(window.classes);
}