document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const logoutButton = document.getElementById('logoutButton');
    const usernameInput = document.getElementById('username');
    
    window.onload = function() {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            displayLoggedIn(storedUsername);
        }
    };

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = usernameInput.value;

        if (username) {
            localStorage.setItem('username', username);
            displayLoggedIn(username);
        } else {
            alert('Enter your name.');
        }
    });

    logoutButton.addEventListener('click', function() {
        localStorage.removeItem('username');
        displayLoggedOut();
    });

    function displayLoggedIn(username) {
        loginForm.style.display = 'none';
        logoutButton.style.display = 'block';
        alert(`Welcome, ${username}!`);
    }

    function displayLoggedOut() {
        loginForm.style.display = 'block';
        logoutButton.style.display = 'none';
        usernameInput.value = '';
        alert('You have logged out.');
    }

    document.getElementById('contactForm').addEventListener('submit', function(event) {
        event.preventDefault(); 
        let errors = '';  
        let name = document.getElementById('name').value;
        let email = document.getElementById('email').value;
        let message = document.getElementById('message').value;

        if (!name) {
            errors += 'Name is required.<br>';
        }

        if (!email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/)) {
            errors += 'Valid email is required.<br>';
        }

        if (!message) {
            errors += 'Message is required.<br>';
        }

        if (errors) {
            document.getElementById('formErrors').innerHTML = errors; 
        } else {
            document.getElementById('formErrors').innerHTML = 'Form submitted successfully!'; 

            setTimeout(() => {
                var modal = bootstrap.Modal.getInstance(document.getElementById('contactModal'));
                modal.hide();
            }, 2000);
        }
    });
    
    var accordion = document.querySelector(".accordion");


    accordion.addEventListener("click", function() {
            this.classList.toggle("active");
        var panel = this.nextElementSibling;
        document.querySelector = 'background-color 0.5s ease';

    
        if (panel.classList.contains("open")) {
            panel.classList.remove("open");
        } else {
            panel.classList.add("open");
        }
    });



    document.getElementById('changeColorBtn').addEventListener('click', function() {
        let colors = ['#FF5733', '#33FF57', '#3357FF', '#F5FF33', '#000000', '#FFFFFF'];
        let randomColor = colors[Math.floor(Math.random() * colors.length)];
        document.body.style.transition = 'background-color 0.5s ease';
        document.body.style.backgroundColor = randomColor;

        localStorage.setItem('backgroundColor', randomColor);
    });

    const savedBackgroundColor = localStorage.getItem('backgroundColor');
    if (savedBackgroundColor) {
        document.body.style.backgroundColor = savedBackgroundColor;
    }

    document.getElementById('themeToggle').addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');

        const isDarkTheme = document.body.classList.contains('dark-theme');
        localStorage.setItem('darkTheme', isDarkTheme);
    });

    const savedDarkTheme = localStorage.getItem('darkTheme');
    if (savedDarkTheme === 'true') {
        document.body.classList.add('dark-theme');
    }

    document.getElementById('greetBtn').addEventListener('click', function() {
        const name = document.getElementById('nameInput').value;
        const greetingMessage = document.getElementById('greetingMessage');

        if (name) {
            greetingMessage.textContent = `Hello, ${name}!`;
        } else {
            greetingMessage.textContent = "Please enter your name.";
        }
        const sound = document.getElementById('greetingSound');
        sound.play();
    });

    function displayDateTime() {
        let now = new Date();
        let formattedDate = now.toLocaleString('en-US', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
            hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true
        });
        document.getElementById('currentDateTime').innerHTML = formattedDate;
    }

    setInterval(displayDateTime, 1000);
    displayDateTime();
});


