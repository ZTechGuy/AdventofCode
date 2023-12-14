const fs = require('fs');
const es = require('event-stream');
function getInput() {
    return new Promise((resolve, reject) => {
        let input = [];
        const file = fs.createReadStream('./input.txt')
            .pipe(es.split())
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
}
function isNumeric(str) {
  if (typeof str != "string") return false // we only process strings!  
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
         !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}
async function main () {
    const input = await getInput();
    let values = await input.map((row) => {
        let numbers = row.split("").filter(x => isNumeric(x));
        let firstNumber = numbers.length > 0 ? parseFloat(numbers[0]) : 0;
        let lastNumber = numbers.length >0 && numbers.length > 1 ? parseFloat(numbers.pop()) : firstNumber || 0;
        let concatenatedValue = `${firstNumber}${lastNumber}`;
        return parseFloat(concatenatedValue);
    });
    let total = values.reduce((partialSum, x) => partialSum + x, 0)
    console.log(total)
}
main();