<%@ include file="/WEB-INF/jspf/taglibs.jspf" %>
      <ul class="pestanyes">
        <logic:notEmpty name="user" >      
        <logic:notEmpty name="user" property="portal" >      
                <li id="pestanya.ini"><a href="${user.portal}" ><bean:message key="txt.inicio"/></a></li>      
        </logic:notEmpty>        
        </logic:notEmpty>                
        <li id="pestanya.mto"  ><a href="/${initParam.context}/FacturacionPartidasAction.do"><bean:message key="txt.pestana.partidas"/></a></li>
        <li id="pestanya.mto" class="seleccionat" ><a href="#"><bean:message key="txt.pestana.detallpartidas"/></a></li>
      </ul>