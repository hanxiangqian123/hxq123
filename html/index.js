var http = require('http');//引入http模块
var fs = require('fs'); //引入fs模块
var url = require('url');//引入url模块
var path = require('path');//引入path模块

//开启服务，监听8888端口
//端口号最好为6000以上
var data=null
var server = http.createServer(function(req,res){
  var realPath = path.join(__dirname, 'greeter.html');
  console.log(realPath)
  fs.readFile(realPath,function(err,data){
    console.log(err,data)
  
    if(err){
      //未找到文件
      res.writeHead(404,{
        'content-type':'text/plain'
      });
      res.write('404,页面不在');
      res.end();
    }else{
      data=data
    }
  })
    /*
        req用来接受客户端数据
        res用来向客户端发送服务器数据
    */

    console.log('有客户端连接');//创建连接成功显示在后台

    //一参是http请求状态，200连接成功
    //连接成功后向客户端写入头信息
    res.writeHeader(200,{
        'content-type' : 'text/html;charset="utf-8"'
    });

    res.write(data);//显示给客户端
    res.end();

}).listen(8888);

console.log('服务器开启成功');