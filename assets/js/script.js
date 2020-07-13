//Jogador
let posJogadorIniY = 240;
let posJogadorY;
let barraJogadorY = 140;
let barraJogadorX = 20;
let vJogador;
let posJogadorX;
let dirJogadorY;

//Cpu
let barraCpuY = 140;
let barraCpuX = 20;
let posCpuY;
let posCpuIniY = 240;
let posCpuX;
let dirCpuY;

//Bola
let vBola, bolaX, bolaY, posBolaIniX = 675, posBolaIniY = 300, bolaH = 20, bolaW = 20, posBolaX, posBolaY;

//Jogo
let frames;
let tecla;
let jogo = false;
let iniciar;


function controlaJogador() {
    if(jogo) {
        posJogadorY += velJogador * dirJogadorY;
        if(posJogadorY <= 60) /*O campo está a 50 pixels do topo, logo o máximo que a barrinha poderá chegar na parte superior será 50px(limite do campo), coloquei 60px para ficar um pouco afastado */ 
        {
            posJogadorY += (velJogador * dirJogadorY) * (-1);
        } else if(posJogadorY + barraJogadorY >= 540) /*O campo está a 50 pixels do topo, logo o máximo que a barrinha poderá chegar na parte inferior será 550px(limite do campo), coloquei 540px para ficar um pouco afastado */ 
        {
            posJogadorY += (velJogador * dirJogadorY) * (-1);
        }
    }
    vJogador.style.top = posJogadorY + 'px'
}

function controlaBola() {
    if(jogo) {
        posBolaX += velBola * bolaX;
        posBolaY += velBola * bolaY;

        //Colisão com barra do jogador
        if((posBolaX <= (posJogadorX + barraJogadorX)) && (posBolaY <= (posJogadorY + barraJogadorY)) && (posBolaY + bolaH) >= (posJogadorY)) {
            bolaY = ((posBolaY + (bolaH/2)) - (posJogadorY +(barraJogadorY/2)))/16;
            bolaX *= -1; 
            console.log(bolaY)
        } 

        //Colisão com barra da cpu
        if(((posBolaX + bolaW) >= posCpuX) && (posBolaY <= (posCpuY + barraCpuY)) && (posBolaY + bolaH) >= (posCpuY)) {
            bolaY = ((posBolaY + (bolaH/2)) - (posCpuY +(barraCpuY/2)))/16;
            bolaX *= -1; 
        } 


        //Bater nos limites superior e inferiores
        
        if((posBolaY <= 55) || (posBolaY >= 545)) {
                bolaY *= -1;
        }

        vBola.style.top = posBolaY + 'px';
        vBola.style.left = posBolaX + 'px';
    }
}

function game() {
    if(jogo) {
        controlaJogador();
        controlaBola();
    }
    frames = requestAnimationFrame(game);
}

function teclaDown() {
    tecla = event.keyCode;
    if(tecla == 38) {
        dirJogadorY = -1;
    } else if(tecla == 40) {
        dirJogadorY = 1;
    }
}

function teclaUp() {
    tecla = event.keyCode;
    if(tecla == 38) {
        dirJogadorY = 0;
    } else if(tecla == 40) {
        dirJogadorY = 0;
    }
}


function iniciaJogo() {
    if (!jogo) {
        posBolaX = posBolaIniX;
        posBolaY = posBolaIniY;
        jogo = true;
        if((Math.random() * 10) < 5) {
            bolaX = -1;
        } else {
            bolaX = 1;
        }
        bolaY = 0;
        posJogadorX = 220;
        posCpuX = 1130;
        posJogadorY = posJogadorIniY;
        dirJogadorY = 0;
        posCpuY = posCpuIniY;
        game();
    }   
}


function inicializa() {
    velBola = velJogador = 8;
    vJogador = document.querySelector('.barraJogador');
    iniciar = document.querySelector('.btnIniciar');
    iniciar.addEventListener('click', iniciaJogo);
    document.addEventListener('keydown', teclaDown);
    document.addEventListener('keyup', teclaUp);
    vBola = document.querySelector('.bola');
}


window.addEventListener('load', inicializa);