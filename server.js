const promiseFinally = require("promise.prototype.finally")
promiseFinally.shim()

const fcmService = require("./services/fcm")
const dbService = require("./services/db")
const { onStart, onDBConncetion, onServerError } = require("./services/log")

const sendPush = () => {
	dbService.getPushList()
		.then((msgList) => {
			fcmService.sendMsgList(msgList)
		})
		.catch((error) => {
			onServerError(error)
			process.exit()
		})
		.finally(() => {
			setTimeout(() => {
				sendPush()
			}, 1000)
		})
}

onStart()
dbService.getConnectionPool()
	.then((connectionPool) => {
		onDBConncetion(connectionPool)
		fcmService.init()
		sendPush()
	}, (error) => {
		onServerError(error)
		process.exit()
	})
