let Identity;

Begin = () => {

    // Hide All Screens
    document.querySelectorAll(`[data-screen]`).forEach(e => e.style.display = 'none');

    // Open Home Screen
    Open_Section('Identity');

    // Get App News
    Poll_News();

    // Load Identity Information
    request('a/Identity', {}, Response => {
        
        if(!Response.success) return console.trace('Unable to load a/Identity data.');
        Identity = Response.data;

        Update_Identity();

    });

}