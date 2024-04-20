class Resume {
    constructor(url) {
        this.url = url;
        this.data = null;
    }

    async fetchData(fallbackData={}) {
        try {
            let resp = await fetch(this.url);
            this.data = await resp.json();
        } catch(error) {
            console.error('Error fetching data:', error);
            this.data = fallbackData;
        }
    }

    // TODO: Refactor build methods
}

class Profile extends Resume {
    constructor(url) {
        super(url);
        this.type = "basic";
    }

    buildStatisticsHTML() {
        const template = `
            <div class="about-stat-item">
                <div class="about-stat-icon"><i class="fa {{iconClass}}"></i></div>
                <div class="about-stat-description">
                    <h3>{{value}}</h3>
                    <p>{{name}}</p>
                </div>
            </div>
        `;
        const partitionNum = 2;

        let html = "";
        this.data["statistics"].forEach(function(item, idx) {
            let currItem = template;
            currItem = currItem.replaceAll("{{iconClass}}", item["icon_class"]);
            currItem = currItem.replaceAll("{{value}}", item["value"]);
            currItem = currItem.replaceAll("{{name}}", item["name"]);

            if(idx%partitionNum === 0) currItem = '<div class="d-flex my-2">' + currItem;
            else if((idx+1)%partitionNum === 0) currItem += "</div>";

            html += currItem;
        });

        return html;
    }

    buildSkillsHTML() {
        const template = `
            <li class="my-4">{{item}}</li>
        `;
    
        let html = "";
        this.data["skills"]["technical"].forEach(function(item, idx) {
            let currItem = template;
            currItem = currItem.replaceAll("{{item}}", item["item"]);
    
            html += currItem;
        });
    
        return html;
    }
    
    buildWorksHTML() {
        const template = `
            <div class="timeline-item">
                <div class="timeline-icon"><i class="fa fa-briefcase"></i></div>
                <div class="timeline-content {{panelSide}}">
                    <div class="timeline-header">
                        <h3>{{title}}</h3>
                        <p>{{company}}</p>
                        <span>{{startDate}} - {{endDate}}</span>
                    </div>
                    <div class="timeline-detail">{{description}}</div>
                </div>
            </div>
        `;
    
        let html = ""
        this.data["works"].forEach(function(item, idx) {
            let companyHtml = "";
            if(item["url"] !== null && item["url"].trim() !== "") {
                companyHtml += '<a href="'+item["url"]+'" target="_blank">'+item["company"]+'</a>';
            } else {
                companyHtml += item["company"];
            }
            if(item["location"] !== null && item["location"].trim() !== "") {
                companyHtml += ", " + item["location"];
            }
    
            let startDate = new Date(item["start_date"]).toLocaleDateString("en-US", {month:"short", year:"numeric"});
            let endDate = "Present";
            if(item["end_date"] !== null && item["end_date"].trim() !== "") {
                endDate = new Date(item["end_date"]).toLocaleDateString("en-US", {month:"short", year:"numeric"});
            }
            
            let currItem = template;
            currItem = currItem.replaceAll("{{panelSide}}", (idx%2 === 0) ? "right" : "left");
            currItem = currItem.replaceAll("{{title}}", item["title"]);
            currItem = currItem.replaceAll("{{company}}", companyHtml);
            currItem = currItem.replaceAll("{{startDate}}", startDate);
            currItem = currItem.replaceAll("{{endDate}}", endDate);
            currItem = currItem.replaceAll("{{description}}", item["description"]);
    
            html += currItem;
        });
    
        return html;
    }
    
    buildEducationHTML() {
        const template = `
            <div class="timeline-item">
                <div class="timeline-icon"><i class="fa fa-graduation-cap"></i></div>
                <div class="timeline-content {{panelSide}}">
                    <div class="timeline-header">
                        <h3>{{degree}}</h3>
                        <p>{{university}}</p>
                        <span>{{startDate}} - {{endDate}}</span>
                    </div>
                    <div class="timeline-detail">{{description}}</div>
                </div>
            </div>
        `;
    
        let html = ""
        this.data["education"].forEach(function(item, idx) {
            let univHtml = item["university"];
            if(item["location"] !== null && item["location"].trim() !== "") {
                univHtml += ", " + item["location"];
            }
    
            let startDate = new Date(item["start_date"]).toLocaleDateString("en-US", {month:"short", year:"numeric"});
            let endDate = "Present"
            if(item["end_date"] !== null && item["end_date"].trim() !== "") {
                endDate = new Date(item["end_date"]).toLocaleDateString("en-US", {month:"short", year:"numeric"});
            }
            
            let currItem = template;
            currItem = currItem.replaceAll("{{panelSide}}", (idx%2 === 0) ? "right" : "left");
            currItem = currItem.replaceAll("{{degree}}", item["degree"]);
            currItem = currItem.replaceAll("{{university}}", univHtml);
            currItem = currItem.replaceAll("{{startDate}}", startDate);
            currItem = currItem.replaceAll("{{endDate}}", endDate);
            currItem = currItem.replaceAll("{{description}}", item["description"]);
    
            html += currItem;
        });
    
        return html;
    }
    
