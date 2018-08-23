translate_info = JSON.parse(localStorage.getItem("translate_info"))
if(translate_info==null){
    translate_info = {
        "translate_auto": true,
        "translate_count":0,
    }
    localStorage.setItem("translate_info", JSON.stringify(translate_info))
}

localStorage_save = function (translate_info, key, value){
    translate_info[key] = value
    localStorage.setItem("translate_info", JSON.stringify(translate_info))
    return translate_info
}
var base_num = translate_info["translate_count"]
console.log(base_num)
var html = document.getElementById("test");
html.innerHTML = base_num
var btn = document.getElementById("btn");
function add(el,num) {
    var n = num;
    num++;
    el.innerHTML =num;
    base_num++;
    translate_info = localStorage_save(translate_info,"translate_count",base_num)
}
btn.onclick = function(){
    add(html,base_num)
}
$("#btn").css({"background":"red"})
