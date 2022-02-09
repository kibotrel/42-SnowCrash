# 42-SnowCrash

This project is an introduction to information security. The goal is to find and exploit vulnerabilities throughout the different levels.

We're given a vulnerable ISO on which we need to find **14 flags**. The process is simple: we connect as `levelXX` and we need to find a way to connect as `flagXX` and execute `getflag` or execute is as `flagXX` directly to move onto the next level.

## Breakdown

| Level | Ressources | Exploit |
| :-: | :-: | :-: |
| [00](./level00/Ressources/README.md) | [Caesar cipher](https://en.wikipedia.org/wiki/Caesar_cipher) | Reverse Simple Cipher |
| [01](./level01/Ressources/README.md) | [Unix user format](https://www.cyberciti.biz/faq/understanding-etcpasswd-file-format/) | [John the Ripper](https://en.wikipedia.org/wiki/John_the_Ripper) |
| [02](./level02/Ressources/README.md) | [scp](https://linux.die.net/man/1/scp) \| [Wireshark](https://www.wireshark.org/) \| [PCAP format](https://www.reviversoft.com/en/file-extensions/pcap) \| [ASCII Table](https://www.asciitable.com/) | [Packet Sniffing](https://en.wikipedia.org/wiki/Packet_analyzer) |
| [03](./level03/Ressources/README.md) | [ltrace](https://man7.org/linux/man-pages/man1/ltrace.1.html) \| [system](https://man7.org/linux/man-pages/man3/system.3.html) \| [$PATH](https://medium.com/@jalendport/what-exactly-is-your-shell-path-2f076f02deb4) | [Privileges escalation](https://en.wikipedia.org/wiki/Privilege_escalation) |
| [04](./level04/Ressources/README.md) | [URL escaping](https://www.w3schools.com/tags/ref_urlencode.ASP) | [Shell injection](https://matklad.github.io/2021/07/30/shell-injection.html) |
| [05](./level05/Ressources/README.md) | [cron](https://en.wikipedia.org/wiki/Cron) \| [UNIX mail system](https://www3.physnet.uni-hamburg.de/physnet/Tru64-Unix/HTML/APS2SCTE/DOCU_005.HTM) | [Privileges escalation](https://en.wikipedia.org/wiki/Privilege_escalation) |
| [06](./level06/Ressources/README.md) | [Regular Expressions](https://en.wikipedia.org/wiki/Regular_expression) \| [PHP curly syntax](https://www.php.net/manual/en/language.types.string.php#language.types.string.parsing.complex) | [Arbitrary code execution](https://en.wikipedia.org/wiki/Arbitrary_code_execution#:~:text=In%20computer%20security%2C%20arbitrary%20code,or%20in%20a%20target%20process.&text=A%20program%20that%20is%20designed,an%20arbitrary%20code%20execution%20exploit.) |
| [07](./level07/Ressources/README.md) | [Environment variables](https://en.wikipedia.org/wiki/Environment_variable#:~:text=An%20environment%20variable%20is%20a,in%20which%20a%20process%20runs.) | [Shell injection](https://matklad.github.io/2021/07/30/shell-injection.html) |
| [08](./level08/Ressources/README.md) | [Symbolic links](https://en.wikipedia.org/wiki/Symbolic_link) | [Privileges escalation](https://en.wikipedia.org/wiki/Privilege_escalation) |
| [09](./level09/Ressources/README.md) | [scp](https://linux.die.net/man/1/scp) | Reverse Simple Cipher |
| [10](./level10/Ressources/README.md) | [netcat](https://en.wikipedia.org/wiki/Netcat) | [Time to check to time of use](https://en.wikipedia.org/wiki/Time-of-check_to_time-of-use) |
| [11](./level11/Ressources/README.md) | [netcat](https://en.wikipedia.org/wiki/Netcat) | [Shell injection](https://matklad.github.io/2021/07/30/shell-injection.html)|
| [12](./level12/Ressources/README.md) | [`egrep`](https://linux.die.net/man/1/egrep) | [Arbitrary code execution](https://en.wikipedia.org/wiki/Arbitrary_code_execution#:~:text=In%20computer%20security%2C%20arbitrary%20code,or%20in%20a%20target%20process.&text=A%20program%20that%20is%20designed,an%20arbitrary%20code%20execution%20exploit.) |
| [13](./level13/Ressources/README.md) | [Shared object libraries](https://tldp.org/HOWTO/Program-Library-HOWTO/shared-libraries.html) \| [Position independant code](https://en.wikipedia.org/wiki/Position-independent_code#:~:text=In%20computing%2C%20position%2Dindependent%20code,regardless%20of%20its%20absolute%20address.&text=Position%2Dindependent%20code%20can%20be,any%20memory%20address%20without%20modification.) \| [Setuid bit](https://en.wikipedia.org/wiki/Setuid) \| [LD_PRELOAD](http://www.goldsborough.me/c/low-level/kernel/2016/08/29/16-48-53-the_-ld_preload-_trick/) | [Privileges escalation](https://en.wikipedia.org/wiki/Privilege_escalation) |
| [14](./level14/Ressources/README.md) | [gdb](https://www.cs.cmu.edu/~gilpin/tutorial/) \| [ptrace](https://man7.org/linux/man-pages/man2/ptrace.2.html) \| [x86 Assembly instruction list](https://en.wikipedia.org/wiki/X86_instruction_listings) | [Arbitrary code execution](https://en.wikipedia.org/wiki/Arbitrary_code_execution#:~:text=In%20computer%20security%2C%20arbitrary%20code,or%20in%20a%20target%20process.&text=A%20program%20that%20is%20designed,an%20arbitrary%20code%20execution%20exploit.) |
