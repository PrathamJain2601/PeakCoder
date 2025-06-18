#!/bin/sh

# $1 = code filename (e.g., Main.cpp)
# $2 = input filename (e.g., input.txt)

g++ "$1" -o main.out
if [ $? -ne 0 ]; then
  echo "Compilation Error"
  exit 1
fi

./main.out < "$2"
