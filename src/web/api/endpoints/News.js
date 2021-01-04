module.exports = class News extends require('../classes/Endpoint') {

    constructor() {
        super('news');
    }

    run = async (Data) => {

        const News = [];
        const Identity = Data.Manager.Identity;

        if(!Identity.Height || !Identity.Weight || !Identity.Name || !Identity.Habits || !Identity.Targets || !Identity.Weights) 
        News.push({
          
            Title: 'Hey there!',
            Description: `It looks like I don't know much about you! When you've got some time, I'd really appreciate if you could let me know a little about yourself!`,
            Button: {
                Action: 'Page',
                Page: 'Identity',
                Text: 'Update Identity'
            }
            
        });

        for(let i = 0; i < 5; i++) News.push({Title: Math.random().toFixed(4), Description: 'lorem ipsum dolor sit amet'})

        return News;

    }

}