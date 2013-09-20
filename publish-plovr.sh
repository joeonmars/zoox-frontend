#!/bin/sh

BASEDIR=$(dirname $0)
cd $BASEDIR

java -jar plovr.jar build config.js > development/js/zoox-compiled.js