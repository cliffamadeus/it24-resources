class AppletCard {
    constructor(title,icon, description, link) {
        this.title = title;
        this.icon = icon;
        this.description = description;
        this.link = link;
    }

    createCard() {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card applet-card';
        cardDiv.innerHTML = `
            <div class="card"  data-bs-toggle="tooltip" title="${this.description}">
                <a href="${this.link}" style="text-decoration: none; color: inherit;">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-4">
                                <img src="${this.icon}" class="applet-icon rounded float-start">
                            </div>
                            <div class="col-8">
                                <h5 class="card-title">${this.title}</h5>
                                <p class="card-text"</p>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        `;
        return cardDiv;
    }
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
                this.appletData = data;
                this.filteredData = data;
                this.renderApplets(this.filteredData);
            })
            .catch(error => console.error('Error loading applet data:', error));
    }

    renderApplets(data) {
        this.container.innerHTML = '';
        data.forEach(applet => {
            const appletCard = new AppletCard(applet.title,applet.icon, applet.description, applet.link);
            const cardElement = appletCard.createCard();
            this.container.appendChild(cardElement);
        });

        // Initialize tooltips after rendering
        this.initializeTooltips();
    }

    initializeTooltips() {
        const tooltipTriggerList = [].slice.call(this.container.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.forEach(tooltipTriggerEl => {
            new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }

    filterApplets() {
        const query = this.searchInput.value.toLowerCase();
        this.filteredData = this.appletData.filter(applet =>
            applet.title.toLowerCase().includes(query) ||
            applet.description.toLowerCase().includes(query)
        );
        this.renderApplets(this.filteredData);
    }
}

const appletRenderer = new AppletRenderer('applet-container', 'searchApplet');
appletRenderer.fetchAppletData('applets.json');
