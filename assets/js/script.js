let playBtn = document.getElementById('playBtn')
let gridHTML = document.getElementById('grid')
let difficultySelection = document.getElementById('difficulty')

let bombArray = []
let gameOver = false

let scoreHTML = document.getElementById('score')
let score = 0

let endGame = document.getElementById('result')

function randomNumber(max) {
    return Math.floor(Math.random() * max + 1)
}

gridHTML.innerHTML = "<h2>Scegli una difficoltà e comincia a giocare!</h2>"

function createBombs(num1, num2) {
    bombArray = []
    do {
        let randomBomb = randomNumber(num2)

        if (!bombArray.includes(randomBomb)) {

            bombArray.push(randomBomb)
        }
    } while (bombArray.length !== num1);
}

function generateGrid(number, name) {
    for (let i = 1; i <= number; i++) {
        let box = document.createElement('div')

        box.classList.add('box', name)

        box.innerHTML = `<span>${[i]}</span>`


        function boxBehavior() {
            if (gameOver === true) {
                return
            } 

            if (bombArray.includes(i)) {
                this.classList.add('box-bomb')
                console.log(`Cella bomba: ${[i]} -> HAI PERSO`)

                gameOver = true
                endGame.innerHTML = "Hai perso!"
                box.removeEventListener('click', boxBehavior)

            } else {
                this.classList.add('box-active')
                console.log(`Cella numero: ${[i]}`)

                score++
                scoreHTML.innerHTML = `Score: ${score}`

                
                box.removeEventListener('click', boxBehavior)
                if (score === (number - 16)) {
                    endGame.innerHTML = "Hai vinto!"
                    return
                }
            }
        }

        box.addEventListener('click', boxBehavior)

        gridHTML.append(box)

    }
    console.log(bombArray)

}


playBtn.addEventListener('click', function () {
    gameOver = false
    score = 0
    gridHTML.innerHTML = ""
    scoreHTML.innerHTML = "Score: 0"
    endGame.innerHTML = ""

    let difficultyValue = difficultySelection.value

    if (difficultyValue === 'easy') {
        createBombs(16, 100)
        generateGrid(100, 'box-easy')
    } else if (difficultyValue === 'medium') {
        createBombs(16, 81)
        generateGrid(81, 'box-medium')
    } else {
        createBombs(16, 49)
        generateGrid(49, 'box-hard')
    }
})