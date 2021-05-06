var express = require('express');
var multer  = require('multer');
var fs  = require('fs');
var path = require('path')
try {
	app = express();
	var filename;

	const address = ""

	app.get('/', function(req, res) {
		    res.sendFile(path.join(__dirname + '/index.html'));
	});

	var storage = multer.diskStorage({
		    destination: function (req, file, callback) {
			            var dir = './f';
			            if (!fs.existsSync(dir)){
					                fs.mkdirSync(dir);
					            }
			            callback(null, dir);
			        },
		    filename: function (req, file, callback) {
			            callback(null, file.originalname);
			            console.log(file.originalname)
			            fileNAME = file.originalname
			     	    filename = fileNAME.split(' ').join('%20')
			        }
	});

	app.use(express.static('f'))

	var upload = multer({storage: storage}).array('file', 100);

	app.post('/', function (req, res, next) {
		    upload(req, res, function (err) {
			            if (err) {
					                return res.send(err);
					            }
			            res.send(address+filename);
			        });
	})
}catch(err) {
	  console.log(err)
}

app.listen(3000, function() { console.log('App listening on port 3000!'); })
