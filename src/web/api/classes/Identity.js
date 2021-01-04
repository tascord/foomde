const FS = require('fs');

module.exports = class Identity {

    /**
     * Create Identity from Data object. Any fields can be left blank.
     * @param {Object} Data 
     */
    constructor(Data = {}) {
        
        this.Height  = Data.Height  || null;
        this.Weight  = Data.Weight  || null;

        this.Name    = Data.Name    || null;
        
        this.Habits  = Data.Habits  || [];
        this.Targets = Data.Targets || [];
        this.Weights = Data.Weights || [];

        this.save = () => FS.writeFileSync('./Identity.json', JSON.stringify({

            Height: this.Height,
            Weight: this.Weight,

            Name: this.name,

            Habits: this.Habits,
            Targets: this.Targets,
            Weights: this.Weights,

        }, null, 4))

    }

    /**
     * Load Identity from saved file
     * @returns {Identity} Saved identity
     */
    static load = () => {
        
        if(!FS.existsSync('./Identity.json')) {

            const New_Identity = new Identity();
            
            New_Identity.save();
            return New_Identity;

        };

        let data = FS.readFileSync('./Identity.json');
        
        try { data = JSON.parse(data); }
        catch (e) {

            console.log(`Unable to read saved data in Identity.JSON. Backing up & clearing.`);
            FS.copyFileSync('./Identity.json', `Identity-Corrupt-${Date.now()}.json`);
            
            const New_Identity = new Identity();
            
            New_Identity.save();
            return New_Identity;

        }

        return new Identity(data);

    }
    
}