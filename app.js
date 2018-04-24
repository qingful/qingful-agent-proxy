const express = require("express");
const proxy = require("http-proxy-middleware");

const app = express();
const options = {
	target: "http://www.qingful.com", // target host
	changeOrigin: true, // needed for virtual hosted sites
	ws: true, // proxy websockets
	router: function(req) {
		if (req.headers["x-host"] === "w.xxmrsg.com") {
			return `http://www.qingful.com`;
		}

		let hosts = req.headers["x-host"].split(".");
		let module = hosts[0];
		if (hosts.length <= 2) {
			return `http://www.${req.headers["x-host"]}`;
		}
		console.log(`http://${module}.qingful.com`);
		return `http://${module}.qingful.com`;
	}
};

const wsProxy = proxy(options);
app.use(wsProxy);

const server = app.listen(3000);
server.on("upgrade", wsProxy.upgrade);
