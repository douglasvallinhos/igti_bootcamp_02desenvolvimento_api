import { promises as fs } from 'fs';

init();

async function init(){
    await createFiles();
}

async function createFiles(){
    let cities =  JSON.parse(await fs.readFile('./files/Cidades.json'));
    let states = JSON.parse(await fs.readFile('./files/Estados.json'));

    for (let i = 0; i < states.length; i++){
        const statesCities = cities.filter((city) => city.Estado === states[i].ID);
        await fs.writeFile(`./states/${states[i].Sigla}.json`, JSON.stringify(statesCities));
    }


}