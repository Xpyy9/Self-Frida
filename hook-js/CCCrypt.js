// 将以下代码添加到CCCrypt.js文件中打印更多信息便于分析
{
  onEnter: function (log, args, state) {
    log("CCCrypt(" +
      "op=" + args[0] +
      ", alg=" + args[1] +
      ", options=" + args[2] +
      ", key=" + args[3] +
      ", keyLength=" + args[4] +
      ", iv=" + args[5] +
      ", dataIn=" + args[6] +
      ", dataInLength=" + args[7] +
      ", dataOut=" + args[8] +
      ", dataOutAvailable=" + args[9] +
      ", dataOutMoved=" + args[10] +
    ")");

    //保存参数
    this.operation   = args[0]
    this.CCAlgorithm = args[1]
    this.CCOptions   = args[2]
    this.keyBytes    = args[3]
    this.keyLength   = args[4]
    this.ivBuffer    = args[5]
    this.inBuffer    = args[6]
    this.inLength    = args[7]
    this.outBuffer   = args[8]
    this.outLength   = args[9]
    this.outCountPtr = args[10]

  //this.operation == 0 代表是加密
    if (this.operation == 0) {
      //打印加密前的原文
        console.log("In buffer:")
        console.log(hexdump(ptr(this.inBuffer), {
            length: this.inLength.toInt32(),
            header: true,
            ansi: true
        }))
        //打印密钥
        console.log("Key: ")
        console.log(hexdump(ptr(this.keyBytes), {
            length: this.keyLength.toInt32(),
            header: true,
            ansi: true
        }))
        //打印 IV
        console.log("IV: ")
        console.log(hexdump(ptr(this.ivBuffer), {
            length: this.keyLength.toInt32(),
            header: true,
            ansi: true
        }))
    }
  },
  onLeave: function (log, retval, state) {
  }
}