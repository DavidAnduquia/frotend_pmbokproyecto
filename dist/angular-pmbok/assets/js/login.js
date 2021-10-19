 
function _id(name){
    return document.getElementById(name);
}

function _class(name){
  return document.getElementsByClassName(name);
}

  _class("toggle-password")[0].addEventListener("click",function(){
    _class("toggle-password")[0].classList.toggle("active");
    if(_id("password-field").getAttribute("type") == "password"){
      _id("password-field").setAttribute("type","text");
    } else {
      _id("password-field").setAttribute("type","password");
    }
  });


  _id("password-field").addEventListener("focus",function(){
    _class("password-policies")[0].classList.add("active");
  });
  _id("password-field").addEventListener("blur",function(){
    _class("password-policies")[0].classList.remove("active");
  });