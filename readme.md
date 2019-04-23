### 使用nodemon检测文件变化，自动重启node
### 使用cross-env设置环境变量，兼容mac linux 和 windows

### 建立www.js作为服务端文件
###  app.js //业务与服务抽离

app.js
作为接口业务层

为何将router和controller分开

一个处理路由一个处理数据

路由和API

API：前后端、不同端之间对接的术语
url(路由) `/api/hetlist` get,输入，输出

路由：
API的一部分
后端系统的模块
处理URL


sql优化，尽量避免*查询，

### 主要文件结构

bin目录下的wwww.js作为服务器端文件,是node server的启动文件

app.js作为业务层文件，主要用来处理服务器端请求，对请求头，设置返回格式，cookie的处理，已经调用redis服务用来存储session

router文件夹用来做路由的处理，封装API接口，针对不同的path，请求方式调用不同的数据接口，


controller层用来为router提供方法对数据库层的crud操作，每个方法内部注入参数，封装sql语句，


model层，为router层提供返回值模板，设置返回data，code，message等

db作为数据库连接池模块，包含mysql，redis的启动，以及为controller层提供统一执行sql的函数

conf层为db提供数据库连接池配置，包含ip，端口，密码等，还可以针对不同的运行环境，连接不同的数据库

logs用来存储各种日志，访问日志，错误日志，事件日志

utils层提供各种工具，加解密，日志




###  Cookie
存储在浏览器里的一段字符串，最大5kb
跨域不共享
储存结构化数据
每次发送http请求，会将域的cookie一起发给server
server端可以修改cookie的值返回给浏览器
浏览器中js也可以通过js修改cookie，可以限制


js操作cookie，浏览器查看cookie
server端进行cookie验证

###  Session
目前session是js变量，放在nodejs进程中
暴露太多用户信息

进程内存有限，访问量过大？

正式线上运行是多进程，进程之间内存无法共享

###  Redis
web server最常用的缓存数据库，数据存放在内存中，读写快
将web server和redis拆分两个单独服务
双方都是独立的，都是可扩展的，可将session存入redis中，不占用node的进程内存

#### 为什么session适合用redis？

1.session访问频繁，对性能要求极高

2.session可以不考虑断电丢失的问题

3.session的数据量不会很大


####   为何网站数据不适合用redis
操作频率不是太高，相比于session操作
断电不能丢失，必须保留
数据量太大，内存成本太高


redis-cli.exe -h 127.0.0.1 -p 6379


###  前后端联调
需要nginx做代理，使得和服务器端同域
nginx可以作为静态服务，反向代理


### 日志
1.访问日志 access日志
2.自定义日志，（包括自定义事件，错误记录等）



### stream
从流中读写文件，给文件添加内容




