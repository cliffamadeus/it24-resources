class AppletCard {
    constructor(title, description, link, accessCount = 0, lastAccessed = 'Never') {
        this.title = title;
        this.description = description;
        this.link = link;
        this.accessCount = accessCount;
        this.lastAccessed = lastAccessed;
    }

    createCard() {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card applet-card';
        cardDiv.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${this.title}</h5>
                <p class="card-text">
                    ${this.description}<br>
                    <small class="text-muted">
                        Accessed: ${this.accessCount} time(s)<br>
                        Last Used: ${this.lastAccessed}
                    </small>
                </p>
                <a href="${this.link}" class="btn btn-primary applet-btn"
                   onclick="trackAppletAccess('${this.title}')">Go to Applet</a>
            </div>
        `;
        return cardDiv;
    }
}

// LocalStorage handling for access tracking
function getUsageData() {
    const data = localStorage.getItem("appletUsage");
    return data ? JSON.parse(data) : {};
}

function saveUsageData(data) {
    localStorage.setItem("appletUsage", JSON.stringify(data));
}

function trackAppletAccess(title) {
    const usage = getUsageData();
    const now = new Date().toLocaleString();
    if (!usage[title]) {
        usage[title] = { accessCount: 0, lastAccessed: null };
    }
    usage[title].accessCount += 1;
    usage[title].lastAccessed = now;
    saveUsageData(usage);
}


class AppletRenderer {
    constructor(containerId, searchInputId) {
        this.container = document.getElementById(containerId);
        this.searchInput = document.getElementById(searchInputId);
        this.appletData = [];
        this.filteredData = [];

        this.searchInput.addEventListener('input', () => this.filterApplets());
    }

    fetchAppletData(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                const usage = getUsageData();

                this.appletData = data.map(applet => {
                    const stats = usage[applet.title] || { accessCount: 0, lastAccessed: 'Never' };
                    return {
                        ...applet,
                        accessCount: stats.accessCount,
                        lastAccessed: stats.lastAccessed
                    };
                });

                this.filteredData = this.appletData;
                this.renderSections();
            })
            .catch(error => console.error('Error loading applet data:', error));
    }

    filterApplets() {
        const query = this.searchInput.value.toLowerCase();
        this.filteredData = this.appletData.filter(applet =>
            applet.title.toLowerCase().includes(query) ||
            applet.description.toLowerCase().includes(query)
        );
        this.renderSections();
    }

    renderSections() {
        this.container.innerHTML = '';

        const topApps = [...this.filteredData]
            .sort((a, b) => b.accessCount - a.accessCount)
            .slice(0, 3);

        this.renderSection("Recent Apps", topApps);
        this.renderSection("All Applets", this.filteredData);
    }

    renderSection(title, applets) {
        const sectionTitle = document.createElement("h2");
        sectionTitle.textContent = title;
        this.container.appendChild(sectionTitle);

        const sectionContainer = document.createElement("div");
        sectionContainer.className = "applet-flex-container";

        applets.forEach(applet => {
            const card = new AppletCard(
                applet.title,
                applet.description,
                applet.link,
                applet.accessCount,
                applet.lastAccessed
            );
            sectionContainer.appendChild(card.createCard());
        });

        this.container.appendChild(sectionContainer);
    }
}

// Init renderer
const appletRenderer = new AppletRenderer('applet-container', 'searchApplet');
appletRenderer.fetchAppletData('applets.json');
