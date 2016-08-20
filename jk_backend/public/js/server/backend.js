

var menuId = $( "ul.nav" ).first().attr( "id" );

function approve(fs_id) {
    var request = $.ajax({
        url: "http://localhost:8080/pictureApprove/approve",
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
        url: "http://localhost:8080/pictureApprove/reject",
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
        url: "http://localhost:8080/pictureApprove/delete",
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

