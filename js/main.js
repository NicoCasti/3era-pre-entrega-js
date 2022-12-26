//declaracion e inicialización de variables
let fichasDestapadas = 0;
let ficha1 = null;
let ficha2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 30;
let timerInicial = 30;
let tiempoRestante = null;

//apunto al documento html
let mostrarMovimientos = document.getElementById("movimientos");
let mostrarAciertos = document.getElementById("aciertos");
let mostrarTiempo = document.getElementById("t-restante");

//declaro los pares de forma ordenada
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];

//desordeno los pares para que los numeros aparezcan random
numeros = numeros.sort(()=>{return Math.random()-0.5});
console.log(numeros);

//funcion del temporizador
function contarTiempo()
{
    tiempoRestante = setInterval(()=>{
        timer--;
        mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
        if(timer == 0)
        {
            clearInterval(tiempoRestante);
            bloquearFichas();
        }
    },1000)
}

function bloquearFichas()
{
    for (let i = 0; i<=15; i++)
    {
        let fichaBloqueada = document.getElementById(i);
        fichaBloqueada.innerHTML = numeros[i];
        fichaBloqueada.disabled = true;
    }
}

//funcion principal
function destapar(id)
{
    if(temporizador == false)
    {
        contarTiempo();
        temporizador = true;
    }
    fichasDestapadas++;
    console.log(fichasDestapadas);

    if(fichasDestapadas == 1)
    {
        //muestro el primer número
        ficha1 = document.getElementById(id);
        primerResultado = numeros[id];
        ficha1.innerHTML = primerResultado;

        //deshabilito el botón que ya elegí
        ficha1.disabled = true;
    }else if(fichasDestapadas == 2) 
    {
        //muestro el segundo número
        ficha2 = document.getElementById(id);
        segundoResultado = numeros[id];
        ficha2.innerHTML = segundoResultado;

        //deshabilito el botón que ya elegí
        ficha2.disabled = true;

        //incremento movimientos
        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

        if(primerResultado ==  segundoResultado)
        {
            //reseteo contador fichas dadas vueltas 
            fichasDestapadas = 0;

            //Aumento acieros
            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;

            //si acierto todos los pares
            if(aciertos == 8)
            {
                clearInterval(tiempoRestante);
                mostrarAciertos.innerHTML = `Aciertos: ${aciertos} 🥳🥳🥳`;
                mostrarTiempo.innerHTML = `Genial!!!, tardaste solo ${timerInicial - timer} segundos`;
                mostrarMovimientos.innerHTML = `Movimientos: ${movimientos} 👌👌👌`;
            }
        }else{
            //si los valores que elegí son distintos, luego de 2 segundos tapo nuevamente las fichas
            setTimeout(()=>{
                ficha1.innerHTML = ' ';
                ficha2.innerHTML = ' ';
                ficha1.disabled = false;
                ficha2.disabled = false;
                fichasDestapadas = 0;
            }, 800);
        }
    }
}
