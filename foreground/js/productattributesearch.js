/***********************global variables********************************************/
var flag = 0;//当点击更多标签时的事件
var map = null;  //存储属性信息，在属性查找时使用
var change = false;  //表示是否有过滤属性
/*******************************************************************/
$(document).ready(function() {
	map = new Map();
});
function addAttributeLabel(selectString,elem) 
{
	var eleId="top-"+elem.attr("atrid")+"-"+elem.attr("atrvid");
	var appendString = "<li id='"+eleId+"' class='crumbAttr'><span class='selectAttrValue'>"+ selectString+ "</span><span atrid='"+elem.attr("atrid")+"' atrvid='"+elem.attr("atrvid")+"' class='crumbDelete'></span> </li>";
	$(".crumbSlide-con").append(appendString);
	getPageData(0,map,categoryid,startPrice,endPrice,true); //根据属性查找商品信息，productinfoservice。js
}


function clickAttrValueToAdd(obj) 
{ //点击相应的属性时，把属性添加页面上
	$("#shopping").css("display","");  //显示点击属性的地方可以显示
	var selectString = $(obj).children("a").attr("atrvname");  //得到属性值的名字
	var elem = $(obj).children("a");
	
	if(map.get(elem.attr("atrid"))==null)
	{//MAP 中还没有此属性信息
		var atrArgs = new List();
		map.put(elem.attr("atrid"), atrArgs);
		atrArgs.add(elem.attr("atrvid"));
		addAttributeLabel(selectString,elem);
	} 
	else 
	{//MAP 中有此属性信息
		var atrArgs = map.get(elem.attr("atrid"));
		if(!atrArgs.constains(elem.attr("atrvid"))) 
		{//不包含此属性值，才进行添加
			atrArgs.add(elem.attr("atrvid"));
			addAttributeLabel(selectString,elem);
		}
		else
			return; //已经有次属性，直接返回
	}
	
	if(map.size()!=0)
	{
		change = true; //表示是否有过滤属性
		totalNumber = getTotalNumber(map,categoryid,startPrice,endPrice,change);
		buildPageTable(totalNumber);
	}
	return;
}

/**
 * 点击相应的属性时的动作
 * @param categoryid
 */
function registEvents(categoryid)
{
	
	/*点击属性折叠按钮时的动作*/
	$("#filterPanelLeft").on("click",".filter-title",
		function(){
			var classString=$(this).parents(".filterblock").attr("class");
			if(classString.indexOf("filter-active") != -1)
			{//已经显示，转为不显示
//				$(this).parents(".filterblock").children(".selectorsblock").css("display","none");
				$(this).parents(".filterblock").removeClass("filter-active");
				$(this).parents(".filterblock").find(".arrow-icon").addClass("arrow-icon-open");
				
			}
			else
			{
				$(this).parents(".filterblock").addClass("filter-active");
				$(this).parents(".filterblock").find(".arrow-icon").removeClass("arrow-icon-open");
			}

			
		}
	
	);
	
	/*点击具体属性时的动作*/
	$("#filterPanelLeft ").on("click","li",
		function(){
			var classString=$(this).attr("class");
			if(classString.indexOf("selected") != -1)
			{//已经被选中，转为不选中
				$(this).removeClass("selected");
				
				attrtopToDel($(this).attr("atrid"),$(this).attr("atrvid"));//把上边的商品属性取消掉
				
				clickAttrValueToDel(this);
				
			}
			else
			{//选中
				$(this).addClass("selected");
				clickAttrValueToAdd(this); 
			}

			
		}
	
	);
	


	$("#selectAttrs").on("click", ".crumbDelete", function() 
	{ // 点击删除按钮时移除选择的属性
		clickAttrValueToDel(this);
	});
}

/**
 * 点击左边显示的商品属相过滤按钮时
 * 把右边的商品属性选中状态取消掉
 * @param atrid
 * @param atrvid
 */
function attrtopToDel(atrid,atrvid)
{
	var eleId="top-"+atrid+"-"+atrvid;
	$("#"+eleId).remove();
}

/**
 * 点击上边显示的商品属相过滤按钮时
 * 把左边的商品属性选中状态取消掉
 * @param atrid
 * @param atrvid
 */
function attrLeftToDel(atrid,atrvid)
{
	var eleId="left-"+atrid+"-"+atrvid;
	$("#"+eleId).removeClass("selected");
}

function clickAttrValueToDel(obj)
{//点击删除按钮时，把选择的属性值删除
	
	var elem = $(obj);
	
	attrLeftToDel(elem.attr("atrid"),elem.attr("atrvid")); //把左边的商品属性选中状态取消掉
	
	if(map.get(elem.attr("atrid"))!=null)
	{
		var atrArgs = map.get(elem.attr("atrid"));  //根据属性id从map中查找 获取value，也就是属性值列表
		atrArgs.remove(atrArgs.getIndex(elem.attr("atrvid")));  //在属性值列表中，删除这个属性值
		if(atrArgs.size()==0)
		{//如果属性值列表等于0，删除该属性
			map.remove(elem.attr("atrid"));
		}
	}
	
	if(map.size()==0)
	{
		$("#shopping").css("display","none");  //没有属性值可以显示，隐藏掉
		change = false;  //是否有相应的用户过滤属性
		$("#sellerul").empty();
		getPageData(0,map,categoryid,startPrice,endPrice,false);
	} 
	else
	{
		getPageData(0,map,categoryid,startPrice,endPrice,true);
	}
	totalNumber = getTotalNumber(map,categoryid,startPrice,endPrice,change);
	buildPageTable(totalNumber);
	$(obj).parent(".crumbAttr").remove();
	return;
}

/**
 * 更多标签时的事件
 * @param element
 */
function moreChange(element) {
	if (flag == 0) {
		$(element).children(".ui-more-drop-l-arrow").css({
			"background-position" : "-2px -84px"
		});
		$(element).children(".opentiontext").text("收起");
		flag = 1;
	} else if (flag == 1) {
		
		$(element).children(".ui-more-drop-l-arrow").css({
			"background-position" : "-2px -78px"
		});
		$(element).children(".opentiontext").text("更多");
		flag = 0;
	}

}

function getAllAttribute(categoryid) {
	$.getJSON("category/category_getAllAttribute.action?categoryid="+categoryid, function(data) {
		var html = "";
		$.each(data, function(index,atrv) {
			
			html += "<div class='filterblock wbsize show'>";
			//属性名字
			html += "<div class='filter-title'>";
			html += "<i class='arrow-icon arrow-icon-open'></i>"+atrv.atr.attrName+"<a class='reset'>Сбросить</a>";
			html += "</div>";
				
			//属性值
			html += "<div class='selectorsblock custom-scroll'>";
			html += "<ul id='wbsize_list_left' style='opacity: 1;'>";
			
			//属性值
			$.each(atrv.valueList, function(index,value) {
				var eleId="left-"+atrv.atr.attrId+"-"+value.atrValue.attrValueId;
				html += "<li atrid='"+atrv.atr.attrId+"' atrvid='"+value.atrValue.attrValueId+"'  id='"+eleId+"' class=''><a atrid='"+atrv.atr.attrId+"' atrvid='"+value.atrValue.attrValueId+"' atrvname='"+value.atrValue.attrValueName+"' href='javascript:void(0)'>"+"<i class='pseudocheckbox'></i>"+value.atrValue.attrValueName+"<span style='display: none;'>(5)</span></a></li>";
			});
			html += "</ul><div class='progress' style='display: none;'></div></div>";					
			html += "</div>";
		});
		$("#filterPanelLeft").append(html);
	});
	
}