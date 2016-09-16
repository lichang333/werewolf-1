var koa = require("koa");
var app = koa();
var koaStatic = require("koa-static");
var path = require("path");

app.use(koaStatic(path.join(__dirname, "www")));

app.listen(3000, function(){
	console.log("server started on 3000 ...");
})