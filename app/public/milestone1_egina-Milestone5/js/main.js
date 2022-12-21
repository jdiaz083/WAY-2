import { folder, leftArrow } from "./fragments.js";
import { fetchJSON } from "./loaders.js";

import {setupRows} from "./rows.js";
import {autocomplete} from "./autocomplete.js"
export { getSolution, differenceInDays}

function differenceInDays(base) {
  // YOUR CODE HERE
  let gaur = new Date()
  let data1 = Date.UTC(base.getFullYear(), base.getMonth(), base.getDate())
  let data2 = Date.UTC(gaur.getFullYear(), gaur.getMonth(), gaur.getDate())
  let diferentzia = (data2 - data1) / (1000 * 60 * 60 * 24);
  return Math.floor(diferentzia);
}

let difference_In_Days = differenceInDays(new Date("12-20-2022"));

window.onload = function () {
  document.getElementById(
    "gamenumber"
  ).innerText = difference_In_Days.toString();
  document.getElementById("back-icon").innerHTML = folder + leftArrow;
};

let game = {
  guesses: [],
  solution: {},
  players: [],
  leagues: []
};

 
function getSolution(players, solutionArray, differenceInDays) {
  // YOUR CODE HERE
  let id = solutionArray[(differenceInDays-1)%32].id
  let jokalaria = players.filter(jokalaria => jokalaria.id == id)
  return jokalaria[0]
}

Promise.all([fetchJSON("fullplayers"), fetchJSON("solution")]).then(
  (values) => {

    let solution;

    [game.players, solution] = values;

    game.solution = getSolution(game.players, solution, difference_In_Days);

    console.log(game.solution);

    document.getElementById("mistery").src = `https://playfootball.games/media/players/${game.solution.id % 32}/${game.solution.id}.png`;

    // YOUR CODE HERE

    autocomplete(document.getElementById("myInput"), game)

    /*let addRow = setupRows(game);
    let input = document.getElementById("myInput")
    document.addEventListener("keydown", e => {
      if(e.key == 'Enter'){
        addRow(input.value)
      }
    })*/

  }
)