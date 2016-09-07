
var ipaddress = 'http://180.76.152.112';

var menuId = $( "ul.nav" ).first().attr( "id" );

function approve(fs_id) {
    var request = $.ajax({
        url: ipaddress + "/pictureApprove/approve",
        method: "POST",
        data: { fs_id : fs_id },
        dataType: "html"
    });
    request.done(function( msg ) {
        alert("approved");
        window.location.reload();
    });

    request.fail(function( jqXHR, textStatus ) {
        alert( "Request failed: " + textStatus );
    });
}

function reject(fs_id) {
    var request = $.ajax({
        url: ipaddress + "/pictureApprove/reject",
        method: "POST",
        data: { fs_id : fs_id },
        dataType: "html"
    });
    request.done(function( msg ) {
        alert("rejected");
        window.location.reload();
    });

    request.fail(function( jqXHR, textStatus ) {
        alert( "Request failed: " + textStatus );
    });
}

function del(fs_id) {
    var request = $.ajax({
        url: ipaddress + "/pictureApprove/delete",
        method: "POST",
        data: { fs_id : fs_id },
        dataType: "html"
    });
    request.done(function( msg ) {
        alert("deleted");
        window.location.reload();
    });

    request.fail(function( jqXHR, textStatus ) {
        alert( "Request failed: " + textStatus );
    });
}

