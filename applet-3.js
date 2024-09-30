class DataLogger {
    constructor(buttonId, listId) {
        this.logButton = document.getElementById(buttonId);
        this.dataList = document.getElementById(listId);
        this.loggedData = [];

        this.logButton.addEventListener('click', () => this.logData());
    }

    logData() {
        const timestamp = new Date().toLocaleString();
        this.loggedData.push(timestamp);
        this.updateDataList();
    }

    updateDataList() {

        this.dataList.innerHTML = '';

        this.loggedData.forEach(data => {
            const listItem = document.createElement('li');
            listItem.textContent = data;
            this.dataList.appendChild(listItem);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new DataLogger('logButton', 'dataList');
});
