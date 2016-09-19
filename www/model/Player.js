var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PlayerSchema = new Schema({
	thumbnail: {type: String, required: true},
	name: {type: String, required: true},
	nick: {type: String, required: true},
	"self_introduce": {type: String, required: true},
	createtime: {type: Date, default: Date.now},
	updatetime: {type: Date, default: Date.now}
});

PlayerSchema.path("createtime").get(function(v){
	return formatDateTime(v);
});
PlayerSchema.path("updatetime").get(function(v){
	return formatDateTime(v);
});
PlayerSchema.pre("save", function(next){
	this.updatetime = Date.now;
	next();
});


PlayerSchema.statics.addOrUpdate = function* (playerInfo){
	console.log("in addOrUpdate ...", playerInfo)

	// delete exists ones
	var PlayerModel = this;
	PlayerModel.find({name: playerInfo.name}).remove().exec();

	// insert the new one
	var newPlayer = new PlayerModel(playerInfo);
	return newPlayer.save();
};


PlayerSchema.statics.delete = function* (playerName){
	var PlayerModel = this;
	PlayerModel.remove({name: playerName}).exec();
	return;
}

PlayerSchema.statics.findAll = function* (){
	console.log("in find all ...");
	var PlayerModel = this;
	var players = yield PlayerModel.find({});
	console.log(players);
	return players;
}

function formatDateTime(date){
	return date.toISOString().replace(/T/, ' ').replace(/\..+/, '');
}

mongoose.model("Player", PlayerSchema);