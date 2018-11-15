module.exports = {
	apps: [
		{
			name: "FCM-Push",
			script: "server.js",
			instances: 1,
			autorestart: true,
			watch: true,
			ignore_watch: ["node_modules", "FcmPushLog"],
			max_memory_restart: "1G",
			error_file: "null",
			out_file: "null"
		}
	]
}