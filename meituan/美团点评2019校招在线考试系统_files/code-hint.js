// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
    if (typeof exports == "object" && typeof module == "object") // CommonJS
        mod(require("../../lib/codemirror"));
    else if (typeof define == "function" && define.amd) // AMD
        define(["../../lib/codemirror"], mod);
    else // Plain browser env
        mod(CodeMirror);
})(function(CodeMirror) {
    var Pos = CodeMirror.Pos;

    function forEach(arr, f) {
        var keyword = arr.keyword;
        var header = arr.header;
        var func = arr.func;
        if(keyword!=undefined){
            keyword = keyword.split(";");
            for (var i = 0, e = keyword.length; i < e; ++i) f(keyword[i]+">keyword");
        }
        if(header!=undefined){
            header = header.split(";");
            for (var i = 0, e = header.length; i < e; ++i) f(header[i]+">header");
        }
        if(func!=undefined){
            func = func.split(";");
            for (var i = 0, e = func.length; i < e; ++i) f(func[i]);
        }
    }

    function arrayContains(arr, item) {
        if (!Array.prototype.indexOf) {
            var i = arr.length;
            while (i--) {
                if (arr[i] === item) {
                    return true;
                }
            }
            return false;
        }
        return arr.indexOf(item) != -1;
    }

    function scriptHint(editor, keywords, getToken, options) {
        // Find the token at the cursor
        var cur = editor.getCursor(), token = getToken(editor, cur);
        if (/\b(?:string|comment)\b/.test(token.type)) return;
        token.state = CodeMirror.innerMode(editor.getMode(), token.state).state;

        // If it's not a 'word-style' token, ignore the token.
        /*if (!/^[\w$_]*$/.test(token.string)) {
            token = {start: cur.ch, end: cur.ch, string: "", state: token.state,
                type: token.string == "." ? "property" : null};
        } */
        if (token.string==".") {
            token = {start: cur.ch, end: cur.ch, string: "", state: token.state,
                type: token.string == "." ? "property" : null};
        } else if (token.end > cur.ch) {
            token.end = cur.ch;
            token.string = token.string.slice(0, cur.ch - token.start);
        }

        var tprop = token;
        // If it is a property, find out what it is a property of.
        while (tprop.type == "property") {
            tprop = getToken(editor, Pos(cur.line, tprop.start));
            if (tprop.string != ".") return;
            //tprop = getToken(editor, Pos(cur.line, tprop.start));
            if (!context) var context = [];
            //context.push(tprop);
        }
        return {list: getCompletions(token, context, keywords, options),
            from: Pos(cur.line, token.start),
            to: Pos(cur.line, token.end)};
    }

    function javascriptHint(editor, options) {
        var lang = $("#lang").attr("selectValue");
        if(lang!=""){
            var keyWords;
            if(lang=="0" || lang=="1" || lang=="13" || lang=="14"){ keyWords= codeKeyWords.xcsrc; }
            if(lang=="3"){ keyWords= codeKeyWords.xjava; }
            if(lang=="4"){ keyWords= codeKeyWords.xruby; }
            if(lang=="5"){ keyWords= codeKeyWords.xbash; }
            if(lang=="6"){ keyWords= codeKeyWords.xpython; }
            if(lang=="7"){ keyWords= codeKeyWords.xphp; }
            if(lang=="9"){ keyWords= codeKeyWords.xcsharp; }
            if(lang=="10"){ keyWords= codeKeyWords.xobjc; }
            if(lang=="15"){ keyWords= codeKeyWords.xlua; }
            if(lang=="17"){ keyWords= codeKeyWords.xgo; }
            if(lang=="18"){ keyWords= codeKeyWords.xjavascript; }
            if(lang=="19"){ keyWords= codeKeyWords.xnodejs; }
            if(lang=="20"){
                if($("#forWeb .sel").attr("id")=="fhtml"){ keyWords= codeKeyWords.xhtml; }
                if($("#forWeb .sel").attr("id")=="fcss"){ keyWords= codeKeyWords.xcss; }
                if($("#forWeb .sel").attr("id")=="fjs"){ keyWords= codeKeyWords.xjs; }
            }

            return scriptHint(editor, keyWords,
                function (e, cur) {return e.getTokenAt(cur);},
                options);
        }else{
            return scriptHint(editor, coffeescriptKeywords,
                function (e, cur) {return e.getTokenAt(cur);},
                options);
        }
    };
    CodeMirror.registerHelper("hint", "javascript", javascriptHint);

    var codeKeyWords = {
        xcsrc: {
            keyword: "main;include;define;std;break;case;continue;default;do;else;for;goto;if;_Pragma;return;switch;while;catch;operator;try;throw;using;asm;__asm__;auto;bool;_Bool;char;_Complex;double;enum;float;_Imaginary;int;long;short;signed;struct;typedef;union;unsigned;void;class;wchar_t;template;char16_t;char32_t;const;extern;register;restrict;static;volatile;inline;private;protected;public;friend;explicit;virtual;export;mutable;typename;constexpr;new;delete;alignas;alignof;decltype;noexcept;thread_local;and;and_eq;bitand;bitor;compl;not;not_eq;or;or_eq;typeid;xor;xor_eqconst_cast;dynamic_cast;reinterpret_cast;static_cast;sizeof;namespace;NULL;true;false;TRUE;FALSE;nullptr",
            header: "cstdlib;csignal;cstdarg;typeinfo;bitset;functional;utility;ctime;cstddef;new;memory;climits;cfloat;limits;exception;stdexcept;cassert;cerrno;cctype;cwctype;cstring;cwchar;string;vector;deque;list;set;map;stack;queue;algorithm;iterator;cmath;complex;valarray;numeric;iosfwd;ios;istream;ostream;iostream;fstream;sstream;iomanip;streambuf;cstdio;locale;clocale",
            func: "isascii(int c)>int;isdigit(int c)>int;isspace(int c)>int;isupper(int c)>int;isxdigit (int c)>int;gcvt(double number, size_t ndigits, char *buf)>char*;toascii(int c)>int;tolower(int c)>int;toupper(int c)>int;getpagesize(void)>size_t;mmap(void *start, size_t length, int prot, int flags, int fd, off_t offsize)>void*;munmap(void *start, size_t length)>int;asctime(const struct tm * timeptr)>char*;ctime(const time_t *timep)>char*;gettimeofday (struct timeval * tv, struct timezone * tz)>int;tm *gmtime(const time_t *timep)>struct;tm *localtime(const time_t * timep)>struct;mktime(strcut tm * timeptr)>time_t;settimeofday(const struct timeval *tv, const struct timezone *tz)>int;time(time_t *t)>time_t;index(const char *s, int c)>char*;memccpy(void *dest, const void * src, int c, size_t n)>void*;memchr(const void *s, char c, size_t n)>void*;memcmp (const void *s1, const void *s2, size_t n)>int;rindex(const char *s, int c)>char*;strcasecmp (const char *s1, const char *s2)>int;strcpy(char *dest, const char *src)>char*;strdup(const char *s)>char*;strncasecmp(const char *s1, const char *s2, size_t n)>int;strtok(char *s, const char *delim)>char*;abs (int j)>int;asin (double x)>double;atan(double x)>double;atan2(double y, double x)>double;endgrent(void)>void;endpwent(void)>void;endutent(void)>void;getgrent(FILE * stream)>struct group*;fgetpwent(FILE * stream)>struct passwd*;getegid(void)>gid_t;geteuid(void)>uid_t;getgid(void)>gid_t;getgrent(void)>struct group*;getgrgid(gid_t gid)>struct group*;getgrnam(const char * name)>struct group*;getgroups(int size, gid_t list[])>int;getpw(uid_t uid, char *buf)>int;getpwent(void)>struct passwd*;getpwnam(const char * name)>struct passwd*;getpwuid(uid_t uid)>struct passwd*;getuid(void)>uid_t;getutent(void)>struct utmp*;getutid(strcut utmp *ut)>struct utmp*;getutline(struct utmp *ut)>struct utmp*;initgroups(const char *user, gid_t group)>int;pututline(struct utmp *ut)>void;seteuid(uid_t euid)>int;setfsgid(uid_t fsgid)>int;setfsuid(uid_t fsuid)>int;setgid(gid_t gid)>int;setgrent(void)>void;setgroups(size_t size, const gid_t * list)>int;setpwent(void)>void;setregid(gid_t rgid, gid_t egid)>int;setreuid(uid_t ruid, uid_t euid)>int;setuid(uid_t uid)>int;setutent(void)>void;utmpname(const char * file)>void;close(int fd)>int;creat(const char * pathname, mode_tmode)>int;dup (int oldfd)>int;dup2(int odlfd, int newfd)>int;flock(int fd, int operation)>int;fsync(int fd)>int;lseek(int fildes, off_t offset, int whence)>off_t;mkstemp(char * template)>int;read(int fd, void * buf, size_t count)>ssize_t;sync(void)>int;write (int fd, const void * buf, size_t count)>ssize_t;clearerr(FILE * stream)>void;fclose(FILE * stream)>int;fdopen(int fildes, const char * mode)>FILE*;feof(FILE * stream)>int;fflush(FILE* stream)>int;fgetc(FILE * stream)>int;fgets(char * s, int size, FILE * stream)>har*;fileno(FILE * stream)>int;fputc(int c, FILE * stream)>int;fputs(const char * s, FILE * stream)>int;fread(void * ptr, size_t size, size_t nmemb, FILE * stream)>size_t;freopen(const char * path, const char * mode, FILE * stream)>FILE*;fseek(FILE * stream, long offset, int whence)>int;ftell(FILE * stream)>long;fwrite(const void * ptr, size_t size, size_t nmemb, FILE * stream)>size_t;mktemp(char * template)>char*;setbuffer(FILE * stream, char * buf, size_t size)>void;setlinebuf(FILE * stream)>void;atexit (void (*function) (void))>int;execl(const char * path, const char * arg, ...)>int;execlp(const char * file, const char * arg, ...)>int;execv (const char * path, char * const argv[])>int;execve(const char * filename, char * const argv[], char * const envp[])>int;execvp(const char *file, char * const argv [])>int;exit(int status)>void;_exit(int status)>void;getpgid(pid_t pid)>pid_t;getpgrp(void)>pid_t;getpid(void)>pid_t;getppid(void)>pid_t;getpriority(int which, int who)>int;nice(int inc)>int;on_exit(void (* function) (int void*), void *arg)>int;setpgid(pid_t pid, pid_t pgid)>int;setpgrp(void)>int;setpriority(int which, int who, int prio)>int;system(const char * string)>int;wait (int * status)>pid_t;waitpid(pid_t pid, int * status, int options)>pid_t;fprintf(FILE * stream, const char * format, ...)>int;fscanf(FILE * stream, const char *format, ...)>int;scanf(const char * format, ...)>int;vfprintf(FILE *stream, const char * format, va_list ap)>int;vfscanf(FILE * stream, const char * format, va_list ap)>int;vprintf(const char * format, va_list ap)>int;vscanf(const char * format, va_list ap)>int;vsprintf(char * str, const char * format, va_list ap)>int;vsscanf(const char * str, const char * format, va_list ap)>int;access(const char * pathname, int mode)>int;alphasort(const struct dirent **a, const struct dirent **b)>int;chdir(const char * path)>int;chmod(const char * path, mode_t mode)>int;chown(const char * path, uid_t owner, gid_t group)>int;chroot(const char * path)>int;closedir(DIR *dir)>int;fchdir(int fd)>int;fchmod(int fildes, mode_t mode)>int;fchown(int fd, uid_t owner, gid_t group)>int;fstat(int fildes, struct stat *buf)>int;ftruncate(int fd, off_t length)>int;getcwd(char * buf, size_t size)>char*;link (const char * oldpath, const char * newpath)>int;lstat (const char * file_name, struct stat * buf)>int;opendir(const char * name)>DIR*;readdir(DIR * dir)>struct dirent*;readlink(const char * path, char * buf, size_t bufsiz)>int;rewinddir(DIR *dir)>void;seekdir(DIR * dir, off_t offset)>void;stat(const char * file_name, struct stat *buf)>int;symlink(const char * oldpath, const char * newpath)>int;telldir(DIR *dir)>off_t;truncate(const char * path, off_t length)>int;umask(mode_t mask)>mode_t;unlink(const char * pathname)>int;utime(const char * filename, struct utimbuf * buf)>int;utimes(char * filename, struct timeval *tvp)>int;alarm(unsigned int seconds)>unsigned int;kill(pid_t pid, int sig)>int;pause(void)>int;sigaddset(sigset_t *set, int signum)>int;sigdelset(sigset_t * set, int signum)>int;sigemptyset(sigset_t *set)>int;sigfillset(sigset_t * set)>int;sigismember(const sigset_t *set, int signum)>int;(*signal(int signum, void(* handler)(int)))(int)>void;sigpending(sigset_t *set)>int;sigprocmask(int how, const sigset_t *set, sigset_t * oldset)>int;sleep(unsigned int seconds)>unsigned int;ferror(FILE *stream)>int;strerror(int errnum)>char*;mkfifo(const char * pathname, mode_t mode)>int;pclose(FILE * stream)>int;popen(const char * command, const char * type)>FILE*;accept(int s, struct sockaddr * addr, int * addrlen)>int;bind(int sockfd, struct sockaddr * my_addr, int addrlen)>int;connect(int sockfd, struct sockaddr * serv_addr, int addrlen)>int;endprotoent(void)>void;endservent(void)>void;getsockopt(int s, int level, int optname, void* optval, socklen_t* optlen)>int;htonl(unsigned long int hostlong)>unsigned long int;htons(unsigned short int hostshort)>unsigned short int;inet_addr(const char *cp)>unsigned long int;inet_aton(const char * cp, struct in_addr *inp)>int;inet_ntoa(struct in_addr in)>char*;listen(int s, int backlog)>int;ntohl(unsigned long int netlong)>unsigned long int;ntohs(unsigned short int netshort)>unsigned short int;recv(int s, void *buf, int len, unsigned int flags)>int;recvfrom(int s, void *buf, int len, unsigned int flags, struct sockaddr *from,int *fromlen)>int;recvmsg(int s, struct msghdr *msg, unsigned int flags)>int;send(int s, const void * msg, int len, unsigned int falgs)>int;sendmsg(int s, const strcut msghdr *msg, unsigned int flags)>int;sendto(int s, const void * msg, int len, unsigned int flags, const struct&nbsp>sockaddr * to, int tolen);setprotoent (int stayopen)>void;setsockopt(int s, int level, int optname, const void * optval, ,socklen_toptlen)>int;shutdown(int s, int how)>int;socket(int domain, int type, int protocol)>int;getenv(const char *name)>char*;putenv(const char * string)>int;getopt(int argc, char * const argv[], const char * optstring)>int;isatty(int desc)>int;select(int n, fd_set * readfds, fd_set * writefds, fd_set * exceptfds, struct&nbsp>timeval * timeout);ttyname(int desc)>char*"
        },
        xjava: {
            keyword: "abstract;assert;boolean;break;byte;case;catch;char;class;const;continue;default;do;double;else;enum;extends;final;finally;float;for;goto;if;implements;import;instanceof;int;interface;long;native;new;null;package;private;protected;public;return;short;static;strictfp;super;switch;synchronized;this;throw;throws;transient;try;void;volatile;while"
        },
        xpython: {
            keyword: "and;as;assert;break;class;continue;def;del;elif;else;except;exec;finally;for;from;global;if;import;in;is;lambda;not;or;pass;print;raise;return;try;while;with;yield"
        },
        xjs: {
            keyword: "break;case;catch;continue;default;delete;do;else;finally;for;function;if;in;instanceof;new;return;switch;this;throw;try;typeof;var;void;while;with;abstract;boolean;byte;char;class;const;debugger;double;enum;export;extends;final;float;goto;implements;import;int;interface;long;native;package;private;protected;public;short;static;super;synchronized;throws;transient;volatile"
        },
        xcsharp: {
            keyword: "abstract;as;base;bool;break;byte;case;catch;char;checked;class;const;continue;decimal;default;delegate;do;double;else;enum;ecent;explicit;extern;false;finally;fixed;float;for;foreach;get;goto;if;implicit;in;int;interface;internal;is;lock;long;namespace;new;null;object;out;override;partial;private;protected;public;readonly;ref;return;sbyte;sealed;set;short;sizeof;stackalloc;static;struct;switch;this;throw;true;try;typeof;uint;ulong;unchecked;unsafe;ushort;using;value;virtual;volatile;volatile;void;where;while;yield"
        },
        xphp: {
            keyword: "__halt_compiler;abstract;and;array;as;break;callable;case;catch;class;clone;const;continue;declare;default;die;do;echo;else;elseif;empty;enddeclare;endfor;endforeach;endif;endswitch;endwhile;eval;exit;extends;final;finally;for;foreach;function;global;goto;if;implements;include;include_once;instanceof;insteadof;interface;isset;list;namespace;new;or;print;private;protected;public;require;require_once;return;static;switch;throw;trait;try;unset;use;var;while;xor;yield"
        },
        xruby:{
            keyword: "module;class;def;undef;defined;if;then;else;elsif;case;when;unless;for;in;while;until;next;break;do;redo;retry;yield;not;and;or;true;false;nil;rescue;ensure;super;self;begin;end;BEGIN;END;__FILE__;__LINE__;return;alias"
        },
        xbash:{
            keyword: "alias;bg;bind;break;builtin;case;cd;command;continue;declare;dirs;disown;do;done;echo;elif;else;enable;esac;eval;exec;exit;export;fc;fg;fi;for;function;getops;hash;help;history;if;in;jobs;kill;let;local;logout;popd;pushd;pwd;read;readonly;return;select;set;shift;suspend;test;then;time;times;trap;type;typeset;ulimit;umask;unalias;unset;until;wait;while"
        },
        xobjc:{
            keyword: "@interface;@implementation;@protocol;@optional;@required;@end;@encode;@class;@synthesize;nil;self;Super;NSNull;new;alloc"
        },
        xlua:{
            keyword: "and;break;do;else;elseif;end;false;for;function;if;in;local;nil;not;or;repeat;return;then;true;until;while"
        },
        xgo:{
            keyword: "break;default;func;interface;select;case;defer;go;map;struct;chan;else;goto;package;switch;const;fallthrough;if;range;type;continue;for;import;return;var"
        },
        xjavascript:{
            keyword: "abstract;arguments;boolean;break;byte;case;catch;char;class*;const;continue;debugger;default;delete;do;double;else;enum*;eval;export*;extends*;false;final;finally;float;for;function;goto;if;implements;import*;in;instanceof;int;interface;let;long;native;new;null;package;private;protected;public;return;short;static;super*;switch;synchronized;this;throw;throws;transient;true;try;typeof;var;void;volatile;while;with;yield;Array;Date;eval;function;hasOwnProperty;Infinity;isFinite;isNaN;isPrototypeOf;length;Math;NaN;name;Number;Object;prototype;String;toString;undefined;valueOf;alert;all;anchor;anchors;area;assign;blur;button;checkbox;clearInterval;clearTimeout;clientInformation;close;closed;confirm;constructor;crypto;decodeURI;decodeURIComponent;defaultStatus;document;element;elements;embed;embeds;encodeURI;encodeURIComponent;escape;event;fileUpload;focus;form;forms;frame;innerHeight;innerWidth;layer;layers;link;location;mimeTypes;navigate;navigator;frames;frameRate;hidden;history;image;images;offscreenBuffering;open;opener;option;outerHeight;outerWidth;packages;pageXOffset;pageYOffset;parent;parseFloat;parseInt;password;pkcs11;plugin;prompt;propertyIsEnum;radio;reset;screenX;screenY;scroll;secure;select;self;setInterval;setTimeout;status;submit;taint;text;textarea;top;unescape;untaint;window"
        },
        xnodejs:{
            keyword: "abstract;arguments;boolean;break;byte;case;catch;char;class*;const;continue;debugger;default;delete;do;double;else;enum*;eval;export*;extends*;false;final;finally;float;for;function;goto;if;implements;import*;in;instanceof;int;interface;let;long;native;new;null;package;private;protected;public;return;short;static;super*;switch;synchronized;this;throw;throws;transient;true;try;typeof;var;void;volatile;while;with;yield;Array;Date;eval;function;hasOwnProperty;Infinity;isFinite;isNaN;isPrototypeOf;length;Math;NaN;name;Number;Object;prototype;String;toString;undefined;valueOf;alert;all;anchor;anchors;area;assign;blur;button;checkbox;clearInterval;clearTimeout;clientInformation;close;closed;confirm;constructor;crypto;decodeURI;decodeURIComponent;defaultStatus;document;element;elements;embed;embeds;encodeURI;encodeURIComponent;escape;event;fileUpload;focus;form;forms;frame;innerHeight;innerWidth;layer;layers;link;location;mimeTypes;navigate;navigator;frames;frameRate;hidden;history;image;images;offscreenBuffering;open;opener;option;outerHeight;outerWidth;packages;pageXOffset;pageYOffset;parent;parseFloat;parseInt;password;pkcs11;plugin;prompt;propertyIsEnum;radio;reset;screenX;screenY;scroll;secure;select;self;setInterval;setTimeout;status;submit;taint;text;textarea;top;unescape;untaint;window"
        },
        xhtml:{
            keyword: "a;abbr;acronym;address;applet;area;alt;media;shape;article;aside;audio;src;crossorigin;preload;autoplay;loop;controls;b;base;basefont;bdi;bdo;big;blockquote;body;br;button;autofocus;disabled;formenctype;formmethod;formnovalidate;formtarget;canvas;caption;center;cite;code;col;colgroup;type;label;disabled;checked;data;datagrid;datalist;dd;del;details;dfn;dir;div;dl;dt;em;embed;eventsource;fieldset;figcaption;figure;font;footer;form;autocomplete;enctype;method;novalidate;frame;frameset;h1;h2;h3;h4;h5;h6;head;header;hgroup;hr;html;i;iframe;img;input;ins;kbd;keygen;label;legend;li;link;map;mark;menu;meter;nav;noframes;noscript;object;ol;optgroup;option;output;p;param;pre;progress;rt;readonly;ruby;s;samp;script;section;select;small;source;span;strike;strong;style;sub;summary;sup;table;tbody;td;tfoot;th;thead;time;tr;track;tt;u;ul;video;crossorigin;preload;autoplay;mediagroup;muted;wbr"
        },
        xcss:{
            keyword: "align-content;align-items;align-self;all;animation;animation-delay;animation-direction;animation-duration;animation-fill-mode;animation-iteration-count;animation-name;animation-play-state;animation-timing-function;appearance;backface-visibility;background;background-attachment;background-blend-mode;background-clip;background-color;background-image;background-origin;background-position;background-repeat;background-size;border;border-bottom;border-bottom-color;border-bottom-left-radius ;border-bottom-right-radius;border-bottom-style;border-bottom-width;border-collapse;border-color;border-image ;border-image-outset ;border-image-repeat ;border-image-slice ;border-image-source ;border-image-width;border-left;border-left-color;border-left-style;border-left-width;border-radius;border-right;border-right-color;border-right-style;border-right-width;border-spacing;border-style;border-top;border-top-color;border-top-left-radius ;border-top-right-radius;border-top-style;border-top-width;border-width;bottom;box-align;box-direction;box-flex;box-flex-group;box-lines;box-ordinal-group;box-orient;box-pack;box-shadow;box-sizing;caption-side;clear;clip;color;column-count;column-fill;column-gap;column-rule;column-rule-color;column-rule-style;column-rule-width;column-span;column-width;columns;content;counter-increment;counter-reset;cursor;direction;display;empty-cells;filter;flex;flex-basis ;flex-direction ;flex-flow ;flex-grow ;flex-shrink ;flex-wrap;float;font;@font-face;font-family;font-size;font-size-adjust ;font-stretch;font-style;font-variant;font-weight;grid-columns;grid-rows;hanging-punctuation;height;icon;justify-content ;@keyframes;left;letter-spacing;line-height;list-style;list-style-image;list-style-position;list-style-type;margin;margin-bottom;margin-left;margin-right;margin-top;max-height;max-width;@media;min-height;min-width;nav-down;nav-index;nav-left;nav-right;nav-up;opacity;order;outline;outline-color;outline-offset;outline-style;outline-width;overflow;overflow-x;overflow-y;padding;padding-bottom;padding-left;padding-right;padding-top;page-break-after;page-break-before;page-break-inside;perspective;perspective-origin;position;punctuation-trim;quotes;resize;right;rotation;tab-size;table-layout;target;target-name;target-new;target-position;text-align;text-align-last;text-decoration;text-decoration-color ;text-decoration-line ;text-decoration-style;text-indent;text-justify;text-outline;text-overflow;text-shadow;text-transform;text-wrap;top;transform;transform-origin;transform-style;transition;transition-delay ;transition-duration;transition-property;transition-timing-function;unicode-bidi;vertical-align;visibility;white-space;width;word-break;word-spacing;word-wrap;z-index"
        },
    };

    var stringProps = ("charAt charCodeAt indexOf lastIndexOf substring substr slice trim trimLeft trimRight toUpperCase toLowerCase split concat match replace search").split(" ");
    var arrayProps = ("length concat join splice push pop shift unshift slice reverse sort indexOf lastIndexOf every some filter forEach map reduce reduceRight ").split(" ");
    var funcProps = "prototype apply call bind".split(" ");
    var javascriptKeywords = ("abstract arguments boolean break byte case catch char class const continue debugger default delete do double else enum eval export extends false final finally float for function goto if implements import in instanceof int interface let long native new null package private protected public return short static super switch synchronized this throw throws transient true try typeof var void volatile while with yield Array Date eval function hasOwnProperty Infinity isFinite isNaN isPrototypeOf length Math NaN name Number Object prototype String toString undefined valueOf alert all anchor anchors area assign blur button checkbox clearInterval clearTimeout clientInformation close closed confirm constructor crypto decodeURI decodeURIComponent defaultStatus document element elements embed embeds encodeURI encodeURIComponent escape event fileUpload focus form forms frame innerHeight innerWidth layer layers link location mimeTypes navigate navigator frames frameRate hidden history image images offscreenBuffering open opener option outerHeight outerWidth packages pageXOffset pageYOffset parent parseFloat parseInt password pkcs11 plugin prompt propertyIsEnum radio reset screenX screenY scroll secure select self setInterval setTimeout status submit taint text textarea top unescape untaint window onblur onclick onerror onfocus onkeydown onkeypress onkeyup onmouseover onload onmouseup onmousedown onsubmit").split(" ");
    var coffeescriptKeywords = ("and break catch class continue delete do else extends false finally for if in instanceof isnt new no not null of off on or return switch then throw true try typeof until void while with yes").split(" ");

    function forAllProps(obj, callback) {
        if (!Object.getOwnPropertyNames || !Object.getPrototypeOf) {
            for (var name in obj) callback(name)
        } else {
            for (var o = obj; o; o = Object.getPrototypeOf(o))
                Object.getOwnPropertyNames(o).forEach(callback)
        }
    }

    function getCompletions(token, context, keywords, options) {
        var found = [], start = token.string, global = options && options.globalScope || window;
        function maybeAdd(str) {
            if (str.lastIndexOf(start, 0) == 0 && !arrayContains(found, str)) found.push(str);
        }
        function gatherCompletions(obj) {
            if (typeof obj == "string") forEach(stringProps, maybeAdd);
            else if (obj instanceof Array) forEach(arrayProps, maybeAdd);
            else if (obj instanceof Function) forEach(funcProps, maybeAdd);
            forAllProps(obj, maybeAdd)
        }

        if (context && context.length) {
            // If this is a property, see if it belongs to some object we can
            // find in the current environment.
            var obj = context.pop(), base;
            if (obj.type && obj.type.indexOf("variable") === 0) {
                if (options && options.additionalContext)
                    base = options.additionalContext[obj.string];
                if (!options || options.useGlobalScope !== false)
                    base = base || global[obj.string];
            } else if (obj.type == "string") {
                base = "";
            } else if (obj.type == "atom") {
                base = 1;
            } else if (obj.type == "function") {
                if (global.jQuery != null && (obj.string == '$' || obj.string == 'jQuery') &&
                    (typeof global.jQuery == 'function'))
                    base = global.jQuery();
                else if (global._ != null && (obj.string == '_') && (typeof global._ == 'function'))
                    base = global._();
            }
            while (base != null && context.length)
                base = base[context.pop().string];
            if (base != null) gatherCompletions(base);
        } else {
            // If not, just look in the global object and any local scope
            // (reading into JS mode internals to get at the local and global variables)
            for (var v = token.state.localVars; v; v = v.next) maybeAdd(v.name);
          /*for (var v = token.state.globalVars; v; v = v.next) maybeAdd(v.name);
           if (!options || options.useGlobalScope !== false)
           gatherCompletions(global);*/
            forEach(keywords, maybeAdd);
        }
        return found;
    }
});
