<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<base href="<%=basePath%>">
<meta charset="UTF-8">
<title>Full Layout - jQuery EasyUI Demo</title>
<link rel="stylesheet" type="text/css" href="css/easyui.css">
<link rel="stylesheet" type="text/css" href="css/icon.css">
<link rel="stylesheet" type="text/css" href="css/demo.css">

<link rel="stylesheet" type="text/css"
	href="jqladmin/css/product_attribute.css">
<link rel="stylesheet" type="text/css" href="css/admin_full.css">

<link rel="stylesheet" href="jqladmin/css/add_product_attribute.css"
	type="text/css">
<link rel="stylesheet" type="text/css" href="jqladmin/css/table.css">
<link rel="stylesheet" type="text/css" href="jqladmin/css/font.css">
<link rel="stylesheet" type="text/css" href="jqladmin/css/rentclick.css">
<link rel="stylesheet" type="text/css" href="jqladmin/css/inputstyle.css">

<script type="text/javascript" src="jqladmin/js/jquery-1.9.1.js"></script>

<!--  ueditor 编辑器需要的js -->
<script src="ueditor/ueditor.config.js"></script>
<script src="ueditor/ueditor.all.min.js"></script>
<link rel="stylesheet" type="text/css"	href="ueditor/themes/default/css/ueditor.css" />


<script type="text/javascript" src="jqladmin/js/product.js"></script>
<script src="jqladmin/js/left-right.js" type="text/javascript"></script>
<script src="ckeditor/ckeditor.js"></script>
<script src="ckeditor/assets/uilanguages/languages.js"></script>

<!-- 本页需要的css -->
<link rel="stylesheet" type="text/css"	href="jqladmin/product/commoditymanagement/css/table.css">

<c:if test="${success=='true'}"> 
<SCRIPT type="text/javascript">
	$(document).ready(function() {
		alert("修改成功");
	});
</SCRIPT>
</c:if>
</head>

<body>
	<div id="header">
		<%@ include file="../../Header.jsp"%>
	</div>
	<div id="container">
		<div id="content">
			<div id="contentInnerWraper" style="min-height: 100%;">
				<div class="picBox" onclick="switchSysBar()" id="switchPoint"></div>
				<div id="show_content_div">
					<div>
					${texttype1}
						<center>
						<div class="tipsDiv">已经填写的</div>
						<c:forEach items="${multAtrs}" var="multAtrs">
							<!-- <hr/> -->
							<form action="cm/managementmultatr_updateMultAttribute" method="post">
							  <table border="1"  class="altrowstable">
								<tr>
									<td>语种</td>
									<td>内容</td>
									<td>title</td>
									<td>keywords</td>
									<td>description</td>
									<td>操作</td>
								</tr>
										<tr>
											<td>${multAtrs.languageName}
											<input type="hidden" name="texttype" value="${texttype}" />
											<input type="hidden" name="p_id" value="${p_id}" />
											<input type="hidden" name="atrName_id" value="${atrName_id}" />
											<input type="hidden" name="atrValueML.id" value="${multAtrs.id}" />
											<input type="hidden" name="atrValueML.lan_id" value="${multAtrs.lan_id}" />
											<input type="hidden" name="atrValueML.attrvalue_id" value="${multAtrs.attrvalue_id}" />
											</td>
											<td>
											<c:if test="${texttype==1}">
											<input type="text" name="atrValueML.name" value="${multAtrs.name}"/>
											</c:if>
											<c:if test="${texttype==3}">
											<textarea rows="5" cols="20" id="${multAtrs.id}tx" name="atrValueML.name">
											${multAtrs.name}
											</textarea>
											</c:if>
											<script  type="text/javascript">
														    var editor = UE.getEditor("${multAtrs.id}tx",{
														    	 //autoHeightEnabled: true,
														    	 autoFloatEnabled: true,
														    	 initialFrameWidth: 400,
														         initialFrameHeight: 100,
														    });
											</script>
											</td>
											<td><input type="text" name="atrValueML.title" value="${multAtrs.title}"/></td>
											<td><input type="text" name="atrValueML.keywords" value="${multAtrs.keywords}"/></td>
											<td><input type="text" name="atrValueML.description" value="${multAtrs.description}"/></td>
											<td><input type="submit" value="修改"></td>											
										</tr>
								</table>
							</form>
						   </c:forEach>
						   
						<div class="tipsDiv">还没填写的</div>
							<c:forEach items="${languages}" var="language">
							<form action="cm/managementmultatr_insertMultAttribute" method="post">
								<table border="1" class="altrowstable">
									<tr>
										<td>语种</td>
										<td>内容</td>
										<td>title</td>
										<td>keywords</td>
										<td>description</td>
										<td>操作</td>
									</tr>
									<tr>
											<td>${language.languageName}
											<input type="hidden" name="texttype" value="${texttype}" />
											<input type="hidden" name="p_id" value="${p_id}" />
											<input type="hidden" name="atrName_id" value="${atrName_id}" />
											<input type="hidden" name="atrValueML.lan_id" value="${language.id}" />
											<input type="hidden" name="atrValueML.attrvalue_id"	value="${attrValue_id}" />
											</td>
											<td>
											<c:if test="${texttype==1}">
											<input type="text" name="atrValueML.name"/>
											</c:if>
											<c:if test="${texttype==3}">
											<!--name="${language.id}"  name="atrValueML.name" -->
											<textarea rows="5" cols="20" id="${language.id}"  name="atrValueML.name" >
											</textarea>
											</c:if>
											<script  type="text/javascript">
														    var editor = UE.getEditor("${language.id}",{
														    	 //autoHeightEnabled: true,
														    	 autoFloatEnabled: true,
														    	 initialFrameWidth: 400,
														         initialFrameHeight: 100,
														    });
											</script>
											</td>
											<td><input type="text" name="atrValueML.title"/></td>
											<td><input type="text" name="atrValueML.keywords"/></td>
											<td><input type="text" name="atrValueML.description"/></td>
											<td><input type="submit" value="添加"></td>
									</tr>
								</table>
							</form>
							</c:forEach>
						</center>
					</div>
				</div>

			</div>

		</div>


		<div id="side">
			<center>
				<%@ include file="../productCommon.jsp"%>
			</center>
		</div>
		<div id="rightSide"></div>
	</div>
</body>
</html>
