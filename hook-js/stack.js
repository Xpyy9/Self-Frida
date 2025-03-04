//打印堆栈hook的js

Java.perform(function () {
    var HttpRequestEntity = Java.use('cn.thecover.www.covermedia.data.entity.HttpRequestEntity');
        var threadef = Java.use('java.lang.Thread');
        var threadinstance = threadef.$new();

        function Where(stack){
            for(var i = 0; i < stack.length; ++i){
                send(stack[i].toString());
            }
        }

        HttpRequestEntity.getSign.implementation = function (arg1,arg2,arg3) {
            var ret = this.getSign(arg1,arg2,arg3);
            var stack = threadinstance.currentThread().getStackTrace();
            send("Full call stack:" + Where(stack));
            //send("Deobfuscated " + ret + " @ " + stack[3].toString());
            return ret;
    };
});