    buildCertificationsHTML() {
        const template = `
            <a href="{{certificateUrl}}" target="_blank" class="card border-0">
                <img src="{{thumbnailPath}}" class="card-img-top" alt="{{name}}">
                <div class="card-body">
                    <span>{{issueDate}}</span>
                    <h5 class="card-title">{{name}}</h5>
                    <p class="card-text">{{issuer}}</p>
                </div>
            </a>
        `;

        let html = ""
        this.data["certifications"].forEach(function(item, idx) {
            let issueDate = new Date(item["issue_date"]).toLocaleDateString("en-US", {month:"short", year:"numeric"});

            let currItem = template;
            currItem = currItem.replaceAll("{{certificateUrl}}", item["certificate_url"]);
            currItem = currItem.replaceAll("{{thumbnailPath}}", item["thumbnail_url"]);
            currItem = currItem.replaceAll("{{issueDate}}", issueDate);
            currItem = currItem.replaceAll("{{name}}", item["name"]);
            currItem = currItem.replaceAll("{{issuer}}", item["issuer"]);

            html += currItem;
        });

        return html;
    }
    
    buildProjectsHTML() {
        const template = `
            <div class="col-md-3">
                <div class="card border-0 mb-4">
                    <div class="position-relative">
                        <span>{{category}}</span>
                        <!-- <img src="{{url}}" class="card-img-top" alt="{{name}}"> -->
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">{{name}}</h5>
                        <p class="card-text text-justify">{{description}}</p>
                    </div>
                </div>
            </div>
        `;
    
        let html = ""
        this.data["projects"].forEach(function(item, idx) {
            if(!item["is_show"]) return;
    
            let currItem = template;
            currItem = currItem.replaceAll("{{category}}", item["category"]);
            currItem = currItem.replaceAll("{{name}}", item["name"]);
            currItem = currItem.replaceAll("{{description}}", item["description"]);
    
            html += currItem;
        });
    
        return html;
    }
    
    buildVoluntariesHTML() {
        const template = `
            <div class="timeline-item">
                <div class="timeline-icon"><i class="fa fa-handshake-o"></i></div>
                <div class="timeline-content {{panelSide}}">
                    <div class="timeline-header">
                        <h3>{{role}}</h3>
                        <p>{{organization}}</p>
                        <span>{{startDate}} - {{endDate}}</span>
                    </div>
                    <div class="timeline-detail">{{description}}</div>
                </div>
            </div>
        `;
    
        let html = ""
        this.data["voluntaries"].forEach(function(item, idx) {
            let orgHtml = item["organization"];
            if(item["url"] !== null && item["url"].trim() !== "") {
                orgHtml = '<a href="'+item["url"]+'" target="_blank">'+item["organization"]+'</a>'
            }
    
            let startDate = new Date(item["start_date"]).toLocaleDateString("en-US", {month:"short", year:"numeric"});
            let endDate = "Present"
            if(item["end_date"] !== null && item["end_date"].trim() !== "") {
                endDate = new Date(item["end_date"]).toLocaleDateString("en-US", {month:"short", year:"numeric"});
            }
            
            let currItem = template;
            currItem = currItem.replaceAll("{{panelSide}}", (idx%2 === 0) ? "right" : "left");
            currItem = currItem.replaceAll("{{role}}", item["role"]);
            currItem = currItem.replaceAll("{{organization}}", orgHtml);
            currItem = currItem.replaceAll("{{startDate}}", startDate);
            currItem = currItem.replaceAll("{{endDate}}", endDate);
            currItem = currItem.replaceAll("{{description}}", item["description"]);
    
            html += currItem;
        });
    
        return html;
    }
    
    buildContactsHTML() {
        const template = `
            <li id="{{htmlID}}">
                <a href="{{url}}"><i class="fa {{iconClass}}"></i> {{type}}</a>
            </li>
        `;
    
        let html = `
            <li id="contactLocation">
                <i class="fa fa-map-marker"></i> {{value}}
            </li>
        `
        html = html.replaceAll("{{value}}", this.data["location"]);
    
        this.data["contacts"].forEach(function(item, idx) {
            let currItem = template;
            currItem = currItem.replaceAll("{{htmlID}}", "contact"+item["type"]);
            currItem = currItem.replaceAll("{{url}}", item["url"]);
            currItem = currItem.replaceAll("{{iconClass}}", item["icon_class"]);
            currItem = currItem.replaceAll("{{type}}", item["type"]);
    
            html += currItem;
        });
    
        return html;
    }    
}

class Project extends Resume {}