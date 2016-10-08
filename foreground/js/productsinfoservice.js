function getTotalSearchNumber(searchMsg,startPrice,endPrice) {
	$.ajax({type:'POST',
		url:"category/searchcommodity_returnTotalNumber.action", 
		data:{searchMsg:searchMsg,startPrice:startPrice,endPrice:endPrice},
		success:function (result){
		totalNumber = result;
		},
		dataType:"json",
		async:false	
	});
	return totalNumber;
}

function getTotalNumber(map,categoryid,startPrice,endPrice,change) {
	var attributedata = $.toJSON(map.elements);
	$.ajax({type:'POST',
		url:"category/productfilter_returnTotalNumber.action", 
		data:{Args:attributedata,categoryid:categoryid,startPrice:startPrice,endPrice:endPrice,isChange:change},
		success:function (result){
		totalNumber = result;
		},
		dataType:"json",
		async:false	
	});
	return totalNumber;
}
function getProducts(nowPage,map,categoryid,startPrice,endPrice) {
	var data = $.toJSON(map.elements);
	var html = "";
	$.post("category/productfilter_getProducts.action", {initPage:nowPage,Args:data,categoryid:categoryid,startPrice:startPrice,endPrice:endPrice},     
		function (result){
			$("#sellerul").empty();
			$.each(result, function(index,productVO) {
				html += "<li><a href='client/productShow.action?id="+productVO.products.p_id+"'>" +
						"<img src='"+productVO.showURL+"' width='"+imagewidth+"' height='"+imageheight+"' /> </a> <br/>" +
						"<a class='productTitle' href='client/productShow.action?id="+productVO.products.p_id+"' style='width: "+imagewidth+"px;'>"+productVO.products.p_name+"</a><br/>" +
						"<a href='client/productShow.action?id="+productVO.products.p_id+"'><span>"+currencySymbol+calculateFeeByExchangeRate(productVO.products.p_originprice,currencyRate)+"</span></a>"+currencySymbol;
						"<a href='client/productShow.action?id="+productVO.products.p_id+"'>' class='orange'>"+calculateFeeByExchangeRate(productVO.products.p_nowprice,currencyRate)+"</a></li>";
			});
			$("#sellerul").append(html);
		},"json");

	return;
}

/**
 * 基于价格参数，查找具体的商品显示
 * @param url
 * @param nowPage
 * @param map
 * @param categoryid
 * @param startPrice
 * @param endPrice
 */
function getBaseProducts(url,nowPage,map,categoryid,startPrice,endPrice) {
	var htmldata = "";
	$.post("category/productfilter_"+url+".action",{initPage:nowPage,categoryid:categoryid,startPrice:startPrice,endPrice:endPrice},
	function(data) {
		$("#sellerul").empty();
		$.each(data, function(index,atrv) {
			
			htmldata += "<li>";
			htmldata += "<a href='client/productShow.action?id="+atrv.products.p_id+"'><img src='"+atrv.showURL+"' width='"+imagewidth+"' height='"+imageheight+"'> </a><br/>";
			htmldata += "<a class='productTitle' href='client/productShow.action?id="+atrv.products.p_id+"' style='width: "+imagewidth+"px;'>"+atrv.products.p_name+"</a><br/>";
			htmldata += "<a href='client/productShow.action?id="+atrv.products.p_id+"'><span>"+currencySymbol+calculateFeeByExchangeRate(atrv.products.p_originprice,currencyRate)+"</span></a>"+currencySymbol;
			htmldata += "<a href='client/productShow.action?id="+atrv.products.p_id+"' class='orange'>"+calculateFeeByExchangeRate(atrv.products.p_nowprice,currencyRate)+"</a></a>";
			htmldata += "</li>";
		});
		$("#sellerul").append(htmldata);
	});
	return;
}
function getHotProducts(nowPage,map,categoryid,startPrice,endPrice) {
	getBaseProducts("getHotProducts",nowPage,map,categoryid,startPrice,endPrice);
	return;
}
function getRecommendProducts(nowPage,map,categoryid,startPrice,endPrice) {
	getBaseProducts("getRecommendProducts",nowPage,map,categoryid,startPrice,endPrice);
	return;
}
function getNewProducts(nowPage,map,categoryid,startPrice,endPrice) {
	getBaseProducts("getNewProducts",nowPage,map,categoryid,startPrice,endPrice);
	return;
}

function getSearchProducts(pageNum,searchMsg,startPrice,endPrice){
	$.ajax({type:'POST',
		url:"category/searchcommodity_getSearchCommodity.action", 
		data:{searchMsg:searchMsg,initPage:pageNum,startPrice:startPrice,endPrice:endPrice},
		success:function (result){
			$("#sellerul").empty();
			var html = "";
			$.each(result, function(index,productVO) {
				html += "<li><a href='client/productShow.action?id="+productVO.products.p_id+"'>" +
						"<img src='"+productVO.showURL+"' width='"+imagewidth+"' height='"+imageheight+"' /> " +
						"</a> <br/> <a class='productTitle' href='client/productShow.action?id="+productVO.products.p_id+"' style='width: "+imagewidth+"px;'>"+productVO.products.p_name+"</a><br/>" +
						"<a href='client/productShow.action?id="+productVO.products.p_id+"'><span>"+currencySymbol+calculateFeeByExchangeRate(productVO.products.p_originprice,currencyRate)+"</span></a>"+currencySymbol+"" +
						"<a href='client/productShow.action?id="+productVO.products.p_id+"' class='orange'>"+calculateFeeByExchangeRate(productVO.products.p_nowprice,currencyRate)+"</a>";
			});
			$("#sellerul").append(html);
		},
		dataType:"json",
		async:true	
	});
	return;
}
/**
 * 该函数在页面加载时，初始化页面需要分页显示的信息
 */
function getExhibitionProducts(nowPage,map,categoryid,startPrice,endPrice)
{
	getBaseProducts("getExhibitionProducts",nowPage,map,categoryid,startPrice,endPrice);
}
function getPageData(nowPage,map,categoryid,startPrice,endPrice,change)
{
	if(change==false) {
		getExhibitionProducts(nowPage,map,categoryid,startPrice,endPrice);
	}else{
		getProducts(nowPage,map,categoryid,startPrice,endPrice,change);
	}
}
