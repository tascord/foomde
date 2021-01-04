module.exports = class Endpoint {

    /**
     * API endpoint parent class
     * @param {String} Endpoint Endpoint to trigger class usage
     */
    constructor(Endpoint) {
        this.Endpoint = Endpoint;
    }

    /**
     * Run the endpoint
     * @param {Object} Data Incoming request.body JSON data
     * @returns {Object} JSON response to be returned to the client
     */
    run = async (Data) => {};

}