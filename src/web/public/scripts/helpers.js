/**
 * Get the current app news
 */
const Poll_News = () => {

    request('a/News', {}, Response => {

        if(!Response.success) return Display_Card('Uh oh..', `I was unable to get the current news. Please check back later.`)
        Response.data.forEach(Card => Display_Card(Card.Title, Card.Description, Card.Image, Card.Button));

    });

}

/**
 * Create and display a 'card' on the home screen's news feed
 */
const Display_Card = (Title, Description, Image, Button) => {

    if(!Title || !Description) return;

    const Container = document.createElement('div');
    Container.classList.add('card');

    if(Title) {
        
        let Title_Text = document.createElement('h1');
        Title_Text.innerText = Title;
        Container.appendChild(Title_Text)

    }

    if(Description) {

        let Description_Text = document.createElement('sub');
        Description_Text.innerText = Description;
        Container.appendChild(Description_Text)

    }

    if(Button) {

        Container.appendChild(Break()); Container.appendChild(Break());

        let Button_Button = document.createElement('button');
        Button_Button.classList.add('text-button');
        Button_Button.innerText = Button.Text;

        switch(Button.Action) {

            case "Page":
                Button_Button.onclick = () => Open_Section(Button.Page);
            break;

        }

        Container.appendChild(Button_Button)

    }

    Get_Section('home', '>.cards').appendChild(Container);

}

/**
 * Get the Section element with the data-screen value matching
 */
const Get_Section = (Section, Child = '') => document.querySelector(`[data-screen="${Section.toLowerCase()}"]${Child}`);

/**
 * Returns a new 'br' element
 */
const Break = () => document.createElement('br');

/**
 * Returns currently opened screen element
 */
const Current_Section = () => document.querySelector('[data-active-screen]')

/**
 * Opens named section
 */
const Open_Section = Section => {
 
    const Current_Active = Current_Section();
    const Next_Section   = Get_Section(Section);

    if(!Current_Active) return console.trace(`No currently active screen. Uh oh!`);
    if(!Next_Section) return console.trace(`Invalid section '${Section}'.`);

    if(Current_Active == Next_Section) return console.trace(`Requested section '${Section}' already opened.`);

    // Show Next Screen
    Next_Section.style.display = '';


    Current_Active.style.animation = 'Section-Out-Right 0.5s ease-in-out forwards';
    Next_Section.style.animation   = 'Section-In-Left 0.5s ease-in-out forwards'

    Current_Active.removeAttribute('data-active-screen');
    Next_Section.setAttribute('data-active-screen', '');

    // Move next slide over current
    Next_Section.style.zIndex = 2;
    Next_Section.style.position = 'absolute';

    setTimeout(() => {
    
        Next_Section.style.zIndex = 0;
        Next_Section.style.position = '';
        Current_Active.style.display = 'none';

    }, 500);
    
}

const Update_Identity = () => {

    let Unknown = '<i style="color: var(--red);">Not Given.</i>';

    document.querySelector(`sub[data-field-name="Name"]`).innerHTML = Identity.Name || Unknown;
    document.querySelector(`sub[data-field-name="Height"]`).innerHTML = Identity.Height || Unknown;
    document.querySelector(`sub[data-field-name="Weight"]`).innerHTML = Identity.Weight || Unknown;

}