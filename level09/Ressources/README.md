# Level 09

As `level09`, running `ls` gives us a binary called `level09` and a file named `token`.

```shell
  $> cat token 
  f4kmm6p|=pnDBDu{  
  $> ./level09
  You need to provied only one arg.
  $> ./level09 token
  tpmhr
  $> ./level09 aaaaa
  abcde
```

After some tests the binary seems to add to each byte its index. In order to reverse this we simply need to substract its index from each byte. Bellow is a simple **node.js** script that does it. 

```js
const { Buffer } = require('buffer')
const fs = require('fs')

try {
  const byteArray = []
  const buffer = Buffer.from(fs.readFileSync(process.argv[2], 'hex'), 'hex')

  for (let i = 0; i < buffer.length - 1; i++) {
    byteArray.push(buffer[i] - i)
  }

  console.log(Buffer.from(byteArray, 'hex').toString())
} catch (_) {
  console.log('You must specify a valid file to decipher.')
}
```

To explain a bit what's happening here, it loads a file content into a buffer, converting each character to its hexadecimal [codepoint](https://en.wikipedia.org/wiki/Code_point). After this, reversing the initial encoding is trivial and finaly we convert `byteArray`to a string before printing it.

Once again, we need to use `scp` to retrieve the file and decipher it.

```shell
  $> scp -P 4242 level09@192.168.1.73:token .
  $> node decipher.js token
  f3iji1ju5yuevaus41q1afiuq
```

Use this result to log as `flag09` and run `getflag` to finish this level.

```shell
  $> su flag09
  Password: f3iji1ju5yuevaus41q1afiuq
  $> getflag
  Check flag.Here is your token : s5cAJpM8ev6XHw998pRWG728z
```

So, `s5cAJpM8ev6XHw998pRWG728z` is the flag for this level.