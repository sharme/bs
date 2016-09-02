
CKEDITOR.dialog.add("simpleimagebrowser-dialog",
    function(){
        return{
            title:"选择图片",minWidth:450,minHeight:260,maxWidth:800,maxHeight:260,
            contents:[
                {
                    id:"tab-step1",
                    label:"Browse for images",
                    elements:[
                        {
                            type:"html",
                            align:"left",
                            id:"titleid",
                            style:"font-size: 20px; font-weight: bold;",
                            html:"浏览图片"
                        },{
                            type:"html",
                            align:"left",
                            id:"msg",style:"",
                            html:'<div id="imageBrowser"></div>'}
                    ]
                }
                // {
                //     id:"tab-step2",
                //     label:"About this plugin",
                //     elements:[
                //         {
                //             type:"html",
                //             align:"left",
                //             id:"framepreviewtitleid",
                //             style:"font-size: 20px; font-weight: bold;",
                //             html:"About this author"
                //         },{
                //             type:"html",
                //             align:"left",
                //             id:"descriptionid",
                //             style:"position:relative;width:800px;",
                //             html:'EpicSoftworks released this plugin for free under the MIT licence.' +
                //             '<br />You are free to use this for personal, educational or commercial use.' +
                //             '<br /><br />Free as in, the freedom to use.<br />' +
                //             '<br /><a href="http://epicsoftworks.nl/" target="_blank">Visit my  >></a>'
                //         }
                //     ]
                // }
            ]
        }
    }
),CKEDITOR.plugins.add("simpleimagebrowser",
    {
        init:function(a){
            "undefined"==typeof
                CKEDITOR.config.simpleImageBrowserListType
                &&(CKEDITOR.config.simpleImageBrowserListType="thumbnails"),
                a.on("dialogShow",function(a)
                {
                    var b;
                    b = a.data,
                    "simpleimagebrowser-dialog"=== b.getName() && $.get(CKEDITOR.config.simpleImageBrowserURL,
                    function(a){
                        var b;
                        console.log("JSON DATA: " + a);
                        return console.log(a),b = a, a = "",
                            $.each(b, function(b,c){
                                a="thumbnails"===CKEDITOR.config.simpleImageBrowserListType?a+ "<div onclick=\"CKEDITOR.tools.simpleimagebrowserinsertpicture('"+c.url+"');\" " +
                                "style=\"position:relative;width:135px;height: 130px;;display:inline-block;margin:5px;background-image:url('"+c.url+"');background-repeat:no-repeat;background-size:125%;background-position:center center;float:left;\"></div>":"link"}),
                            $("#imageBrowser").html(a)})
                }),a.addCommand("simpleimagebrowser-start",
                new CKEDITOR.dialogCommand("simpleimagebrowser-dialog")),
                CKEDITOR.tools.simpleimagebrowserinsertpicture=function(b){
                    var c,d;console.log(b),
                        a=CKEDITOR.currentInstance,
                        c=CKEDITOR.dialog.getCurrent(),
                        d='<img src="'+b+'" width="100%" data-cke-saved-src="'+b+'" alt="'+b+'"/>',
                        a.config.allowedContent=!0,
                        a.insertHtml(d.trim()),
                        c.hide()},
                a.ui.addButton("Simple Image Browser",{label:"Simple Image Browser ",command:"simpleimagebrowser-start",icon:this.path+"images/icon.png"})}});