(new WOW).init();


// SideNav Button Initialization
$(".button-collapse").sideNav();
// SideNav Scrollbar Initialization
var sideNavScrollbar = document.querySelector('.custom-scrollbar');
Ps.initialize(sideNavScrollbar);


// MDB Lightbox Init
$(function () {
    $("#mdb-lightbox-ui").load("mdb-addons/mdb-lightbox-ui.html");
});

var idInterval = setInterval(function () {
    var days = $(".time .days").text();
    var hours = $(".time .hours").text();
    var minutes = $(".time .minutes").text();
    var seconds = $(".time .seconds").text();

    days = parseInt(days);
    hours = parseInt(hours);
    minutes = parseInt(minutes);
    seconds = parseInt(seconds);

    if (!(days == 0 && hours == 0 && minutes == 0 && seconds == 0)) {
        seconds--;

        if (seconds < 0) {
            seconds = 59;

            minutes--;

            if (minutes < 0) {
                minutes = 59;

                hours--;

                if (hours < 0) {
                    hours = 23;

                    days--;

                    if (days < 0)
                        days = 0;
                }
            }
        }

    } else {
        clearInterval(idInterval);
    }


    console.log(days, hours, minutes, seconds);

    $(".time .days").text(days < 10 ? "0" + days : days);
    $(".time .hours").text(hours < 10 ? "0" + hours : hours);
    $(".time .minutes").text(minutes < 10 ? "0" + minutes : minutes);
    $(".time .seconds").text(seconds < 10 ? "0" + seconds : seconds);
}, 1000);

