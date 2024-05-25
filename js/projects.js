$(document).ready(function() {
    // *** Init Data ***
    const projectURL = "https://raw.githubusercontent.com/jasonkurniadj/personal-datastore/main/projects.json";
    let project = new Project(projectURL);
    project.fetchData().then(() => {
        // *** Set HTML ***
        data = project.data;
        $('[resume-data-key="projects"]').html(project.buildProjectsHTML("detail.html"));
        $('[resume-data-key="project-filter"]').html(project.buildProjectsFilterHTML(project.categories));
    });
});

$(document).on("change", '[type="checkbox"]', function () {
    let allCategories = [].slice.call(document.querySelectorAll('input[type="checkbox"]')).map(function(elem){ return elem.getAttribute("id");});
    let selectedCategories = [].slice.call(document.querySelectorAll('input[type="checkbox"]:checked')).map(function(elem){ return elem.getAttribute("id");});
    let selectedCatLen = selectedCategories.length;
    
    allCategories.forEach(function(category, idx) {
        if(selectedCatLen === 0) {
            $("." + category).show();
            return;
        }

        if(selectedCategories.includes(category)) $("." + category).show();
        else $("." + category).hide();
    });
});
