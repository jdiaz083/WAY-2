export {initState, updateStats, getStats}



let initState = function(what, solutionId) { 

    let situacion =[
        {
            "guesses": [],
            "solution": solutionId
        },
    ]
    let stats = [
        {
            winDistribution: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            gamesFailed: 0,
            currentStreak: 0,
            bestStreak: 0,
            totalGames: 0,
            successRate: 0
        }
    ]
    localStorage.setItem("WAYgameState", JSON.stringify(situacion))
    localStorage.setItem("gameStats", JSON.stringify(stats))

    // YOUR CODE HERE
    let valor1 = localStorage.getItem(what)
    console.log(valor1)
    return [valor1, function(guess){
        let valor2 = JSON.parse(localStorage.getItem("WAYgameState"))
        valor2[0].guesses.push(guess)
        localStorage.setItem("WAYgameState", JSON.stringify(valor2))
    }]
}

function successRate (e){ //porque parametro e?
    // YOUR CODE HERE
    let valor1 = JSON.parse(localStorage.getItem("gameStats"))
    return valor1[0].successRate
}

let getStats = function(what) {
    // YOUR CODE HERE
    let valor1 = localStorage.getItem(what)
    if (valor1 != null){
        return valor1
    } else{
        let stats = [
            {
                winDistribution: [0, 0, 0, 0, 0, 0, 0, 0, 0],
                gamesFailed: 0,
                currentStreak: 0,
                bestStreak: 0,
                totalGames: 0,
                successRate: 0
            }
        ]
        localStorage.setItem(what, JSON.stringify(stats))
        return localStorage.getItem(what)
    }
};


function updateStats(t){
    // YOUR CODE HERE
    let objeto = JSON.parse(getStats("gameStats"))
    if (t < 8){
        objeto[0].currentStreak = objeto[0].currentStreak + 1
        if (objeto[0].bestStreak < objeto[0].currentStreak){
            objeto[0].bestStreak = objeto[0].currentStreak
        }
    }else{
        objeto[0].gamesFailed = objeto[0].gamesFailed + 1
        objeto[0].currentStreak = 0
    }
    objeto[0].totalGames = objeto[0].totalGames + 1
    objeto[0].successRate = (objeto[0].totalGames-objeto[0].gamesFailed) / (objeto[0].totalGames) * 100
    objeto[0].winDistribution[t] = objeto[0].winDistribution[t] + 1
    console.log(objeto[0])
    localStorage.setItem("gameStats", JSON.stringify(objeto[0]))
};


let gamestats = getStats('gameStats');