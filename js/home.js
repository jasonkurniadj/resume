$(document).ready(function() {
    // *** Init Data ***
    buildProfileDataObj();
    $('[resume-data-key="picture-url"]').attr("src", profileDataObj["picture_url"]);
    $('[resume-data-key="name"]').text(profileDataObj["name"]);
    $('[resume-data-key="summary"]').html(profileDataObj["summary"]);
    $('[resume-data-key="cv-url"]').attr("href", profileDataObj["cv_url"]);
    $('[resume-data-key="statistics"]').html(buildStatisticHTML());
    $('[resume-data-key="skills"]').html(buildSkillHTML());
    $('[resume-data-key="works"]').html(buildWorkExperienceHTML());
    $('[resume-data-key="education"]').html(buildEducationHTML());
    $('[resume-data-key="certifications"]').html(buildCertificationHTML());
    $('[resume-data-key="projects"]').html(buildProjectHTML());
    $('[resume-data-key="voluntary"]').html(buildVoluntaryHTML());
    $('[resume-data-key="contact"]').html(buildContactHTML());

    // *** Particles Effect ***
    buildParticles();

    // *** Typing Effect ***
    _typed = new Typed("#role", {
        strings: profileDataObj["roles"],
        typeSpeed: 55,
        backSpeed: 30,
        loop: true,
    });

    // *** Experience Read More ***
    let worksList = $("#worksList")
    let readMoreOverlay = $(".read-more-button")
    $("#btnExperiencesReadMore").on("click", function() {
        html = 'Show Less <i class="fa fa-angle-up">';
        action = "hide";

        if($(this).attr("btn-action") == "show") {
            $(worksList).css({"height": "auto"});
            $(readMoreOverlay).css({
                "background-image": "none",
                "transform": "none",
                "padding-top": "2rem",
                "margin-bottom": "0",
            });
        } else {
            $(worksList).css({"height": "200vh"});
            $(readMoreOverlay).css({
                "background-image": "linear-gradient(to bottom, transparent, var(--gray))",
                "transform": "translateY(-100%)",
                "padding-top": "7rem",
                "margin-bottom": "-10rem",
            });
            action = "show";
            html = 'Show More <i class="fa fa-angle-down">';
        }
        $(this).attr("btn-action", action)
        $(this).html(html);
    });

    // *** Certificates Slider ***
    $("#certificateList").slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
        prevArrow: $(".slick-prev"),
        nextArrow: $(".slick-next"),
        lazyLoad: "ondemand",
        pauseOnHover: true,
        responsive: [{
            breakpoint: 768,
            settings: {
                slidesToShow: 1
            }
        }]
    });

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
