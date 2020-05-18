// jQuery

function init_plugins() {
$(function() {

    "use strict";
    $(function() {
        $(".preloader").fadeOut();
    });

    $('.sidenav').sidenav();
    $(".dropdown-trigger").dropdown({
        alignment: 'left',
        coverTrigger: false,
        hover: false,
        closeOnClick: false
    });
    $('.collapsible').collapsible();
    $("body").trigger("resize");

    // ==============================================================
    // This is for the top header part and sidebar part
    // ==============================================================
    var set = function() {
        var width = (window.innerWidth > 0) ? window.innerWidth : this.screen.width;
        var topOffset = 75;
        if (width < 1170) {
            //$("#main-wrapper").addClass("mini-sidebar");
            $('#topsubnav').sidenav({
                onOpenStart: function() {
                    $('body').addClass('overlay');
                },
                onCloseStart: function() {
                    $('body').removeClass('overlay');
                }
            });
        } else {
            //$("#main-wrapper").removeClass("mini-sidebar");
        }
    };
    $(window).ready(set);
    $(window).on("resize", set);

    // ==============================================================
    // active menu js
    // ==============================================================
    $(function() {
        var url = window.location;
        var element = $('ul.collapsible a').filter(function() {
            return this.href == url;
        }).addClass('active').parent().addClass('active');
        while (true) {
            if (element.is('li')) {
                element = element.parent().parent().css({
                    "display": "block"
                }).parent().addClass('active');
            } else {
                break;
            }
        }
    });
    $(".sidebar-toggle").on('click', function() {
        $("#main-wrapper").toggleClass("show-sidebar");
    });
    // ==============================================================
    // sidebar-hover
    // ==============================================================
    $(".left-sidebar").hover(
        function() {
            $(".brand-logo").addClass("full-logo");
        },
        function() {
            $(".brand-logo").removeClass("full-logo");
        }
    );
    // ==============================================================
    // Right Sidebar
    // ==============================================================
    $('.right-sidenav').sidenav({
        edge: 'right',
        onOpenStart: function() {
            $('.chat-windows').addClass('show-chat');
            $('.chat-windows').removeClass('hide-chat');
        },
        onCloseStart: function() {
            $('.chat-windows').addClass('hide-chat');
            $('.chat-windows').removeClass('show-chat');
        }
    });
    // ==============================================================
    // Perfect Scrollbar
    // ==============================================================
    $('#main-wrapper[data-layout="vertical"] #slide-out, #right-slide-out, .message-center, .scrollable, .pre-scroll').perfectScrollbar();
    // ==============================================================
    // FAB Buttons
    // ==============================================================
    $('.fixed-action-btn').floatingActionButton();
    $('.fixed-action-btn.horizontal').floatingActionButton({
        direction: 'left'
    });
    $('.fixed-action-btn.click-to-toggle').floatingActionButton({
        direction: 'left',
        hoverEnabled: false
    });
    // ==============================================================
    // Set checkbox on forms.html to indeterminate
    // ==============================================================
    var indeterminateCheckbox = document.getElementById('indeterminate-checkbox');
    if (indeterminateCheckbox !== null)
        indeterminateCheckbox.indeterminate = true;
    // ==============================================================
    // Navbar Tabs
    // ==============================================================
    $('.tabs').tabs();
    // ==============================================================
    // Auto-complete
    // ==============================================================
    $('input.autocomplete').autocomplete({
        data: {
            "Apple": null,
            "Microsoft": null,
            "Google": 'http://placehold.it/250x250'
        },
    });
    // ==============================================================
    // Chips
    // ==============================================================
    $('.chips').chips();
    $('.chips-initial').chips({
        readOnly: true,
        data: [{
            tag: 'Apple',
        }, {
            tag: 'Microsoft',
        }, {
            tag: 'Google',
        }]
    });
    $('.chips-placeholder').chips({
        placeholder: 'Enter a tag',
        secondaryPlaceholder: '+Tag',
    });
    $('.chips-autocomplete').chips({
        autocompleteOptions: {
            data: {
                'Apple': null,
                'Microsoft': null,
                'Google': null
            }
        }
    });
    // ==============================================================
    // date-time picker
    // ==============================================================
    $('.datepicker').datepicker();
    $('.timepicker').timepicker();
    // ==============================================================
    // select
    // ==============================================================
    $('select').not('.disabled').formSelect();
    // ==============================================================
    // character counter
    // ==============================================================
    $('input[data-length], textarea[data-length]').characterCounter();
    // ==============================================================
    // carousel
    // ==============================================================
    $('.carousel').carousel();
    $('.carousel.carousel-slider').carousel({
        fullWidth: true,
        indicators: true,
        onCycleTo: function(item, dragged) {}
    });
    // ==============================================================
    // collapsible
    // ==============================================================
    $('.collapsible.expandable').collapsible({
        accordion: false
    });
    // ==============================================================
    // feature discovery
    // ==============================================================
    $('.tap-target').tapTarget();
    // ==============================================================
    // material-box
    // ==============================================================
    $('.materialboxed').materialbox();
    $('.slider').slider();
    // ==============================================================
    // Swipeable Tabs Demo Init
    // ==============================================================
    if ($('#tabs-swipe-demo').length) {
        $('#tabs-swipe-demo').tabs({
            'swipeable': true
        });
    }
    // ==============================================================
    // modal
    // ==============================================================
    $('.modal').modal();
    // ==============================================================
    // tooltip
    // ==============================================================
    $('.tooltipped').tooltip();
    // ==============================================================
    // parallax
    // ==============================================================
    $('.parallax').parallax();
    // ==============================================================
    // To do list
    // ==============================================================
    $(".list-task li label span").on('click', function() {
        $(this).toggleClass("task-done");
    });
    // ==============================================================
    // dynamic color
    // ==============================================================
    // convert rgb to hex value string
    function rgb2hex(rgb) {
        if (/^#[0-9A-F]{6}$/i.test(rgb)) {
            return rgb;
        }

        rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

        if (rgb === null) {
            return "N/A";
        }

        function hex(x) {
            return ("0" + parseInt(x).toString(16)).slice(-2);
        }

        return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
    }

    $('.dynamic-color .col').each(function() {
        $(this).children().each(function() {
            var color = $(this).css('background-color'),
                classes = $(this).attr('class');
            $(this).html('<span>' + rgb2hex(color) + " " + classes + '</span>');
            if (classes.indexOf("darken") >= 0 || $(this).hasClass('black')) {
                $(this).css('color', 'rgba(255,255,255,.9');
            }
        });
    });
    // ==============================================================
    // Toggle Containers on page
    // ==============================================================
    var toggleContainersButton = $('#container-toggle-button');
    toggleContainersButton.click(function() {
        $('body .browser-window .container, .had-container').each(function() {
            $(this).toggleClass('had-container');
            $(this).toggleClass('container');
            if ($(this).hasClass('container')) {
                toggleContainersButton.text("Turn off Containers");
            } else {
                toggleContainersButton.text("Turn on Containers");
            }
        });
    });
    // ==============================================================
    // CSS Transitions Demo Init
    // ==============================================================
    if ($('#scale-demo').length &&
        $('#scale-demo-trigger').length) {
        $('#scale-demo-trigger').click(function() {
            $('#scale-demo').toggleClass('scale-out');
        });
    }
    // ==============================================================
    // Toggle Flow Text
    // ==============================================================
    var toggleFlowTextButton = $('#flow-toggle');
    toggleFlowTextButton.click(function() {
        $('#flow-text-demo').children('p').each(function() {
            $(this).toggleClass('flow-text');
        });
    });

    $(".search-box a, .search-box .app-search .srh-btn").on('click', function() {
        $(".app-search").toggle(200);
        $(".app-search input").focus();
    });

    // ==============================================================
    // This is for the innerleft sidebar
    // ==============================================================
    $(".show-left-part").on('click', function() {
        $('.left-part').toggleClass('show-panel');
        $('.show-left-part').toggleClass('ti-menu');
    });
});


//****************************
// This is for the chat customizer setting
//****************************

$(function() {

  var chatarea = $("#chat");

  $('#chat .message-center a').on('click', function() {

      var name = $(this).find(".mail-contnet h5").text();
      var img = $(this).find(".user-img img").attr("src");
      var id = $(this).attr("data-user-id");
      var status = $(this).find(".profile-status").attr("data-status");

      if ($(this).hasClass("active")) {
          $(this).toggleClass("active");
          $(".chat-windows #user-chat" + id).hide();
      } else {
          $(this).toggleClass("active");
          if ($(".chat-windows #user-chat" + id).length) {
              $(".chat-windows #user-chat" + id).removeClass("mini-chat").show();
          } else {
              var msg = msg_receive('I watched the storm, so beautiful yet terrific.');
              msg += msg_sent('That is very deep indeed!');
              var html = "<div class='user-chat' id='user-chat" + id + "' data-user-id='" + id + "'>";
              html += "<div class='chat-head'><img src='" + img + "' data-user-id='" + id + "'><span class='status " + status + "'></span><span class='name'>" + name + "</span><span class='opts'><i class='material-icons closeit' data-user-id='" + id + "'>clear</i><i class='material-icons mini-chat' data-user-id='" + id + "'>remove</i></span></div>";
              html += "<div class='chat-body'><ul class='chat-list'>" + msg + "</ul></div>";
              html += "<div class='chat-footer'><input type='text' data-user-id='" + id + "' placeholder='Type & Enter' class='form-control'></div>";
              html += "</div>";
              $(".chat-windows").append(html);
          }
      }
  });

  $("body").on('click', ".chat-windows .user-chat .chat-head .closeit", function(e) {
      var id = $(this).attr("data-user-id");
      $(".chat-windows #user-chat" + id).hide();
      $("#chat .message-center .user-info#chat_user_" + id).removeClass("active");
  });

  $("body").on('click', ".chat-windows .user-chat .chat-head img, .chat-windows .user-chat .chat-head .mini-chat", function(e) {
      var id = $(this).attr("data-user-id");
      if (!$(".chat-windows #user-chat" + id).hasClass("mini-chat")) {
          $(".chat-windows #user-chat" + id).addClass("mini-chat");
      } else {
          $(".chat-windows #user-chat" + id).removeClass("mini-chat");
      }
  });

  $("body").on('keypress', ".chat-windows .user-chat .chat-footer input", function(e) {
      if (e.keyCode == 13) {
          var id = $(this).attr("data-user-id");
          var msg = $(this).val();
          msg = msg_sent(msg);
          $(".chat-windows #user-chat" + id + " .chat-body .chat-list").append(msg);
          $(this).val("");
          $(this).focus();
      }
      $(".chat-windows #user-chat" + id + " .chat-body").perfectScrollbar({
          suppressScrollX: true
      });
  });
});

function msg_receive(msg) {
  var d = new Date();
  var h = d.getHours();
  var m = d.getMinutes();
  return "<li class='msg_receive'><div class='chat-content'><div class='box bg-light-info'>" + msg + "</div></div><div class='chat-time'>" + h + ":" + m + "</div></li>";
}

function msg_sent(msg) {
  var d = new Date();
  var h = d.getHours();
  var m = d.getMinutes();
  return "<li class='odd msg_sent'><div class='chat-content'><div class='box bg-light-info'>" + msg + "</div><br></div><div class='chat-time'>" + h + ":" + m + "</div></li>";
}
}

