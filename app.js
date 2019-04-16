const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const querystring = require('querystring')

const getPostData = (req) => {
    let promise = new Promise((resolve, reject) => {
        if (req.method !== 'POST') {
            resolve({})
            return
        }
        if (req.headers['content-type'] !== 'application/json') {
            resolve({})
            return
        }

        let postData = ''
        req.on('data', chunk => {
            postData += chunk.toString()

        })
        req.on('end', () => {
            if (!postData) {
                resolve({})
                return
            }
            resolve(postData)
        })

    })
    return promise
}

const serverHandle = (req, res) => {
    //设置返回格式
    res.setHeader('Content-type', 'application/json')

    const url = req.url
    req.path = url.split('?')[0]

    req.query = querystring.parse(url.split('?')[1])
req.cookie = {}
    const cookieStr = req.headers.cookie || ''
    cookieStr.split(';').forEach(item => {
        if(!item){
            return
        }
        const arr = item.split('=')
        let key = arr[0]
        let value = arr[1]

        req.cookie[key] = value
    });

    console.log(req.cookie)
    //处理postData
    getPostData(req).then(postData => {
        req.body = postData

        //处理blog路由
        const blogResult = handleBlogRouter(req, res)
        if(blogResult){
            blogResult.then(blogData=>{
                    res.end(
                        JSON.stringify(blogData)
                    )
            })
            return
        }
      

        // const blogData = handleBlogRouter(req, res)

        const userResult= handleUserRouter(req, res)
        if (userResult) {
            userResult.then(userData=>{
                res.end(
                    JSON.stringify(userData)
                )
            })
            return
        }

        res.writeHead(404, {
            "Content-type": "text/plain"
        })
        res.write("404 Not Found\n")
        res.end()
    })

}
module.exports = serverHandle
//process.env.NODE_ENV