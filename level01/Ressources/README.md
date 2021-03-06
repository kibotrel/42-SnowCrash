# Level 01

## Resolution

As `level01` if we run `ls` we don't see anything at our disposal. Unlike first exercice, `find` won't help us. We need to go elsewhere.

A good place to start is to check `/etc/passwd` for more information. It stores users known to the system, so we'll find the list of `levelXX` and `flagXX` among others.

```shell
  $> cat /etc/passwd
  ...
  level00:x:2000:2000::/home/user/level00:/bin/bash
  level01:x:2001:2001::/home/user/level01:/bin/bash
  level02:x:2002:2002::/home/user/level02:/bin/bash
  level03:x:2003:2003::/home/user/level03:/bin/bash
  level04:x:2004:2004::/home/user/level04:/bin/bash
  level05:x:2005:2005::/home/user/level05:/bin/bash
  level06:x:2006:2006::/home/user/level06:/bin/bash
  level07:x:2007:2007::/home/user/level07:/bin/bash
  level08:x:2008:2008::/home/user/level08:/bin/bash
  level09:x:2009:2009::/home/user/level09:/bin/bash
  level10:x:2010:2010::/home/user/level10:/bin/bash
  level11:x:2011:2011::/home/user/level11:/bin/bash
  level12:x:2012:2012::/home/user/level12:/bin/bash
  level13:x:2013:2013::/home/user/level13:/bin/bash
  level14:x:2014:2014::/home/user/level14:/bin/bash
  flag00:x:3000:3000::/home/flag/flag00:/bin/bash
  flag01:42hDRfypTqqnw:3001:3001::/home/flag/flag01:/bin/bash
  flag02:x:3002:3002::/home/flag/flag02:/bin/bash
  flag03:x:3003:3003::/home/flag/flag03:/bin/bash
  flag04:x:3004:3004::/home/flag/flag04:/bin/bash
  flag05:x:3005:3005::/home/flag/flag05:/bin/bash
  flag06:x:3006:3006::/home/flag/flag06:/bin/bash
  flag07:x:3007:3007::/home/flag/flag07:/bin/bash
  flag08:x:3008:3008::/home/flag/flag08:/bin/bash
  flag09:x:3009:3009::/home/flag/flag09:/bin/bash
  flag10:x:3010:3010::/home/flag/flag10:/bin/bash
  flag11:x:3011:3011::/home/flag/flag11:/bin/bash
  flag12:x:3012:3012::/home/flag/flag12:/bin/bash
  flag13:x:3013:3013::/home/flag/flag13:/bin/bash
  flag14:x:3014:3014::/home/flag/flag14:/bin/bash
```

In this file, each entry represent a user. All fields are separated by `:` and the format is:

```shell
  Username:Password:UID:GID:Optional Infos:Home directory:Shell
```

>More informations about the format [here](https://www.cyberciti.biz/faq/understanding-etcpasswd-file-format/).

If we look closer to `flag01` user...

```shell
  $> cat /etc/passwd | grep flag01
  flag01:42hDRfypTqqnw:3001:3001::/home/flag/flag01:/bin/bash
```

> Unlike all of the other users where the password field is set as `x` which means that this encrypted password is stored in `/etc/shadow`, this one directly stores its hash in this field.

To get the clear password we can give this hashed password to [`john`](https://www.openwall.com/john/) which is an opensource security auditing software.

```shell
  $> echo "42hDRfypTqqnw" > password
  $> john --format=descrypt password
  Using default input encoding: UTF-8
  Loaded 1 password hash (descrypt, traditional crypt(3) [DES 128/128 AVX])
  Proceeding with single, rules:Single
  Press 'q' or Ctrl-C to abort, almost any other key for status
  Almost done: Processing the remaining buffered candidate passwords, if any.
  Proceeding with wordlist:./password.lst
  abcdefg          (?)
  1g 0:00:00:00 DONE 2/3 (2022-01-06 18:00) 7.692g/s 5907p/s 5907c/s 5907C/s raquel..bigman
  Use the "--show" option to display all of the cracked passwords reliably
  Session completed.   
```

So, the hashed password `42hDRfypTqqnw` gives us `abcdefg` apprently. We can now connect as `flag01` and get our next flag!

```shell
  $> su flag01
  Password: abcdefg
  $> getflag
  Check flag.Here is your token : f2av5il02puano7naaf6adaaf
```

So, `f2av5il02puano7naaf6adaaf` is the flag for this level.

## Ressources

- [John the ripper](https://www.openwall.com/john/)
- [/etc/passwd format](https://www.cyberciti.biz/faq/understanding-etcpasswd-file-format/)
