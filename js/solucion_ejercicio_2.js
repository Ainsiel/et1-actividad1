class Character {
    constructor(x, y, width, height, color, name, health, damage) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
        this.name = name;
        this.health = health;
        this.maxhealth = health;
        this.damage = damage;
    }

    isAlive() {
        return this.health > 0;
    }

    attack(target) {
        target.health -= this.damage;
        console.log("Target HP: ", target.health)
        if (target.health < 0) {
            target.health = 0
        }

        updateHealthBar(target);
    }
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

    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.8;

    const squareSize = 50;

    const heroMaxHealth = Math.floor(Math.random() * 60) + 40;
    const enemyMaxHealth = Math.floor(Math.random() * 60) + 40;
    const heroAttk = Math.floor(Math.random() * 6) + 5;
    const enemyAttk = Math.floor(Math.random() * 6) + 5;

    const hero = new Character(
        50,
        50,
        squareSize,
        squareSize,
        'blue',
        "Heroe",
        heroMaxHealth,
        heroAttk);

    const limo = new Character(
        canvas.width - 100,
        canvas.height - 100,
        squareSize,
        squareSize,
        'red',
        "Limo",
        enemyMaxHealth,
        enemyAttk
    );

    updateHealthBar(hero)
    updateHealthBar(limo)
    alert(`${hero.name} tiene ${hero.maxhealth} HP, ${hero.damage} ATTK`);
    alert(`${limo.name} tiene ${limo.maxhealth} HP, ${limo.damage} ATTK`);

    let lastAttackTime = 0; // Variable para almacenar el tiempo del último ataque
    const attackInterval = 700; // Intervalo de tiempo entre ataques en milisegundos (1 segundo)
    let currentTime

    function drawCharacter(character) {
        ctx.fillStyle = character.color;
        ctx.fillRect(character.x, character.y, character.width, character.height);
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawCharacter(hero);
        drawCharacter(limo);
    }

    function checkCollision(character1, character2) {
        return character1.x < character2.x + character2.width &&
            character1.x + character1.width > character2.x &&
            character1.y < character2.y + character2.height &&
            character1.y + character1.height > character2.y;
    }


    function handleCollision() {
        if (hero.isAlive() && limo.isAlive() && checkCollision(hero, limo) && (currentTime - lastAttackTime >= attackInterval)) {
            hero.attack(limo);
            limo.attack(hero);
            lastAttackTime = currentTime;
        }
    }

    function moveHero(key) {
        switch (key) {
            case 'KeyW':
                hero.y -= 10;
                break;
            case 'KeyA':
                hero.x -= 10;
                break;
            case 'KeyS':
                hero.y += 10;
                break;
            case 'KeyD':
                hero.x += 10;
                break;
        }
        checkBounds(hero);
    }

    function checkBounds(character) {
        if (character.x < 0) {
            character.x = 0;
        }
        if (character.x + character.width > canvas.width) {
            character.x = canvas.width - character.width;
        }
        if (character.y < 0) {
            character.y = 0;
        }
        if (character.y + character.height > canvas.height) {
            character.y = canvas.height - character.height;
        }
    }

    function moveLimo(key) {
        switch (key) {
            case 'ArrowUp':
                limo.y -= 10;
                break;
            case 'ArrowLeft':
                limo.x -= 10;
                break;
            case 'ArrowDown':
                limo.y += 10;
                break;
            case 'ArrowRight':
                limo.x += 10;
                break;
        }
        checkBounds(limo);
    }

    function gameLoop() {
        currentTime = performance.now(); // Obtener el tiempo actual en milisegundos
        handleCollision();
        draw();

        // Comprueba si alguno de los personajes ha muerto.
        if (!hero.isAlive() || !limo.isAlive()) {
            // Detiene el game loop
            cancelAnimationFrame(gameLoop);

            // Muestra quien ha ganado
            let message;
            if (!hero.isAlive() && !limo.isAlive()) {
                message = "Ambos personajes han perdido.";
            } else if (!hero.isAlive()) {
                message = `El personaje ${limo.name} ha ganado!`;
            } else {
                message = `El personaje ${hero.name} ha ganado!`;
            }

            // Muestra un mensaje de alerta de quien ha ganado
            alert(message);
        } else {
            requestAnimationFrame(gameLoop);
        }
    }

    document.addEventListener('keydown', function (event) {
        moveHero(event.code);
        moveLimo(event.code)
    });

    gameLoop();
});


