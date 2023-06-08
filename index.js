//PARA EJECUTAR EN MODO DEV SIEMPRE, CON NPM RUN DEV
const express = require('express');
const cors = require('cors')
const routerApi = require('./routes');

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = 3000;

//DEPENDENCIAS DE LA APP Y CORS
app.use(express.json());

const whiteList = ['http://localhost:8080', 'https://pagina.com', 'http://localhost:3000', 'http://127.0.0.1:5500'];
const option = {
  origin: (origin, callback) => {
    if(whiteList.includes(origin)) {
      callback(null, true);
    } else{
      callback(new Error ('no permitido'));
    }
  }
}
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hola mi server en express');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola, soy una nueva ruta');
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(port, () => {
  console.log('Mi port' +  port);
});
