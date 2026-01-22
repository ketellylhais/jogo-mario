const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const reiniciar = document.querySelector('.reiniciar');
const play = document.querySelector('.play');
const pontuacao = document.querySelector('.pontuacao');
const exibir = document.querySelector('.exibirPontuacao');
const somPulo = new Audio('Super Mario - Som do pulo do Mário.mp3')


let score = 0;
let ticks = 0;
let jogoAtivo = false;

const jump = () => {
    if(!jogoAtivo) return;

    mario.classList.add('jump');

    somPulo.currentTime = 0;
    somPulo.play();

    setTimeout(() =>{
        mario.classList.remove('jump');
    }, 500);

}

play.style.display = 'block';
exibir.style.display = 'none'
pipe.style.display = 'none';

play.addEventListener('click', () => {
    play.style.display = 'none';
    reiniciar.style.display = 'none';
    pipe.style.display = 'block';
    jogoAtivo = true;

 const loop = setInterval(()=>{
    const pipePosition =  pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '' );
    pipe.classList.add('pipeAnimation');
    
    ticks++;
if (ticks % 10 === 0) {
    score++;
    pontuacao.textContent = score;
}

    if(pipePosition <= 95 && pipePosition > 0 && marioPosition < 85    ){
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`

        mario.style.animation = 'none';
        mario.style.bottom = `${marioPosition}px`

        mario.src = './img/game-over.png';
        mario.style.width = '60px'
        mario.style.marginLeft = '35px'

        exibir.style.display = 'block'
        exibir.innerHTML = "Seu score é: "+score;

        clearInterval(loop);

        reiniciar.style.display = 'block';

        jogoAtivo = false;
    }
} ,10);
})


document.addEventListener('keydown', jump);
document.addEventListener('touchstart', jump);

reiniciar.addEventListener('click', () =>{
    location.reload();
})