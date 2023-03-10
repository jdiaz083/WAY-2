// YOUR CODE HERE :  

import { fetchJSON } from "./loaders.js";
import { getSolution, differenceInDays } from "./main.js";
import { stringToHTML, higher, lower, stats, headless, toggle } from "./fragments.js";
import { initState, updateStats } from "./stats.js";
export { setupRows }

// From: https://stackoverflow.com/a/7254108/243532
function pad(a, b) {
    return (1e15 + a + '').slice(-b);
}

const delay = 350;
const attribs = ['nationality', 'leagueId', 'teamId', 'position', 'birthdate']


let setupRows = function (game) {

    let [state, updateState] = initState('WAYgameState', game.solution.id)

    function leagueToFlag(leagueId) {
        // YOUR CODE HERE
        return (leagueId == 564) ? "es1" :
            (leagueId == 8) ? "en1" :
                (leagueId == 82) ? "de1" :
                    (leagueId == 384) ? "it1" :
                        (leagueId == 301) ? "fr1" : "NaN"
    }

    function getAge(dateString) {
        // YOUR CODE HERE
        let gaur = new Date()
        let date = new Date(dateString.substr(5, 2) + "-" + dateString.substr(8, 2) + "-" + dateString.substr(0, 4))
        let edad = gaur.getFullYear() - date.getFullYear()
        if (gaur.getMonth() < date.getMonth()) {
            edad = edad - 1;
        } else if (gaur.getMonth() == date.getMonth() && gaur.getDate() < date.getDate()) {
            edad = edad - 1;
        }
        return edad
    }

    let check = function (theKey, theValue) {
        // YOUR CODE HERE
        let misterioso = game.solution
        let atributo
        attribs.forEach(a => {
            if (a == theKey) {
                atributo = theKey
            }
        })
        if (atributo == "birthdate") {
            if (misterioso[atributo] == theValue) {
                return "correct"
            } else if (misterioso[atributo] > theValue) {
                return "lower"
            } else {
                return "higher"
            }
        } else {
            if (misterioso[atributo] == theValue) {
                return "correct"
            } else {
                return "incorrect"
            }
        }
    }

    function unblur(outcome) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                document.getElementById("mistery").classList.remove("hue-rotate-180", "blur")
                document.getElementById("combobox").remove()
                let color, text
                if (outcome == 'success') {
                    color = "bg-blue-500"
                    text = "Awesome"
                } else {
                    color = "bg-rose-500"
                    text = "The player was " + game.solution.name
                }
                document.getElementById("picbox").innerHTML += `<div class="animate-pulse fixed z-20 top-14 left-1/2 transform -translate-x-1/2 max-w-sm shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden ${color} text-white"><div class="p-4"><p class="text-sm text-center font-medium">${text}</p></div></div>`
                resolve();
            }, "2000")
        })
    }

    function showStats(timeout) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                document.body.appendChild(stringToHTML(headless(stats())));
                document.getElementById("showHide").onclick = toggle;
                bindClose();
                resolve();
            }, timeout)
        })
    }

    function bindClose() {
        document.getElementById("closedialog").onclick = function () {
            document.body.removeChild(document.body.lastChild)
            document.getElementById("mistery").classList.remove("hue-rotate-180", "blur")
        }
    }

    function setContent(guess) {
        let flecha = ""
        if (getAge(guess.birthdate) > getAge(game.solution.birthdate)) {
            flecha = lower
        } else if (getAge(guess.birthdate) < getAge(game.solution.birthdate)) {
            flecha = higher
        }
        return [
            `<img src="https://playfootball.games/who-are-ya/media/nations/${guess.nationality.toLowerCase()}.svg" alt="" style="width: 60%;">`,
            `<img src="https://playfootball.games/media/competitions/${leagueToFlag(guess.leagueId)}.png" alt="" style="width: 60%;">`,
            `<img src="https://cdn.sportmonks.com/images/soccer/teams/${guess.teamId % 32}/${guess.teamId}.png" alt="" style="width: 60%;">`,
            `${guess.position}`,
            `${getAge(guess.birthdate)}`/* YOUR CODE HERE */ + flecha
        ]
    }

    function showContent(content, guess) {
        let fragments = '', s = '';
        for (let j = 0; j < content.length; j++) {
            s = "".concat(((j + 1) * delay).toString(), "ms")
            fragments += `<div class="w-1/5 shrink-0 flex justify-center ">
                            <div class="mx-1 overflow-hidden w-full max-w-2 shadowed font-bold text-xl flex aspect-square rounded-full justify-center items-center bg-slate-400 text-white ${check(attribs[j], guess[attribs[j]]) == 'correct' ? 'bg-green-500' : ''} opacity-0 fadeInDown" style="max-width: 60px; animation-delay: ${s};">
                                ${content[j]}
                            </div>
                         </div>`
        }

        let child = `<div class="flex w-full flex-wrap text-l py-2">
                        <div class=" w-full grow text-center pb-2">
                            <div class="mx-1 overflow-hidden h-full flex items-center justify-center sm:text-right px-4 uppercase font-bold text-lg opacity-0 fadeInDown " style="animation-delay: 0ms;">
                                ${guess.name}
                            </div>
                        </div>
                        ${fragments}`

        let playersNode = document.getElementById('players')
        playersNode.prepend(stringToHTML(child))
    }

    let getPlayer = function (playerId) {
        // YOUR CODE HERE 
        let jokalaria = game.players.filter(jokalaria => jokalaria.id == playerId);
        return jokalaria[0]
    }

    function resetInput() {
        // YOUR CODE HERE
        let item = JSON.parse(localStorage.getItem("WAYgameState"))
        document.getElementById("myInput").value = "Guess " + item[0].guesses.length + " of 8"
    }

    function gameEnded(lastGuess) {
        // YOUR CODE HERE
        if (lastGuess == game.solution.id || (game.guesses.length == 8 && lastGuess != game.solution.id)) {
            return true
        } else {
            return false
        }

    }

    resetInput();

    return /* addRow */ function (playerId) {

        let guess = getPlayer(playerId)
        console.log(guess)

        let content = setContent(guess)

        game.guesses.push(playerId)
        updateState(playerId)

        resetInput();

        if (gameEnded(playerId)) {
            updateStats(game.guesses.length);

            const now = new Date();
            const end = new Date("2022-12-01T00:00:00.000Z");

            let interval = end - now

            if (playerId == game.solution.id) {
                unblur("success");
                showStats(0)
            }

            if (game.guesses.length == 8) {
                unblur("gameOver");
                showStats(0)
            }
            
        }


        showContent(content, guess)
    }
}
