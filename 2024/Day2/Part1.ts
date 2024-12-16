import Papa from 'papaparse'
const file = Bun.file('input.txt');
let input = await file.text();
const PapaConfig = { delimiter: " ", dynamicTyping: true}
let data = Papa.parse(input, PapaConfig).data;
console.log(data);