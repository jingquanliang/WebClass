<%@ page language="java" import="java.util.*"
	contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<base href="<%=basePath%>">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title></title>


<!-- header以下布局 -->
<link href="foreground/css/secondstyle.css" rel="stylesheet" type="text/css" />
<!--商品分类侧边栏 -->
<link href="foreground/css/secondsider.css" rel="stylesheet" type="text/css" />
<!-- 首页header页面滚动图布局样式css -->
<link href="foreground/css/secondimageplay.css" rel="stylesheet" type="text/css" />
<!-- js和jquery相关 -->
<script type="text/javascript" src="js/json2.js"></script>
<script type="text/javascript" src="js/jquery-1.10.2.js"></script>
<script type="text/javascript" src="jquery-ui/jquery-ui.js"></script>
<link rel="stylesheet" type="text/css" href="jquery-ui/jquery-ui.css"/>
<script type="text/javascript" src="foreground/js/jquery.json.js"></script>


<link href="jqladmin/product/commoditymanagement/pagination.css" rel="stylesheet" type="text/css" />
<link href="jqladmin/product/commoditymanagement/page-list.css"	rel="stylesheet" type="text/css" />
	
	
<script type="text/javascript" src="js/math.js"></script>
<script type="text/javascript" >
	var categoryid = ${categoryid}; //点击的category的id
	var totalNumber = ${totalNumber};
	var routeCategoryFloorTitle="${route}";
	
	var imageheight = ${categoryExhibitionSize.height};
	var imagewidth = ${categoryExhibitionSize.width};
</script>

<script type="text/javascript" src="common/js/imagePlay.js"></script>
<script type="text/javascript" src="foreground/js/secondlevelpage.js"></script>
<script type="text/javascript" src="foreground/js/productattributesearch.js"></script>
<script type="text/javascript" src="foreground/js/jsmap.js"></script>

<script type="text/javascript" src="foreground/js/pagelabelconstruct.js"></script>
<script type="text/javascript" src="foreground/js/pricerange.js"></script>
<script type="text/javascript" src="foreground/js/productsinfoservice.js"></script>
<script type="text/javascript">
	$(document).ready(function() {
		handleCategoryFloorTitle(routeCategoryFloorTitle);////获取分类 secondlevelpage.js
		getNavigation(categoryid);  //获取分类 secondlevelpage.js
		getRollImage(categoryid);   //在secondlevelpage.js
		getAllAttribute(categoryid);  //在productattributesearch.js
		getExhibitionProducts(0,map,categoryid,0,2147483647);   //map is in productattributesearch.js
		registEvents(categoryid);//注册事件，productsinfoservice.js，主要注册的是点击属性 的事件
		buildPageTable(totalNumber);  // pagelabelconstruct.js
		registerEventLister();//上一页  下一页  的动作  pagelabelconstruct.js
		registerPriceLister(false);//价格区间  pricerange.js
	});
</script>
</head>

<body>

<div class="trunkOld">

	<div id="header">
		<%@ include file="../common/header/headermenu.jsp"%>
		<%@ include file="../common/header/secondheader.jsp"%>

	</div>


	<!--！！！！！！！！！！！！！！！！！！！ 之下的代码是你需要真正使用的，需要到时候用js（切记：因为js的用户体验非常好）生成！！！！！！！！！！！！！！！！！！-->
	<div id="second-category-menu">

		<div id="lagout-three">

			<div class="lagout-three-r">
				<div class="category-image-paly">

					<div id="focus">
						<ul id="rollimg">

						</ul>
					</div>
				</div>
				<!--  小图不再显示
				<div class="play-image-bottom">

					<div id="image-bottom-list">
						<ul id="staticimg">


						</ul>
					</div>
				</div>
				 -->
				<div style="clear:both"></div>
				<div id="seller">
					<div class="categoryTips breadcrumbs" id="categoryFloorTitle">

					</div>
					<div id="shopping">
						<div id="selectContainer">
				
							<span id="selectAttrs">
								<ul class="crumbSlide-con clearfix" id="J_CrumbSlideCon">
								</ul> 
							</span>
						</div>
					</div>
					<div style="clear:both"></div>
					<ul id="sellerul">
			
					</ul>
					<div style="clear:both"></div>
					<div class="digg" id="diggId"></div>
				</div>
			</div>

			<div class="lagout-three-l">
				<div class="second-cateogry-list">
					<div class="m" id="sortlist">
						<div id="navigationdiv" class="mc">
							<ul class="sidemenu"> <!-- 商品分类 -->

							  </ul>
							  <!-- 商品过滤属性 -->
							  <div id="filterPanelLeft" class="filters" data-base-filter-url="/catalog/zhenshchinam/odezhda">
							  </div>
						
						</div>
					</div>
					<!-- end of m -->
				</div>
				<!-- end of second-cateogry-list -->
			</div>
		</div>
		<!-- end of lagout-three -->
	</div>

	<div style="clear:both"></div>
	<!-- ----------------------------------------------------------------------------------- -->
	<div id="footer">
		<%@ include file="../common/header/footer.jsp"%>
	</div>
	<!-- ----------------------------------------------------------------------------------- -->
	<!-- ----------------------------------防止用户在查询期间多次点击------------------------------------------------- -->
	<div id="catalog-overlay" style="display: none; "></div>
 </div>
</body>
</html>
