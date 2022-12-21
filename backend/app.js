import fs from 'fs';
import fetch from 'node-fetch'
import fullLaLiga from './fullLaLiga.json' assert { type: 'json' }
import fullBundesliga from './fullBundesliga.json' assert { type: 'json' }
import fullLigue1 from './fullLigue1.json'  assert { type: 'json' }
import fullPremiere from './fullPremiere.json' assert { type: 'json' }
import fullSerieA from './fullSerieA.json' assert { type: 'json' }
import request from 'request';
import { assert } from 'console';

import mongojs from 'mongojs'
const mongodb = mongojs('mongodb://127.0.0.1:27017/footballdata', ['leagues'])

try {
    var data = fullSerieA.map(elem => elem.newId)
    data.forEach((elem, idx) => {
        var options = {
            'method': 'GET',
            'url': "https://v3.football.api-sports.io/teams?id=" + elem,
            'headers': {
                'x-rapidapi-host': 'v3.football.api-sports.io',
                'x-rapidapi-key': 'c9be68632b6864fd94ecb8cb6db567b7'
            }
        }
        request(options, function (error, response) {
            if (error) throw new Error(error)
            console.log(JSON.parse(response.body).response[0])
            mongodb.leagues.insertOne(JSON.parse(response.body).response[0])
        })
    })
} catch (err) {
    console.error(err)
}


/*let writepath = 'leagues/'

fs.mkdirSync(writepath, { recursive: true })

try {
    // read leagues file into an array of lines
    const data = fs.readFileSync('leagues.txt', 'utf8').split(/\r?\n/)
    data.forEach((elem, idx) => {
        const url = `https://playfootball.games/media/competitions/${elem}.png`
        fetch(url)
            .then(res => {
                // check status
                if (res.status === 200) {
                    res.body.pipe(fs.createWriteStream(`${writepath}${elem}.png`))
                } else {
                    console.log(`status: ${res.status} line: ${idx} elem:${elem} not found`)
                }
            })
            .catch(err => console.log(err))
    })
} catch (err) {
    console.error(err);
}*/

// Flags
/*let writepath1 = 'flags/'
 
fs.mkdirSync(writepath1, { recursive: true })
 
try {
    // read leagues file into an array of lines
    let data = fs.readFileSync('nationalities.txt', 'utf8').split(/\r?\n/);
    data.forEach((elem, idx) => {
        let elem1 = elem.split(" ")
        elem1 = elem1.join("%20")
        const url = `https://playfootball.games/who-are-ya/media/nations/${elem1}.svg`
        fetch(url)
            .then(res => {
                // check status
                if (res.status == 200) {
                    res.body.pipe(fs.createWriteStream(`${writepath1}${elem}.svg`))
                } else {
                    console.log(`status: ${res.status} line: ${idx} elem:${elem} not found`)
                }
            })
            .catch(err => console.log(err))
    })
} catch (err) {
    console.error(err);
}*/

// TeamIcons
/*let writepath2 = 'teamIcons/'

fs.mkdirSync(writepath2, { recursive: true })

try {
    // read leagues file into an array of lines
    let data = fs.readFileSync('teamIds.txt', 'utf8').split(/\r?\n/);
    data.forEach((elem, idx) => {
        let id32 = elem % 32
        const url = `https://cdn.sportmonks.com/images/soccer/teams/${id32}/${elem}.png`
        fetch(url)
            .then(res => {
                // check status
                if (res.status == 200) {
                    res.body.pipe(fs.createWriteStream(`${writepath2}${elem}.png`))
                } else {
                    console.log(`status: ${res.status} line: ${idx} elem:${elem} not found`)
                }
            })
            .catch(err => console.log(err))
    })
} catch (err) {
    console.error(err);
}*/


// PlayerIcons
/*let writepath3 = 'playerIcons/'

fs.mkdirSync(writepath3, { recursive: true })

function getPlayerIcons(data) {
    let elem = data.shift()
    if (elem === undefined){
        clearInterval(idTemp)
    }
    else{
        let e32 = elem % 32
        const url = `https://playfootball.games/media/players/${e32}/${elem}.png`
        fetch(url)
            .then(res => {
                // check status
                if (res.status == 200) {
                    res.body.pipe(fs.createWriteStream(`${writepath3}${elem}.png`))
                } else {
                    console.log(`status: ${res.status} elem:${elem} not found`)
                }
            })
            .catch(err => console.log(err))
    }
}

let idTemp
function temporizador(data){
    idTemp = setInterval(getPlayerIcons, 100, data)
}

try {
    let data = fs.readFileSync('playerIcons.txt', 'utf8').split(/\r?\n/);
    temporizador(data)
} catch (err) {
    console.error(err);
}*/