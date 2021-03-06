
function inicio() {      
	$("#divCargando").hide();
	$("#divCargandoImg").hide();
}

function goToInicio(){
	window.location.href="/"+initParams.txtcontext+"/portal.do";
	waiting();	
}

function onlyDouble(value,name){
	  var n=value.split(".");
	  if(n.length==1){
		  value=value+".00";
	  }
	  if(value =='' || /^[0-9]*\.[0-9]*$/.test(value)){
		$('input[id='+name+']').css('border', 'solid 1px rgb(135,155,179)');
	}else{
		$('input[id='+name+']').css('border', 'solid 1px red');
		alert(initErrorParams.txtnumericerror);
	}
} 

function openDialogFactores(){
	$("#factura_factors").dialog("open");
}

function closeDialogFactores(){
	$("#factura_factors").dialog("close");
}

function guardarFactors(){

	var frm =  $("#factorsForm")[0];

	if(confirm(initErrorParams.txtConfirmChangeFc)){			
		frm.ene.value =document.getElementById("i_1").value;
		frm.feb.value =document.getElementById("i_2").value;
		frm.mar.value =document.getElementById("i_3").value;
		frm.abr.value =document.getElementById("i_4").value;
		frm.mai.value =document.getElementById("i_5").value;
		frm.jun.value =document.getElementById("i_6").value;
		frm.jul.value =document.getElementById("i_7").value;
		frm.ago.value =document.getElementById("i_8").value;
		frm.set.value =document.getElementById("i_9").value;
		frm.oct.value =document.getElementById("i_10").value;
		frm.nov.value =document.getElementById("i_11").value;
		frm.des.value =document.getElementById("i_12").value;
		frm.code.value=factura.factHomonima;	
		frm.submit();
	}
}

///////////////////////////////////
//variables per textos en locale
var initTableParams=null ;
function InitTableParams(txtlast,txtnext,txtprevious,txtfirst,txtloading,txtempty){		
		this.txtlast=txtlast;
		this.txtnext=txtnext;
		this.txtprevious=txtprevious;
		this.txtfirst=txtfirst;
		this.txtloading=txtloading;
		this.txtempty = txtempty;	
		
}
var initErrorParams=null ;
function InitErrorParams(txterrorHomonima,txtnumericerror,txtConfirmChangeFc, txtnoserveis,txterrorsesio,txtemptyfactura){		
		this.txterrorHomonima=txterrorHomonima;	
		this.txtnumericerror=txtnumericerror;
		this.txtConfirmChangeFc=txtConfirmChangeFc;
		this.txtnoserveis=txtnoserveis;
		this.txterrorsesio=txterrorsesio;
		this.txtemptyfactura=txtemptyfactura;
}

var initParams=null ;
function InitParams(txtcontext){		
		this.txtcontext = txtcontext;
}



//objecte per guardar la factura
function Factura(id){
	this.facturaId=id;
	this.arraySrv = new Array();
	this.nSrv=0;
	this.setSrv= function(srv){
		 this.arraySrv[this.nSrv]=srv;
		 this.nSrv += 1;
	};	
	this.deleteSrv= function(id){
		var arrayBis = this.arraySrv;
		var num=this.nSrv;
		  $.each(this.arraySrv, function(i, item) {
			  if(item.id==id){
				  //borrem
				 
				  arrayBis.splice(i, 1);
				 num= num-1;
			  }
			  
  		   });	
		  this.nSrv=num;
		  this.arraySrv=arrayBis;
	};
}
Array.prototype.toString= function(){
	var str="";
	  $.each(this, function(i, item) {
		  str=str+","+item.id+":";
		  if(item.saveSrv=="save"){
			 str=str+"save";
		  }else if (item.deleteSrv=="delete"){
			  str=str+"delete"; 
		  }
		
	  });
	  return str;
	
};

//Objecte srv de la factura
function Srv(id,saveOrDeleteSrv){
	this.id=id;
	this.saveSrv="";
	this.deleteSrv="";
	if(saveOrDeleteSrv=="save"){
		this.saveSrv="save";
	} else if(saveOrDeleteSrv=="delete"){
		this.deleteSrv="delete";
	}
}

