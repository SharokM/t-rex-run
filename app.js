
document.addEventListener("DOMContentLoaded", function () {
    const dino = document.querySelector(".dino")
    const grid = document.querySelector(".grid")
    const alert = document.getElementById("alert")
    // console.log(dino)
    let gravity = 0.9
    let isJumping = false
    let isGameOver = false
    let position = 0

    function control (e) {
        if (e.code === "Space") {
            // console.log("jump")
            if (!isJumping) {
                jump()
            }
        }
    }
    document.addEventListener("keydown", control)



    function jump () {
        if (isJumping) return
        isJumping = true
        let count = 0 
        let timerId = setInterval(function () {

            // move character down 
            if (count === 15) {
                clearInterval(timerId)
                let downTimerId = setInterval(function () {
                    if (count === 0) {
                        clearInterval(downTimerId)
                        isJumping = false
                    }
                // console.log("down triggered")
                    position -= 5
                    count--
                    // position = position * gravity 
                    dino.style.bottom = position + 'px'
                    }, 20)
            }
            // move character up 
            position += 29
            count++
            // position = position * gravity
            dino.style.bottom = position + 'px'
        }, 20)
    }

    function generateObstacles() {
        if (!isGameOver) return
            let obstaclePosition = 1000
            const obstacle = document.createElement('div')
            obstacle.classList.add('obstacle')
            grid.appendChild(obstacle)
            obstacle.style.left = obstaclePosition + 'px'
     
            const timerId = setInterval(function () {
             if (obstaclePosition > 0 && obstaclePosition < 60 && position < 60) {
                 clearInterval(timerId)
                 alert.innerHTML = "GAME OVER, YOU LOSE!"
                 isGameOver = true
                 // remove child elements from grid 
                 while(grid.firstChild) {
                     grid.removeChild(grid.firstChild)
                 }
             }
                 obstaclePosition -=10
                 obstacle.style.left = obstaclePosition + 'px'
            }, 20)

            const randomTime = Math.random() * 4000
            setTimeout(generateObstacles, randomTime)
        } 
    generateObstacles()


const factButton = document.querySelector(".fact-button");
const authorSpan = document.querySelector(".author");
const factDiv = document.querySelector(".dinosaur-fact-list"); 
const fact = document.querySelector(".api-img");

let dinosaurFacts = [];

// DINO FACT/ IMG API 
const getFact = async function () {

  if (dinosaurFacts.length > 0) {
    const res = await fetch("https://picsum.photos/v2/list?limit=100");
    const facts = await res.json();
    // console.log(facts);
    selectRandomFact(facts);
    displayFact(randomFact);
  } else { 
    return;
  }
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

displayFact = function (randomFact) {
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
