function request(url, data, callback = null) {

    let xhr = new XMLHttpRequest();
    let fd = new FormData();

    let method = 'POST';

    for(let field in data) fd.append(field.title, field.data);
    
    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));

    if(callback) xhr.onload = (data) => {

        if(data.target.status >= 200 && data.target.status < 300) {
            
            let response = data.target.response;
            
            try       { response = JSON.parse(response);           }
            catch (e) { response = data.target.response;           }
            finally   { callback({success: true, data: response}); }

        }

        else callback({ success: false, data: data.target.response });
    }

}