const Promise = require("es6-promise").Promise
const sql = require("mssql")
const dbConfig = require("../config/dbConfig.json")
const { onDbError } = require("./log")
let connectionPool

sql.on("error", err => {
	sql.close()
	onDbError(err, "mssql error")
	throw new Error(err)
})

const getConnectionPool = async () => {
	try {
		if (connectionPool) return
		return new Promise( async (resolve, reject) => {
			connectionPool = await new sql.ConnectionPool(dbConfig).connect()
			connectionPool.on("error", err => {
				onDbError(err, "getConnectionPool error")
				reject(Error(err))
			})
			if (connectionPool) resolve(connectionPool)
			reject(Error("getConnectionPool failed"))
		})
	} catch (err) {
		connectionPool = null
		onDbError(err, "getConnectionPool error in catch")
		throw new Error(err)
	}
}

const getPushList = async () => {
	try {
		if (typeof connectionPool === "undefined") return []
		let result = await connectionPool.request()
		// .input("PARAM1", sql.NVarChar, "getList")
		// .execute("b.dbo.stored-procedure-name")
		return result.recordset
	} catch (err) {
		onDbError(err, "getPushList")
		throw new Error(err)
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
		throw new Error(err)
	}
}

module.exports = {
	getPushList: getPushList,
	pushFeedback: pushFeedback,
	getConnectionPool: getConnectionPool
}
