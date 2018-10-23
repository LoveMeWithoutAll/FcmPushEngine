const promiseFinally = require("promise.prototype.finally")
promiseFinally.shim()

const fcmService = require("./services/fcm")
const dbService = require("./services/db")
const { onStart, onServerError } = require("./services/log")

const sendPush = async () => {
	dbService.getPushList()
		.then((msgList) => {
			fcmService.sendMsgList(msgList)
		})
		.catch(async (error) => {
			onServerError(error)
		})
		.finally(async () => {
			setTimeout(() => {
				sendPush()
			}, 1000)
		})
}

onStart()
fcmService.init()
dbService.getConnectionPool()
sendPush()
