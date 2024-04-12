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
        if(target.health < 0){
            target.health = 0
        }

        updateHealthBar(target);
    }

    //Retorna la información actual del personaje
    status() {
        return `${this.name} - HP ${this.health}/${this.maxhealth}`;
    }
}

//Función para combatir
function fight(firstCharacter, secondCharacter) {

    createText("Empieza el combate!")
    createText(hero.status())
    createText(enemy.status())
    // Manejar el evento de presionar una tecla
    document.addEventListener('keydown', function(event) {
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

//Creación de personajes
const heroMaxHealth = Math.floor(Math.random() * 100) + 1;
const enemyMaxHealth = Math.floor(Math.random() * 100) + 1;
const heroAttk = Math.floor(Math.random() * 6) + 5;
const enemyAttk = Math.floor(Math.random() * 6) + 5;
const hero = new Character("Heroe", heroMaxHealth, heroAttk);
alert(`${hero.name} tiene ${hero.maxhealth} HP`);
const enemy = new Character("Limo", enemyMaxHealth, enemyAttk);
alert(`${enemy.name} tiene ${enemy.maxhealth} HP`);


updateHealthBar(hero);
updateHealthBar(enemy);

//Comenzar combate
fight(hero, enemy);