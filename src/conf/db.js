const env = process.env.NODE_ENV  //环境参数

let MYSQL_CONF

if(env==='dev'){
    MYSQL_CONF = {
        host:'10.0.32.106',
        user:'root',
        password:'123456',
        port:'3306',
        database:'waynedata'
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
}

module.exports ={
    MYSQL_CONF
}
