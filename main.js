
const field = document.querySelectorAll('div')
const combinationsWin = [
    [0,4,8], 
    [2,4,6],
    [0,1,2], 
    [3,4,5],
    [6,7,8], 
    [0,3,6],
    [1,4,7],
    [2,5,8]
]

let lastSymb = "x"
let numberSteps = 0
let failedСhecks = 0

const gameInfo = document.createElement("p")
document.body.append(gameInfo)

const newGame = document.createElement("button")
newGame.textContent = "Начать новую игру"
newGame.onclick = function() {
    for(const clear of field) {
        if(clear != "") {
            clear.textContent = ""
        }
    }
    numberSteps = 0
    failedСhecks = 0
    newGame.remove()
    gameInfo.textContent = `${lastSymb == "x" ? "o" : "x"} ходит`
}


gameInfo.textContent = `${lastSymb == "x" ? "o" : "x"} ходит`

for(const pos of field) {

    pos.onclick = function() {
        if (pos.textContent == "") {
            if (lastSymb == "x") {
                pos.textContent = "o"
                lastSymb = "o"
            } else {
                pos.textContent = "x"
                lastSymb = "x"
            }
            
            numberSteps++
            gameInfo.textContent = `Было сделано ${numberSteps} шагов и ${lastSymb == "x" ? "o" : "x"} ходит`

            for(const comb of combinationsWin) {
                if( field[comb[0]].textContent == field[comb[1]].textContent && 
                    field[comb[1]].textContent == field[comb[2]].textContent &&
                    field[comb[0]].textContent != "" && 
                    field[comb[0]].textContent != " "
                ) {
                    for(const stop of field) {
                        if(stop.textContent == "") {
                            stop.textContent = " "
                        }
                    }                    
                    gameInfo.textContent = `Было сделано ${numberSteps} шагов и ${field[comb[0]].textContent} Победил`
                    
                    document.body.append(newGame)
                                        
                } else {
                    failedСhecks++
                    console.log(failedСhecks) // 9 полей по 8 проверок и того при ничье получаеться 72 неудачные проверки
                    if(failedСhecks == 72) {
                        gameInfo.textContent = `Ничья`
                        document.body.append(newGame)
                    }
                }
            }
        }
    }
}


