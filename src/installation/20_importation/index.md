---
slug: /installation/importation
---

# Importación automática de archivos (jcamp, etc.)

`rest-on-couch` permite importar archivos automáticamente en función de un filtro que se coloca en la carpeta correspondiente.

En la carpeta `roc-eln-docker` encontrará `rest-on-couch` que contiene una carpeta `eln` que corresponde al nombre de la base de datos `couchDB`. En esta carpeta, puede colocar cualquier cantidad de carpetas que contengan un archivo llamado `ìmport.js` que describa cómo importar archivos que se colocan en la carpeta. Entonces, todos los archivos que le gustaría importar del tipo `nmr`, por ejemplo, podrían colocarse en: `/usr/local/docker/roc-eln-docker/rest-on-couch/eln/nmr/to_process` y una vez procesados, se moverán a `/usr/local/docker/roc-eln-docker/rest-on-couch/eln/nmr/processed` o, en caso de error, a `/usr/local/docker/roc -eln-docker/rest-on-couch/eln/nmr/errored`.

Para depurar un archivo con errores y editar el archivo `import.js`, puede ejecutar la importación de forma interactiva. Para esto, puede ir a la imagen de docker. Primero busque el `id` de la imagen `rest-on-couch-import` usando `docker ps` y luego acceda a la imagen usando `docker exec -it fe2acfbb9bba sh` (reemplace el ID de imagen correcto).

Para obtener la ayuda de la importación, puede ejecutar `node bin/rest-on-couch-import.js --help`

Puede probar la importación de un archivo erróneo con una instrucción como: `node bin/rest-on-couch-import.js --dry-run /rest-on-couch/eln/nmr/errored/2017/08/28 /abc.jdx eln nmr`
