import express from 'express';
import { promises as fs } from 'fs';
const router = express.Router();

/* POST: MÉTODO PARA incrementar novo item no objeto JSON 'accounts.json'
para capturar a requisição do insomnia utilizamos o 'req.body'
no insomnia precisamos enviar por JSON EXEMPLO:
{
	"name": "Douglas",
	"balance": 600
}

implementamos um sistema provisório de ID automática com o nextId do 'acconts.json'
*/
router.post('/', async (req, res, next) => {
  try {
    let account = req.body;

    if (!account.name || account.balance == null) {
      throw new Error('name e balance são propriedades obrigatórios!');
    }
    const data = JSON.parse(await fs.readFile('accounts.json'));
    account = { id: data.nextId, name: account.name, balance: account.balance };
    data.nextId++;
    data.accounts.push(account);

    await fs.writeFile('accounts.json', JSON.stringify(data, null, 2));
    global.logger.info(`POST /account - ${JSON.stringify(account)}`);
    res.end();
  } catch (error) {
    next(error);
  }
});
/* metódo get que retorna todo arquivo 'accounts.json' 
deletamos o nextId, pois é uma imformação desnecessaria para o usuario*/
router.get('/', async (req, res, next) => {
  try {
    const data = JSON.parse(await fs.readFile('accounts.json'));
    delete data.nextId;
    res.send(data);
    global.logger.info(`GET /account`);
  } catch (error) {
    next(error);
  }
});
/* metodo get por ID
OBS: o req.params.id recebe o parametro do numero de http://localhost:8080/account/1
ATENÇÃO: o req.params.id é uma string, por isso utilizamos o parseInt para comparar no 'find' */
router.get('/:id', async (req, res, next) => {
  try {
    const data = JSON.parse(await fs.readFile('accounts.json'));
    //prettier-ignore
    const account = data.accounts.find((account) => account.id === parseInt(req.params.id));
    res.send(account);
    global.logger.info(`GET /account/:id`);
  } catch (error) {
    next(error);
  }
});
/* utilizamos o 'filter' para deletar o registro pois ao utilizar !==
ele vai retornar todos menos, o id que estamos utilizando, ou seja ira deletar
por fim gravamos novamente um novo accounts.json ja com o registro deletado */
router.delete('/:id', async (req, res, next) => {
  try {
    const data = JSON.parse(await fs.readFile('accounts.json'));
    //prettier-ignore
    data.accounts = data.accounts.filter(account => account.id !== parseInt(req.params.id));

    await fs.writeFile('accounts.json', JSON.stringify(data, null, 2));
    res.end();
    global.logger.info(`DELETE /account/:id - ${req.params.id}`);
  } catch (error) {
    next(error);
  }
});

/* PUT: utilizado para alterar o item completo tanto name, quanto balance e o que tiver
utilizamos o 'findIndex' para descobrir o index do item no 'accounts.json'
apos descobrir apenas atualizamos o proprio index com os dados vindo do req.body
 
{
      "id": 4,
      "name": "Valdir Vallinhos",
      "balance": 4600
    }

    /\ no insomnia enviamos o item completo ja com novo name e novo balance
*/
router.put('/', async (req, res, next) => {
  try {
    const account = req.body;

    if (!account.name || account.balance == null) {
      throw new Error('name e balance são propriedades obrigatórios!');
    }
    const data = JSON.parse(await fs.readFile('accounts.json'));
    const index = data.accounts.findIndex((item) => item.id === account.id);

    if (index === -1) {
      throw new Error('Id de registro não encontrado');
    }

    data.accounts[index].name = account.name;
    data.accounts[index].balance = account.balance;

    fs.writeFile('accounts.json', JSON.stringify(data, null, 2));
    res.send(account);
    global.logger.info(`PUT /account - ${JSON.stringify(account)}`);
  } catch (error) {
    next(error);
  }
});

/* no PATCH utilizamos o mesmo codigo do put so alteramos uma linha
data.accounts[index].balance = account.balance;
colocando o '.balance'

enviamos assim no insominia:
{
      "id": 4,
      "balance": 8600
    }
    
    apenas o id e o novo balance */
router.patch('/updateBalance', async (req, res, next) => {
  try {
    const account = req.body;

    if (!account.id || account.balance == null) {
      throw new Error('Id e balance são propriedaades obrigatorias!');
    }
    const data = JSON.parse(await fs.readFile('accounts.json'));
    const index = data.accounts.findIndex((item) => item.id === account.id);

    if (index === -1) {
      throw new Error('Id de registro não encontrado');
    }

    data.accounts[index].balance = account.balance;
    fs.writeFile('accounts.json', JSON.stringify(data, null, 2));
    res.send(data.accounts[index]);
    global.logger.info(
      `PATCH /account/updateBalance - ${JSON.stringify(account)}`
    );
  } catch (error) {
    next(error);
  }
});
/* TRATAMENTO DE ERROS - precisa estar no final
por utilizar funcoes async cada metodo precisa ter o parametro next 'req,res,next'
e chamar o next() dentro do 'catch' assim o erro sempre vai pra esse ultimo metodo abaixo */
router.use((err, req, res, next) => {
  global.logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
  res.status(400).send({ error: err.message });
});

export default router;
