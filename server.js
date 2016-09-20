var koa = require("koa");
var app = koa();
var koaStatic = require("koa-static");
var path = require("path");
var parser = require("co-body");
var router = require("koa-router")();
var mongoose = require("mongoose");

// var ip = "192.168.1.100";
var ip = "192.168.196.184";

mongoose.connect("mongodb://" + ip + "/test");
mongoose.connection.on("error", (err) => console.error("mongodb connection error", err));

require("./www/model/Player.js");
var PlayerModel = mongoose.model("Player");
require("./www/model/Battle.js");
var BattleModel = mongoose.model("Battle");

app.use(koaStatic(path.join(__dirname, "www")));

router.get("/players", function *(next){
	console.log("in get players ");
	var players = yield PlayerModel.findAll();
	this.body = players;
});

router.post("/players", function *(next){
	console.log("in post players ");
	var playerInfo = yield parser.json(this);
	yield PlayerModel.addOrUpdate(playerInfo);
	this.body = "";
});

router.delete("/players", function *(next){
	var params = yield parser(this);
	var playerName = params.playerName;
	yield PlayerModel.delete(playerName)
	this.body = "";
});


router.get("/battles", function *(next){
	console.log("in get battles ");
	var infos = yield BattleModel.findAll();
	this.body = infos;
});

router.post("/battles", function *(next){
	console.log("in post battles ");
	var infos = yield parser.json(this);
	yield BattleModel.add(infos);
	this.body = "";
});

router.delete("/battles", function *(next){
	console.log("in delete battles ");
	var params = yield parser(this);
	var battleId = params.battleId;
	yield BattleModel.deleteById(battleId)
	this.body = "";
});



app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000, function(){
	console.log("server started on 3000 ...");
})