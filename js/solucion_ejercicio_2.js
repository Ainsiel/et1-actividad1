//Ejercicio de practica Javascript

//Objeto base para los personajes
class Character {
    constructor(name, health, damage) {
        //Atributos
        this.name = name;
        this.health = health;
        this.maxhealth = health;
        this.damage = damage;
    }
    //Verifica si el personaje esta vivo
    isAlive() {
        return this.health > 0;
    }
    //Ataca a otro personaje seleccionado
    attack(target) {
        createText(`${this.name} deals ${this.damage} DMG to ${target.name}`)
        target.health -= this.damage;
        if (target.health < 0) {
            target.health = 0
        }
        updateHealthBar(target);
    }
    //Retorna la información actual del personaje
    status() {
        return `${this.name} - HP ${this.health}/${this.maxhealth}`;
    }
}

//Creación de personajes
const heroMaxHealth = Math.floor(Math.random() * 100) + 1;
const enemyMaxHealth = Math.floor(Math.random() * 100) + 1;
const heroAttk = Math.floor(Math.random() * 6) + 5;
const enemyAttk = Math.floor(Math.random() * 6) + 5;
const hero = new Character("Heroe", heroMaxHealth, heroAttk);
alert(`${hero.name} tiene ${hero.maxhealth} HP y ${hero.damage} ATK `);
const enemy = new Character("Limo", enemyMaxHealth, enemyAttk);
alert(`${enemy.name} tiene ${enemy.maxhealth} HP y ${enemy.damage} ATK `);

updateHealthBar(hero);
updateHealthBar(enemy);

//Función para combatir
function fight(firstCharacter, secondCharacter) {
    createText("Empieza el combate!")
    createText(hero.status())
    createText(enemy.status())
    
    // Manejar el evento de presionar una tecla
    document.addEventListener('keydown', function (event) {
        // Verificar si se presionó la tecla 'x'
        if (event.key === 'x') {
            if (firstCharacter.isAlive()) {
                firstCharacter.attack(secondCharacter);
                createText(hero.status());
                createText(enemy.status());
            } else {
                createText(`${firstCharacter.name} died!`);
            }
        }
        // Verificar si se presionó la tecla 'n'
        else if (event.key === 'n') {
            if (secondCharacter.isAlive()) {
                secondCharacter.attack(firstCharacter);
                createText(hero.status());
                createText(enemy.status());
            } else {
                createText(`${secondCharacter.name} died!`);
            }
        }
    });
}

function createText(s) {
    //Seleccionar el elemento padre
    var container = document.getElementById("container");

    //Crear un nuevo elemento párrafo
    var newP = document.createElement("p");

    //Crear un nodo de texto con el string 's'
    var text = document.createTextNode(s);

    //Añadir el nodo de texto al elemento párrafo
    newP.appendChild(text);

    //Añadir el elemento párrafo al elemento padre
    container.appendChild(newP);
}

function updateHealthBar(character) {
    const healthBarElement = document.getElementById(`${character.name.toLowerCase()}HealthBar`);
    const healthPercentage = (character.health / character.maxhealth) * 100;
    const damagePercentage = 100 - healthPercentage;
    var charHealth = document.getElementById(`${character.name.toLowerCase()}Health`)
    charHealth.innerHTML = `${character.health} / ${character.maxhealth} HP`
    healthBarElement.innerHTML = `  
      <div class="health" style="width: ${healthPercentage}%;"></div>
      <div class="damage" style="width: ${damagePercentage}%;"></div>
    `;
}

document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth * 0.6; // Ancho del rectángulo
    canvas.height = window.innerHeight * 0.6; // Alto del rectángulo

    const squareSize = 50; // Tamaño de los cuadrados

    const player1 = {
        x: 50,
        y: 50,
        color: 'blue'
    };

    const player2 = {
        x: canvas.width - 50,
        y: canvas.height - 50,
        color: 'red'
    };

    function draw() {
        requestAnimationFrame(draw);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Dibujar rectángulo
        ctx.strokeStyle = 'black';
        ctx.strokeRect(0, 0, canvas.width, canvas.height);

        // Dibujar jugador 1 (WASD)
        ctx.fillStyle = player1.color;
        ctx.fillRect(player1.x, player1.y, squareSize, squareSize);

        // Dibujar jugador 2 (flechas)
        ctx.fillStyle = player2.color;
        ctx.fillRect(player2.x, player2.y, squareSize, squareSize);
    }
    draw();

    function checkBounds(player) {
        if (player.x < 0) {
            player.x = 0;
        }
        if (player.x + squareSize > canvas.width) {
            player.x = canvas.width - squareSize;
        }
        if (player.y < 0) {
            player.y = 0;
        }
        if (player.y + squareSize > canvas.height) {
            player.y = canvas.height - squareSize;
        }
    }

    function movePlayer1(key) {
        switch (key) {
            case 'KeyW':
                player1.y -= 10;
                break;
            case 'KeyA':
                player1.x -= 10;
                break;
            case 'KeyS':
                player1.y += 10;
                break;
            case 'KeyD':
                player1.x += 10;
                break;
        }
        checkBounds(player1);
        draw();
    }

    function movePlayer2(key) {
        switch (key) {
            case 'ArrowUp':
                player2.y -= 10;
                break;
            case 'ArrowLeft':
                player2.x -= 10;
                break;
            case 'ArrowDown':
                player2.y += 10;
                break;
            case 'ArrowRight':
                player2.x += 10;
                break;
        }
        checkBounds(player2);
        draw();
    }
    document.addEventListener('keydown', function (event) {
        movePlayer1(event.code);
        movePlayer2(event.code);
    });
    draw();
});

//Comenzar combate
fight(hero, enemy);