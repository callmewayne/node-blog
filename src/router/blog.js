const { getList,getDetail,newBlog,updateBlog,delBlog} = require('../controller/blog')
const { SuccessModel,ErrorModel}  = require('../model/resModel')

//统一的登录验证函数
const loginCheck = (req)=>{
    if(!req.session.username){
        return Promise.resolve(
             new ErrorModel('尚未登录')
        )
    }
}

const handleBlogRouter = (req, res) => {
    const method = req.method
    const path = req.path
    const id =req.query.id
   
    //获取博客列表
    if (method === 'GET' && path === '/api/blog/list') {
        let author = req.query.author || ''
        let keyword = req.query.keyword || ''

        if(req.query.isadmin){
            const loginCheckResult = loginCheck(req)
            if(loginCheckResult){
                //未登录
                return loginCheckResult
            }
            author = req.session.username
        }
        let result = getList(author,keyword)
      return result.then(listData=>{
         console.log(listData)
            return new SuccessModel(listData)
        }).catch(err=>{
            console.log(err)
        })
    }

    //获取博客详情
    if (method === 'GET' && path === '/api/blog/detail') {
        let result = getDetail(id)
        return result.then(data=>{
            return new SuccessModel(data)
        })
      
    }

    //新建一篇博文
    if (method === 'POST' && path === '/api/blog/new') {
          const blogData = req.body
          const loginCheckResult = loginCheck(req)
          if(loginCheckResult){
              //未登录
              return loginCheckResult
          }
          blogData.author = req.session.username || ""
          let result = newBlog(blogData)
          return result.then(data=>{
            return new SuccessModel(data)
        })
       // return new SuccessModel(data)
    }
    //更新一篇博文
    if (method === 'POST' && path === '/api/blog/update') {
        const loginCheckResult = loginCheck(req)
        if(loginCheckResult){
            //未登录
            return loginCheckResult
        }
        req.body.id = id
        let result = updateBlog(id,req.body)
       return result.then(val=>{
            if(val){
                return new  SuccessModel(result)
            }else{
                return new ErrorModel('更新博客失败')
            }
        })
      
      
    }
    //删除一篇博文
    if (method === 'POST' && path === '/api/blog/delete') {

        const loginCheckResult = loginCheck(req)
        if(loginCheckResult){
            //未登录
            return loginCheckResult
        }
        let author = req.session.username 
        let result = delBlog(id,author)
        return result.then(val=>{
            if(val){
                return new  SuccessModel(result)
            }else{
                return new ErrorModel('删除博客失败')
            }
        })
       
    }
}

module.exports = handleBlogRouter