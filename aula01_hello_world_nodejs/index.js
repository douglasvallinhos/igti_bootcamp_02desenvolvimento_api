// process.argv[2] pega o que digitarmos ao chamar o arquivo pelo terminal
// obs: terminal: node index.js 100
// nessa caso o valor de process.argv sria a STRING 100, que por isso utilizamos o parseInt
const numero = parseInt(process.argv[2]);
const numerosPrimos3e5 = [];

for (let i = 1; i < numero; i++) {
  if (i % 3 === 0 || i % 5 === 0) {
    numerosPrimos3e5.push(i);
  }
}
console.log(numerosPrimos3e5);
