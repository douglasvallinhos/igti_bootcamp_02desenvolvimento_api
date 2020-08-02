import { promises as fs } from 'fs';

init();

async function init() {
  //await createFiles();
  //await citiesCount('SP').then((a) => console.log(a));
  //await fiveMoreCities();
  //await fiveLessCities();
  //await nameMoreCities();
  //await nameLessCities();
  await allNameMoreCities();
  await allNameLessCities();
}

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

async function citiesCount(state) {
  const city = await fs.readFile(`./states/${state}.json`);
  const cityJson = JSON.parse(city);
  return cityJson.length;
}

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
