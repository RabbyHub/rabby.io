#! /bin/sh

set -e
set -x

server="hk-builder"

yarn build

rsync -avzz --delete build ${server}:~/

ssh ${server} 'sudo cp -r ~/build /data/fe/rabby_prod/'
