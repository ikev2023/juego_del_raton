const audio1 = new Audio("sonido.mp3");
const audioElement = new Audio("suspenso.mp3");
let cont = 0;
let tiempo = 4;
let timer;
let tiempo2 = 90;
let timer2;
let velocidad = 2000;
let timer_efecto;
const canvas = document.getElementById("fallingLeavesCanvas");
const ctx = canvas.getContext("2d");
const leaves = [];
const numLeaves = 100;
const modal = document.getElementById("modalxd");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function createLeaf() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * 18 + 2,
    size: Math.random() * 22 + 3, // Random size between 3 and 25
    speed: Math.random() * 3 + 1, // Random speed between 1 and 4
    color: `rgba(${Math.random() * 200 + 50}, ${Math.random() * 200 + 50}, ${Math.random() * 200 + 50}, ${Math.random() * 0.8 + 0.2})`, // Random color
    //color: `rgba(255, ${Math.random() * 100 + 100}, 0, ${Math.random() * 0.8 + 0.2})`, // Random orange-ish color
    //color: '#000A',
    rotation: Math.random() * 360 // Random initial rotation
  };
}

function createLeaves() {
  for (let i = 0; i < numLeaves; i++) {
    leaves.push(createLeaf());
  }
}

function updateLeaves() {
  for (let i = 0; i < leaves.length; i++) {
    const leaf = leaves[i];
    leaf.y += leaf.speed;
    leaf.x += 1.0 * Math.sin(leaf.y / leaf.size);
    
    if (leaf.y > canvas.height) {
      // Reset the leaf when it goes below the canvas
      leaf.y = -20;
      leaf.x = Math.random() * canvas.width;
    }
  }
}

function drawLeaves() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < leaves.length; i++) {
    const leaf = leaves[i];
    ctx.save();
    ctx.translate(leaf.x + leaf.size / 2, leaf.y + leaf.size / 2);
    ctx.rotate((leaf.rotation * Math.PI) / 180);
    ctx.fillStyle = leaf.color;
    ctx.fillRect(-leaf.size / 2, -leaf.size / 2, leaf.size, leaf.size);
    ctx.restore();
  }
}

function animate() {
  updateLeaves();
  drawLeaves();
  requestAnimationFrame(animate);
}

function onWindowResize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
document.addEventListener('DOMContentLoaded', function () {
    abrir();
});
function jugar() {
    timer = setInterval(function () {
        const juego = document.getElementById('juego');
        const raton = document.getElementById('raton');
        const maxX = juego.clientWidth - raton.clientWidth;
        const maxY = juego.clientHeight - raton.clientHeight;

        const randomX = Math.floor(Math.random() * maxX);
        const randomY = Math.floor(Math.random() * maxY);

        raton.style.left = `${randomX}px`;
        raton.style.top = `${randomY}px`;
        if (cont > 5) {
            velocidad = 1000;
            clearInterval(timer);
            jugar();
        }
        if (cont > 10) {
            velocidad = 850;
            clearInterval(timer);
            jugar();
        }
        if (cont > 20) {
            velocidad = 800;
            clearInterval(timer);
            jugar();
        }
        if (cont > 30) {
            velocidad = 750;
            clearInterval(timer);
            jugar();
        }
        if (cont > 40) {
            velocidad = 700;
            clearInterval(timer);
            jugar();
        }
        if (cont > 80) {
            velocidad = 650;
            clearInterval(timer);
            jugar();
        }
        if (cont > 100) {
            velocidad = 500;
            clearInterval(timer);
            jugar();
        }
    }, velocidad)
}
function sumar() {
    cont++;
    document.getElementById('punto').innerText = "Puntuacion: " + cont;
    audio1.play();
    audio1.volume = 0.2;
}
function cambiar() {
    document.getElementById("juego").style.cursor = "url('martillo2.png'), auto";
    setTimeout(function () { document.getElementById("juego").style.cursor = "url('martillo.png'), auto"; }, 80)
}
function cambiar_pagina() {
    window.location.href = 'juego.html'; // Reemplaza 'nueva_pagina.html' con la URL a la que deseas redirigir
}
function abrir() {
    const modal = document.getElementById("modalxd");
    modal.showModal();
}
function abrir2()
{
    document.getElementById("div1").style.display = "none";
    document.getElementById("div2").style.display = "block";
    const modal = document.getElementById("modalxd");
    modal.showModal();
    let tiempo = 5; // Establece el tiempo inicial
    const h1Modal = document.getElementById("h1_modal");
    const intervalo = setInterval(function () {
        h1Modal.innerText = tiempo;
        tiempo--;
        if (tiempo == -1) {
            h1Modal.innerText = "VAMOS";
        }
        if (tiempo == -2) {
            clearInterval(intervalo); // Detiene el intervalo cuando el tiempo llega a cero
            modal.close();
            jugar();
            duracion();
        }
    }, 1000);
}
function cerrarmodal() {
    const modal = document.getElementById("modalxd");
    modal.close();
}
function duracion() {
    const timer2 = setInterval(() => {
        const hours = Math.floor(tiempo2 / 3600);
        const minutes = Math.floor((tiempo2 % 3600) / 60);
        const seconds = tiempo2 % 60;
        const tiempo_formato = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        document.getElementById("tiempito").innerText = "Tiempo: " + tiempo_formato;
        tiempo2--;
        if (tiempo2==11) {
            document.getElementById("tiempito").style.color = "red";
            audioElement.play();
            color_efecto();
        }
        if (tiempo2 < 0) {
            clearInterval(timer2);
            clearInterval(timer_efecto);
            document.getElementById("tiempito").style.color = "white";
            gameover();
        }
    }, 1000);
    function color_efecto() {
        let colorActual = "#535355";
        timer_efecto = setInterval(() => {
            let xd = document.getElementById("tiempito");
            xd.style.color = (colorActual === "#535355") ? "red" : "#535355";
            colorActual = (colorActual === "#535355") ? "red" : "#535355";
        }, 200);
    }
}
function gameover() {
    clearInterval(timer);
    document.getElementById("h1_modal2").innerText = "Tu puntaje fue de: "+cont;
    setTimeout(function () { document.getElementById("modalxd2").showModal();
    createLeaves();
    animate();}, 1000)
}
function menu()
{
    window.location.href = 'index.html';
}
function rein()
{
    window.location.href = 'juego.html';
}


