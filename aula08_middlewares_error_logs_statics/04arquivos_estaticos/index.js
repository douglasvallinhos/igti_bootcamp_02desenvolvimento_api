import express from 'express';
const app = express();
app.use(express.json());

/* aqui estamos escolhendo a pasta que os arquivos seram publicos
ou seja, é possivel acessar utilizando localhost:8080/img01.png */
app.use(express.static('public'));

/* aqui escolhemos um apelido para acessar
agora acessamos tambem com localhost:8080/images/img01.png */
app.use('/images', express.static('public'));

app.listen(8080, () => console.log('API Started'));
