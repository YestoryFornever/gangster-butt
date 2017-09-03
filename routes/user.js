var express = require('express');
var router = express.Router();
let crud = require('../lib/crud');

router.get('/list',(req,res,next)=>{
  // res.send({name:'用户列表'});
	crud.read(
		"user",
		{},
		{},
		(map_list)=>{
			res.send(map_list);
		}
	);
});
router.post('/create',(req,res,next)=>{
	crud.create(
		"user",
		{_id:crud.ObjectID(req.params.id)},
		{},
		(map_list)=>{
			res.send(map_list);
		}
	);
});
router.get('/read/:id([0-9]+)',(req,res,next)=>{
	crud.read(
		"user",
		{_id: crud.ObjectID(req.params.id)},
		{},
		(map_list)=>{
			res.send(map_list);
		}
	);
});
router.post('/update/:id([0-9]+)',(req,res,next)=>{
	crud.update(
		"user",
		{_id: crud.ObjectID(req.params.id)},
		req.body,
		(result_map)=>{
			res.send(result_map);
		}
	);
});
router.get('/delete/:id([0-9]+)',(req,res,next)=>{
	crud.delete(
		"user",
		{_id: crud.ObjectID(req.params.id)},
		(result_map)=>{
			res.send(result_map);
		}
	);
});

module.exports = router;
