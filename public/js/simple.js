(function(){
    var canvas = document.querySelector("#canvas"), 
        image = new Image(), 
        context = canvas.getContext("2d"),
        bgColors = ["#fff","#000","#f12345","#337ab7","#5cb85c","#d9534f"],
        bgColorIndex = 0;
    var imgReader = function( item ){
        var blob = item.getAsFile(),
            reader = new FileReader();
        // 读取文件后将其显示在网页中
        reader.onload = function( e ){
            insertImg(e.target.result)
        };
        // 读取文件
        reader.readAsDataURL( blob );
    };
    document.getElementById( 'pasteInput' ).addEventListener( 'paste', function( e ){
         // 添加到事件对象中的访问系统剪贴板的接口
        var clipboardData = e.clipboardData,
            i = 0,
            items, item, types;

        if( clipboardData ){
            items = clipboardData.items;
            if( !items ){
                return;
            }
            item = items[0];
            // 保存在剪贴板中的数据类型
            types = clipboardData.types || [];
            for( ; i < types.length; i++ ){
                if( types[i] === 'Files' ){
                    item = items[i];
                    break;
                }
            }
            // 判断是否为图片数据
            if( item && item.kind === 'file' && item.type.match(/^image\//i) ){
                imgReader( item );
            }
        }
    });

    document.querySelector("#toPaste").onclick=function(){
        window.location.href='/';
    };

    //清除图片按钮点击，清除操作台的图片
    document.getElementById( 'clearContent' ).addEventListener( 'click', function( e ){
        var content = document.querySelector(".content"),
            imgs = content.querySelectorAll(".content img"),
            imgsArr = Array.prototype.slice.apply(imgs);
        imgsArr.forEach(function(i){
            content.removeChild(i)
        })
        setInfo()
    })

    window.onload=function(){
        document.getElementById( 'pasteInput' ).focus()
    }

    function insertImg(url){
        var img = new Image();

        img.src = url;
        img.setAttribute("class","thumb")
        document.getElementsByClassName("content")[0].insertBefore(img ,canvas);
        img.onclick=function(){
            this.className=this.className=="thumb"?"real_size":"thumb"
            setInfo()
        }
    }

    //显示信息
    function setInfo(){
        var imgArrs = Array.prototype.slice.apply(document.querySelectorAll(".real_size")),info="0*0"
        if(imgArrs.length != 0){
            var lastRealSize = imgArrs.pop();
            info = lastRealSize.width + "*" + lastRealSize.height
        }
        document.querySelector("#info").innerHTML = info
    }

    
})(); 