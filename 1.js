//输出调用的so文件

// var pth = Module.findExportByName(null,"open");
//   Interceptor.attach(ptr(pth),{
//       onEnter:function(args){
//           this.filename = args[0];
//           console.log("",this.filename.readCString())
//           if (this.filename.readCString().indexOf(".so") != -1){
//               args[0] = ptr(0)

//           }

//       },onLeave:function(retval){
//           return retval;
//       }
//   })


 
//打印调用栈
// Java.perform(function(){
//     send("print stack...");
//     var Web = Java.use("com.asiainfo.cbnmarket.web.WebViewActivity");

//     Web.a.implementation = function (a){
//         console.log(Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new()));
//         //throw Java.use("java.lang.Exception").$new();
//         return false
//     };
// });



//监听onclick事件
/*
var jclazz = null;
var jobj = null;

function getObjClassName(obj) {
    if (!jclazz) {
        var jclazz = Java.use("java.lang.Class");
    }
    if (!jobj) {
        var jobj = Java.use("java.lang.Object");
    }
    return jclazz.getName.call(jobj.getClass.call(obj));
}

function watch(obj, mtdName) {
    var listener_name = getObjClassName(obj);
    var target = Java.use(listener_name);
    if (!target || !mtdName in target) {
        return;
    }
    // send("[WatchEvent] hooking " + mtdName + ": " + listener_name);
    target[mtdName].overloads.forEach(function (overload) {
        overload.implementation = function () {
            //send("[WatchEvent] " + mtdName + ": " + getObjClassName(this));
            console.log("[WatchEvent] " + mtdName + ": " + getObjClassName(this))
            return this[mtdName].apply(this, arguments);
        };
    })
}

function OnClickListener() {
    Java.perform(function () {

        //以spawn启动进程的模式来attach的话
        Java.use("android.view.View").setOnClickListener.implementation = function (listener) {
            if (listener != null) {
                watch(listener, 'onClick');
            }
            return this.setOnClickListener(listener);
        };

        //如果frida以attach的模式进行attch的话
        Java.choose("android.view.View$ListenerInfo", {
            onMatch: function (instance) {
                instance = instance.mOnClickListener.value;
                if (instance) {
                    console.log("mOnClickListener name is :" + getObjClassName(instance));
                    watch(instance, 'onClick');
                }
            },
            onComplete: function () {
            }
        })

    })
}
setImmediate(OnClickListener);
*/

//过滤打印内存中的特定类
// Java.perform(function(){
//     Java.enumerateLoadedClasses({
//         onMatch: function(instance){
//         if (instance.split(".")[1] == "here is classname"){
//             console.log("[->]\t"+instance);
//         }
//         },
//         onComplete: function() {
//         console.log("[*] class enuemration complete");
//         }
//     });
// });

//监控 Toast 和 AlertDialog 弹窗事件
// Java.perform(function () {
//     try {
//         // Hook Toast.makeText 方法
//         var Toast = Java.use('android.widget.Toast');

//         Toast.makeText.overload('android.content.Context', 'java.lang.CharSequence', 'int').implementation = function (context, text, duration) {
//             console.log('[*] Toast.makeText called');
//             console.log('    Text: ' + text);
//             console.log('    Duration: ' + duration);
//             return this.makeText(context, text, duration); // 调用原始方法
//         };

//         // Hook AlertDialog.Builder.setMessage 方法
//         var AlertDialogBuilder = Java.use('android.app.AlertDialog$Builder');

//         AlertDialogBuilder.setMessage.overload('java.lang.CharSequence').implementation = function (message) {
//             console.log('[*] AlertDialog.Builder.setMessage called');
//             console.log('    Message: ' + message);
//             return this.setMessage(message); // 调用原始方法
//         };

//         // Hook AlertDialog.Builder.setTitle 方法
//         AlertDialogBuilder.setTitle.overload('java.lang.CharSequence').implementation = function (title) {
//             console.log('[*] AlertDialog.Builder.setTitle called');
//             console.log('    Title: ' + title);
//             return this.setTitle(title); // 调用原始方法
//         };

//         console.log('[*] Script loaded successfully.');
//     } catch (e) {
//         console.error('[!] Error: ' + e);
//     }
// });











