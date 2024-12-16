import Papa from 'papaparse'
const file = Bun.file('input.txt');
let input = await file.text();\
const PapaConfig = { delimiter: "   ", dynamicTyping: true}
let data = Papa.parse(input, PapaConfig).data;
let left: number[] = [];
let right: number[] = [];
data.forEach(element => {
    left.push(element[0]);
    right.push(element[1]);
});
function compare(a: number, b: number) {
    return Math.abs(a - b);
}
left.sort();
right.sort();
let diffArray: number[] = [];
for (let i = 0; i < left.length; i++) {
    diffArray.push(compare(left[i], right[i]));
};
const difference = diffArray.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  0,
);
console.log(difference);