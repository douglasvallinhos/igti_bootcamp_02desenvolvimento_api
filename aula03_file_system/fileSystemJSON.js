import { promises as fs } from 'fs';

writeReadJson();

async function writeReadJson() {
  try {
    //ecrever objeto de array
    const arrayCarros = ['Gol', 'Palio', 'Uno', 'Civic'];
    const obj = {
      carros: arrayCarros,
    };
    // gravamos o objeto de array criado em um arquivo fisico
    await fs.writeFile('array.json', JSON.stringify(obj));

    //leitura do arquivo fisico
    const lerArray = JSON.parse(await fs.readFile('array.json'));
    console.log(lerArray);
    //acrescentado um valor no array
    lerArray.carros.push('Sandero');
    console.log(lerArray);
    // regravando um novo arquivo fisico com o novo valor que foi acrescentado
    await fs.writeFile('array.json', JSON.stringify(lerArray));
  } catch (error) {
    console.log(error);
  }
}
