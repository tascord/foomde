const Product = require('woolies/src/classes/Product');
const Identity = require('./classes/Identity');

module.exports = class Manager {

    /**
     * Instantiates a new Manager
     */
    constructor() {

        // Identity
        this.Identity = Identity.load();

        // Caching
        this.Cache = [];
        this.Cache_Searches = [];

        // Clear caches every hour
        this.Cache_Timer = setInterval(() => { this.Cache = []; this.Cache_Searches = []}, 60 * 60 * 1000);

    }

    /**
     * Check the cache for a specific item
     * @param {String} Name_ID Name or Product ID
     * @returns {Product|Null} Product or null
     */
    check_cache = Name_ID => this.Cache.find(Item => Item.name == Name_ID || Item.code == Name_ID);

    /**
     * Caches the given product
     * @param {Product} Item
     */
    cache_item = Item => {

        if(!(Item instanceof Product)) return;
        if(this.Cache.find(Cached_Item => Cached_Item.code == Item.code)) return;
        
        this.Cache.push(Item);

    }

}