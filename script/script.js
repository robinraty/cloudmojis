// =================================
// 🌱 1. Sélection des éléments DOM
// =================================


const game = document.querySelector(".game");
const scorePoints = document.querySelector(".score");
const starter = document.querySelector(".starter");
const timerDisplay = document.querySelector(".timer");

// =================================
// 🧠 2. Variables globales / état
// =================================

const types = ["good", "bad", "bomb", "diamond"]; // Ca = un tableau (Array) -> simplement une boite qui contient plusieurs valeurs / une variable qui contient plusieurs elements.Ils ont chacun un type (index) qui commence a 0. Par exemple : 
// console.log(types[0]); affiche "good" dans la consolle
// console.log(types[1]); affiche "bad" dans la consolle
// console.log(types[2]); affiche "bomb" dans la consolle

let score = 0;

let timeLeft = 10;
let timerInterval;



// =================================
// 🎊 3. Fonctions (logique métier)
// =================================



function createItem(type) {
    const item = document.createElement("div");
    
    item.classList.add("item");
    item.dataset.type = type;
    
    if (type === "good") {
        item.innerHTML = '<span class="emoji">⭐</span>';
    }
    
    else if (type === "bad") {
        item.innerHTML = '<span class="emoji">☄️</span>';

    }

    else if (type === "diamond") {
        item.innerHTML = '<span class="emoji">💎</span>';
        item.classList.add("diamond");
    }

    else if (type === "bomb") {
        item.innerHTML = '<span class="emoji">💣</span>';
    }

    // Dans la partie suivante on gere le random sur l'axe X et Y ! 
    const randomX = Math.floor(Math.random()*(game.clientWidth - 100));
        item.style.left = randomX +  "px";
    const randomY = Math.floor(Math.random()*(game.clientHeight - 100));
    // Ne pas oublier "px". On cree en gros une string css. 
        item.style.top = randomY + "px";    

    // Item -> Enfant direct de .game 
    game.appendChild(item);
    
    item.addEventListener("click", function () {

            // ETOILE + 1 
            if (item.dataset.type === "good") {
                score++;
                scorePoints.textContent = `Score : ${score}`;
                console.log("good");

                document.querySelectorAll(".item").forEach(function(oneItem) {
                    oneItem.remove();
                });

                spawnRound()
            }

            //DIAMANT + 3
            if (item.dataset.type === "diamond") {
                score += 3;                
                scorePoints.textContent = `Score : ${score}`;
                document.querySelectorAll(".item").forEach(function(oneItem) {
                oneItem.remove();
                });

                spawnRound()
            }
            
            // METEORITE - 1
            else if (item.dataset.type === "bad") {
                score--;
                scorePoints.textContent = `Score : ${score}`;
                document.querySelectorAll(".item").forEach(function(oneItem) {
                    oneItem.remove();
                });                
                spawnRound()     
            }
        
            // BOMBE || Game Over
            else if (item.dataset.type === "bomb") {
                score = 0;
                scorePoints.textContent = `Score : ${score}`;
                item.remove();
                game.classList.add("game-over");
                scorePoints.style.filter = "none";
            }
        



    });
    



}


// Function qui lance un "round", donc le fait de creer UN item "good" et 0.25% de chance de creer un diamond et 7 "bad ou bomb"
function spawnRound() {
    createItem("good"); // étoile


    // Le diamant spawn a 25% de chance
    const diamondChance = Math.random();
    if (diamondChance < 0.25) {
        createItem("diamond");
    }
    const dangers = ["bad", "bomb"];

    let randomIndex = Math.floor(Math.random() * 2);
    createItem(dangers[randomIndex]);

    randomIndex = Math.floor(Math.random() * 2);
    createItem(dangers[randomIndex]);

    randomIndex = Math.floor(Math.random() * 2);
    createItem(dangers[randomIndex]);

    randomIndex = Math.floor(Math.random() * 2);
    createItem(dangers[randomIndex]);

    randomIndex = Math.floor(Math.random() * 2);
    createItem(dangers[randomIndex]);

    randomIndex = Math.floor(Math.random() * 2);
    createItem(dangers[randomIndex]);

    randomIndex = Math.floor(Math.random() * 2);
    createItem(dangers[randomIndex]);

// J'aimerais ici mettre un set timeout pour que apres genre 1.5 seconde l'element disparaisse et que ca relance un spawnround

}

function startTimer() {
    timerDisplay.textContent = timeLeft;

    timerInterval = setInterval(function () {
        timeLeft--;
        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            game.classList.add("game-end")
        }

    }, 1000); //1000 = 1seconde
}


// =================================
// 🧲 4. Événements (interactions)
// =================================

// Quand user click sur START, on cache le btn start avec un display none puis on lance les fonctions "spawnRound" et "startTimer"

starter.addEventListener("click", function () {
    starter.style.display = "none"; // cache START
    startTimer(); // lance le timer
    spawnRound(); // lance le jeu



});