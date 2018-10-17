const dotenv = require( "dotenv").config();

const SSH2Shell = require ("ssh2shell");

class SSHExpect {
	constructor({ 
		host = "localhost", 
		port = 22, 
		username = process.env.USER, 
		password = process.env.PASSWORD,
		enable = process.env.PASSWORD
	} = {}){

		this.server = {
			host : host,
			port : port,
			username : username,
			password : password
		};
		this.enable = enable;

		this.ssh2 = new SSH2Shell({
			server: this.server,
			commands: []
		});

		console.log(this);
	}

	onCommandProcessing(command, result, sshObj, stream){

	}

	async connect(){
		await this.ssh2.connect({server:this.server, commands: this.commands, onCommandProcessing: this.onCommandProcessing.bind(this)})
	}
}

var sshe = new SSHExpect({host: "switch.local"});