# ls
myfunc() {
  x=120
  y=500
  # sleep 4
  echo $(($x+$y))
  echo $1 | tr ' ' '\n'
  # sleep 5
}

myfunc "this is some string"