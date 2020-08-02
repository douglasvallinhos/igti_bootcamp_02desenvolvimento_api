import { promises as fs } from 'fs';

init();

async function init() {
  await createFiles();
  await citiesCount('SP').then((a) => console.log(a));
  await fiveMoreCities();
  await fiveLessCities();
  await nameMoreCities();
  await nameLessCities();
  await allNameMoreCities();
  await allNameLessCities();
}
/* Criar uma função que irá criar um arquivo JSON para cada estado representado no
arquivo Estados.json, e o seu conteúdo será um array das cidades pertencentes a
aquele estado, de acordo com o arquivo Cidades.json. O nome do arquivo deve ser
o UF do estado, por exemplo: MG.json. */
async function createFiles() {
  let cities = JSON.parse(await fs.readFile('./files/Cidades.json'));
  let states = JSON.parse(await fs.readFile('./files/Estados.json'));

  for (let i = 0; i < states.length; i++) {
    const statesCities = cities.filter((city) => city.Estado === states[i].ID);
    await fs.writeFile(
      `./states/${states[i].Sigla}.json`,
      JSON.stringify(statesCities)
    );
  }
}
/* Criar uma função que recebe como parâmetro o UF do estado, realize a leitura do
arquivo JSON correspondente e retorne a quantidade de cidades daquele estado. */
async function citiesCount(state) {
  const city = await fs.readFile(`./states/${state}.json`);
  const cityJson = JSON.parse(city);
  return cityJson.length;
}
/* Criar um método que imprima no console um array com o UF dos cinco estados
que mais possuem cidades, seguidos da quantidade, em ordem decrescente. Você
pode usar a função criada no tópico 2. Exemplo de impressão: [“UF - 93”, “UF - 82”,
“UF - 74”, “UF - 72”, “UF - 65”] */
async function fiveMoreCities() {
  const states = JSON.parse(await fs.readFile('./files/Estados.json'));
  const listStates = [];
  for (let i = 0; i < states.length; i++) {
    await citiesCount(states[i].Sigla).then((uf) => {
      //console.log(uf + ' ' + states[i].Sigla);
      //listStates.push(`${states[i].Sigla}-${uf}`);
      listStates.push({ state: states[i].Sigla, cities: uf });
    });
  }

  await listStates.sort((a, b) => {
    if (a.cities < b.cities) return 1;
    else if (a.cities > b.cities) return -1;
    else return 0;
  });

  const listFive = listStates.slice(0, 5);
  const listFiveFinal = [];
  for (let i = 0; i < listFive.length; i++) {
    listFiveFinal.push(`${listFive[i].state} - ${listFive[i].cities}`);
  }

  console.log(listFiveFinal);
}
/* Criar um método que imprima no console um array com o UF dos cinco estados
que menos possuem cidades, seguidos da quantidade, em ordem decrescente.
Você pode usar a função criada no tópico 2. Exemplo de impressão: [“UF - 30”, “UF
- 27”, “UF - 25”, “UF - 23”, “UF - 21”] */
async function fiveLessCities() {
  const states = JSON.parse(await fs.readFile('./files/Estados.json'));
  const listStates = [];
  for (let i in states) {
    await citiesCount(states[i].Sigla).then((uf) => {
      listStates.push({ state: states[i].Sigla, cities: uf });
    });
  }

  await listStates.sort((a, b) => {
    return a.cities - b.cities;
  });

  const listFive = listStates.slice(0, 5);
  console.log(listFive);

  listFive.sort((a, b) => {
    return b.cities - a.cities;
  });
  const listFiveFinal = [];
  for (let i in listFive) {
    listFiveFinal.push(`${listFive[i].state} - ${listFive[i].cities}`);
  }

  console.log(listFiveFinal);
}
/* Criar um método que imprima no console um array com a cidade de maior nome de
cada estado, seguida de seu UF. Por exemplo: [“Nome da Cidade – UF”, “Nome da
Cidade – UF”, ...]. */
async function nameMoreCities() {
  const states = JSON.parse(await fs.readFile('./files/Estados.json'));
  const citiesMoreLenght = [];

  for (let i in states) {
    let currentState = JSON.parse(
      await fs.readFile(`./states/${states[i].Sigla}.json`)
    );
    await currentState.sort((a, b) => {
      return a.Nome.localeCompare(b.Nome);
    });
    await currentState.sort((a, b) => {
      return b.Nome.length - a.Nome.length;
    });

    citiesMoreLenght.push(`${currentState[0].Nome} - ${states[i].Sigla}`);
  }

  console.log(citiesMoreLenght);
}
/* Criar um método que imprima no console um array com a cidade de menor nome
de cada estado, seguida de seu UF. Por exemplo: [“Nome da Cidade – UF”, “Nome
da Cidade – UF”, ...]. */
async function nameLessCities() {
  const states = JSON.parse(await fs.readFile('./files/Estados.json'));
  const citiesMoreLenght = [];

  for (let i in states) {
    let currentState = JSON.parse(
      await fs.readFile(`./states/${states[i].Sigla}.json`)
    );
    await currentState.sort((a, b) => {
      return a.Nome.localeCompare(b.Nome);
    });
    await currentState.sort((a, b) => {
      return a.Nome.length - b.Nome.length;
    });

    citiesMoreLenght.push(`${currentState[0].Nome} - ${states[i].Sigla}`);
  }

  console.log(citiesMoreLenght);
}
/* Criar um método que imprima no console a cidade de maior nome entre todos os
estados, seguido do seu UF. Exemplo: “Nome da Cidade - UF". */
async function allNameMoreCities() {
  const states = JSON.parse(await fs.readFile('./files/Estados.json'));
  const citiesMoreLenght = [];

  for (let i in states) {
    let currentState = JSON.parse(
      await fs.readFile(`./states/${states[i].Sigla}.json`)
    );
    await currentState.sort((a, b) => {
      return a.Nome.localeCompare(b.Nome);
    });
    await currentState.sort((a, b) => {
      return b.Nome.length - a.Nome.length;
    });

    citiesMoreLenght.push(`${currentState[0].Nome} - ${states[i].Sigla}`);
  }

  await citiesMoreLenght.sort((a, b) => {
    return b.length - a.length;
  });

  console.log(citiesMoreLenght[0]);
}
/* Criar um método que imprima no console a cidade de menor nome entre todos os
estados, seguido do seu UF. Exemplo: “Nome da Cidade - UF". */
async function allNameLessCities() {
  const states = JSON.parse(await fs.readFile('./files/Estados.json'));
  const citiesMoreLenght = [];

  for (let i in states) {
    let currentState = JSON.parse(
      await fs.readFile(`./states/${states[i].Sigla}.json`)
    );
    await currentState.sort((a, b) => {
      return a.Nome.localeCompare(b.Nome);
    });
    await currentState.sort((a, b) => {
      return b.Nome.length - a.Nome.length;
    });

    citiesMoreLenght.push(`${currentState[0].Nome} - ${states[i].Sigla}`);
  }

  await citiesMoreLenght.sort((a, b) => {
    return a.length - b.length;
  });

  console.log(citiesMoreLenght[0]);
}
