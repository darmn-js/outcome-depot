import axios from 'axios';
import { readFileSync } from 'fs';
import https from 'https';

const dbname = 'https://gat.mylims.org/roc/';
const newURL = `${dbname}auth/login/couchdb`;

const axiosInstance = axios.create({
  withCredentials: true,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
});

let cookies = [];
try {
  const request = await axiosInstance.post(newURL, undefined, {
    params: {
      username: 'admin@cheminfo.org',
      password: '20darmn20',
    },
    headers: {
      'Content-Type': 'application/json',
    },
  });
  // @ts-ignore
  cookies = request.headers['set-cookie'];
} catch (error) {
  console.log(error);
}

/**
 * How to get sample using uuid
 */

// const dbname = 'https://gat.mylims.org/roc/';
// const uuid = 'df1bb9d4fbe869442693baae2dd56761';
// const entry = `${dbname}db/eln/entry/`;
// try {
//   const sampleRequest = await axiosInstance.get(`${entry}${uuid}`, {
//     headers: {
//       Cookie: cookies.join('; '),
//     },
//   });
// } catch (error) {
//   console.log(`Error trayendo la muestra: ${error}`);
// }

// const image = readFileSync(new URL(`./plant.jpg`, import.meta.url)).toString(
//   'base64',
// );

// console.log('añlskjdf: ', image.slice(0, 20));

// const entry = `${dbname}db/eln/entry/`;
// const uuid = 'c06f2812de3f9a99a268c63229f9c574';
// const headers = { Cookie: cookies.join('; ') };
// try {
//   const sampleRequest = await axiosInstance.get(`${entry}${uuid}`, { headers });
//   const data = sampleRequest.data; // se modifica el archivo
//   console.log({data});
//   data._attachments = {};
//   data._attachments[`image/plant.jpg`] = {
//     content_type: 'image/jpeg',
//     data: image
//   }
//   await axiosInstance.put(`${entry}${uuid}`, data, { headers });
//   // await axiosInstance.delete(`${entry}${uuid}/image/plant1.jpg`, { headers });

// } catch (error) {
//   console.log(`Error actualizando la muestra: ${error}`);
// }

// /**
//  * How to get sample using uuid
//  */
// const uuid = 'c06f2812de3f9a99a268c63229f9c574';
// const sampleURL = `${dbname}db/eln/entry/${uuid}/`;
// try {
//   const sampleRequest = await axiosInstance.delete(sampleURL, {
//     headers: {
//       Cookie: cookies.join('; ')
//     }
//   });
//   console.log({ data: sampleRequest.data})
// } catch(error) {
//   console.log(error)
// }

// /**
//  * Cómo crear una muestra
//  */
// const sample = JSON.parse(
//   readFileSync(new URL(`./sample.json`, import.meta.url), { encoding: 'utf8' }),
// );

// /**
//  * El campo "reference" (sample.$id[0]) y "batch" (sample.$id[1]) deben ser únicos en la base de datos
//  */
// sample.$id = ['create_test', 'create_test'];
// const sampleURL = `${dbname}db/eln/entry/`;
// try {
//   const sampleRequest = await axiosInstance.post(sampleURL, sample, {
//     headers: {
//       Cookie: cookies.join('; '),
//     },
//   });
//   console.log({ data: sampleRequest.data });
// } catch (error) {
//   console.log(error);
// }

/**
 * Cómo crear traer un attachment
 */

/**
 * El campo "reference" (sample.$id[0]) y "batch" (sample.$id[1]) deben ser únicos en la base de datos
 */

// /**
//  * How to get sample using uuid
//  */
// const uuid = 'c06f2812de3f9a99a268c63229f9c574';
// const sampleURL = `${dbname}db/eln/entry/${uuid}/`;
// try {
//   const sampleRequest = await axiosInstance.delete(sampleURL, {
//     headers: {
//       Cookie: cookies.join('; ')
//     }
//   });
//   console.log({ data: sampleRequest.data})
// } catch(error) {
//   console.log(error)
// }
const uuid = 'bd988af7a1ba2ba34d6ca25a16e2e52f';
const sampleURL = `${dbname}db/eln/entry/${uuid}`;
try {
  const sampleRequest = await axiosInstance.get(sampleURL, {
    headers: {
      Cookie: cookies.join('; ')
    }
  });

  await axiosInstance.post(sampleURL, JSON.stringify({
    name: 'test_attachment_save',
    content_type: "chemical/x-jcamp-dx",
    data: new Uint8Array()
  }),{
    headers: {
      Cookie: cookies.join('; ')
    }
  });
  sampleRequest.data.$content
  console.log({ data: sampleRequest.data._attachments.push({
    content_type:  "chemical/x-jcamp-dx",
    data: 'alskdflkañsjdlkñfasñlkdjfñalskjdfñlkajsñdlkfjañlksfd'.toString('base64')
  })})
} catch(error) {
  console.log(error)
}


const  datum = {
  "content_type": "chemical/x-jcamp-dx",
  "digest": "md5-7WqZc4wIXZ3KVcWa7+4bag==",
  "length": 85274,
  "name": "spectra/chromatogram/l-proline.txt",
  "revpos": 22,
  "stub": true,
  "url": "https:/"
}