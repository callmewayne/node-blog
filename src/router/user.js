const { loginCheck }  = require('../controller/user')
const { SuccessModel,ErrorModel}  = require('../model/resModel')
const {set } = require('../db/redis')
const handelUserRouter = (req, res) => {
    const method = req.method
    if(method ==='GET' && req.path ==='/api/user/login'){
        // const {username,password}   = JSON.parse(req.body) 
        const {username,password}   = req.query
        let result = loginCheck(username,password)
        return result.then(data=>{
            if(data.username){
   
                req.session.username = data.username
                req.session.realname = data.realname

                //同步redis
                set(req.sessionId,req.session)
                
                //httpOnly只允许后端修改cookie,expires设置过期时间
             //   res.setHeader('Set-Cookie',`username=${data.username}; path=/ ;httpOnly; expires=${getCookieExpires()}`)
                return  new SuccessModel({
                    session:req.session,

                })
             }else{
                 return new ErrorModel('登陆失败')
             }
        })
      


    }
    
    if(method ==='GET' && req.path==='/api/user/login-test'){
        if(req.session.username){
            return Promise.resolve(new SuccessModel()) 
        }else{
            return Promise.resolve(new ErrorModel('尚未登录')) 

        }
    }
   


}

module.exports = handelUserRouter