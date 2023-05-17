const char = document.querySelector('.char');
const paje = document.querySelector('.paje');
let score = 0;
let scoreInterval;
let loop;
let pajeAnimationDuration = 2500; // Duração inicial da animação do paje
const speedIncreaseInterval = 1000; // Intervalo de tempo para aumentar a velocidade (em milissegundos)
const speedIncreaseAmount = 5; // Quantidade de redução na duração da animação a cada aumento de velocidade

scoreInterval = setInterval(() => {
  score++; // Incrementa a pontuação
  updateScore(); // Atualiza a pontuação na tela
}, 300);

const increasePajeSpeed = () => {
  pajeAnimationDuration -= speedIncreaseAmount; // Reduz a duração da animação para aumentar a velocidade
  paje.style.animationDuration = `${pajeAnimationDuration}ms`; // Atualiza a duração da animação do paje
};

const updateScore = () => {
  const scoreElement = document.getElementById('score-value');
  scoreElement.textContent = score;

  increasePajeSpeed(); // Aumenta a velocidade do paje com base na pontuação
};

const restartButton = document.querySelector('.restart-button');
restartButton.addEventListener('click', () => {
  location.reload(); // Recarrega a página
  paje.style.animationDuration = '2500ms';
});




const showGameOver = () => {
  clearInterval(scoreInterval);
  clearInterval(loop); // Pára a verificação contínua da colisão
  document.querySelector('.game-over').style.display = 'block'; // Mostra a tela de "Game Over"
  restartButton.style.display = 'block';
};

const jump = () => {
  char.classList.add('jump');

  setTimeout(() => {
    char.classList.remove('jump');
  }, 1000);
};

loop = setInterval(() => {
  const pajePosition = paje.offsetLeft;
  const charPosition = parseFloat(window.getComputedStyle(char).bottom.replace('px', ''));

  const pajeWidth = parseFloat(window.getComputedStyle(paje).width.replace('px', ''));
  const charWidth = parseFloat(window.getComputedStyle(char).width.replace('px', ''));

  if (
    pajePosition <= 60 &&
    pajePosition + pajeWidth > 0 &&
    charPosition < 80 &&
    charPosition + charWidth > pajePosition
  ) {
    paje.style.animation = 'none';
    paje.style.left = `${pajePosition}px`;

    char.style.animation = 'none';
    char.style.bottom = `${charPosition}px`;
    showGameOver();
    clearInterval(loop);
  }
}, 10);

const handleJump = () => {
  if (char.classList.contains('jump')) {
    return; // Impede que múltiplos saltos sejam ativados ao mesmo tempo
  }
  char.classList.add('jump');

  setTimeout(() => {
    char.classList.remove('jump');
  }, 1000);
};

const handleKeyDown = event => {
  if (event.code === 'Space' || event.code === 'ArrowUp') {
    handleJump();
  }
};
document.addEventListener('keydown', jump);
document.addEventListener('touchstart', handleJump);


