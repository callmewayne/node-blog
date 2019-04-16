const { getList,getDetail,newBlog,updateBlog,delBlog} = require('../controller/blog')
const { SuccessModel,ErrorModel}  = require('../model/resModel')


const handleBlogRouter = (req, res) => {
    const method = req.method
    const path = req.path
    const id =req.query.id
   
    //获取博客列表
    if (method === 'GET' && path === '/api/blog/list') {
        let author = req.query.author || ''
        let keyword = req.query.keyword || ''
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
          let result = newBlog(blogData)
          return result.then(data=>{
            return new SuccessModel(data)
        })
       // return new SuccessModel(data)
    }
    //更新一篇博文
    if (method === 'POST' && path === '/api/blog/update') {
      
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
        let author = 'zhangsan' //req.body.author
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