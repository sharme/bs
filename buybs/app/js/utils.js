/**
 * Created by yao on 4/6/16.
 */


function upload(){
    // alert('first');
    var file_data = $("#imageName-btn").prop('files')[0];
    var form_data = new FormData();
    form_data.append("file", file_data);

    $.ajax({
        url: "http://127.0.0.1:8081/api/uploadPhotos",
        // dataType: "multipart/form-data",
        contentType: false,
        data: form_data,
        processData: false,
        cache: false,
        type: "POST",
        success: function (res) {
            // alert(res);
            $("#register_shop-product-image").css("background-image", 'url(' + res + ')');
            $("#register_shop-shopImage-1").val(res);
            $("#imageName-btn").css("display", "none");
        }
    });
}


$(document).ready(function() {
    
    $("#login_btn").click(function(){
        $("#login_popup").css("display", "block");
    });

    $('#login_popup-header-del').click(function(){
        $("#login_popup").css("display", "none");
    });


    //
    // $("#register_form-submit").click(function(){
    //     var phoneNumber = $("#login_form-phoneNumber").val();
    //     var password = $("#login_form-password").val();
    //
    //     var data = {
    //         phoneNumber: phoneNumber,
    //         password: password
    //     };
    //     $.ajax({
    //         url: "http://127.0.0.1:8081/api/userService/login",
    //         dataType: "json",
    //         data: data,
    //         type: "post",
    //         success: function (res) {
    //             // alert(res);
    //             if(!res) {
    //                 $("#login_invalid").css("display", "block");
    //             }else {
    //                 $("#login_popup").css("display", "none");
    //                 window.location.href = "#"
    //             }
    //         }
    //     });
    //
    // });




        /** Ajax submit a Form, disadvantage is form can not be inside of another form.  **/
        // $("#uploadForm").ajaxSubmit(function(res){
        //       alert(res);
        //     $("#register_shop-product-image").css("background-image", 'url(' + res + ')');
        //     $("#imageName-btn").css("display", "none");
        // });
    // }

        $("#login_popup").css("display", "none");

});



