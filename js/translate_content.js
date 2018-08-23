console.log("this is translate_content.js")
$("body").append("<div id='translate_content_card'>123</div>")
translate_content_card_move = false
translate_content_card_move_x = 0
translate_content_card_move_y = 0
mouse_x = null
mouse_y = null
mouse_move_x = null
mouse_move_y = null
$("body").on("mousedown","#translate_content_card",function(e){
    e.stopPropagation()
    e.preventDefault()
    translate_content_card_move = true
    translate_content_card_move_x = parseInt($("#translate_content_card").css("left"))
    translate_content_card_move_y = parseInt($("#translate_content_card").css("top"))
    mouse_x = e.clientX
    mouse_y = e.clientY
})
$(window).on("mousemove",function(e){
    if (translate_content_card_move){
        e.preventDefault()
        mouse_move_x = e.clientX
        mouse_move_y = e.clientY
        move_value_x = mouse_move_x - mouse_x
        move_value_y = mouse_move_y - mouse_y
        console.log(move_value_x,move_value_y)
        $("#translate_content_card").css(
            {
                "left":(translate_content_card_move_x+move_value_x)+"px",
                "top":(translate_content_card_move_y+move_value_y)+"px"
            }
        )
    }
})
$(window).on("mouseup",function(e){
    translate_content_card_move = false
})