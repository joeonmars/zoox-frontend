#!/bin/sh

BASEDIR=$(dirname $0)
cd $BASEDIR

java -jar plovr.jar serve config.js