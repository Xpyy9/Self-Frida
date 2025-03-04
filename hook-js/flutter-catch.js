function hook_ssl_verify_result(address)
{
  Interceptor.attach(address, {
    onEnter: function(args) {
      console.log("Disabling SSL validation")
    },
    onLeave: function(retval)
    {
      console.log("Retval: " + retval)
      retval.replace(0x1);
 
    }
  });
}

function disablePinning()
{
 var m = Process.findModuleByName("libflutter.so"); 
 var pattern = "ff c3 01 d1 fd 7b 01 a9 fc 6f 02 a9"
 var res = Memory.scan(m.base, m.size, pattern, {
  onMatch: function(address, size){
      console.log('[+] ssl_verify_result found at: ' + address.toString());
 
      // Add 0x01 because it's a THUMB function
      // Otherwise, we would get 'Error: unable to intercept function at 0x9906f8ac; please file a bug'
      hook_ssl_verify_result(address.add(0x01));
       
    }, 
  onError: function(reason){
      console.log('[!] There was an error scanning memory');
    },
    onComplete: function()
    {
      console.log("All done")
    }
  });
}
setTimeout(disablePinning, 1000)