class AppletCard {
    constructor(title, description, link) {
        this.title = title;
        this.description = description;
        this.link = link;
    }

    createCard() {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card applet-card';
        cardDiv.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${this.title}</h5>
                <p class="card-text">${this.description}</p>
                <a href="${this.link}" class="btn btn-primary applet-btn" style="">Go to Applet</a>
            </div>
        `;
        return cardDiv;
    }
}

class AppletRenderer {
    constructor(containerId,searchInputId) {
        this.container = document.getElementById(containerId);

        //
        this.searchInput = document.getElementById(searchInputId);
        this.appletData = [];
        this.filteredData = [];
        this.searchInput.addEventListener('input',()=> this.filterApplets());
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
            const appletCard = new AppletCard(applet.title, applet.description, applet.link);
            const cardElement = appletCard.createCard();
            this.container.appendChild(cardElement);
        });
    }

    filterApplets(){
        const query = this.searchInput.value.toLowerCase();
        this.filteredData = this.appletData.filter(applet =>
            applet.title.toLowerCase().includes(query) ||
            applet.description.toLowerCase().includes(query)
        );
        this.renderApplets(this.filteredData);
    }
}

const appletRenderer = new AppletRenderer('applet-container','searchApplet');
appletRenderer.fetchAppletData('applets.json');