// function init_plugins() {
// $(function() {
//     "use strict";
//     $(function() {
//         $(".preloader").fadeOut()
//     }), $(".sidenav").sidenav(), $(".dropdown-trigger").dropdown({
//         alignment: "left",
//         coverTrigger: !1,
//         hover: !1,
//         closeOnClick: !1
//     }), $(".collapsible").collapsible(), $("body").trigger("resize");
//     var t = function() {
//         (0 < window.innerWidth ? window.innerWidth : this.screen.width) < 1170 && $("#topsubnav").sidenav({
//             onOpenStart: function() {
//                 $("body").addClass("overlay")
//             },
//             onCloseStart: function() {
//                 $("body").removeClass("overlay")
//             }
//         })
//     };
//     $(window).ready(t), $(window).on("resize", t), $(function() {
//         for (var t = window.location, e = $("ul.collapsible a").filter(function() {
//                 return this.href == t
//             }).addClass("active").parent().addClass("active"); e.is("li");) e = e.parent().parent().css({
//             display: "block"
//         }).parent().addClass("active")
//     }), $(".sidebar-toggle").on("click", function() {
//         $("#main-wrapper").toggleClass("show-sidebar")
//     }), $(".left-sidebar").hover(function() {
//         $(".brand-logo").addClass("full-logo")
//     }, function() {
//         $(".brand-logo").removeClass("full-logo")
//     }), $(".right-sidenav").sidenav({
//         edge: "right",
//         onOpenStart: function() {
//             $(".chat-windows").addClass("show-chat"), $(".chat-windows").removeClass("hide-chat")
//         },
//         onCloseStart: function() {
//             $(".chat-windows").addClass("hide-chat"), $(".chat-windows").removeClass("show-chat")
//         }
//     }), $('#main-wrapper[data-layout="vertical"] #slide-out, #right-slide-out, .message-center, .scrollable, .pre-scroll').perfectScrollbar(), $(".fixed-action-btn").floatingActionButton(), $(".fixed-action-btn.horizontal").floatingActionButton({
//         direction: "left"
//     }), $(".fixed-action-btn.click-to-toggle").floatingActionButton({
//         direction: "left",
//         hoverEnabled: !1
//     });
//     var e = document.getElementById("indeterminate-checkbox");
//     null !== e && (e.indeterminate = !0), $(".tabs").tabs(), $("input.autocomplete").autocomplete({
//         data: {
//             Apple: null,
//             Microsoft: null,
//             Google: "http://placehold.it/250x250"
//         }
//     }), $(".chips").chips(), $(".chips-initial").chips({
//         readOnly: !0,
//         data: [{
//             tag: "Apple"
//         }, {
//             tag: "Microsoft"
//         }, {
//             tag: "Google"
//         }]
//     }), $(".chips-placeholder").chips({
//         placeholder: "Enter a tag",
//         secondaryPlaceholder: "+Tag"
//     }), $(".chips-autocomplete").chips({
//         autocompleteOptions: {
//             data: {
//                 Apple: null,
//                 Microsoft: null,
//                 Google: null
//             }
//         }
//     }), $(".datepicker").datepicker(), $(".timepicker").timepicker(), $("select").not(".disabled").formSelect(), $("input[data-length], textarea[data-length]").characterCounter(), $(".carousel").carousel(), $(".carousel.carousel-slider").carousel({
//         fullWidth: !0,
//         indicators: !0,
//         onCycleTo: function(t, e) {}
//     }), $(".collapsible.expandable").collapsible({
//         accordion: !1
//     }), $(".tap-target").tapTarget(), $(".materialboxed").materialbox(), $(".slider").slider(), $("#tabs-swipe-demo").length && $("#tabs-swipe-demo").tabs({
//         swipeable: !0
//     }), $(".modal").modal(), $(".tooltipped").tooltip(), $(".parallax").parallax(), $(".list-task li label span").on("click", function() {
//         $(this).toggleClass("task-done")
//     }), $(".dynamic-color .col").each(function() {
//         $(this).children().each(function() {
//             var t = $(this).css("background-color"),
//                 e = $(this).attr("class");
//             $(this).html("<span>" + function(t) {
//                 if (/^#[0-9A-F]{6}$/i.test(t)) return t;
//                 if (null === (t = t.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/))) return "N/A";

