function show_image(name, type, desc)
{
    let file_info;
    if(type == 'image/png' || type == 'image/jpeg')
    {
        file_info = $(`
        <div class="w3-row w3-margin">
            <div class="w3-col s6">
                <img src="/uploads/${name}" width="80%"/>
            </div>
            <div class="w3-col s6 w3-border">
                <p>Filename: ${name}</p>
                <p>Nametype: ${type}</p>
                <p>Description: ${desc}</p>
            </div>
        </div>
    `)
    }
    else
    {
        file_info = $('<p>' + name + ', ' + type + '</p>')
    }

    const download = $('<a href="/files/download/' + name + '"><button class="w3-button w3-block w3-teal">Download</button></a>"')
    $("#display").empty()
    $("#display").append(file_info, download)
    $("#display").modal()
}