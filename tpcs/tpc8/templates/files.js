exports.list_files = list_files;
exports.upload_files = upload_files;

function list_files(files)
{
    let html = `
      <html>
          <head>
              <title>File List</title>
              <meta charset="utf-8"/>
              <link rel="icon" href="/favicon.png"/>
              <link rel="stylesheet" href="/w3.css"/>
              <script src="/jquery-3.5.1.min.js"></script>
              <script src="/show_image.js"></script>
              <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.js"></script>
              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.css" />
          </head>
          <body>
              <div class="w3-modal-content w3-animate-opacity" id="display"></div>

              <div class="w3-container w3-teal">
                  <h2>File List</h2>
              </div>
              <table class="w3-table w3-bordered">
                  <tr>
                      <th>Date</th>
                      <th>File</th>
                      <th>Description</th>
                      <th>Size</th>
                      <th>Type</th>
                  </tr>
    `
    files.forEach( f => {
        html += `
          <tr onclick='show_image(\"${f.name}", \"${f.mimetype}\", \"${f.description}\");'>
              <td>${f.date}</td>
              <td>${f.name}</td>
              <td>${f.description}</td>
              <td>${f.size}</td>
              <td>${f.mimetype}</td>
          </tr>
      `
    })
    html += `
          </table>
          
          <a href="/files/upload"><button class="w3-button w3-block w3-teal">Add File</button></a>
      </body>
      </html>
    `
    return html
}


function upload_files(date)
{
    return `
    <html>
        <head>
            <title>File Upload</title>
            <meta charset="utf-8"/>
            <link rel="icon" href="/favicon.png"/>
            <link rel="stylesheet" href="/w3.css"/>
            <script src="/jquery-3.5.1.min.js"></script>
            <script src="/add_upload.js"></script>
        </head>
        <body>
            <div class="w3-container w3-teal">
                <h2>File Upload</h2>
            </div>
            <form class="w3-container" action="/files" method="POST" enctype="multipart/form-data">
                <div id="upload">
                    <div class="w3-row w3-margin-bottom">
                        <div class="w3-col s3">
                            <label class="w3-text-teal">Description</label>
                        </div>
                        <div class="w3-col.s9.w3-border">
                            <input class="w3-input w3-border w3-light-grey" type="text" name="desc">
                        </div>
                    </div>
                    <div class="w3-row w3-margin-bottom">
                        <div class="w3-col s3">
                            <label class="w3-text-teal">Select file</label>
                        </div>
                            <div class="w3-col.s9.w3-border">
                                <input class="w3-input w3-border w3-light-grey" type="file" name="myFile">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w3-row w3-margin-bottom">
                    <button class="w3-btn w3-blue-grey" type="button" onclick="add_upload();"> +1 </button></a>
                    <input class="w3-btn w3-blue-grey" type="submit" value="Upload"/>
                </div>
                
            </form>
            
        </body>
    </html>
    `
}