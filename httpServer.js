var app = require('http').createServer(handler), fs = require('fs'), path = require('path');
app.listen(8080);

function handler(request, response) {
	var filePath = '.' + request.url;
	if (filePath == './')
		filePath = './index.html';
	
	var extname = path.extname(filePath);
	var contentType = 'text/html';
	switch (extname) {
	case '.js':
		contentType = 'text/javascript';
		break;
	case '.css':
		contentType = 'text/css';
		break;
	case '.swf':
		contentType = 'application/x-shockwave-flash';
		break;
	case '.png':
		contentType = 'image/png';
		break;
	}
	fs.exists(filePath, function(exists) {
		if (exists) {
			console.log("serving: " + filePath);
			fs.readFile(filePath, function(error, content) {
				if (error) {
					response.writeHead(500);
					response.end();
				} else {
					response.writeHead(200, {
						'Content-Type' : contentType
					});
					if (extname == '.swf') {
						response.end(content, 'binary');
					} else {
						response.end(content, 'utf-8');
					}
				}
			});
		} else {
			response.writeHead(404);
			response.end();
		}
	});
}