$(document).ready(function() {
    // *** Footer ***
    now = new Date();
    $("footer span").text(now.getFullYear());

    // *** Go To Top Button ***
    let btnGoToTop = $("#btnGoToTop");
    window.onscroll = function() {
        function scrollFunction() {
            if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
                $(btnGoToTop).css("display", "block");
            } else {
                $(btnGoToTop).css("display", "none");
            }
        };
        scrollFunction();
    };

    $(btnGoToTop).on("click", function() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    });
});