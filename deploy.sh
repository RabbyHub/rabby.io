#! /bin/sh

set -e
set -x

server="hk-builder"

yarn build

rsync -avzz --delete dist ${server}:~/

ssh ${server} 'sudo cp -r ~/dist /data/fe/rabby_prod/'
