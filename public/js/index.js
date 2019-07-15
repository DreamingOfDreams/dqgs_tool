if (typeof window.FileReader === 'undefined')
    alert('您的当前浏览器不支持 FileReader，无法实验最新特性');

var dropper = document.getElementById("dropper");
var results = document.getElementById("results");

document.querySelector("#toPaste").onclick=function(){
    window.location.href='/simple';
};
dropper.ondragenter = function (e) {
    dropper.className = 'hover';
    e.preventDefault();
};
dropper.ondragover = function (e) {
    e.preventDefault();
};
dropper.ondragleave = function (e) {
    dropper.className = '';
    e.preventDefault();
};
dropper.ondrop = function (e) {
    var files = [].slice.call(e.dataTransfer.files);
    files.forEach(function (file) {
        var reader = new FileReader();
        reader.onload = function (event) {
            fileLoaded(file.name, event.target.result);
        };
        reader.readAsDataURL(file);
    });
    dropper.className = '';
    e.preventDefault();
};

function fileLoaded(filename, dataUri) {

    var div = document.createElement("div");
    div.className = 'item';

    var remove = document.createElement("button");
    remove.className = 'remove';
    remove.innerHTML = 'x';
    remove.onclick = function () {
        if (localStorage) localStorage.removeItem("b64-" + filename);
        results.removeChild(div);
    };
    div.appendChild(remove);

    var name = document.createElement("div");
    name.innerHTML = filename;
    div.appendChild(name);

    if (/^data:image/.test(dataUri)) {
        var imgDiv = document.createElement("div");
        var img = document.createElement("img");
        img.src = dataUri;
        img.style['max-width'] = '100px';
        img.style['height-width'] = '100px';
        imgDiv.appendChild(img);
        div.appendChild(imgDiv);
    }

    var ta = document.createElement("textarea");
    ta.onclick = function () {
        ta.select();
    };
    ta.value = dataUri;
    div.appendChild(ta);

    results.appendChild(div);
    if (localStorage) localStorage.setItem("b64-" + filename, dataUri);
}

if (localStorage)
    for (var filename in localStorage)
        if (filename.indexOf("b64-") === 0)
            fileLoaded(filename.replace("b64-", ""), localStorage.getItem(filename));