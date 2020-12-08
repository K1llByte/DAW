function showImage(name, type, desc){
    if(type == 'image/png' || type == 'image/jpeg'){
        var fileObj = $(`
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
        var fileObj = $('<p>' + name + ', ' + type + '</p>')


    var download = $('<div><a href="/files/download/' + name + '">Download</a></div>"')
    $("#display").empty()
    $("#display").append(fileObj, download)
    $("#display").modal()
}

function showUpload(){
    var new_up = $(`
        <div class="w3-row w3-margin-bottom">
            <div class="w3-col s3">
                <label class="w3-text-teal">Description</label>
            </div>
            <div class="w3-col.s9.w3-border">
                <input class="w3-input w3-border w3-light-grey" type="text" name="desc">
            </div>
            <div class="w3-row w3-margin-bottom">
        </div>
            <div class="w3-col s3">
                <label class="w3-text-teal">Select file</label>
            </div>
            <div class="w3-col.s9.w3-border">
                <input class="w3-input w3-border w3-light-grey" type="file" name="myFile">
            </div>
        </div>
    `)
    $("#upload").append(new_up)
}

