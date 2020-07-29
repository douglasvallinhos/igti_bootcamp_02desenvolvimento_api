import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Digite Um número: ", (numero) =>{

    if(parseInt(numero) % 2 === 0){
        console.log(`O número digitado ${numero} é: PAR`)
    }else{
        console.log(`O número digitado ${numero} é: IMPAR`)

    }
    rl.close();
})