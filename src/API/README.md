# HTTP API

## Iniciar sesión / Cerrar sesión

| Método | Ruta                  |             Acción              |                                                             Descripción                                                             |
| :----: | :-------------------- | :-----------------------------: | :---------------------------------------------------------------------------------------------------------------------------------: |
|  GET   | `/auth/login`         |        inicio de sesión         | Muestra opciones de inicio de sesión o redirige al usuario si ya está autenticado.<br>Parámetro opcional para redirigir: `continue` |
|  GET   | `/auth/login/:method` |             acceso              |                                    Crea una sesión.<br>El método puede ser `couchdb`, `google`,                                     |
|  GET   | `/auth/logout`        |          cerrar sesión          |                                                                                                                                     |
|  GET   | `/auth/session`       | información de la sesión actual |                                                                                                                                     |

### EJEMPLOS

#### Cómo iniciar sesión desde una cuenta en la base de datos.

```js
import axios from 'axios';
import { readFileSync } from 'fs';
import https from 'https';

const dbname = 'https://gat.mylims.org/roc/';
const newURL = `${dbname}auth/login/couchdb`;
const axiosInstance = axios.create({ withCredentials: true });

let cookies = [];
try {
  const request = await axiosInstance.post(newURL, undefined, {
    params: {
      username: 'mi usuario',
      password: 'mi constraseña',
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });
  cookies = request.headers['set-cookie'];
} catch (error) {
  console.log(error);
}
```

### Muestras

| Método | Ruta                                     |                 Acción                 |                      Descripción                       |
| :----: | :--------------------------------------- | :------------------------------------: | :----------------------------------------------------: |
|  POST  | `/db/:dbname/entry`                      |    Insertar/Actualizar una muestra     |          Basado en \_id o \$id de la muestra           |
|  GET   | `/db/:dbname/entry/_all`                 |        Traer todas las muestras        |           Devuelve una lista de documentos.            |
|  HEAD  | `/db/:dbname/entry/:uuid`                | Obtener encabezados HTTP del documento |       Similar a HEAD //dbname/:docid en CouchDB        |
|  GET   | `/db/:dbname/entry/:uuid`                |      Obtener una entrada por UUID      |                                                        |
|  PUT   | `/db/:dbname/entry/:uuid`                |    Actualizar una entrada por UUID     |                                                        |
| DELETE | `/db/:dbname/entry/:uuid`                |     Eliminar una entrada por UUID      |                                                        |
|  GET   | `/db/:dbname/entry/:uuid/_owner`         |   Obtener una lista de propietarios    |                                                        |
|  PUT   | `/db/:dbname/entry/:uuid/_owner/:owner`  |         Agregar un propietario         |                                                        |
| DELETE | `/db/:dbname/entry/:uuid/_owner/:owner`  |        Eliminar un propietario         |                                                        |
|  GET   | `/db/:dbname/entry/:uuid/_rights/:right` |  Obtener información sobre un derecho  | Devuelve verdadero si el usuario tiene el derecho dado |
|  GET   | `/db/:dbname/entry/:uuid/:attachment+`   |       Obtener un archivo adjunto       |                                                        |
|  PUT   | `/db/:dbname/entry/:uuid/:attachment+`   |       Guardar un archivo adjunto       |                                                        |
| DELETE | `/db/:dbname/entry/:uuid/:attachment+`   |      Eliminar un archivo adjunto       |                                                        |

### EJEMPLOS

#### Cómo crear una muestra (POST).

```js
const sample = JSON.parse(
  readFileSync(new URL(`./sample.json`, import.meta.url), { encoding: 'utf8' }),
);

/**
 * El campo "reference" (sample.$id[0]) y "batch" (sample.$id[1]) deben ser únicos en la base de datos
 */
const dbname = 'https://gat.mylims.org/roc/';
sample.$id = ['create_test', 'create_test'];
const sampleURL = `${dbname}db/eln/entry/`;
try {
  const sampleRequest = await axiosInstance.post(sampleURL, sample, {
    headers: {
      Cookie: cookies.join('; '),
    },
  });
} catch (error) {
  console.log(error);
}
```

