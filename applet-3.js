class DataLogger {
    constructor(buttonId, cardContainerId) {
        this.logButton = document.getElementById(buttonId);
        this.cardContainer = document.getElementById(cardContainerId);
        this.loggedData = [];

        this.logButton.addEventListener('click', () => this.logData());
    }

    logData() {
        const timestamp = new Date().toLocaleString();
        this.loggedData.push(timestamp);
        this.updateCardContainer();
    }

    updateCardContainer() {
        this.cardContainer.innerHTML = '';

        this.loggedData.forEach(data => {
            const card = document.createElement('div');
            card.className = 'card mb-2';
            card.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">Logged Data</h5>
                    <p class="card-text">${data}</p>
                </div>
            `;
            this.cardContainer.appendChild(card);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new DataLogger('logButton', 'cardContainer');
});
