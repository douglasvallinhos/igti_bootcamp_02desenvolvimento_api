import express from 'express';

const app = express();
app.use(express.json()); // <- PARA AVISAR O EXPRESS QUE VAMOS TRABALHAR COM JSON
//ATENÇAO- NAO ESQUECER DO LISTEN (FINAL DESSE ARQUIVO)

/* metodo GET , primeiro parametro o servidor(url) no caso '/'
segundo parametro uma callback (no caso utilizamos uma arrow function com request e response )*/
app.get('/', (req, res) => {
  res.send('Hello World!');
});
/* Nesse exemplo de POST apenas criamos uma funçao por fora 'soma' para exemplificar a utilização */
app.post('/', (req, res) => {
  const a = 3;
  const b = 5;
  const resultado = soma(a, b);
  res.send(`Resultado: ${resultado}`);
});

function soma(n1, n2) {
  return n1 + n2;
}
/* o metodo 'all' retorna sempre o metodo que chamar, se chamar como get, ele retorna GET
se chamar como POST, ele retorna Post 
ou seja, pode ser todos metodos*/
app.all('/testAll', (req, res) => {
  res.send(req.method);
});
/* ao utilizar o simbolo '?' no final do primeiro parametro,
significa que a letra anterior nao é obrigatoria
ou seja, se fizermos um GET com http://localhost/test (sem a letra 'e')
ira funcionar normalmente*/
app.get('/teste?', (req, res) => {
  res.send('testando get de /teste?');
});
/* ao utilizar o simbolo '+' no final do segundo parametro,
significa que pode utilizar quantas letras anteriores quiser para chamar o get
ou seja GET com http://localhost/testeeeeeeeeeeeeeeeee (com quantas letras 'e' quiser)
ira funcionar normalmente */
app.get('/teste+', (req, res) => {
  res.send('testando get de /teste+');
});
/* ao utilizar o simbolo '*' em qualquer lugar do primeiro parametro
podemos chamar a url e no local que esta '*' podemos colocar qualquer coisa
exemplo: http://localhost/qualquerXYZcoisa
nao importa quantas caracteres, ira funcionar */
app.get('/qualquer*coisa', (req, res) => {
  res.send('testando o qualquer*coisa' + req.path);
});
/* utilizando o '()' ele vira um unico caractere
ou seja chamando /test(ing)?, vai funcionar /test ou /testing, pois com o '?' o caractere antigo e opcional
mas o caractere antigo e tudo o que esta entre parenteses
outro exemplo: se fosse /test(ing)+, so iria funcionar com varios ing /testinginginginging 
pois o simbolo de + aceita varios caracteres , e por estar entre parenteses, o 'ing' é umcaractere */

//ATeNçAo!: JSON , AO UTILIZAR O req.body, ESTAMOS CAPTURANDO O JSON, enviado pelo body, na requisiçao post (insomnia)

app.post('/test(ing)?', (req, res) => {
  console.log(req.body);
  res.send('testando o test(ing)?');
});

// expressoes regulares tbm funcionam /.*Red$/
// OBS:  SO QUE NAO PODE COLOCAR ENTRE ASPAS O PARAMETRO
app.get(/.*Red$/, (req, res) => {
  res.send('EXPRESSAO REGULAR /.*Red$/');
});

//--------------PARAMETROS------------------------------------

/* nesse modo abaixo estamos capturando o id direto da requisiçao http
exemplo http://localhost/parametro/10
retorna o valor 10 em 'req.params.id' */
app.get('/parametro/:id', (req, res) => {
  res.send(req.params.id);
});

/*  http://localhost:8080/query?nome=douglas&idade=28&sobrenome=vallinhos
utilizando esse exemplo ele vai retornar um json capturando com query
{
  "nome": "douglas",
  "idade": "28",
  "sobrenome": "vallinhos"
}
*/
app.get('/query', (req, res) => {
  res.send(req.query);
});

/* VARIAS CALLBACKS, VARIAS FUNCOES NO MESMO  .get utilizando o NEXT
OBS: necessario na ultima callback passar uma resposta (res.send), ou ira travar
ou res.end() caso nao tenha resposta, mas precisa alguma 'res'*/
//prettier-ignore
app.get('/next', (req,resp, next)=>{
  console.log('callBack01');
  next();
}, (req, res, next2)=>{
  console.log('callBack02');
  next2();
},(req,res)=>{
  console.log('callBack03');
  res.send('PRECISA PASSAR UMA RESPOTA NA ULTIMA CALLBACK'); // ou res.end();
});

/* varias callback utilizando um ARRAY */

const callback1 = (req, res, next) => {
  console.log('callback1');
  next();
};
const callback2 = (req, res, next) => {
  console.log('callback2');
  next();
};
const callback3 = (req, res) => {
  console.log('callback3');
  res.end();
};

app.get('/nextArray', [callback1, callback2, callback3]);

/* utilizando o app.route podemos criar uma rota e dentro dela colocar
quais requisicoes queremos ter um tratamento
no exemplo abaixo, ao utilizar o http://localhost:8080/route
temos um tratamento para .get .post .delete */
//prettier-ignore
app.route('/route')
  .get((req, res)=> {
    res.send('/route GET');
  })
  .post((req, res)=> {
    res.send('/route POST');
  })
  .delete((req, res)=> {
    res.send('/route DELETE');
  });

/* extremamente importante para funcionar o servidor, escolher a porta com 'listen' */
app.listen(8080, () => {
  console.log('Api start.');
});
