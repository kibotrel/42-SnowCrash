#!/bin/bash

IP=`ifconfig | grep -A1 "eth3" | grep "inet" | cut -d ":" -f2 | cut -d " " -f1`

while true;
do
  /home/user/level10/level10 /tmp/link $IP > /dev/null
done