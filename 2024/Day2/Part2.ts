import Papa from 'papaparse'
const file = Bun.file('input.txt');
let input = await file.text();
const PapaConfig = { delimiter: " ", dynamicTyping: true}
let data = Papa.parse(input, PapaConfig).data;
function checkSafety(input: number[]){
    let safe1: boolean = true;
    let safe2: boolean = true;
    let results: boolean[] = [];
    const increase = Math.sign(input[0] - input[1]) == 1 || 0 ? true : false
    for (let i = 0; i + 1 < input.length; i++){
        let range = Math.abs(input[i] -input[i+1]);
        switch(Math.sign(input[i] - input[i+1])){
            case 1 : 
            case 0 : increase ? safe1 = true : safe1 = false; break;
            case -1 :
            case -0 : !!increase ? safe1 = false : safe1 = true; break;
        };
        range > 0 && range < 4 ? safe2 = true : safe2 = false;
        results.push(safe1, safe2);
    };
    const probDamp = results.filter(x => x === false);
    console.log(probDamp)
    const passFail = results.includes(false) ? false: true
    return passFail
};
const answer = data.map(x => checkSafety(x));
const pass = answer.filter(x => !x === false);
console.log(pass.length);