document.addEventListener('DOMContentLoaded', function() {
    // Получаем элементы формы логина и кнопки выхода
    const loginForm = document.getElementById('loginForm');
    const logoutButton = document.getElementById('logoutButton');
    const usernameInput = document.getElementById('username');
    
    // Проверяем, сохранено ли имя пользователя в localStorage при загрузке страницы
    window.onload = function() {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            // Если пользователь уже сохранён, показываем его как вошедшего
            displayLoggedIn(storedUsername);
        }
    };

    // Обработка процесса входа
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();  // Предотвращаем отправку формы
        const username = usernameInput.value;

        if (username) {
            // Сохраняем имя пользователя в localStorage
            localStorage.setItem('username', username);
            displayLoggedIn(username);
        } else {
            alert('Введите имя пользователя.');
        }
    });

    // Обработка процесса выхода
    logoutButton.addEventListener('click', function() {
        // Удаляем имя пользователя из localStorage
        localStorage.removeItem('username');
        displayLoggedOut();
    });

    // Функция для отображения состояния "вошёл в систему"
    function displayLoggedIn(username) {
        loginForm.style.display = 'none';  // Скрываем форму входа
        logoutButton.style.display = 'block';  // Показываем кнопку выхода
        alert(`Welcome, ${username}!`);
    }

    // Функция для отображения состояния "вышел из системы"
    function displayLoggedOut() {
        loginForm.style.display = 'block';  // Показываем форму входа
        logoutButton.style.display = 'none';  // Скрываем кнопку выхода
        usernameInput.value = '';  // Очищаем поле ввода
        alert('You have logged out.');
    }

    // Ваша существующая логика для формы валидации, изменения фона и переключения тем
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

    // Изменение цвета фона с сохранением в localStorage
    document.getElementById('changeColorBtn').addEventListener('click', function() {
        let colors = ['#FF5733', '#33FF57', '#3357FF', '#F5FF33', '#000000', '#FFFFFF'];
        let randomColor = colors[Math.floor(Math.random() * colors.length)];
        document.body.style.transition = 'background-color 0.5s ease';
        document.body.style.backgroundColor = randomColor;

        // Сохраняем выбранный цвет в localStorage
        localStorage.setItem('backgroundColor', randomColor);
    });

    // Загрузка цвета фона из localStorage
    const savedBackgroundColor = localStorage.getItem('backgroundColor');
    if (savedBackgroundColor) {
        document.body.style.backgroundColor = savedBackgroundColor;
    }

    // Переключение темы с сохранением состояния в localStorage
    document.getElementById('themeToggle').addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');

        // Сохраняем предпочтение темы в localStorage
        const isDarkTheme = document.body.classList.contains('dark-theme');
        localStorage.setItem('darkTheme', isDarkTheme);
    });

    // Загрузка сохранённой темы из localStorage
    const savedDarkTheme = localStorage.getItem('darkTheme');
    if (savedDarkTheme === 'true') {
        document.body.classList.add('dark-theme');
    }

    // Приветственное сообщение
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

    // Отображение текущей даты и времени
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

