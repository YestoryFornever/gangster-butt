let schema = require('./schema.js');

let createObj,
    readObj,
    updateObj,
    deleteObj;
   
let db = require('./entry');

createObj = function(obj_type, obj_map, callback){
    let type_check_map = schema.checkType( obj_type );
    if( type_check_map ){
        callback( type_check_map );
    }
    schema.checkSchema(
        obj_type,
        obj_map,
        (error_list)=>{
            if(error_list.length === 0){
                db.dbHandle.collection(
                    obj_type,
                    (outer_error,collection)=>{
                        let options_map = {safe:true};
                        collection.insert(
                            obj_map,
                            options_map,
                            (inner_error,result_map)=>{
                                callback(result_map);
                            }
                        );
                    }
                );
            }else{
                callback({
                    error_msg:'Input document not valid',
                    error_list:error_list
                });
            }
        }
    );
};
readObj = function(obj_type, find_map, fields_map, callback){
    let type_check_map = schema.checkType( obj_type );
    if( type_check_map ){
        callback( type_check_map );
        return;
    }
    db.dbHandle.collection(
        obj_type,
        (outer_error,collection)=>{
            collection.find( find_map, fields_map ).toArray(
                (inner_error, map_list)=>{
                    callback( map_list );
                }
            );
        }
    );
};
updateObj = function(obj_type, find_map, set_map, callback){
    let type_check_map = schema.checkType(obj_type);
    if(type_check_map){
        callback(type_check_map);
        return;
    }
    schema.checkSchema(
		obj_type, set_map,
		function(error_list){
			if( error_list.length === 0 ){
				db.dbHandle.collection(
					obj_type,
					(outer_error,collection)=>{
                        collection.update(
                            find_map,
                            {
                                $set:set_map
                            },
                            {
                                safe:true,
                                multi:true,
                                upsert:false
                            },
                            (inner_error,update_count)=>{
                                callback({ update_count:update_count });
                            }
                        );
					}
				);
			}else{
				callback({
					error_msg:'Input document not valid',
					error_list:error_list
				});
			}
		}
	);
};
deleteObj = function(obj_type, find_map, callback){
    let type_check_map = schema.checkType( obj_type );
    if( type_check_map ){
        callback( type_check_map );
        return;
    }
    db.dbHandle.collection(
        obj_type,
		(outer_error,collection)=>{
			let options_map = {safe:true,single:true};
			collectin.remove(
				find_map,
				options_map,
				(inner_error,delete_count)=>{
					callback({ delete_count: delete_count })
				}
			);
		}
    );
};

schema.loading();

module.exports = {
    ObjectID:db.ObjectID,
    create:createObj,
    read:readObj,
    update:updateObj,
    delete:deleteObj
};