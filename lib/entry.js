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

module.exports = {
    dbHandle:dbHandle,
    ObjectID:mongodb.ObjectID
};