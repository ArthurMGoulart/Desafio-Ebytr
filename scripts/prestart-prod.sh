#! /bin/bash
PATH=$(npm bin):$PATH
export NODE_ENV=production

function initialize_back_end () {
  printf "\n> ASYNC: Instalando o back-end e inicializando a api\n"
  (
    cd ./back-end
    cacheFolderBack="/tmp/desafio-ebytr-back-end-dev-cache"
    rm -rf $cacheFolderBack
    npm_config_loglevel=silent npm install --cache $cacheFolderBack
  )
}

function initialize_front_end() {
  printf "\n> ASYNC: Instalando o front-end\n"
  (
    cd ./front-end
    cacheFolderFront="/tmp/desafio-ebytr-front-end-dev-cache"
    rm -rf $cacheFolderFront
    npm_config_loglevel=silent npm install --cache $cacheFolderFront
  )
}

initialize_back_end & initialize_front_end

printf "\n> Script terminado\n\n"
