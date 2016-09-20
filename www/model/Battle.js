var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var BattleSchema = new Schema({
	victory: String,
	infos: [{role: String, names: [String]}],
	createtime: {type: Date, default: Date.now},
	updatetime: {type: Date, default: Date.now}
});

BattleSchema.path("createtime").get(function(v){
	return formatDateTime(v);
});
BattleSchema.path("updatetime").get(function(v){
	return formatDateTime(v);
});
BattleSchema.pre("save", function(next){
	this.updatetime = Date.now;
	next();
});


BattleSchema.statics.add = function* (info){
	
	var BattleModel = this;
	var battleModel = new BattleModel(info);
	return battleModel.save();
};


BattleSchema.statics.deleteById = function* (id){
	var BattleModel = this;
	BattleModel.remove({"_id": id}).exec();
	return;
}

BattleSchema.statics.findAll = function* (){
	console.log("in find all ...");
	var BattleModel = this;
	var battles = yield BattleModel.find({}, null, {sort: {"createtime": -1}});
	return battles;
}

function formatDateTime(date){
	return date.toISOString().replace(/T/, ' ').replace(/\..+/, '');
}

mongoose.model("Battle", BattleSchema);