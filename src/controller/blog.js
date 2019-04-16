const { exec}  = require('../db/mysql')

const getList = (author,keyword)=>{
   //当author，keyword不存在时，where就会报错，所以要加 where 1=1
   let sql = `select * from blogs where 1=1 `
   if(author){
    sql+= `and author='${author}' `
   }
   if(keyword){
    sql+= `and title like '%${keyword}%' `
   }
    sql += `order by createtime desc`

     return exec(sql)
    // return [
    //     {
    //         id:1,
    //         title:'标题A',
    //         content:'内容A',
    //         author:'wayne',
    //         createTime:1554779934902
    //     },
    //     {
    //         id:2,
    //         title:'标题B',
    //         content:'内容b',
    //         author:'lisi',
    //         createTime:1554779958236
    //     },
    // ]
}


const getDetail = (id)=>{
    const sql = `select * from blogs where id='${id}'`
    return exec(sql).then(rows=>{
        return rows[0]
    })

    // return {
    //     id:1,
    //     title:'标题A',
    //     content:'内容A',
    //     author:'wayne',
    //     createTime:1554779934902
    // }
}

const newBlog = (blogData={})=>{
    blogData = JSON.parse(blogData)
//blogData是一个博客对象，包含title content 属性
const sql = `insert into blogs (title,content,createtime,author) 
values ('${blogData.title}','${blogData.content}',${Date.now()},'${blogData.author}')`
if(blogData.title){
    return exec(sql).then(insertData=>{
        if(insertData.insertId){
            return {
                id:insertData.insertId,
                title:blogData.title
            } 
        }
    })
}

// return {
//     id:3, //表示新建博客，插入到数据表里面的 id
//     blogData
// }
}

const updateBlog = (id,blogData={})=>{
    //id 就是要更新博客id
    //blogData 是一个博客对象，包含 title content 属性
    blogData = JSON.parse(blogData)
    const sql = `update blogs set title='${blogData.title}',content='${blogData.content}' 
    where id=${blogData.id}`
    return exec(sql).then(updateBlog=>{
        //影响的行数
        if(updateBlog.affectedRows>0){
            return true
        }else{
            return false
        }
       
    })
   
}

const delBlog = (id,author)=>{
    const sql =`delete from blogs where id='${id}' and author='${author}'`
    return exec(sql).then(deleteData=>{
        //影响的行数
        if(deleteData.affectedRows>0){
            return true
        }else{
            return false
        }
       
    })
  
    return true
}

module.exports = {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
}