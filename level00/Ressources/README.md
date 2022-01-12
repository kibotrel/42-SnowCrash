# Level 00

## Resolution

As `level00` if we run `ls` we don't see anything at our disposal. Using the [Snow Crash introduction video](https://elearning.intra.42.fr/notions/127/subnotions/465/videos/404), we can see that there was a `README.md` file available to us back then in which we can read :

```shell
  FIND this first file who can run as flag00
```

Find being in uppercase isn't meaningless, it gives us an hint: **we must use** `find` **to locate a file**, more precisely, one that is owned by `flag00`.

```shell
  $> find / -xdev -user flag00 2>/dev/null
  /usr/sbin/john
```

> This find command looks through everything in this filesystem to identify files that are owned by `flag00` and redirect any errors (like missing permissions) to `/dev/null` so that our prompt isn't full of garbage

 So we find one and only one file called `/usr/sbin/john` with some text inside it.

```shell
  $> cat /usr/sbin/john
  cdiiddwpgswtgt
```

Trying to connect as `flag00` with this doesn't work. It doesn't look like a hashed password either. Using [dcode.fr](https://www.dcode.fr/), we can give this string to the "Cipher Identifier" tool leading us to a high probability of being [Caesar cipher](https://en.wikipedia.org/wiki/Caesar_cipher). Then, using their Caesar cipher decoder it generates every possible password, here is the full list: 

```shell
+1	bchhccvofrvsfs
+2	abggbbunequrer
+3	zaffaatmdptqdq
+4	yzeezzslcospcp
+5	xyddyyrkbnrobo
+6	wxccxxqjamqnan
+7	vwbbwwpizlpmzm
+8	uvaavvohykolyl
+9	tuzzuungxjnkxk
+10	styyttmfwimjwj
+11	rsxxsslevhlivi
+12	qrwwrrkdugkhuh
+13	pqvvqqjctfjgtg
+14	opuuppibseifsf
+15	nottoohardhere
+16	mnssnngzqcgdqd
+17	lmrrmmfypbfcpc
+18	klqqllexoaebob
+19	jkppkkdwnzdana
+20	ijoojjcvmyczmz
+21	hinniibulxbyly
+22	ghmmhhatkwaxkx
+23	fgllggzsjvzwjw
+24	efkkffyriuyviv
+25	dejjeexqhtxuhu
```

 Everything looks like garbage except the **ROT15** one being `nottoohardhere`. This is indeed the password for `flag00`. All we need to do is to use `getflag` now!

```shell
  $> su flag00
  Password: nottoohardhere
  $> getflag
  Check flag.Here is your token : x24ti5gi3x0ol2eh4esiuxias
```

So, `x24ti5gi3x0ol2eh4esiuxias` is the flag for this level.

## Ressources

- [Cipher identifier](https://www.dcode.fr/cipher-identifier)
- [Caesar cipher decoder](https://www.dcode.fr/caesar-cipher)
