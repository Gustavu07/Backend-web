import express, { json } from 'express';
import router from './routes/usuario.js';
import routercategoria from './routes/categoria.js';
import routercursos from './routes/cursos.js';
import cors from 'cors';
import fileUpload from 'express-fileupload';

const app = express();
app.use(json());
app.disable('x-powered-by');
app.use(cors({
    origin: '*'

}))

app.use(fileUpload({

    useTempFiles: true,

    tempFileDir: './temp'  // Directorio temporal para las imágenes
}));
app.use(express.static("public"));

app.use('/usuarios', router);
app.use('/categorias', routercategoria);
app.use('/cursos', routercursos);
app.use("/public", express.static("public"));
app.get('/', (req, res) => {
    res.json({ "message": 'Hola mundo' }) 
});

const PORT =  4000;

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto: ${PORT}`)
})

//npm run dev levanto el servidor de mi backend
