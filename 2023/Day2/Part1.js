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
function isPossible(round){
    return new Promise(async function(resolve){
        let blocks = await round.split(', ').map(x => {
            const color = x.split(' ')[1];
            const value = x.split(' ')[0];
            return {color: color, value: value}
        });
        let red = parseFloat(blocks.filter(obj => { return obj.color == 'red'}).map(obj => { return obj.value })) || 0;
        let green = parseFloat(blocks.filter(obj => { return obj.color == 'green'}).map(obj => { return obj.value })) || 0;
        let blue = parseFloat(blocks.filter(obj => { return obj.color == 'blue'}).map(obj => { return obj.value })) || 0;
        switch(red <= 12 && green <= 13 && blue <= 14){
            case true: {
                    resolve(true);
                    break;
                }
                case false: {
                    resolve(false);
                    break;
                }
            }  
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
async function findPossible(allGames){
    let results = []
    for(let j=0; j<Object.keys(allGames).length; j++){
        i = j+1
        let roundValidity = await Promise.all(allGames[i].map(async(round) => {
            return isPossible(round)
        }));
        switch(!roundValidity.includes(false)){
            case true: {results.push(i); break;}
            case false: {break;}
        }
    }
    return results
};
async function main() {
    const input = await getInput();
    const games = parseInput(input);
    const possible = await findPossible(games);
    const final = possible.reduce((partialSum, x) => partialSum + x, 0)
    console.log(final);
}
main();