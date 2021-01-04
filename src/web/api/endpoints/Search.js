const Woolies = require('woolies');

module.exports = class Search extends require('../classes/Endpoint') {

    constructor() {
        super('search');
    }

    run = async (Data) => {

        console.log(Data);

        if(!Data.query) return {success: false, message: "No search term provided"};
        return await Woolies.Search(Data.query);

    }

}
