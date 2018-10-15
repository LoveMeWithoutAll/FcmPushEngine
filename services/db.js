const sql = require("mssql")
const dbConfig = require("../config/dbConfig.json")
const { onDbError } = require("./log")
let connectionPool

sql.on("error", err => {
	sql.close()
	onDbError(err, "on mssql error")
})

const getConnectionPool = async () => {
	try {
		connectionPool = await new sql.ConnectionPool(dbConfig).connect()
	} catch (err) {
		onDbError(err, "on getConnectionPool error")
	}
}

const closeConnectionPool = async () => {
	try {
		await connectionPool.close()
	} catch (err) {
		onDbError(err, "on closeConnectionPool error")
	}
}

const getPushList = async () => {
	try {
		let result = await connectionPool.request()
		// .input("PARAM1", sql.NVarChar, "getList")
		// .execute("b.dbo.stored-procedure-name")
		return result.recordset
	} catch (err) {
		onDbError(err, "getPushList")
		return []
	}
}

const pushFeedback = async (sendResult) => {
	try {
		await connectionPool.request()
		// .input("PARAM1", sql.NVarChar, "PUSH-RESULT-FEEDBACK")
		// .input("PARAM2", sql.NVarChar, sendResult.msgseq)
		// .execute("b.dbo.stored-procedure-name")
	} catch (err) {
		onDbError(err, "insertMsgCheckup")
	}
}

module.exports = {
	getPushList: getPushList,
	pushFeedback: pushFeedback,
	getConnectionPool: getConnectionPool,
	closeConnectionPool: closeConnectionPool
}