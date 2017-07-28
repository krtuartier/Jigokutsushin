/**
 * 
 * @param {Object} obj
 * @param {Object} attr
 * @param {Object} val
 */
function css(obj, attr, val) {
	if (arguments.length == 3) {
		if (obj.currentStyle && attr == 'opacity') {
			obj.style.filter = 'alpha(opacity:' + val + ')';
		} else if (attr == 'opacity') {
			obj.style[attr] = val / 100;
		} else {
			obj.style[attr] = val;
		}
	} else if (arguments.length == 2) {
		if (obj.currentStyle) {
			if (attr == 'opacity') {
				return parseInt(obj.currentStyle.filter.split(':'));
			} else {
				return parseInt(obj.currentStyle[attr]);
			}
		} else {
			if (attr == 'opacity') {
				return parseInt(Math.round(getComputedStyle(obj, null)[attr] * 100));
			} else {
				return parseInt(getComputedStyle(obj, null)[attr]);
			}
		}
	}
}
/**
 * 
 * @param {Object} obj
 * @param {Object} json
 * @param {Object} fn
 */
function animation(obj, json, fn) {
	clearInterval(obj.timeHandler);
	obj.timeHandler = setInterval(function() {
		var stop = true;
		for (var attr in json) {
			var cur = css(obj, attr);
			var target = json[attr];
			if (cur != target) {
				var speed = (target - cur) / 5;
				speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
				if (attr == 'opacity') {
					css(obj, attr, cur + speed);
				} else {
					css(obj, attr, cur + speed + 'px');
				}
				stop = false;
			}  
		}
		if (stop){
			clearInterval(obj.timeHandler);
			if (fn) {
				fn;
			}
		}
	}, 30);
}
function RootNodeFont(){
	if (window.screen.width<=750) {
		this.html=document.documentElement;
		this.hWidth=this.html.getBoundingClientRect().width;
		this.html.style.fontSize=this.hWidth/15+"px";
	}else{
		this.html=document.documentElement;
		this.hWidth=this.html.getBoundingClientRect().width;
		this.html.style.fontSize=this.hWidth/30+"px";
	}
} 
function weeHours(){
	var now=new Date();
	var url=window.location+'';
	if ((now.getHours()==0&&now.getMinutes()<=10)||url.indexOf('?0')>=0) {
		document.body.style.backgroundColor='#000000';
		document.body.style.color='#FFFFFF';
		document.body.innerHTML='<video id="vd"><source src="img/fire.mp4" type="video/mp4"></source></video><div class="margintop"></div><form role="form"><p class="msg">あなたの怨み、晴らします。</p><div class="form_wrap form-group"><input class="txt form-control" type="text"/></div><div class="form_wrap form-group"><input class="btn" type="button" value="送 信" /></div></form>';
		var oVd=document.getElementById('vd');
		oVd.play();
		var handler=setInterval(function(){
			if (oVd.ended) {
				animation(oVd,{'opcaity':0},(function(){				
					document.body.removeChild(oVd);
					document.querySelector('.txt').focus();
				})());
				clearInterval(handler);
			}
		},1);
	} else{
		document.body.style.backgroundColor='#FFFFFF';
		document.body.style.color='#000000';
		document.body.innerHTML='<div class="margintop"></div><div class="container not_found_404"><h2>Not Found</h2><p>The request URL was not found on this server.<br />hellish world/1.3.33 Server at Jigokutsushin_net Port 80</p></div>';
	}
}
window.onload=function(){
	weeHours();
	RootNodeFont();
}
