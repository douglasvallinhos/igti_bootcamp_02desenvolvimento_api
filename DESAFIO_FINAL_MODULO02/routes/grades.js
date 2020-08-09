import express from 'express';
import { promises as fs } from 'fs';
const router = express.Router();

/* 1. Crie um endpoint para criar uma grade. Este endpoint deverá receber como parâmetros
os campos student, subject, type e value conforme descritos acima. Esta grade deverá ser
salva no arquivo json grades.json, e deverá ter um id único associado. No campo
timestamp deverá ser salvo a data e hora do momento da inserção. O endpoint deverá
retornar o objeto da grade que foi criada. A API deverá garantir o incremento automático
deste identificador, de forma que ele não se repita entre os registros. Dentro do arquivo
grades.json que foi fornecido para utilização no desafio o campo nextId já está com um
valor definido. Após a inserção é preciso que esse nextId seja incrementado e salvo no
próprio arquivo, de forma que na próxima inserção ele possa ser utilizado. */
router.post('/', async (req, res) => {
  try {
    let newGrade = req.body;
    const gradesJson = JSON.parse(await fs.readFile('grades.json'));
    newGrade = { id: gradesJson.nextId, ...newGrade, timestamp: new Date() };
    gradesJson.nextId++;
    gradesJson.grades.push(newGrade);
    await fs.writeFile('grades.json', JSON.stringify(gradesJson, null, 2));
    res.send(
      'Requisição de inserção realizada com sucesso :)' +
        JSON.stringify(newGrade)
    );
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
/* 2. Crie um endpoint para atualizar uma grade. Este endpoint deverá receber como
parâmetros o id da grade a ser alterada e os campos student, subject, type e value. O
endpoint deverá validar se a grade informada existe, caso não exista deverá retornar um
erro. Caso exista, o endpoint deverá atualizar as informações recebidas por parâmetros
no registro, e realizar sua atualização com os novos dados alterados no arquivo
grades.json. */
router.put('/', async (req, res) => {
  try {
    const gradeUpdate = req.body;
    const gradesJson = JSON.parse(await fs.readFile('grades.json'));
    const index = gradesJson.grades.findIndex(
      (item) => item.id === gradeUpdate.id
    );
    if (index == -1) {
      res.send(
        `Não existe id ${gradeUpdate.id}, favor enviar um id Verdadeiro`
      );
    } else {
      gradesJson.grades[index] = gradeUpdate;
      await fs.writeFile('grades.json', JSON.stringify(gradesJson, null, 2));
      res.send(gradeUpdate);
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
/* 3. Crie um endpoint para excluir uma grade. Este endpoint deverá receber como
parâmetro o id da grade e realizar sua exclusão do arquivo grades.json. */
router.delete('/:id', async (req, res) => {
  try {
    const gradesJson = JSON.parse(await fs.readFile('grades.json'));
    const index = gradesJson.grades.findIndex(
      (item) => item.id === parseInt(req.params.id)
    );
    if (index == -1) {
      res.send(`Não existe id ${req.params.id}, favor enviar um id Verdadeiro`);
    } else {
      gradesJson.grades = gradesJson.grades.filter(
        (grade) => grade.id !== parseInt(req.params.id)
      );
      await fs.writeFile('grades.json', JSON.stringify(gradesJson, null, 2));
      res.send(`O item ID:${req.params.id} foi deletado com sucesso!`);
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
/* 4. Crie um endpoint para consultar uma grade em específico. Este endpoint deverá
receber como parâmetro o id da grade e retornar suas informações. */
router.get('/:id', async (req, res) => {
  try {
    const gradesJson = JSON.parse(await fs.readFile('grades.json'));
    const idGrade = gradesJson.grades.find(
      (item) => item.id === parseInt(req.params.id)
    );
    res.send(idGrade);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
/* 5.Crie um endpoint para consultar a nota total de um aluno em uma disciplina. O
endpoint deverá receber como parâmetro o student e o subject, e realizar a soma de
todas os as notas de atividades correspondentes a aquele subject para aquele student. O
endpoint deverá retornar a soma da propriedade value dos registros encontrados. */
router.get('/nota/:student/:subject', async (req, res) => {
  try {
    const reqStudent = req.params.student;
    const reqSubject = req.params.subject;
    const gradesJson = JSON.parse(await fs.readFile('grades.json'));
    gradesJson.grades = gradesJson.grades.filter(
      (item) => item.student === reqStudent && item.subject === reqSubject
    );
    const sumValue = gradesJson.grades.reduce((somatorio, currentItem) => {
      return somatorio + currentItem.value;
    }, 0);
    res.send(
      `Aluno(a): ${reqStudent} | Disciplina: ${reqSubject} = ${sumValue}`
    );
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
/* 6. Crie um endpoint para consultar a média das grades de determinado subject e type. O
endpoint deverá receber como parâmetro um subject e um type, e retornar a média. A
média é calculada somando o registro value de todos os registros que possuem o subject
e type informados, e dividindo pelo total de registros que possuem este mesmo subject e
type. */
router.get('/media/:subject/:type', async (req, res) => {
  try {
    const reqSubject = req.params.subject;
    const reqType = req.params.type;
    const gradesJson = JSON.parse(await fs.readFile('grades.json'));
    gradesJson.grades = gradesJson.grades.filter((item) => {
      return item.subject === reqSubject && item.type === reqType;
    });
    const sumValue = gradesJson.grades.reduce((somatorio, currentItem) => {
      return somatorio + currentItem.value;
    }, 0);
    const totalItems = Object.keys(gradesJson.grades).length;
    const media = sumValue / totalItems;
    res.send(`A média é ${media}`);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
/* 7. Crie um endpoint para retornar as três melhores grades de acordo com determinado
subject e type. O endpoint deve receber como parâmetro um subject e um type retornar
um array com os três registros de maior value daquele subject e type. A ordem deve ser
do maior para o menor. */
router.get('/top3/:subject/:type', async (req, res) => {
  try {
    const reqSubject = req.params.subject;
    const reqType = req.params.type;
    const gradesJson = JSON.parse(await fs.readFile('grades.json'));
    gradesJson.grades = gradesJson.grades.filter((item) => {
      return item.subject === reqSubject && item.type === reqType;
    });
    gradesJson.grades = gradesJson.grades.sort((a, b) => {
      return b.value - a.value;
    });
    const top3Array = Array.from(gradesJson.grades);
    const top3 = [top3Array[0], top3Array[1], top3Array[2]];
    res.send(top3);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

export default router;
