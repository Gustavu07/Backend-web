import fs from 'fs';
import path from 'path';

const urlBase = 'public/imagenes';
const extensionesValidas = ['png', 'jpg', 'jpeg', 'webp'];

export async function guardarImagen(carpeta, imagen, id) {
    const extension = imagen.name.split('.').pop();
    if (!extensionesValidas.includes(extension)) {
        throw new Error(`La extensión ${extension} no es válida`);
    }
    const rutaCarpeta = urlBase+"/"+carpeta;
    if (!fs.existsSync(rutaCarpeta)) {
        fs.mkdirSync(rutaCarpeta, { });
    }
    const ruta = rutaCarpeta+"/"+`${id}.${extension}`;
    await imagen.mv(ruta);
    return ruta;
}
