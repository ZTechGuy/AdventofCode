import Papa from 'papaparse'
const file = Bun.file('input.txt');
let input = await file.text();
const PapaConfig = { delimiter: "   ", dynamicTyping: true}
let data = Papa.parse(input, PapaConfig).data;
let left: number[] = [];
let right: number[] = [];
data.forEach(element => {
    left.push(element[0]);
    right.push(element[1]);
});
function compare(a: number, b: number[]) {
    let similarity = b.filter((x) => a === x).length;
    return a * similarity;
}
left.sort();
right.sort();
let simArray: number[] = [];
left.forEach(x => simArray.push(compare(x, right)));
const difference = simArray.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  0,
);
console.log(difference);