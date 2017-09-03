let checkType,
    loadSchema,
    checkSchema,
    objTypeMap = {'user':{}};
let JSV = require('JSV').JSV,
    validator = JSV.createEnvironment();
let fs = require('fs');

loadSchema = function( schema_name, schema_path ){
	fs.readFile( schema_path,'utf-8',(err,data)=>{
		objTypeMap[ schema_name ] = JSON.parse( data );
	});
};

checkSchema = function( obj_type, obj_map, callback ){
	var schema_map = objTypeMap[ obj_type ],
		report_map = validator.validate( obj_map, schema_map );
	// console.log(report_map);
	callback( report_map.errors );
};

checkType = function(obj_type){
    if(!objTypeMap[obj_type]){
        return ({
            erro_msg: 'Object type "' + obj_type
                + '" is not supported.'
        });
    }
    return null;
};

loading = function(){
    var schema_name, schema_path;
	for(schema_name in objTypeMap){
		if( objTypeMap.hasOwnProperty( schema_name ) ){
			schema_path = __dirname + '/' + schema_name+ '/' + schema_name + '.json';
			loadSchema( schema_name, schema_path );
		}
	}
}

module.exports = {
    checkType:checkType,
    checkSchema:checkSchema,
    loadSchema:loadSchema,
    loading:loading
}