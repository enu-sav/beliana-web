#!/bin/bash

# Script for generating testing content.
# Run as ./generator DRUSH_ALIAS

for i in {1..3000}
do
  ../../vendor/drush/drush/drush $1 genc 50 --types=word > /dev/null
  if [ $(( $i % 10 )) -eq 0 ]
  then
    echo $i
  fi
done