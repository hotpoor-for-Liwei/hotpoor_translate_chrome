// Generated by CoffeeScript 2.3.0
(function() {
  console.log("this is translate_demo.js");

  $(function() {
    var mouse_move_x, mouse_move_y, mouse_x, mouse_y, translate_content_card_move, translate_content_card_move_x, translate_content_card_move_y;
    $("body").append("<div id=\"translate_content_card\">\n    <div id=\"translate_content_card_move\">\n        <img src=\"http://www.hotpoor.com/static/img/translate.png\" style=\"width:30px;height:30px;\">\n    </div>\n    <div id=\"translate_content_card_tools\" style=\"display:none\"></div>\n    <div id=\"translate_content_card_content\"></div>\n</div>");
    translate_content_card_move = false;
    translate_content_card_move_x = 0;
    translate_content_card_move_y = 0;
    mouse_x = null;
    mouse_y = null;
    mouse_move_x = null;
    mouse_move_y = null;
    $("body").on("mousedown", "#translate_content_card_move", function(e) {
      e.stopPropagation();
      e.preventDefault();
      translate_content_card_move = true;
      translate_content_card_move_x = parseInt($("#translate_content_card").css("left"));
      translate_content_card_move_y = parseInt($("#translate_content_card").css("top"));
      mouse_x = e.clientX;
      return mouse_y = e.clientY;
    });
    $(window).on("mousemove", function(e) {
      var move_value_x, move_value_y;
      if (translate_content_card_move) {
        if (e.which) {
          e.preventDefault();
          e.stopPropagation();
          mouse_move_x = e.clientX;
          mouse_move_y = e.clientY;
          move_value_x = mouse_move_x - mouse_x;
          move_value_y = mouse_move_y - mouse_y;
          return $("#translate_content_card").css({
            "left": (translate_content_card_move_x + move_value_x) + "px",
            "top": (translate_content_card_move_y + move_value_y) + "px"
          });
        } else {
          return translate_content_card_move = false;
        }
      }
    });
    return $(window).on("mouseup", function(e) {
      return translate_content_card_move = false;
    });
  });

}).call(this);
