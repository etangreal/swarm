
// ------------------------------------------------------------------------------------------------
// IMPORTS
// ------------------------------------------------------------------------------------------------

const net 		= require("net")
var execSync 	= require('child_process').execSync

// ------------------------------------------------------------------------------------------------
// FUNCTIONS
// ------------------------------------------------------------------------------------------------

var shell = function(cmd) {
	
	var code = ''
	try {
		code = execSync(cmd, { encoding: 'utf8' })
		return code
	} catch (ex) {
		// console.log(ex.message)
	}

	return 'error\n'
}

// ------------------------------------------------------------------------------------------------
// DECLARATIONS
// ------------------------------------------------------------------------------------------------

var port = 1337
var host = shell("sudo ifconfig eth0 | awk '/inet addr/{print substr($2,6)}'").replace('\n','')

// ------------------------------------------------------------------------------------------------
// FUNCTIONS
// ------------------------------------------------------------------------------------------------

var pingCmd = function(ip) {
	return 'fping -t 50 ' + ip
}

// ------------------------------------------------------------------------------------------------

var getIP = function(str) {
	var split = str.split(' ');
	return split[0];
}

// ------------------------------------------------------------------------------------------------

var isAlive = function(str) {
	return (str && str.indexOf('is alive') > -1)
}

// ------------------------------------------------------------------------------------------------

var ping = function(ips) {
	
	var cmd = ''

	ips.forEach(function(ip) {
		cmd += pingCmd(ip) + '\n'
	})

	var res = shell(cmd).split('\n')
		res.pop() //get rid of last empty space

	var passed = true
	var values = []

	for(var i=0; i<ips.length; i++) {
		pinged = isAlive(res[i])
		passed = passed && pinged
		values.push( pinged )
	}

	return {
		passed: passed,
		values: values
	}

}//ping

// ------------------------------------------------------------------------------------------------
// SERVER
// ------------------------------------------------------------------------------------------------

// Create a simple server
var server = net.createServer(function (conn) {
    console.log('Client connected');

	conn.on('end', function() { // If connection is closed
		console.log('Client disconnected')
	});

	conn.on('data', function(data) { // Handle data from client
		ips = JSON.parse(data)
		send = ping(ips)
	
		console.log('ip: ' + host + ' | passed: ' + send.passed)
		for(var i=0; i<ips.length; i++)
			console.log('  pinged: '+ips[i]+ ' : ' + send.values[i])

		conn.write(JSON.stringify(send));
	});

}); //server = net.createServer

// ------------------------------------------------------------------------------------------------

// Listen for connections
server.listen(1337, host, function () {
    console.log("Server: Listening");
});

// ------------------------------------------------------------------------------------------------
// END
// ------------------------------------------------------------------------------------------------
