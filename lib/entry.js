let mongodb = require('mongodb'),
	mongoServer = new mongodb.Server(
		'localhost',
		'27017'
	),
	dbHandle = new mongodb.Db(
		'gangster',
		mongoServer,
		{safe:true}
	);

console.log('** CRUD module loaded **');

dbHandle.open(function () {
	console.log('** Connected to MongoDB **');
});

module.exports = {
    dbHandle:dbHandle,
    ObjectID:mongodb.ObjectID
};