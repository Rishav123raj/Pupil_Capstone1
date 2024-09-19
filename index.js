document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const userTable = document.getElementById('userTable').getElementsByTagName('tbody')[0];

    // Load saved data
    loadSavedData();

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const dob = document.getElementById('dob').value;
        const terms = document.getElementById('terms').checked;

        if (validateForm(name, email, password, dob)) {
            saveData(name, email, password, dob, terms);
            addRowToTable(name, email, password, dob, terms);
            form.reset();
        }
    });

    function validateForm(name, email, password, dob) {
        // Basic validation
        if (!name || !email || !password || !dob) {
            alert('All fields are required');
            return false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address');
            return false;
        }

        // Date of birth validation (18-55 years old)
        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        if (age < 18 || age > 55) {
            alert('You must be between 18 and 55 years old to register');
            return false;
        }

        return true;
    }

    function saveData(name, email, password, dob, terms) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        users.push({ name, email, password, dob, terms });
        localStorage.setItem('users', JSON.stringify(users));
    }

    function loadSavedData() {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        users.forEach(user => addRowToTable(user.name, user.email, user.password, user.dob, user.terms));
    }

    function addRowToTable(name, email, password, dob, terms) {
        const row = userTable.insertRow();
        row.insertCell(0).textContent = name;
        row.insertCell(1).textContent = email;
        row.insertCell(2).textContent = password;
        row.insertCell(3).textContent = dob;
        row.insertCell(4).textContent = terms ? 'Yes' : 'No';
    }
});
