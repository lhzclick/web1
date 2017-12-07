var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
let mysql =require('mysql');
let dataJ ;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));  //配置公共静态文件

app.use('/', routes);
app.use('/users', users);
app.use('/v', express.static('views'));   //配置项目静态文件
//mysql创建连接
var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    port:'3306',
    database:'node'
})
//执行连接
connection.connect(function(err){
    if(err){
        console.log('[query]-:'+err);
    }else{
        console.log('conneting')
    }
})


//connection.end();
//查询
app.get('/info', function (req, res) {
    //执行查询
    let userGetSql = 'SELECT * FROM info';
    connection.query(userGetSql,function(err,result){
        if(err){
            console.log('查询错误')
        }else{
            res.send(result);
            dataJ = result;
        }
    });

});
//新增
app.get('/add',function (req,res){
    let querys = req.query;
    let [user,age,sex,password] = [querys.user,querys.age,querys.sex,querys.password];
    console.log(querys)
    connection.query("insert into info(user,age,sex,password) values('"+user+"','"+ age +"','"+sex+"','"+ password +"')",function(err,rows){
        if(err){
            res.send("新增失败"+err);
        }else {
            res.send("新增成功");
        }
    });
});
//删除
app.get('/del',function (req,res){
    let querys = req.query;
    let _user =  querys.user;
    let delSql =`delete from info where user ="${_user}"`;
    console.log(delSql)
    connection.query(delSql,function(err,rows){
        if(err){
            res.send("删除失败"+err);
        }else {
            res.send("删除成功");
            //res.redirect("/users");
        }
    });
})

//修改
app.get('/update',function (req,res){
    let querys = req.query;
    let [user,age,sex,password] =  [querys.user,querys.age,querys.sex,querys.password];
    var sql = `update info set age ="${age}", sex ="${sex}", password ="${password}"  where user ="${user}"`;
    //var sql = "update user set age = '"+ age +"',sex = '"+ sex +"',password = '"+ password +"' where user = " + user;
    console.log(sql)
    connection.query(sql,function(err,rows){
        if(err){
            res.send("修改失败 " + err);
        }else {
            res.send("修改成功");
        }
    });
})






// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
