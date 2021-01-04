module.exports = class News extends require('../classes/Endpoint') {

    constructor() {
        super('identity');
    }

    run = async (Data) => {

        return Data.Manager.Identity;

    }

}