//                 function e(t) {
//                     return ("0" + parseInt(t).toString(16)).slice(-2)
//                 }
//                 return "#" + e(t[1]) + e(t[2]) + e(t[3])
//             }(t) + " " + e + "</span>"), (0 <= e.indexOf("darken") || $(this).hasClass("black")) && $(this).css("color", "rgba(255,255,255,.9")
//         })
//     });
//     var a = $("#container-toggle-button");
//     a.click(function() {
//         $("body .browser-window .container, .had-container").each(function() {
//             $(this).toggleClass("had-container"), $(this).toggleClass("container"), $(this).hasClass("container") ? a.text("Turn off Containers") : a.text("Turn on Containers")
//         })
//     }), $("#scale-demo").length && $("#scale-demo-trigger").length && $("#scale-demo-trigger").click(function() {
//         $("#scale-demo").toggleClass("scale-out")
//     }), $("#flow-toggle").click(function() {
//         $("#flow-text-demo").children("p").each(function() {
//             $(this).toggleClass("flow-text")
//         })
//     }), $(".search-box a, .search-box .app-search .srh-btn").on("click", function() {
//         $(".app-search").toggle(200), $(".app-search input").focus()
//     }), $(".show-left-part").on("click", function() {
//         $(".left-part").toggleClass("show-panel"), $(".show-left-part").toggleClass("ti-menu")
//     })
// });
// }
