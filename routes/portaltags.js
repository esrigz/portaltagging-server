var express = require('express');
var router = express.Router();
var config = require('../config.js');
var PortalTag = require('../models/portalTag');



router.post('/', function (req, res, next) {
  console.log(req.body);
  var newTag = {name:req.body.name,type:req.body.type};
  console.log(newTag);
  var tag = new PortalTag(newTag);
  tag.save();
  res.json(tag);
})

router.post('/:id/addChild', function (req, res, next) {
  PortalTag.findById(req.params.id,function(err,res){
    var newTag = {name:req.body.name,type:req.body.type};
    var tag = new PortalTag(newTag);
    tag.parent=res; 
    tag.save();
    res.json(tag);
  });
  res.json({message:"fail"});
})



router.get('/',function(req, res, next) {
  PortalTag.find(function (err, tags) {
  if (err) return console.error(err);
  res.send(tags);
  console.log(tags);
 })
})

router.put('/:id',function(req, res, next) {
  PortalTag.findByIdAndUpdate(req.params.id,req.body,function(err,tag){
    res.send(tag);
  })
})

router.delete('/:id',function(req, res, next) {
  PortalTag.findByIdAndRemove(req.params.id);
  res.json({message:"ok"});
})


module.exports = router