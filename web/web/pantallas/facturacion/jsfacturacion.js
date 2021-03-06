
function inicio() {      
	$("#divCargando").hide();
	$("#divCargandoImg").hide();
}
function filtrar(){
	oTablePartidas.fnDeleteRow( 0 );
	oTableTotalPartidas.fnDeleteRow( 0 );
}


///////////////////////////////////
//variables per textos en locale
var initTableParams=null ;
function InitTableParams(txtlast,txtnext,txtprevious,txtfirst,txtloading,txterrorsesio,txtNodata){		
		this.txtlast=txtlast;
		this.txtnext=txtnext;
		this.txtprevious=txtprevious;
		this.txtfirst=txtfirst;
		this.txtloading=txtloading;
		this.txterrorsesio=txterrorsesio;
		this.txtNodata=txtNodata;
}

var initParams=null ;
function InitParams(txtcontext){				
		this.txtcontext = txtcontext;
}
//recarrega la taula de partides
function loadTable(){
	oTablePartidas.fnDeleteRow( 0 );
	oTableTotalPartidas.fnDeleteRow( 0 );
}

function openDetallPartida(id){
	
	window.location.href="/"+initParams.txtcontext+"/DetallePartidaAction.do?id="+id;
}

var oTablePartidas=null;
var oTableTotalPartidas=null;
$(document).ready(function() {
	
	oTablePartidas =$('#partidas_result').dataTable( {
			"iDisplayLength": 20,
			 "aoColumns" : [
			                  {"mDataProp":"partida", sWidth: '144px'},
			                  {"mDataProp":"ene", sWidth: '50px',"sClass": "centerNum"},
			                  {"mDataProp":"feb", sWidth: '50px',"sClass": "centerNum"},
			                  {"mDataProp":"mar", sWidth: '50px',"sClass": "centerNum"},
			                  {"mDataProp":"abr", sWidth: '50px',"sClass": "centerNum"},
			                  {"mDataProp":"mai", sWidth: '50px',"sClass": "centerNum"},
			                  {"mDataProp":"jun", sWidth: '50px',"sClass": "centerNum"},
			                  {"mDataProp":"jul", sWidth: '50px',"sClass": "centerNum"},
			                  {"mDataProp":"ago", sWidth: '50px',"sClass": "centerNum"},
			                  {"mDataProp":"set", sWidth: '50px',"sClass": "centerNum"},
			                  {"mDataProp":"oct", sWidth: '50px',"sClass": "centerNum"},
			                  {"mDataProp":"nov", sWidth: '50px',"sClass": "centerNum"},
			                  {"mDataProp":"des", sWidth: '50px',"sClass": "centerNum"}
			            ],
			"sPaginationType": "full_numbers",
			"oLanguage": {
				  "sProcessing": "<img src='/ParticipadasIntosWeb/extjs/images/large-loading.gif' style='vertical-align:middle'>&nbsp;"+initTableParams.txtloading,
				  "sEmptyTable": initTableParams.txtNodata,
			      "oPaginate": {
			        "sFirst": "<img src='/ParticipadasIntosWeb/web/img/modelos/icono-paginador-inicio.gif' style='vertical-align:middle'>&nbsp;"+initTableParams.txtfirst,
			        "sLast": initTableParams.txtlast+"&nbsp;<img src='/ParticipadasIntosWeb/web/img/modelos/icono-paginador-fin.gif' style='vertical-align:middle'>",
			        "sNext": initTableParams.txtnext+"&nbsp;<img src='/ParticipadasIntosWeb/web/img/modelos/icono-paginador-siguiente.gif' style='vertical-align:middle'>",
			        "sPrevious": "<img src='/ParticipadasIntosWeb/web/img/modelos/icono-paginador-anterior.gif' style='vertical-align:middle'>&nbsp;"+initTableParams.txtprevious
			      }
			    },
			"sScrollY": "300",		    
			"sScrollX": "645",	
		    "bScrollCollapse": true,
    		"bProcessing": false,
    		"bServerSide": true,
    		 "fnInitComplete": function() {
    			 oTablePartidas.fnAdjustColumnSizing();
		         },

    		"sAjaxSource": '/'+initParams.txtcontext+'/AjaxTablePartidesAction.do',
    		"fnServerData": function( sUrl, aoData, fnCallback) {      			
    			waiting();
    			
    			var idany =$("#f_any").val();    			
    			aoData.push({"name":"idany", "value":idany});
     		$.ajax( {
            	"url": sUrl,
            	"data": aoData,              
            	"dataType": "json",
            	"cache": false,
           		"success":function(json){
           			if(json.error!=null){
           				$("#errorsajaxlabel").text(json.error);
                		$("#errorsajax").show();
           			}else{
	           			$("#iTotalRecords").html(json.iTotalRecords);     
	           			$("#partidas_result_paginate").hide();
	            		fnCallback(json);
           			}
           			
            		hideWaiting();
            	},
            	"error":function(e){ 
            		$("#errorsajaxlabel").text(initTableParams.txterrorsesio);
            		$("#errorsajax").show();
            		hideWaiting();
            	}
        	} );
    	}
	} );
	
	oTableTotalPartidas =$('#facpart_result').dataTable( {
		"iDisplayLength": 20,
		 "aoColumns" : [
		                  {"mDataProp":"partida", sWidth: '256px'},
		                  {"mDataProp":"importpactat", sWidth: '150px',"sClass": "centerNum"},
		                  {"mDataProp":"importestimat", sWidth: '150px',"sClass": "centerNum"},
		                  {"mDataProp":"importconsumit", sWidth: '150px',"sClass": "centerNum"},
		                  {"mDataProp":"rentabilitat", sWidth: '150px',"sClass": "centerNum"}	                  
		            ],
		"sPaginationType": "full_numbers",
		"oLanguage": {
			  "sProcessing": "<img src='/ParticipadasIntosWeb/extjs/images/large-loading.gif' style='vertical-align:middle'>&nbsp;"+initTableParams.txtloading,
			  "sEmptyTable": initTableParams.txtNodata,
		      "oPaginate": {
		        "sFirst": "<img src='/ParticipadasIntosWeb/web/img/modelos/icono-paginador-inicio.gif' style='vertical-align:middle'>&nbsp;"+initTableParams.txtfirst,
		        "sLast": initTableParams.txtlast+"&nbsp;<img src='/ParticipadasIntosWeb/web/img/modelos/icono-paginador-fin.gif' style='vertical-align:middle'>",
		        "sNext": initTableParams.txtnext+"&nbsp;<img src='/ParticipadasIntosWeb/web/img/modelos/icono-paginador-siguiente.gif' style='vertical-align:middle'>",
		        "sPrevious": "<img src='/ParticipadasIntosWeb/web/img/modelos/icono-paginador-anterior.gif' style='vertical-align:middle'>&nbsp;"+initTableParams.txtprevious
		      }
		    },
		"sScrollY": "300",		    
		"sScrollX": "645",	
	    "bScrollCollapse": true,
		"bProcessing": false,
		"bServerSide": true,
		 "fnInitComplete": function() {
			 oTableTotalPartidas.fnAdjustColumnSizing();
	         },

		"sAjaxSource": '/'+initParams.txtcontext+'/AjaxTableFacturacionPartidesAction.do',
		"fnServerData": function( sUrl, aoData, fnCallback) {      			
			waiting();
			
			var idany =$("#f_any").val();    			
			aoData.push({"name":"idany", "value":idany});
 		$.ajax( {
        	"url": sUrl,
        	"data": aoData,              
        	"dataType": "json",
        	"cache": false,
       		"success":function(json){    
       			if(json.error!=null){
       				$("#errorsajaxlabel").text(json.error);
            		$("#errorsajax").show();
       			}else{
       				$("#facpart_result_paginate").hide();
       				fnCallback(json);
       			}
       			
        		hideWaiting();
        	},
        	"error":function(e){ 
        		$("#errorsajaxlabel").text(initTableParams.txterrorsesio);
        		$("#errorsajax").show();
        		hideWaiting();
        	}
    	} );
	}
} );
	
	$("#facpart_result tbody").click(function(event) {	
		if(event.target.parentNode.firstChild.firstChild!=null ){
			var id=event.target.parentNode.firstChild.firstChild.id;
			$("#"+id).click();
		}else {
			var id=event.target.parentNode.firstChild.id;
			$("#"+id).click();
		}
	});
	$("#partidas_result tbody").click(function(event) {	
		if(event.target.parentNode.firstChild.firstChild!=null ){
			var id=event.target.parentNode.firstChild.firstChild.id;
			$("#"+id).click();
		}else {
			var id=event.target.parentNode.firstChild.id;
			$("#"+id).click();
		}
	});
	
	$("#errorsajax").hide();
} );













