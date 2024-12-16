const fs = require('fs');
const es = require('event-stream');
const file = fs.createReadStream('./input.txt')
function getInput() {
    return new Promise((resolve, reject) => {
        let input = [];
            file.pipe(es.split())
            .pipe(es.mapSync(function(line) {
                input.push(line);
            }))
            .on('error', function(err) {
                reject(err);
            })
            .on('end', function() {
                resolve(input);
            });
    });
};
function getDetails(round){
    return new Promise(async function(resolve){
        let blocks = await round.split(', ').map(x => {
            const color = x.split(' ')[1];
            const value = x.split(' ')[0];
            return {color: color, value: value}
        });
        let red = parseFloat(blocks.filter(obj => { return obj.color == 'red'}).map(obj => { return obj.value })) || 0;
        let green = parseFloat(blocks.filter(obj => { return obj.color == 'green'}).map(obj => { return obj.value })) || 0;
        let blue = parseFloat(blocks.filter(obj => { return obj.color == 'blue'}).map(obj => { return obj.value })) || 0;
        resolve({
            red: red,
            green: green,
            blue: blue
        });  
        });
};
function parseInput(input) {
    let games = {};
    input.forEach(line => {
        const match = line.match(/^Game (\d+):/);
        if (match) {
            const gameNum = parseFloat(match[1]);
            const [, ...data] = line.split(':');
            const gameData = data.join('').trim().split(';').map(entry => entry.trim());
            games[gameNum] = gameData;
        }
    });
    return games;
};
async function compareRounds(rounds){
    let red = 0
    let green = 0
    let blue = 0
    let i = 0
    rounds.forEach(round => {
        return Object.keys(round).forEach(group => {
            switch(group){
                case 'red': { if (red < round[group]){return red = round[group]}; break;};
                case 'green': { if (green < round[group]){return green = round[group]}; break;};
                case 'blue': { if (blue < round[group]){return blue = round[group]}; break;};
            }
            i++
        })
    })
    return {
        red: red,
        green: green,
        blue: blue
    }

};
function findPower(values){
    return new Promise(function(resolve){
        resolve(values.red * values.green * values.blue)
    })
};
async function findPossible(allGames){
    let results = []
    for(let j=0; j<Object.keys(allGames).length; j++){
        i = j+1
        let roundDetails = await Promise.all(allGames[i].map(async(round) => {
            return getDetails(round)
        }));
        let lowestValues = await compareRounds(roundDetails);
        results.push(lowestValues)
    }
    return results
};
async function main() {
    const input = await getInput();
    const games = parseInput(input);
    const possible = await findPossible(games);
    const power = await Promise.all(possible.map(game => findPower(game)));
    const final = power.reduce((partialSum, x) => partialSum + x, 0)
    console.log(final);
}
main();