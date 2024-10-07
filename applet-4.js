class StudentList {
    constructor(dataUrl) {
        this.dataUrl = dataUrl;
        this.students = [];
        this.init();
    }

    async init() {
        await this.fetchData();
        this.renderStudentList(this.students); 
        this.bindSearchEvent();
    }

    async fetchData() {
        try {
            const response = await fetch(this.dataUrl);
            this.students = await response.json();
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    renderStudentList(students) {
        const studentListContainer = document.getElementById('studentList');
        studentListContainer.innerHTML = ''; 

        students.forEach(student => {
            const listItem = document.createElement('p');
            listItem.textContent = `${student.student_name} - ${student.student_program}`;
            studentListContainer.appendChild(listItem);
        });
    }

}

const studentList = new StudentList('applet-4.json');