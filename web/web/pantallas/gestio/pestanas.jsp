<%@ include file="/WEB-INF/jspf/taglibs.jspf" %>
      <ul class="pestanyes">
        <logic:notEmpty name="user" >      
        <logic:notEmpty name="user" property="portal" >      
                <li id="pestanya.ini"><a href="${user.portal}" ><bean:message key="txt.inicio"/></a></li>      
        </logic:notEmpty>        
        </logic:notEmpty>                
        <li id="pestanya.mto" ><a href="PreBusquedaGestionFacturasAction.do"><bean:message key="txt.pestanya.gestio"/></a></li>
        <li id="pestanya.mto" class="seleccionat" ><a href="#" ><bean:message key="txt.pestanya.detall"/></a></li>
      </ul>