const admin = require("firebase-admin")
const fcmConfig = require("../config/fcmConfig.json")
const serviceAccount = require("../config/fcmServiceAccountKey.json")
const dbService = require("./db")
const { onFCMSendingSuccess, onFcmSendingError } = require("./log")

const sendMsg = msg => {
	admin.messaging().send(msg)
		.then((response) => {
			let result = {
				msgseq: msg.data.msgseq,
				response: response,
				success: true
			}
			dbService.pushFeedback(result)
			onFCMSendingSuccess(response, msg)
		})
		.catch((error) => {
			let result = {
				msgseq: msg.data.msgseq,
				response: {
					code: error.errorInfo.code,
					message: error.errorInfo.message
				},
				success: false
			}
			dbService.pushFeedback(result)
			onFcmSendingError(error, msg)
		})
}

const sendMsgList = list => {
	list.forEach(obj => {
		let msg = {
			data: {
				// It depends on your app...
				msg: obj.title,
				msgseq: obj.MSG_SEQ.toString(),
				msg_content: obj.content
			},
			token: obj.registrationToken
		}
		sendMsg(msg)
	})
}

const init = () => {
	admin.initializeApp({
		credential: admin.credential.cert(serviceAccount),
		databaseURL: fcmConfig.databaseURL
	})
}

module.exports = {
	init: init,
	sendMsgList: sendMsgList
}
