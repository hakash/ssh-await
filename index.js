"use strict";
const dotenv = require("dotenv").config();
const Client = require("ssh2").Client;

class ssh_await {

	connection = null;
	config = {
		host:"localhost",
		port:22,
		username:process.env.USERNAME,
		password:process.env.PASSWORD,
		algorithms: {
			kex: ['diffie-hellman-group1-sha1'],
			cipher: ['aes128-cbc']
		}
	};
	
	constructor(conf){
		this.connection = new Client();
		for(var key in conf.getOwnPropertyNames()){
			this.config[key] = conf[key];
		}
	}

	connect() {
		let conn = this.connection;
		return new Promise((resolve,reject)=>{
			conn.on("ready",()=>resolve());
		
			conn.connect(this.config);	
		});
	}

	exec(cmd){
		let conn = this.connection;
		return new Promise((resolve,reject)=>{
			conn.exec(cmd, (err, stream)=>{
				if(err) reject(err);

				stream.on("close",()=>{
					reject(new Error("Command closed"));
				});

				stream.on("data", data => resolve(data) );
				stream.stderr.on("data", data => reject(data) );
			});
		});
	}
}

var cli = new ssh_await()