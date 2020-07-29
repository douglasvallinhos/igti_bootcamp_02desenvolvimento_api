import fs from 'fs';
import { promises as fsPromises } from 'fs';
/*
WRITEfILE: Cria um arquivo, podendo colocar um parametro com o conteudo
APPENDFILE: Concatena o arquivo ja criado, podenso adicionar conteudos
READFILE: faz a leitura do arquivo podendo ser gravado em uma variavel
*/
// utilizando PROMISES async await

inicio();
async function inicio() {
  try {
    await fsPromises.writeFile('teste4.txt', 'CONTEUDO ASYNC AWAIT');
    await fsPromises.appendFile('teste4.txt', '\n Concatenando ASYNCAWAIT');
    const dados = await fsPromises.readFile('teste4.txt', 'utf-8');
    console.log(dados);
  } catch (error) {
    console.log(error);
  }
}

//utilizando com PROMISES

//prettier-ignore
fsPromises.writeFile('teste.txt', 'bal bla bla bla').then(() => {
    fsPromises.appendFile('teste.txt', 'arquivo 1').then(() => {
        fsPromises.readFile('teste.txt', 'utf-8').then((resp) => {
            console.log(resp);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  })
  .catch((error) => {
    console.log(error);
  });

//utilizando com callbacks

fs.writeFile('teste2.txt', 'conteudo do arquivo', function (erro) {
  if (erro) {
    console.log(erro);
  } else {
    fs.appendFile('teste2.txt', '\n concatenando esse texto', function (err) {
      if (err) {
        console.log(err);
      } else {
      }
    });
    fs.readFile('teste2.txt', 'utf-8', (erro, conteudo) => {
      if (erro) {
        console.log(erro);
      } else {
        console.log(conteudo);
      }
    });
  }
});

//utilizando de forma sincrona (nao recomendado, pois ela pausa a thread)
try {
  fs.writeFileSync('teste3.txt', 'blabla bal bla');
  const data = fs.readFileSync('teste3.txt', 'utf-8');
  console.log(data);
} catch (error) {
  console.log(error);
}
