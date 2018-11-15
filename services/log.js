const { logger } = require("../config/logConfig")

const onStart = () => {
	logger.info("Android FCM server start")
}

const onDBConncetion = (connectionPool) => {
	logger.info("Getting DB Connection is done successfully")
	logger.info(connectionPool)
}

const onFCMSendingSuccess = (response, msg) => {
	logger.info(`Successfully sent mesage: msgseq=${msg.data.msgseq} | ${msg.data.msg} | ${response}`)
	logger.debug(msg)
}

const onFcmSendingError = (error, msg) => {
	error.msg = msg
	logger.error(`Error on sending message: msgseq=${msg.data.msgseq} | msg=${msg.data.msg}`)
	logger.error(error)
}

const onServerError = (error) => {
	logger.error("Error on server.js line 17")
	logger.error(error)
}

const onDbError = (error, functionName) => {
	logger.error(`Error on ${functionName} in db.js`)
	logger.error(error)
}

module.exports = {
	onFCMSendingSuccess: onFCMSendingSuccess,
	onFcmSendingError: onFcmSendingError,
	onStart: onStart,
	onDBConncetion: onDBConncetion,
	onServerError: onServerError,
	onDbError: onDbError
}