#### Cómo traer una mestra (GET).

```js
const dbname = 'https://gat.mylims.org/roc/';
const entry = `${dbname}db/eln/entry/`;
const uuid = 'df1bb9d4fbe869442693baae2dd56761';
try {
  const sampleRequest = await axiosInstance.get(`${entry}${uuid}`, {
    headers: {
      Cookie: cookies.join('; '),
    },
  });
} catch (error) {
  console.log(error);
}
```

#### Cómo actualizar una muestra (PUT).

```js
const dbname = 'https://gat.mylims.org/roc/';
const entry = `${dbname}db/eln/entry/`;
const uuid = 'c06f2812de3f9a99a268c63229f9c574';
const headers = { Cookie: cookies.join('; ') };
try {
  const sampleRequest = await axiosInstance.get(`${entry}${uuid}`, { headers });
  const data = sampleRequest.data; // se modifica el archivo
  await axiosInstance.put(`${entry}${uuid}`, data, { headers });
} catch (error) {
  console.log(`Error actualizando la muestra: ${error}`);
}
```

#### Cómo actualizar una muestra (POST).

```js
const dbname = 'https://gat.mylims.org/roc/';
const entry = `${dbname}db/eln/entry/`;
const uuid = 'c06f2812de3f9a99a268c63229f9c574';
const headers = { Cookie: cookies.join('; ') };
try {
  const sampleRequest = await axiosInstance.get(`${entry}${uuid}`, { headers });
  const data = sampleRequest.data; // se modifica el archivo conservando el $id
  await axiosInstance.post(`${entry}`, data, { headers });
} catch (error) {
  console.log(`Error actualizando la muestra: ${error}`);
}
```

#### Cómo agregar un archivo adjunto (PUT).

```js
const dbname = 'https://gat.mylims.org/roc/';
const entry = `${dbname}db/eln/entry/`;
const uuid = 'c06f2812de3f9a99a268c63229f9c574';
const headers = { Cookie: cookies.join('; ') };
try {
  const sampleRequest = await axiosInstance.get(`${entry}${uuid}`, { headers });
  const image = readFileSync(new URL(`./plant.jpg`, import.meta.url)).toString(
    'base64',
  );
  const data = sampleRequest.data; // se modifica el archivo
  data._attachments[`image/plant.jpg`] = {
    content_type: 'image/jpeg',
    data: image,
  };
  await axiosInstance.put(`${entry}${uuid}`, data, { headers });
} catch (error) {
  console.log(`Error actualizando la muestra: ${error}`);
}
```

#### Cómo traer archivo adjunto (GET).

```js
const dbname = 'https://gat.mylims.org/roc/';
const entry = `${dbname}db/eln/entry/`;
const uuid = 'c06f2812de3f9a99a268c63229f9c574';
const headers = { Cookie: cookies.join('; ') };
try {
  await axiosInstance.get(`${entry}${uuid}/image/plant.jpg`, { headers });
} catch (error) {
  console.log(`Error trayendo archivo adjunto: ${error}`);
}
```

#### Cómo eliminar archivo adjunto (DELETE).

```js
const dbname = 'https://gat.mylims.org/roc/';
const entry = `${dbname}db/eln/entry/`;
const uuid = 'c06f2812de3f9a99a268c63229f9c574';
const headers = { Cookie: cookies.join('; ') };
try {
  await axiosInstance.delete(`${entry}${uuid}/image/plant.jpg`, { headers });
} catch (error) {
  console.log(`Error eliminando archivo adjunto: ${error}`);
}
```

### Usuario

| Método | Ruta                    |           Acción            |                                       Descripción                                       |
| :----: | :---------------------- | :-------------------------: | :-------------------------------------------------------------------------------------: |
|  GET   | `/:dbname/userInfo/_me` | Obtener información privada | Solicitud personalizada (por ejemplo, LDAP) para recuperar información personal privada |
