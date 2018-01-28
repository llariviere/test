
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

	function setOptions(srcType) {
	    var options = {
	        // Some common settings are 20, 50, and 100
	        quality: 50,
	        destinationType: Camera.DestinationType.FILE_URI,
	        // In this app, dynamically set the picture source, Camera or photo gallery
	        sourceType: srcType,
	        encodingType: Camera.EncodingType.JPEG,
	        mediaType: Camera.MediaType.PICTURE,
	        allowEdit: false,
	        correctOrientation: false  //Corrects Android orientation quirks
	    }
	    return options;
	}
	
	function openCamera(selection) {
 
	    var srcType = Camera.PictureSourceType.CAMERA;
	    var options = setOptions(srcType);
	    var func = createNewFileEntry;
	 
	    navigator.camera.getPicture(function cameraSuccess(imageUri) {
	 
	        displayImage(imageUri);
	        // You may choose to copy the picture, save it somewhere, or upload.
	        // func(imageUri);
	 
	    }, function cameraError(error) {
	        console.debug("Unable to obtain picture: " + error, "app");
	    }, options);
	}
	
	function displayImage(imgUri) {
	 
	    var elem = document.getElementById('imageFile');
            elem.src = imgUri;
	}
	
	function createNewFileEntry(imgUri) {
	    window.resolveLocalFileSystemURL(cordova.file.cacheDirectory, function success(dirEntry) {
	 
	        // JPEG file
	        dirEntry.getFile("tempFile.jpeg", { create: true, exclusive: false }, function (fileEntry) {
	 
	            // Do something with it, like write to it, upload it, etc.
	            // writeFile(fileEntry, imgUri);
	            console.log("got file: " + fileEntry.fullPath);
	            // displayFileData(fileEntry.fullPath, "File copied to");
	 
	        }, onErrorCreateFile);
	 
	    }, onErrorResolveUrl);
	}
