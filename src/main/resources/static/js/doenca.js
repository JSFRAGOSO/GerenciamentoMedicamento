/**
 * 
 */

$(document).ready(function () {
        event.preventDefault();
        fire_ajax_submit();
        bordaFixaCabecalho();
        //alteraCorCabecalho();
        dataTable();
});

function dataTable(){
	var delayInMilliseconds = 100; //1 second
	setTimeout(function() {
		$('#doencasTable').dataTable( {
		    "oLanguage": {
		      "sSearch": "Pesquisar:",
		      "sInfo": "Registros (_START_ a _END_)",
		      "sLengthMenu": "Exibir _MENU_ registros",
		      "oPaginate": {
		          "sNext": "Próximo",
		          "sPrevious": "Anterior"
		        }
		    }
	    } );
	}, delayInMilliseconds);
}

function bordaFixaCabecalho(){
	$('.header-web .navbar .nav-doencas').removeClass("nav-link");
	$('.header-web .navbar .nav-doencas').addClass("border-fixed");
}

function alteraCorCabecalho(){
    $(window).scroll(function() {    
        var scroll = $(window).scrollTop();
        if (scroll >= 1) {
            $(".header-web").addClass("follower");
            $(".follower").css("background-color", "rgba(0,0,0,0.5)");
        }else{
            $(".header-web").removeClass("follower");
            $(".header-web").css("background-color", "#343a40");
        }
    });
}

function fire_ajax_submit() {
    var search = {}
    search["username"] = $("#username").val();
    $("#btn-search").prop("disabled", true);
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: "/getDoenca",
        //data: JSON.stringify(search),
        dataType: 'json',
        cache: false,
        timeout: 600000,
        success: function (data) {
            var json = "<h4>Ajax Response</h4><pre>"
                + JSON.stringify(data, null, 4) + "</pre>";
            $('#feedback').html(json);
            
            formatData(data);

            console.log("SUCCESS : ", data);
            $("#btn-search").prop("disabled", false);

        },
        error: function (e) {

            var json = "<h4>Ajax Response</h4><pre>"
                + e.responseText + "</pre>";
            $('#feedback').html(json);

            console.log("ERROR : ", e);
            $("#btn-search").prop("disabled", false);

        }
    });
}

function formatData(json){
	doenca = $('#doencasTable');
	$.each(json, function(idx, objD){
		doenca.append('<tr><td class=" d-none d-md-block">' + objD.id + '</td>' + '<td>' + objD.nome + '</td>' + '<td>' + objD.exemplo  + '</td>' + '<td>' + objD.agressivo  + '</td>' + '<td>' + objD.idRemedio + '</td></tr>')
//		doenca.append('<tr><td>' + objD.id + '</td>' + '<td>' + objD.nome + '</td>' + '<td>' + objD.exemplo  + '</td>' + '<td>' + objD.agressivo  + '</td>' + '<td>' + objD.idremedio + '</td></tr>')
//		medicamento.append('<tr><td>' + objM.id + '</td>' + '<td>' + objM.nome + '</td>' + '<td>' + objM.indicacao  + '</td>' + '<td>' + objM.manha  + '</td>' + '<td>' + objM.tarde + '</td>' + '<td>' + objM.noite + '</td></tr>')
	});
}