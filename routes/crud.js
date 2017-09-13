let express = require('express'),
	router = express.Router(),
	crud = require('../lib/crud');

router.get('/:obj_type/list',(req,res,next)=>{
	crud.read(
		req.params.obj_type,
		{},
		{},
		(map_list)=>{
			res.send({
				status:200,
				msg:'success',
				data:map_list
			});
		}
	);
});
router.post('/:obj_type/create',(req,res,next)=>{
	crud.create(
		req.params.obj_type,
		{_id:crud.ObjectID(req.params.id)},
		{},
		(map_list)=>{
			res.send({
				status:200,
				msg:'success',
				data:map_list
			});
		}
	);
});
router.get('/:obj_type/read/:id([0-9a-z]+)',(req,res,next)=>{
	console.log(req.params.id);
	crud.read(
		req.params.obj_type,
		{_id: crud.ObjectID(req.params.id)},
		{},
		(map_list)=>{
			res.send({
				status:200,
				msg:'success',
				data:map_list
			});
		}
	);
});
router.post('/:obj_type/update/:id([0-9a-z]+)',(req,res,next)=>{
	crud.update(
		req.params.obj_type,
		{_id: crud.ObjectID(req.params.id)},
		req.body,
		(result_map)=>{
			res.send({
				status: 200,
				msg: 'success',
				data: result_map
			});
		}
	);
});
router.get('/:obj_type/delete/:id([0-9a-z]+)',(req,res,next)=>{
	crud.delete(
		req.params.obj_type,
		{_id: crud.ObjectID(req.params.id)},
		(result_map)=>{
			res.send({
				status: 200,
				msg: 'success',
				data: result_map
			});
		}
	);
});

module.exports = router;