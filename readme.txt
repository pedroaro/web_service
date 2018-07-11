READ ME

Hola, para comenzar utilizamos moongose para crear el schema entidad en mongoDB

La BD que utilzamos se debe llamar project

Para importar el JSON desde la webpage original debemos acceder al siguiente url

http://localhost:3000/request_official_json

Cuando nos salga el jsonde todas las sinstituciones significa que ya funcionó y añadio en mongoDB

luego para acceder a todos las instituciones hacer

http://localhost:3000/institutions

para seleccionar institucion por id hacer

http://localhost:3000/institutions/uid/{id de la institucion}

para seleccionar institucion por nombre hacer

http://localhost:3000/institutions/name/{nombre de la institucion}

para seleccionar institucion por uri hacer

http://localhost:3000/institutions/uri/?url={url de la institucion}

ejemplo:
http://localhost:3000/institutions/uri/?url=https://collections.ala.org.au/ws/institution/in123