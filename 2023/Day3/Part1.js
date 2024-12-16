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
async function getX(line){
    let numbers = [];
    let symbols = [];
    let numBuffer = '';
    let i = 0
    let characters = Array.from(line)
    characters.forEach(element => {
        if(/[0-9]+/.test(element)){
            numBuffer += element
            return numBuffer, i++;
        } else if (/[-!$%^&*()_+|~=`{}\[\]:";'<>?,\/]/.test(element)){
            if (numBuffer !== ''){
                numbers.push({
                x: i-1,
                type: 'number',
                element: numBuffer,
                length: Array.from(numBuffer).length
            })
            numBuffer = ''
            }
            symbols.push({
                x: i,
                type: 'symbol',
                element: element
            })
            return numBuffer, symbols, i++;
        } else {
            if (numBuffer !== ''){
                numbers.push({
                x: i-1,
                type: 'number',
                element: numBuffer,
                length: Array.from(numBuffer).length
            })
            numBuffer = ''
            }
            return numBuffer, i++;
        }
    });
    let output = Object.assign({
        numbers: numbers,
        symbols: symbols
    })
    return output
};
function findAdjMatch(current, reference){
    return new Promise(async (resolve) => {
        let numbers = current.numbers;
        let symbols = reference.symbols;
        let results = [];
        for (let [key1, value1] of Object.entries(numbers)){
            switch(value1.length){
                case 3 : {
                    for (let key2 in symbols){
                        if (symbols[key2].x >= value1.x - 3 && symbols[key2].x <= value1.x + 1 && doesNotExist(numbers[key1], results)){
                            results.push(numbers[key1]);
                        }
                    }
                }
                case 2 : {
                    for (let key2 in symbols){
                        if (symbols[key2].x >= value1.x - 2 && symbols[key2].x <= value1.x + 1 && doesNotExist(numbers[key1], results)){
                            results.push(numbers[key1]);
                        }
                    }
                }
                case 1 : {
                    for (let key2 in symbols){
                        if (symbols[key2].x >= value1.x - 1 && symbols[key2].x <= value1.x + 1 && doesNotExist(numbers[key1], results)){
                            results.push(numbers[key1]);
                        }
                    }
                }
            }
        }
        resolve(results);
    });
};
async function parse(input){
    let matches = [];
    Object.keys(input).forEach(async iteration => {
        let current = input[iteration];
        if(parseFloat(iteration) > 0){
            let previous = input[parseFloat(iteration)-1]
            let upMatch = await findAdjMatch(current, previous)
            matches.push(...upMatch);
        }
        if(parseFloat(iteration) < Object.keys(input).length-1){
            let next = input[parseFloat(iteration)+1]
            let downMatch = await findAdjMatch(current, next)
            matches.push(...downMatch);
        }
        let same = await findAdjMatch(current, current)
        matches.push(...same);

    })
    return matches;
}
function doesNotExist (target, context){
    switch(context.findIndex((x) => x === target)){
        case -1 : {return true}
        default : {return false}
    }
};
async function main() {
    const input = await getInput();
    let output = await Promise.all(input.map(x => getX(x)));
    let matches = await parse(output);
    let partNo = matches.map(x => {return parseFloat(x.element)})
    const final = partNo.reduce((partialSum, x) => partialSum + x, 0)
    console.log(partNo);
    console.log(final);
}
main();