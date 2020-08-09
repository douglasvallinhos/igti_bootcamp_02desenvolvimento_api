import express from 'express';
import gradesRouter from './routes/grades.js';
import { promises as fs } from 'fs';
const app = express();
app.use(express.json());

app.use('/grades', gradesRouter);

app.listen('8080', async () => {
  try {
    await fs.readFile('grades.json');
    console.log('API GRADES Started :)');
  } catch (error) {
    const initialJson = {
      nextId: 1,
      grades: [],
    };
    await fs
      .writeFile('grades.json', JSON.stringify(initialJson))
      .then(() => {
        console.log('API GRADES Started :)');
      })
      .catch((error) => {
        console.log(error);
      });
  }
});
