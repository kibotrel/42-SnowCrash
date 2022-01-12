# Level 14

## Resolution

As `level14`, `ls` nor `find` get us anything we can use to finish this level. So we probably have to exploit `/bin/getflag` directly this time.

If we try the `LD_PRELOAD` trick from the previous level and set the return value to `3014` which is the UID of `flag14`, it won't work because of a protection in this binary.

```shell
  $> getflag
  Injection Linked lib detected exit..
```

Using `ltrace` on it we can see something interesting.

```shell
  $> ltrace getflag
  __libc_start_main(0x8048946, 1, 0xbffff7f4, 0x8048ed0, 0x8048f40 <unfinished ...>
  ptrace(0, 0, 1, 0, 0)                                       = -1
  puts("You should not reverse this"You should not reverse this
  )                         = 28
  +++ exited (status 1) +++
```

> This binary uses [`ptrace()`](https://en.wikipedia.org/wiki/Ptrace#:~:text=ptrace%20is%20a%20system%20call,internal%20state%20of%20its%20target.). It grants the parent processus to get control on the internal state of its target. With the help of a debugger like [gdb](sourceware.org/gdb/) we could do something with it.

Using `gdb` we can disasemble the code to see what we can do.

```gdb
  $> gdb /bin/getflag
  Reading symbols from /bin/getflag...(no debugging symbols found)...done.
  (gdb) > dissassemble main
  Dump of assembler code for function main:
    ...
    0x08048989 <+67>:    call   0x8048540 <ptrace@plt>
    ...
    0x08048afd <+439>:   call   0x80484b0 <getuid@plt>
    ...
    0x08048b0a <+452>:   cmp    $0xbbe,%eax
    0x08048b0f <+457>:   je     0x8048ccb <main+901>
    0x08048b15 <+463>:   cmp    $0xbbe,%eax
    0x08048b1a <+468>:   ja     0x8048b68 <main+546>
    0x08048b1c <+470>:   cmp    $0xbba,%eax
    0x08048b21 <+475>:   je     0x8048c3b <main+757>
    0x08048b27 <+481>:   cmp    $0xbba,%eax
    0x08048b2c <+486>:   ja     0x8048b4d <main+519>
    0x08048b2e <+488>:   cmp    $0xbb8,%eax
    0x08048b33 <+493>:   je     0x8048bf3 <main+685>
    0x08048b39 <+499>:   cmp    $0xbb8,%eax
    0x08048b3e <+504>:   ja     0x8048c17 <main+721>
    0x08048b44 <+510>:   test   %eax,%eax
    0x08048b46 <+512>:   je     0x8048bc6 <main+640>
    0x08048b48 <+514>:   jmp    0x8048e06 <main+1216>
    0x08048b4d <+519>:   cmp    $0xbbc,%eax
    0x08048b52 <+524>:   je     0x8048c83 <main+829>
    0x08048b58 <+530>:   cmp    $0xbbc,%eax
    0x08048b5d <+535>:   ja     0x8048ca7 <main+865>
    0x08048b63 <+541>:   jmp    0x8048c5f <main+793>
    0x08048b68 <+546>:   cmp    $0xbc2,%eax
    0x08048b6d <+551>:   je     0x8048d5b <main+1045>
    0x08048b73 <+557>:   cmp    $0xbc2,%eax
    0x08048b78 <+562>:   ja     0x8048b95 <main+591>
    0x08048b7a <+564>:   cmp    $0xbc0,%eax
    0x08048b7f <+569>:   je     0x8048d13 <main+973>
    0x08048b85 <+575>:   cmp    $0xbc0,%eax
    0x08048b8a <+580>:   ja     0x8048d37 <main+1009>
    0x08048b90 <+586>:   jmp    0x8048cef <main+937>
    0x08048b95 <+591>:   cmp    $0xbc4,%eax
    0x08048b9a <+596>:   je     0x8048da3 <main+1117>
    0x08048ba0 <+602>:   cmp    $0xbc4,%eax
    0x08048ba5 <+607>:   jb     0x8048d7f <main+1081>
    0x08048bab <+613>:   cmp    $0xbc5,%eax
    0x08048bb0 <+618>:   je     0x8048dc4 <main+1150>
    0x08048bb6 <+624>:   cmp    $0xbc6,%eax
    0x08048bbb <+629>:   je     0x8048de5 <main+1183>
    0x08048bc1 <+635>:   jmp    0x8048e06 <main+1216>
    ...
    0x08048eca <+1412>:  leave
    0x08048ecb <+1413>:  ret
  End of assembler dump.
```

> As we can see getflag retrieves the UID with `getuid()` and depending on the value (so the `flagXX` user) it will jump (`je` assembly instruction) to a particular address in the code.

First, let's retrieve the UID of `flag14`.

```shell
  $> id flag14
  uid=3014(flag14) gid=3014(flag14) groups=3014(flag14),1001(flag)
```

Now that we now it's `3014`, all we have to do is to create a debug routine for gdb to execute and give us the flag as if we were logged as `flag14`.

```gdb
file /bin/getflag
catch syscall ptrace
commands 1
set $eax=0
continue
end
break getuid
run
step
print $eax
set $eax=3014
print $eax
continue
```

> To explain what's happening here: first we tell gdb that we'll use `/bin/getflag` as our target, then we'll catch `ptrace` to set its return (`$eax`) to 0 so that we can debug the program. After this, we create a breakpoint to `getuid`, we let the program run until its execution then stop after to check and modify its return value (`$eax` once again) and finaly let the program run until the end to get the flag.

Execute this file in gdb and get the flag!

```shell
  $> gdb -x /tmp/getflag.gdb -batch
  Breakpoint 2 at 0x80484b0

  Catchpoint 1 (call to syscall ptrace), 0xb7fdd428 in __kernel_vsyscall ()      

  Catchpoint 1 (returned from syscall ptrace), 0xb7fdd428 in __kernel_vsyscall ()

  Breakpoint 2, 0xb7ee4cc0 in getuid () from /lib/i386-linux-gnu/libc.so.6
  Single stepping until exit from function getuid,
  which has no line number information.
  0x08048b02 in main ()
  $1 = 2014
  $2 = 3014
  Check flag.Here is your token : 7QiHafiNa3HVozsaXkawuYrTstxbpABHD8CPnHJ 
  [Inferior 1 (process 2917) exited normally]
```

So, `7QiHafiNa3HVozsaXkawuYrTstxbpABHD8CPnHJ` is the flag for this level.

## Commands

- Debugger routine:
  ```
  printf "file /bin/getflag\ncatch syscall ptrace\ncommands 1\nset \$eax = 0\ncontinue\nend\nbreak getuid\nrun\nstep\nprint \$eax\nset \$eax = 3014\nprint \$eax\continue\n" > /tmp/getflag.gdb
  ```

## Ressources

- [gdb](https://www.cs.cmu.edu/~gilpin/tutorial/)
- [ptrace](https://man7.org/linux/man-pages/man2/ptrace.2.html)
- [x86 Assembly instruction list](https://en.wikipedia.org/wiki/X86_instruction_listings)