var factura = null;
var oTableSrvFact=null;
$(document).ready(function() {
	
	
	oTableSrvFact = $('#facsrv_res').dataTable( {
		"iDisplayLength": 20,
		 "aoColumns" : [
		                  {"mDataProp":"servei", sWidth: '176px'},
		                  {"mDataProp":"factura", sWidth: '177px'},		                  		                			               
		                  {"mDataProp":"estatFactura", sWidth: '277px', "bSortable": false}
		            ],
		"sPaginationType": "full_numbers",
		"oLanguage": {
			  "sProcessing": "<img src='/ParticipadasIntosWeb/extjs/images/large-loading.gif' style='vertical-align:middle'>&nbsp;"+initTableParams.txtloading,
			  "sEmptyTable": initTableParams.txtempty,
		      "oPaginate": {
		        "sFirst": "<img src='/ParticipadasIntosWeb/web/img/modelos/icono-paginador-inicio.gif' style='vertical-align:middle'>&nbsp;"+initTableParams.txtfirst,
		        "sLast": initTableParams.txtlast+"&nbsp;<img src='/ParticipadasIntosWeb/web/img/modelos/icono-paginador-fin.gif' style='vertical-align:middle'>",
		        "sNext": initTableParams.txtnext+"&nbsp;<img src='/ParticipadasIntosWeb/web/img/modelos/icono-paginador-siguiente.gif' style='vertical-align:middle'>",
		        "sPrevious": "<img src='/ParticipadasIntosWeb/web/img/modelos/icono-paginador-anterior.gif' style='vertical-align:middle'>&nbsp;"+initTableParams.txtprevious,
		        "sEmptyTable": initTableParams.txtempty,
		        "sInfoEmpty": "No entries to show",
		        "sZeroRecords": "No records to display"
		      }
		    },
		"sScrollY": "200px",	
		"sScrollX": "700px",	
	    "bScrollCollapse": false,
		"bProcessing": true,
		"bServerSide": true,
		"sAjaxSource": '/'+initParams.txtcontext+'/AjaxTableModifFactAction.do',
		"fnServerData": function( sUrl, aoData, fnCallback) {   
			
			var idfactura = document.getElementById("idfacturaXXX");
			aoData.push({"name":"idfactura", "value":idfactura.value});
					
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
       				fnCallback(json);
       			}
      
       	},
       	"error":function(e){ 
       		$("#errorsajaxlabel").text(initErrorParams.txterrorsesio);
    		$("#errorsajax").show();
    		hideWaiting();}
		} );
		}
	} ); 
	var facturaId = document.getElementById("idfacturaXXX");
	factura = new Factura(facturaId.value);


	$("#factura_factors").dialog({
		autoOpen : false,
		modal : true,
		autoSize : true,
		position : 'center',
		height : 540,
		width : 500,
		resizable : 'false',
		open : function(event, ui) {
			$(".ui-dialog-titlebar").hide();
			data = "codefactura="+factura.factHomonima;
			$.ajax({
				  type: "POST",
				  url: '/'+initParams.txtcontext+'/AjaxLoadFactorsFacturaAction.do',
				  dataType: 'json',
				  data: data,
				  success: function(json){	
					  if(json.error!=null){
	           				$("#errorsajaxlabel").text(json.error);
	                		$("#errorsajax").show();
	           			}else{
							  $.each(json.aaData, function(i, item) { 
								document.getElementById("i_"+item.month).value=item.factor;		
							  });		
	           			}
					  hideWaiting();
				  },
				  error: function(e){ 
						$("#errorsajaxlabel").text(initErrorParams.txterrorsesio);
	            		$("#errorsajax").show();
	            		hideWaiting();
				  }
				});	
		}
	}).parent().find('.ui-dialog-titlebar-close').hide();
	
	$("#errorsajax").hide();
} );




function saveFactServer(){
	var frm = $("#ModificarFacturasForm")[0];
	var str =factura.arraySrv.toString(); 
	if(str.indexOf("save")==-1){
		alert(initErrorParams.txtemptyfactura);
		return;
	}
	frm.serveis.value=factura.arraySrv.toString();
	frm.idFactura.value=factura.facturaId;
	frm.submit();
	waiting();
}

function saveSrvIntoFacturaObject(check){

	//teiem  servei de la factura
	if(factura!=null){
		factura.deleteSrv(check.id);
	}
	var srv=null;
	if(check.checked==true){
		srv = new Srv(check.id,"save");		
	}else{
		srv = new Srv(check.id,"delete");
	}
	
	if(factura!=null){
		factura.setSrv(srv);
	}		
	
}
