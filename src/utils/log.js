const fs = require('fs')
const path = require('path')
//写日志
function writeLog(writeStream,log){
     writeStream.write(log+'\n') //关键代码
}
const createWriteStream = (fillname)=>{
    const fullFileName = path.join(__dirname,'../../','logs',fillname)
    const writeStream = fs.createWriteStream(fullFileName,{
        flags:'a'
    })

    return writeStream
}


//写入访问日志
const accessWriteStream = createWriteStream('access.log')
function access(log){
    writeLog(accessWriteStream,log)
}

//写入错误日志
const  errorWriteStream = createWriteStream('error.log')
function error(log){
    writeLog(errorWriteStream,log)
}
//写入事件log
//写入错误日志
const eventWriteStream = createWriteStream('event.log')
function event(log){
    writeLog(eventWriteStream,log)
}
module.exports = {
    access,
    error,
    event
}

