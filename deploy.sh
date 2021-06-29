#! /bin/sh

set -e
set -x

server="hk-builder"

yarn build

rsync -avzz --delete dist ${server}:~/

ssh ${server} 'sudo mv /data/fe/rabby_prod ~/data/fe/rabby_prod$(date +%s) && sudo cp -r ~/dist /data/fe/rabby_prod/'
