var im = require('./node_modules/imagemagick/imagemagick.js');
var fs = require('fs');
var fileName = "exemple_court.txt";


window.ondragover = window.ondrop = function(e){e.preventDefault(); return false; } // empécher les comportements pas défault
// écouter quand on drop un fichier
var el =  document.querySelector("#drop");

el.ondragover = function(){ // en cas de drag (survol avec un fichier sous la souris)
	this.className = "hover_file"; // on rajoute la classe hover
	this.innerHTML = "Drop the file"; // on ajoute du html
	return false; // ?
};

el.ondragleave = function(){
	this.className="";
	this.innerHTML="Drop your icon here !";
	return false;
};

el.ondrop=function(e){
	e.preventDefault();
	console.log(e);
	console.log(e.dataTransfer);
	for(var i=0; i<e.dataTransfer.files.length; ++i){ // si on dépose plusieurs fichiers en même temps
		var file_path=e.dataTransfer.files[i].path; // on récupère le chemin du fichier déposé
		console.log(file_path);
		try_to_show(file_path);
	}
}

try_to_show = function(fileName){
	fs.exists(fileName, function(exists) {
	    if (exists) {  	
	      	fs.stat(fileName, function(error, stats) {
		        //transfer_object = {};
		        //transfer_object.fileName = fileName;
		       	//transfer_object.size = stats.size;  
		        //transfer_object.progression = 0;    
		       	//transfer_object.stream = fs.createReadStream(fileName, { bufferSize: 64 * 1024 });
		       	// client.write("upload_demand");
		       	var content = fs.readFileSync(fileName, 'utf-8');
		        document.getElementById("drop").innerHTML=content;
		    });
	    }else{
	    	console.log("fileNotFound");
	    	return false;
	    }
	  });
}



