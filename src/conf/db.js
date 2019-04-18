const env = process.env.NODE_ENV  //环境参数

let MYSQL_CONF
let REDIS_CONF
if(env==='dev'){
    MYSQL_CONF = {
        host:'10.0.32.106',
        user:'root',
        password:'123456',
        port:'3306',
        database:'waynedata'
    }

    REDIS_CONF = {
        port:6379,
        host:'127.0.0.1'
    }
}

if(env==='production'){
    MYSQL_CONF = {
        host:'10.0.32.106',
        user:'root',
        password:'123456',
        port:'3306',
        database:'waynedata'
    }
    REDIS_CONF = {
        port:6379,
        host:'127.0.0.1'
    }
}

module.exports ={
    MYSQL_CONF
}
