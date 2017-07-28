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
		document.body.innerHTML='<video id="vd" controls="controls"><source src="img/fire.mp4" type="video/mp4"></source></video>';
		var oVd=document.getElementById('vd');
		oVd.play();
		var handler=setInterval(function(){
			if (oVd.ended) {
				document.body.removeChild(oVd);
				document.body.innerHTML='<div class="margintop"></div><form role="form"><p class="msg">あなたの怨み、晴らします。</p><div class="form_wrap form-group"><input class="txt form-control" type="text"/></div><div class="form_wrap form-group"><input class="btn" type="button" value="送 信" /></div></form>';
				document.querySelector('.txt').focus();
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
