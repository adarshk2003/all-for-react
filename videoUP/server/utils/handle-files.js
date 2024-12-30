exports.success_function = function (api_data) {
    let responce = {
        success: true,
        stautsCode: api_data.stautsCode,
        data: api_data ? api_data.data : null,
        message: api_data.message ? api_data.message : null
    }
    return responce;

}

exports.error_function = function (api_data) {
    let response = {
        success: false,
        statusCode: api_data.statusCode,
        data: api_data.data ? api_data.data : null,
        message: api_data.message ? api_data.message : null
    }
    return response;
}