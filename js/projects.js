$(document).ready(function() {
    // *** Init Data ***
    const projectURL = "https://raw.githubusercontent.com/jasonkurniadj/personal-datastore/main/projects.json";
    let project = new Project(projectURL);
    project.fetchData().then(() => {
        // *** Set HTML ***
        data = project.data;
        $('[resume-data-key="projects"]').html(project.buildProjectsHTML("detail.html"));
    });
});
