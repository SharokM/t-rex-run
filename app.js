
const grid = document.querySelector(".grid");

document.addEventListener("DOMContentLoaded", function () {
    const dino = document.querySelector(".dino")
    const alertMessage = document.querySelector("#special-alert")
    const restartButton = document.querySelector(".restart-button")
    // console.log(dino)
    let gravity = 0.9
    let isJumping = false
    let isGameOver = false
    let position = 0


    function jump () {
        if (isJumping) return
        isJumping = true
        let count = 0 

        let timerId = setInterval(() => {
            // move character down 
            if (count === 15) {
                clearInterval(timerId)


                let downTimerId = setInterval(() => {
                    position -= 9
                    count--
                
                    // STOP at ground
                    if (position <= 0) {
                        position = 0
                        dino.style.bottom = '0px'
                        clearInterval(downTimerId)
                        isJumping = false
                        return
                    }
                
                    dino.style.bottom = position + 'px'
                }, 20)
                

                    return
            }
            // move character up 
            position += 20
            count++
            // position = position * gravity
            dino.style.transform = 'scale(1.0)';  
            dino.style.bottom = position + 'px'
        }, 20)
    }

    document.addEventListener("keydown", (e) => {
        if (e.code === "Space") 
            jump()
        dino.style.boxShadow = '0px 0px 20px 5px rgba(255,255,0,0.7)';

        })

    // document.addEventListener("keydown", control)

    function generateObstacles() {
        if (isGameOver) return;
    
        let obstaclePosition = 1000
        const obstacle = document.createElement('div')
        obstacle.classList.add('obstacle')
        grid.appendChild(obstacle)
        obstacle.style.left = obstaclePosition + 'px'
        obstacle.style.transition = 'left 0.2s linear';


         
        const timerId = setInterval(() => {
    
            if (isGameOver) {
                clearInterval(timerId)
                return;
            }
            if (obstaclePosition > 0 && 
                obstaclePosition < 60 + 60 && 
                position < 60) {
                clearInterval(timerId)
                // document.body.style.backgroundColor = `rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`
                alertMessage.innerHTML = "💥GAME OVER, YOU LOSE!💥"
                isGameOver = true
    
                while(grid.firstChild) {
                    grid.removeChild(grid.firstChild)
                }
                return
            }
                 
            obstaclePosition -= 10
            obstacle.style.left = obstaclePosition + 'px'
    
            if (obstaclePosition < -60) {
                clearInterval(timerId)
                grid.removeChild(obstacle)
            }
    
        }, 20)
    
        setTimeout(generateObstacles, Math.random() * 3000 + 500)
    }
    
    generateObstacles()

    restartButton.addEventListener("click", function() {
        location.reload();
    })


const factButton = document.querySelector(".fact-button");
const authorSpan = document.querySelector(".author");
const factDiv = document.querySelector(".dinosaur-fact-list"); 
const fact = document.querySelector(".api-img");



// array to hold dinosaur facts
let dinosaurFacts = [];

// DINO FACT/ IMG API 
const getFact = async function () {

//   if (dinosaurFacts.length === 0) {
    const res = await fetch("https://picsum.photos/v2/list?limit=100");
    const facts = await res.json();
    // console.log(facts);
    selectRandomFact(facts);
}
//   getFact();

//   display fact  

const selectRandomFact = function (facts) {
    const randomIndex = Math.floor(Math.random() * facts.length);
    // console.log(randomIndex);
    const randomFact = facts[randomIndex];
    console.log(randomFact);
    // return facts[randomIndex];
    displayFact(randomFact);
}

const displayFact = function (randomFact) {
    const author = randomFact.author
    const factAddress = randomFact.download_url
    const factUrl = randomFact.url

    authorSpan.innerText = `Fact by: ${author}`
    fact.src = factAddress;
    fact.alt = `Fact by: ${factUrl}`
    factDiv.classList.remove("hide")

    // fact.src = randomFact.download_url;
    // authorSpan.textContent = `Photo by: ${randomFact.author}`;
}

factButton.addEventListener("click", function () {
    getFact();
    
    // const randomFact = selectRandomFact();
    // displayFact(randomFact);
})});



// TO DO 


// DINO SKIN THEME 
// const dinoSkin = function () {
//     if (isGameOver) {
//         dino.style.backgroundColor = 'red';
//     } else if (isJumping) {
//         dino.style.backgroundColor = 'lightgreen';
//     } else {
//         dino.style.backgroundColor = 'yellow';
//     }  
    
// // dinoSkin();  
// } 



// DISPLAY SCORE 
// let score = 0;

// const scoreDisplay = document.createElement('div');
// scoreDisplay.style.position = 'absolute';
// scoreDisplay.style.top = '10px';
// scoreDisplay.style.left = '10px';
// scoreDisplay.style.fontSize = '24px';
// scoreDisplay.style.fontFamily = 'Arial, sans-serif';
// grid.appendChild(scoreDisplay);

// setInterval(() => {
//     if (!isGameOver) {
//         score++;
//         scoreDisplay.textContent = `Your score: ${score}`;
//     }
// }, 400);