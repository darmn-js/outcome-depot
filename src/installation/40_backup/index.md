---
slug: /installation/backup
---

# Copia de seguridad del sistema

Dado que CouchDB es una base de datos solo para agregar, usar una solución basada en [rsync](https://rsync.samba.org/)/[rsnapshot](https://rsnapshot.org/) es una opción segura. Para una base de datos grande, puede interesarle la opción `rsync` `--append` que solo agregará datos en archivos más cortos y, por lo tanto, no copiará la base de datos completa.

Alternativamente, puede usar la [función de replicación de CouchDB en otro servidor](https://guide.couchdb.org/draft/replication.html). Puede configurar convenientemente la replicación desde la [interfaz gráfica de Fauxton](https://couchdb.apache.org/fauxton-visual-guide/index.html) en el endpoint `_utils`.
