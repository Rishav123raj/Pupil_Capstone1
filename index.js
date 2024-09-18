document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const userTable = document.getElementById('userTable').getElementsByTagName('tbody')[0];

    // Load saved data
    loadSavedData();

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const dob = document.getElementById('dob').value;
        const terms = document.getElementById('terms').checked;

        if (validateAge(dob)) {
            addUser(name, email, password, dob, terms);
            saveData();
            form.reset();
        } else {
            alert('You must be between 18 and 55 years old to register.');
        }
    });

    function validateAge(dateString) {
        const today = new Date();
        const birthDate = new Date(dateString);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        return age >= 18 && age <= 55;
    }

    function addUser(name, email, password, dob, terms) {
        const row = userTable.insertRow();
        row.innerHTML = `
            <td>${name}</td>
            <td>${email}</td>
            <td>${password}</td>
            <td>${dob}</td>
            <td>${terms ? 'Yes' : 'No'}</td>
        `;
    }

    function saveData() {
        const users = [];
        for (let i = 0; i < userTable.rows.length; i++) {
            const cells = userTable.rows[i].cells;
            users.push({
                name: cells[0].innerText,
                email: cells[1].innerText,
                password: cells[2].innerText,
                dob: cells[3].innerText,
                terms: cells[4].innerText === 'Yes'
            });
        }
        localStorage.setItem('users', JSON.stringify(users));
    }

    function loadSavedData() {
        const savedUsers = JSON.parse(localStorage.getItem('users')) || [];
        savedUsers.forEach(user => {
            addUser(user.name, user.email, user.password, user.dob, user.terms);
        });
    }
});