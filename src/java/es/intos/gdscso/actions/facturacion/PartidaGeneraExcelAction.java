package es.intos.gdscso.actions.facturacion;

import java.util.Locale;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.util.MessageResources;

import es.intos.gdscso.actions.LogadoBaseAction;
import es.intos.gdscso.forms.partides.PartidaGeneraExcelForm;
import es.intos.gdscso.utils.Recursos;
import es.intos.util.Usuario;

public class PartidaGeneraExcelAction extends LogadoBaseAction{

	@Override
	protected ActionForward executeLogadoAction( ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response, Usuario user ) throws Exception{

		check(Recursos.aplicatiu, user);

		Locale locale = getLocale(request);
		MessageResources missatges = getResources(request);
		PartidaGeneraExcelForm frm = (PartidaGeneraExcelForm) form;
		PartidaGeneraExcel excel = new PartidaGeneraExcel("excel.control.sheet", user, missatges, locale);
		HSSFWorkbook workbook = null;
		workbook = excel.generaExcel(frm);

		flushExcel(missatges.getMessage(locale, "excel.control.sheet"), response, workbook, user);

		return null;
	}

}
