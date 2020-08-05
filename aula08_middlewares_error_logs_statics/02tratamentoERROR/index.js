import express from 'express';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  throw new Error('error msg test');
});

/* ASYNC: é necessario tratar o erro com NEXT 
dentro de um try catch para a requisicao nao travar */
app.post('/', async (req, res, next) => {
  try {
    throw new Error('error msg ASYNC');
  } catch (error) {
    next(error);
  }
});

/* com essa use de 4 parametros, o primeiro 'err' e sempre o tratamento do erro */
app.use((err, req, res, next) => {
  res.status(500).send('Ocorreu um Erro, tente Novamente mais tarde');
});

/*
------UTILIZAR MAIS DE UMA FUNCAO DE ERRO, UTILIZANDO O NEXT(ERR)------

app.use((err, req, res, next) => {
  console.log('erro01');
  next(err);
});

app.use((err, req, res, next) => {
  console.log('erro02');
  res.status(500).send('Ocorreu um erro, tente novamente mais tarde');
});

*/

app.listen(8080, () => console.log('API STATED!'));
