const { loginCheck }  = require('../controller/user')
const { SuccessModel,ErrorModel}  = require('../model/resModel')

const handelUserRouter = (req, res) => {
    const method = req.method
    console.log(req)
    if(method ==='POST' && req.path ==='/api/user/login'){
        const {username,password}   = JSON.parse(req.body) 
        let result = loginCheck(username,password)
        return result.then(data=>{
            if(data.username){
                return new SuccessModel(data)
             }else{
                 return new ErrorModel('登陆失败')
             }
        })
      


    }
    
    if(method ==='GET' && req.path==='/api/user/login-test'){
        if(req.cookie.username){
            return new SuccessModel()
        }else{
            return new ErrorModel('尚未登录')

        }
    }
   


}

module.exports = handelUserRouter