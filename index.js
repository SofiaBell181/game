const tl = new TimelineMax();

tl.from('#container', 1.5, {
    opacity: 0,
    x: 200,
    skewX: -5,
    delay: 1
})

tl.from('#user_attempts', 1.5, {
    opacity: 0,
    x: -100,
})

tl.from('#number_attempts', 1.5, {
    opacity: 0,
    x: 100,
})

tl.from('#btnNewGame', 1.5, {
    opacity: 0,
})






const text = 'Игра с компьютером';
let i = 0;
const speed = 110;

function type() {
    if (i < text.length) {
        document.querySelector('#par').textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
    }
}

type();

const button = document.querySelector('#btn');
const inputField = document.querySelector('#input_field');
const randomNumber = Math.floor(Math.random()*20)+1;
let userAttempts = 5;

inputField.addEventListener('keypress', function(e) {
    if (e.keyCode === 13)
    play();
})

button.addEventListener('click', play);

function play() {

    const userNumber = document.querySelector('#input_field').value;

    userAttempts--;
    const attempts = document.querySelector('#attempts');
    attempts.textContent = userAttempts;

    const numberAttempts = document.querySelector('#numberAttempts');
    numberAttempts.textContent += userNumber + ', ';

    if (userAttempts === 0 ) {
        if (Number(userNumber) === randomNumber) {
            victory();
        }

        else {
            losing();
        }
    }

  else {
    if (userNumber < 1 || userNumber > 20) {
        Swal.fire({
            icon: 'error',
            title: 'Ой...',
            text: 'Введи число от 1 до 20!',
        })
        inputField.value = '';
    }

   else if (isNaN(userNumber)) {
        Swal.fire({
            icon: 'error',
            title: 'Ой...',
            text: 'Нужно ввести число!',
        })
        inputField.value = '';
    }

    else {
        if (randomNumber > userNumber) {
            Swal.fire('Попробуй число повыше.',
            'Компьютер пока побеждает!');
            inputField.value = '';
        }

        else if (randomNumber < userNumber) {
            Swal.fire('Попробуй число пониже.',
            'Компьютер пока побеждает!');
            inputField.value = '';
        }

        else {
            victory();
        }
    }
  }
}

function victory() {
    Swal.fire({
        title: 'Победа!',
        width: 600,
        padding: '3em',
        background: '#000000 url(https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80)',
        backdrop: `
          rgba(0,0,123,0.4)
          url("https://media.giphy.com/media/QMkPpxPDYY0fu/giphy.gif")
          center top
          no-repeat
        `
      })
      inputField.value = '';
      inputField.setAttribute('disabled', '');
      button.setAttribute('disabled', '');
      btnNewGame.style.display = 'block';
      btnNewGame.addEventListener('click', newGame)
}

function losing() {
    const gameOver = document.querySelector('#game_over');
    const tryAnswer = document.querySelector('#tryAnswer');
    const btnNewGame = document.querySelector('#btnNewGame');
    gameOver.style.display = 'block';
    btnNewGame.style.display = 'block';
    tryAnswer.textContent = randomNumber;
    inputField.value = '';
    inputField.setAttribute('disabled', '');
    button.setAttribute('disabled', '');
    btnNewGame.addEventListener('click', newGame)
}

function newGame() {
    location.reload();
}

