//CA证书提取
Java.perform(function () {
    const CertificateFactory = Java.use('java.security.cert.CertificateFactory')
    const certList = [];
    CertificateFactory.getInstance.overload('java.lang.String').implementation=function (type) {
        certList[Thread.currentThread().getId()]=type
        return this.getInstance(type)
    }
CertificateFactory.generateCertificate.overload('java.io.InputStream').implementation=function (input) {
       var type= certList[Thread.currentThread().getId()]
        console.log("type:",type)
        console.log("hex:\n",input)
        console.log("hex:\n",tool.Hexdump(tool.FridaTool().readBin(input)))
        return this.generateCertificate(input)
    }

});