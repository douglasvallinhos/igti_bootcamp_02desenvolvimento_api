import express from 'express';
import carrosRouter from './carrosRouter.js';

const app = express();
app.use(express.json());

/* para usar uma router em arquivo separado */
app.use('/carros', carrosRouter);

/* colocando dessa maneira independente de ser um get,post,  
em qualquer requisicao vai rodar */
app.use((req, res, next) => {
  console.log(new Date());
  next();
});

app.get('/teste', (req, res) => {
  res.send('funcionou');
});

app.listen(8080, () => console.log('API START!'));
