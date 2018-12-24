'use strict';

var express = require('express');
var cors = require('cors');
//module for uploading files
var multer = require('multer');
//in html in <form> it's required to put enctype="multipart/form-data"

// here on HyperDev the fs is read only, 
// You have to upload the file to memory
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });
    
  // using 'multer' middleware...
//uploading
//*for uploading single file -2nd arg in post== upload.single('name'==name in html<input>
//
app.post('/api/fileanalyse',upload.single('upfile'), function(req, res){
  res.json({
    name:req.file.originalname,
    type:req.file.mimetype,
    size:req.file.size
  })
})

// **for uploading muliple file -//- and add multiple="multiple" in <input> to select files
// ** req.files
//optional- max number of upload files as a second arg irObj.name=obj.originalname
    
/*app.post('/api/fileanalyse',upload.array('snare'), function(req, res,next){
  
  let output = req.files.map((obj)=>{
    var rObj={};
    rObj.name=obj.originalname
    rObj.type=obj.mimetype
    rObj.size=obj.size
    return rObj
  })  
  next(res.json(output))
});*/
 
//***forloading mixed names files - upload.fields
//** name key data is required, maxcount-optional
/*let myUpload=[{name:"snare", maxcount:2},{name:"clap", maxcount:3}]
app.post('/api/fileanalyse',upload.fields(myUpload), function(req, res,next){

  let output = 
     
      req.files.snare.map((obj)=>{
    var rObj={};
    rObj.name=obj.originalname
    rObj.type=obj.mimetype
    rObj.size=obj.size
    return rObj
  })  
  next(res.json(output))
});*/
//**** any files uploading
/*app.post('/api/fileanalyse',upload.any(),function(req, res,next){
  
  let output = req.files.map((obj)=>{
    var rObj={};
    rObj.name=obj.originalname
    rObj.type=obj.mimetype
    rObj.size=obj.size
    return rObj
  })  
  next(res.json(output))
});
*/

 // 404-NOT FOUND Middleware
 app.use(function(req, res, next){
   res.status(404);
   res.type('txt').send('Not found');
 });

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
