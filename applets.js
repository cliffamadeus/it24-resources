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
                <a href="${this.link}" class="btn btn-primary">Go to Applet</a>
            </div>
        `;
        return cardDiv;
    }
}

class AppletRenderer {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
    }

    fetchAppletData(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => this.renderApplets(data))
            .catch(error => console.error('Error loading applet data:', error));
    }

    renderApplets(data) {
        data.forEach(applet => {
            const appletCard = new AppletCard(applet.title, applet.description, applet.link);
            const cardElement = appletCard.createCard();
            this.container.appendChild(cardElement);
        });
    }
}

const appletRenderer = new AppletRenderer('applet-container');
appletRenderer.fetchAppletData('applets.json');
