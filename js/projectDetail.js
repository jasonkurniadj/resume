$(document).ready(function() {
    let toType = function(a) {
        return ({}).toString.call(a).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
    }, queryMap = {};
    
    let errorHandle = function(isShowAlert, msg) {
        if(isShowAlert) window.alert(msg);
        else console.error(msg);
    };

    window.location.search.replace(/([^&|\?=]+)=?([^&]*)(?:&+|$)/g, function(match, key, value) {
        if (key in queryMap) {
            if (toType(queryMap[key]) !== "array") queryMap[key] = [queryMap[key]];
            queryMap[key].push(value);
        } else {
            queryMap[key] = value;
        }
    });
    let fallbackUrl = "."
    let isShowAlert = false;

    let token = queryMap["token"];
    if(token === undefined) {
        errorHandle(isShowAlert, "Token undefined");
        window.location.href = fallbackUrl;
        return;
    }

    let jsonDetail = {};
    try {
        jsonDetail = JSON.parse(atob(token));
    } catch(e) {
        errorHandle(isShowAlert, "Parse token error");
        window.location.href = fallbackUrl;
        return;
    }

    let project = new Project();
    document.title = "Jason | " + jsonDetail["name"];
    $('[resume-data-key="project-name"]').html(jsonDetail["name"]);
    $('[resume-data-key="project-detail"]').html(project.buildProjectDetailHTML(jsonDetail));
});
