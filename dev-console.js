document.addEventListener("DOMContentLoaded", function(event) {
  var div = document.body.appendChild(document.createElement("div"));
  div.style = "position: fixed; bottom: 0; width: 100%;";
  var result = div.appendChild(document.createElement("textarea"));
  result.style = "width: 98%; border: none;";
  var cmd = div.appendChild(document.createElement("textarea"));
  cmd.style = "width: 100%;";
  cmd.placeholder = "Type JavaScript and hit Enter!";
  var ptr = 0;
  var arr = [];

  function run(){
    var script = cmd.value;
    if(script === ""){
      return;
    }
    arr.push(script);
    result.innerHTML += "\n> " + script;
    try{
      var cb = eval(script);
      if(cb === undefined){
        cb = "undefined";
      }else if(cb === ""){
          cb = '""';
      }
      result.innerHTML += "\n< " + cb;
      cmd.value = "";
    }catch(e){
      result.innerHTML += "\n< " + e;
      cmd.value = "";
    }
    result.scrollTop = 99999;
    ptr = 0;
  }

  cmd.addEventListener('keydown', function (e) {
      var key = e.which || e.keyCode;
      if (key === 13) {
        if(!e.shiftKey){
          e.preventDefault();
          run();
        }
      }else if(key === 38){
        if(arr.length !== 0){
          if(ptr === 0){
            ptr = arr.length - 1;
            cmd.value = arr[ptr];
          }else{
            ptr--;
            cmd.value = arr[ptr];
          }
        }
      }
  });
});
