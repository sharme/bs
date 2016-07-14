/**
 * Created by yao on 4/6/16.
 */


$(document).ready(function() {
    
    $("#login_btn").click(function(){
        $("#login-popup").css("display", "block");
        $(".login-cover").css("display", "block");
        $("body").css("overflow","hidden");
    });

    $('.login-popup-header-del').click(function(){
        $("#login-popup").css("display", "none");
        $(".login-cover").css("display", "none");
        $("body").css("overflow","auto");
    });
    
    $("#login-popup").css("display", "none");
    
});







