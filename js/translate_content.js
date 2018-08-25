// Generated by CoffeeScript 2.3.0
(function() {
  console.log("this is translate_demo.js");

  $(function() {
    var getWord, hotpoor_translate, hotpoor_translate_save, isChina, latest_translate_content, mouse_move_x, mouse_move_y, mouse_x, mouse_y, translate_content_card_control, translate_content_card_move, translate_content_card_move_x, translate_content_card_move_y, translate_content_card_show;
    translate_content_card_show = false;
    isChina = function(s) {
      var patrn;
      patrn = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;
      if (!patrn.exec(s)) {
        return false;
      } else {
        return true;
      }
    };
    hotpoor_translate_save = null;
    hotpoor_translate = function(content, fromLan, toLan) {
      clearTimeout(hotpoor_translate_save);
      return hotpoor_translate_save = setTimeout(function() {
        var content_result;
        content_result = "";
        $("#translate_content_card_content_aim").empty();
        $("#translate_content_card_move_title").text("翻译中·Translating...");
        return $.ajax({
          url: "https://www.hotpoor.com/api/baiduai/translate",
          data: {
            content: content,
            lan: fromLan,
            to: toLan
          },
          dataType: 'json',
          type: 'POST',
          success: function(data) {
            var content_results, i, j, len, len1, ref, result, result_i;
            console.log(data);
            if (data.result != null) {
              ref = data.result;
              for (i = 0, len = ref.length; i < len; i++) {
                result_i = ref[i];
                content_results = result_i["trans_result"];
                for (j = 0, len1 = content_results.length; j < len1; j++) {
                  result = content_results[j];
                  content_result = `${content_result}\n<div>${result["dst"]}</div>`;
                }
                $("#translate_content_card_content_aim").html(content_result);
                $("#translate_content_card_move_count").html(`${content_result.length}/1000`);
              }
            }
            return $("#translate_content_card_move_title").text("翻译·Translate");
          },
          error: function(data) {
            console.log(data);
            return $("#translate_content_card_move_title").text("翻译·Translate");
          }
        });
      }, 300);
    };
    $("body").append("<div id=\"translate_content_card\" style=\"display:none;\">\n    <div id=\"translate_content_card_move\">\n        <img src=\"https://www.hotpoor.com/static/img/translate.png\">\n        <span id=\"translate_content_card_move_title\">翻译·Translate</span>\n        <span id=\"translate_content_card_move_count\">0/1000</span>\n    </div>\n    <div id=\"translate_content_card_tools\" style=\"display:none\"></div>\n    <div id=\"translate_content_card_content\">\n        <div id=\"translate_content_card_content_aim\" contenteditable=\"true\"></div>\n    </div>\n</div>");
    translate_content_card_control = false;
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
      // translate_content_card_move_x = parseInt $("#translate_content_card").css("left")
      // translate_content_card_move_y = parseInt $("#translate_content_card").css("top")
      translate_content_card_move_x = parseInt($("#translate_content_card").css("right"));
      translate_content_card_move_y = parseInt($("#translate_content_card").css("top"));
      mouse_x = e.clientX;
      return mouse_y = e.clientY;
    });
    $("body").on("mouseup", "#translate_content_card", function(e) {
      e.stopPropagation();
      e.preventDefault();
      return translate_content_card_control = true;
    });
    $("body").on("mousedown", "#translate_content_card", function(e) {
      return translate_content_card_control = true;
    });
    $("body").on("mouseup", "#translate_content_card_onoff", function(e) {
      var mouse_x_now, mouse_y_now;
      console.log("body click translate_content_card_onoff hide");
      $("#translate_content_card").show();
      translate_content_card_show = true;
      mouse_x_now = e.clientX + 5;
      mouse_y_now = e.clientY - 10;
      $("#translate_content_card").css({
        "right": ($(window).width() - mouse_x_now - 260) + "px",
        "top": mouse_y_now + "px"
      });
      return $("#translate_content_card_onoff").remove();
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
            // "left":(translate_content_card_move_x+move_value_x)+"px",
            // "top":(translate_content_card_move_y+move_value_y)+"px",
            "right": (translate_content_card_move_x - move_value_x) + "px",
            "top": (translate_content_card_move_y + move_value_y) + "px"
          });
        } else {
          return translate_content_card_move = false;
        }
      }
    });
    getWord = function() {
      var word;
      word = window.getSelection ? window.getSelection() : document.selection.createRange().text;
      return word;
    };
    latest_translate_content = null;
    return $(window).on("mouseup", function(e) {
      var mouse_x_now, mouse_y_now, translate_content, translate_content_length;
      translate_content = getWord().toString();
      console.log(translate_content);
      console.log("translate_content ===");
      if ((translate_content !== latest_translate_content) && (translate_content !== "")) {
        if (translate_content_card_show) {
          if (!translate_content_card_control) {
            $("#translate_content_card_move_count").html("0/1000");
            translate_content_length = translate_content.length;
            if (translate_content_length <= 2000) {
              if (isChina(translate_content)) {
                hotpoor_translate(translate_content, "zh", "en");
              } else {
                hotpoor_translate(translate_content, "en", "zh");
              }
              latest_translate_content = translate_content;
            } else if (translate_content_length > 2000) {
              $("#translate_content_card_content_aim").html("大哥大姐，内容太多翻得扛不住哟。<br>少一点吧~");
              $("#translate_content_card_move_count").html(`${translate_content_length}/1000`);
            }
          }
          translate_content_card_control = false;
          return translate_content_card_move = false;
        } else {
          translate_content_card_show = false;
          $("#translate_content_card_onoff").remove();
          $("#translate_content_card").hide();
          mouse_x_now = e.clientX + 5;
          mouse_y_now = e.clientY - 15;
          return $("body").append(`<div id="translate_content_card_onoff" style="left:${mouse_x_now}px;top:${mouse_y_now}px;">\n    <img src="https://www.hotpoor.com/static/img/translate.png">\n</div>`);
        }
      } else {
        translate_content_card_show = false;
        $("#translate_content_card_onoff").remove();
        $("#translate_content_card").hide();
        translate_content_card_control = false;
        return translate_content_card_move = false;
      }
    });
  });

}).call(this);
