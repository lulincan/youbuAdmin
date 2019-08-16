function returnJson(res, code, data){
    res.json({
        status : code,
        data : data
    })
}

module.exports.setJson = returnJson