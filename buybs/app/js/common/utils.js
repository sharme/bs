/**
 * Created by yao on 4/6/16.
 */


$(document).ready(function() {
    
    $("#login_btn").click(function(){
        $("#login-popup").css("display", "block");
    });

    $('.login-popup-header-del').click(function(){
        $("#login-popup").css("display", "none");
    });
    
    $("#login-popup").css("display", "none");
    
});







