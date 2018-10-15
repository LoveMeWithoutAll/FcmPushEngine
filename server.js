const promiseFinally = require("promise.prototype.finally")
promiseFinally.shim()

const fcmService = require("./services/fcm")
const dbService = require("./services/db")
const { onStart, onServerError } = require("./services/log")

onStart()

const sendPush = async () => {
	await dbService.getConnectionPool()
	dbService.getPushList()
		.then((msgList) => {
			fcmService.sendMsgList(msgList)
		})
		.catch(async (error) => {
			await dbService.closeConnectionPool()
			onServerError(error)
		})
		.finally(async () => {
			await  dbService.closeConnectionPool
			setTimeout(() => {
				sendPush()
			}, 1000)
		})
}

fcmService.init()
sendPush()
