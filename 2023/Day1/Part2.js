const { inferSchema, initParser } = require('udsv');
const fs = require('fs');
const es = require('event-stream');
const os = require('os');
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
// Mapping of words to their numeric values
const wordToNumber = {
    "one": 1,
    "two": 2,
    "three": 3,
    "four": 4,
    "five": 5,
    "six": 6,
    "seven": 7,
    "eight": 8,
    "nine": 9
};

async function main() {
    const input = await getInput();
    let values = input.map((row) => {
        let numbers = [];
        let wordBuffer = '';
        for (let char of row) {
            if (!isNaN(parseInt(char))) {
                // If character is a number, add it to the numbers array
                numbers.push(parseInt(char));
                wordBuffer = ''
            } else {
                // If character is not a number, accumulate it in wordBuffer
                wordBuffer += char;
                // Check if the accumulated wordBuffer exists in the mapping
                for (let word in wordToNumber) {
                    if (wordBuffer.includes(word)) {
                        numbers.push(wordToNumber[word]);
                        wordBuffer = wordBuffer.substr(wordBuffer.length - 1); // Reset wordBuffer after adding the number
                        break; // Exit the loop once a valid number is found
                    }
                }
            }
        }
        let firstNumber = parseFloat(numbers[0])
        let lastNumber = numbers.length > 1 ? parseFloat(numbers.pop()) : firstNumber;
        let concatenatedValue = `${firstNumber}${lastNumber}`;
        return parseFloat(concatenatedValue);
    });
    let total = values.reduce((partialSum, x) => partialSum + x, 0)
    console.log(total)
}
main();