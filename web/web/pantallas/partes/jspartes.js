
var initErrorParams=null ;
function InitErrorParams(txterrornumeric){		
		this.txterrornumeric=txterrornumeric;			
}

function inicio() {      
	$("#divCargando").hide();
	$("#divCargandoImg").hide();
}


var initParams=null ;
function InitParams(txtcontext){		
		this.txtcontext = txtcontext;
}


function buscaPartesNoConfirmats(){	
	var frm = $("#BusquedaNoConformidadesForm")[0];	
	frm.action="/"+initParams.txtcontext+"/PartesAction.do";
	if(!onlyEntero($.trim(frm.f_idfact.value),"f_idfact")){
		return;
	}
	frm.submit();
	waiting();
}

function onlyEntero(value,name){
	  if(value =='' || /^[0-9]*$/.test(value)){
		$('input[name='+name+']').css('border', 'solid 1px rgb(135,155,179)');
		return true;
	}else{
		$('input[name='+name+']').css('border', 'solid 1px red');
		alert(initErrorParams.txterrornumeric);
		return false;
	}
}  

function goToDetall(id){
	
	//obrim el dialog per mostrar info
	 $("#dialog_cliente").dialog("setidFact",id);
	 $("#dialog_cliente").dialog("open");
	 setTimeout(function(){$("#dialog_cliente").dialog({ position: 'center' });},100);

}

function doOrderBy(orderBy) {
	var frm = $("#BusquedaNoConformidadesForm")[0];
	frm.action="/"+initParams.txtcontext+"/PartesAction.do";
  frm.pagina.value="0";
  frm.order_by.value=orderBy;
  frm.submit();
	waiting();
}//doOrderBy

function irPag(pag) {
	var frm = $("#BusquedaNoConformidadesForm")[0];
	frm.action="/"+initParams.txtcontext+"/PartesAction.do";
   frm.pagina.value=pag;
   frm.submit();
	waiting();
}//end irPag

function enviar(id){
	var frm = $("#BusquedaNoConformidadesForm")[0];
	frm.action="/"+initParams.txtcontext+"/PartesAction.do";
	   frm.rpp.value=pag;
	   frm.submit();
		waiting();
	
}

function doFiltro() {
	var frm = $("#BusquedaNoConformidadesForm")[0];
	frm.action="/"+initParams.txtcontext+"/PartesAction.do";
   var ok = false;      
   ok = validateBusquedaGestionFacturasForm(frm);

   if (!ok) {
      return;
   }
   frm.pagina.value="0";
   frm.submit();
	waiting();
}

function generaExcelPartes(){
	var frm = $("#BusquedaNoConformidadesForm")[0];
	frm.action="/"+initParams.txtcontext+"/GeneraExcelParteAction.do";		
	frm.submit();
}








