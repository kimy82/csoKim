function inicio() {  
	$("#divCargando").hide();
	$("#divCargandoImg").hide();
	
}

var initParams=null ;
function InitParams(txtcontext){		
		this.txtcontext = txtcontext;
}

function getCompareServeisTable(){
	
	var frm = $("#BusquedaComparativaServeisForm")[0];
	frm.action="/"+initParams.txtcontext+"/admin/MantenimentServAction.do";
	  frm.pagina.value="1";
	  frm.order_by.value="";
	  frm.submit();
		waiting();
}
function doOrderBy(orderBy) {
	var frm = $("#BusquedaComparativaServeisForm")[0];
	frm.action="/"+initParams.txtcontext+"/admin/MantenimentServAction.do";
  frm.pagina.value="1";
  frm.order_by.value=orderBy;
  frm.submit();
	waiting();
}//doOrderBy

function irPag(pag) {
	var frm = $("#BusquedaComparativaServeisForm")[0];
	frm.action="/"+initParams.txtcontext+"/admin/MantenimentServAction.do";
   frm.pagina.value=pag;
   frm.submit();
	waiting();
}//end irPag

function generaExcelServeis(){
	var frm = $("#BusquedaComparativaServeisForm")[0];
	frm.action="/"+initParams.txtcontext+"/GeneraExcelServeisAction.do";		
	frm.submit();
}