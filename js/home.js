$(document).ready(function() {
    // *** Init Data ***
    const profileURL = "https://raw.githubusercontent.com/jasonkurniadj/personal-datastore/main/basic-profile.json";
    let profile = new Profile(profileURL);
    profile.fetchData().then(() => {
        // *** Set HTML ***
        data = profile.data;
        $('[resume-data-key="picture-url"]').attr("src", data["picture_url"]);
        $('[resume-data-key="name"]').text(data["name"]);
        $('[resume-data-key="summary"]').html(data["summary"]);
        $('[resume-data-key="cv-url"]').attr("href", data["cv_url"]);
        $('[resume-data-key="statistics"]').html(profile.buildStatisticsHTML());
        $('[resume-data-key="skills"]').html(profile.buildSkillsHTML());
        $('[resume-data-key="works"]').html(profile.buildWorksHTML());
        $('[resume-data-key="education"]').html(profile.buildEducationHTML());
        $('[resume-data-key="certifications"]').html(profile.buildCertificationsHTML());
        $('[resume-data-key="projects"]').html(profile.buildProjectsHTML());
        $('[resume-data-key="voluntaries"]').html(profile.buildVoluntariesHTML());
        $('[resume-data-key="contacts"]').html(profile.buildContactsHTML());

        // *** Typing Effect ***
        new Typed("#role", {
            strings: data["roles"],
            typeSpeed: 55,
            backSpeed: 30,
            loop: true,
        });

        // *** Certificates Slider ***
        $("#certificateList").slick({
            slidesToShow: 4,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2900,
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
    });

    // *** Particles Effect ***
    buildParticles();

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
});
