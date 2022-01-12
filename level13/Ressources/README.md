# Level 13

## Resolution

As `level13`, running `ls` gives us a binary file called `level13`...

```shell
  $> ./level13
  UID 2013 started us but we we expect 4242
```

Using `ltrace` we can see what this binary actually does.

```shell
  $> ltrace ./level13
  __libc_start_main(0x804858c, 1, 0xbffff7d4, 0x80485f0, 0x8048660 <unfinished ...>
  getuid()                                                                                                                              = 2013
  getuid()                                                                                                                              = 2013
  printf("UID %d started us but we we expe"..., 2013UID 2013 started us but we we expect 4242
  )                                                                                   = 42
  exit(1 <unfinished ...>
  +++ exited (status 1) +++
```

This binary makes a simple system call to get the UID of the user running it and want this UID to equal `4242`. One way we can achieve this is by a powerful feature of linker using environment variable [`LD_PRELOAD`](https://stackoverflow.com/questions/426230/what-is-the-ld-preload-trick). It grants us the hability to perform code injection to replace existing symbols that are pulled from other libraries like the standard ones.

First we'll need to create our own version of [`getuid()`](https://man7.org/linux/man-pages/man2/getuid.2.html).

```c
#include <unistd.h>

uid_t getuid(void)
{
    return 4242;
}
```

> Like requested by the program, it will return `4242` no matter which user is running it.

Then we compile this if in a shared object library before adding it to the `LD_PRELOAD` variable.

```shell
  $> cd /tmp/
  $> gcc -fPIC -shared -o lib.so getuid.c
  $> export LD_PRELOAD="/tmp/lib.so"
```

> The `-fPIC` option is needed to create position independant code, which means it can be placed anywhere in the memory without breaking anything. It needed most of the time wen you create shared libraries.

Final trick is to make a copy of the original binary to drop the [setuid bit](https://en.wikipedia.org/wiki/Setuid) and run it as we would normaly do.

```shell
  $> cp /home/user/level13/level13 /tmp/level13
  $> /tmp/level13
  your token is 2A31L79asukciNyi8uppkEuSx
```

So, `2A31L79asukciNyi8uppkEuSx` is the flag for this level.

## Commands

- Custom `getuid()` function

  ```shell
    printf '#include <unistd>\nuid_t getuid(void){return 4242;}\n' > /tmp/getuid.c
  ```

## Ressources

- [LD_PRELOAD Trick](http://www.goldsborough.me/c/low-level/kernel/2016/08/29/16-48-53-the_-ld_preload-_trick/)
- [Position independant code](https://en.wikipedia.org/wiki/Position-independent_code#:~:text=In%20computing%2C%20position%2Dindependent%20code,regardless%20of%20its%20absolute%20address.&text=Position%2Dindependent%20code%20can%20be,any%20memory%20address%20without%20modification.)
- [Shared object libraries]()
- [Setuid bit](https://en.wikipedia.org/wiki/Setuid)
