var express = require('express');
var fs = require('fs');
var router = express.Router();


/* Parse the manifest object returning a string. Check current time and return these that 
are within the current time window. */
function parseManifest(manifest) {
	// TODO - cx times and what not
	return manifest[0]["title"];
}

/* GET users listing. */
router.get('/:code', function(req, res, next) {
	var code = req.params.code;
	var file = fs.readFileSync("data.json", 'utf8');

	var data = JSON.parse(file);
	data = data["containers"]
	console.log(data, code);

	var manifest = "*** DATA NOT FOUND ***";
	var serial = "*** UNKNOWN SERIAL ***"

	for (var i=0; i < data.length; i++){
		if( data[i].code === code){
			manifest =  parseManifest(data[i]["manifest"]);
			serial = data[i]["serial"];
		}
	}

	res.render('container', { title: 'Polybius Biotech', container: serial, manifest : manifest});
});

module.exports = router;
