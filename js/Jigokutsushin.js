function RootNodeFont(){
	if (nGV.indexOf('MSIE 8.0')<0) {
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
}
function gquery(query,parent){
	if (parent) {
		return parent.querySelector(query);
	} else{
		return document.querySelector(query);
	}
}
function WeeHours(){
	var _this=this;
	this.now=new Date();
	this.url=window.location+'';
//	this.oBox=document.getElementById('box');
	this.oBox=gquery('#box');
	this.oTxt=null;
	this.oFire=null;
	this.shine=false;
	this.count=null;
	this.blink=null;
	this.oOp=null;
	this.oMsg=null;
	this.oJigokutsushin=null;
	this.oLoading=null;
	this.oSuccess=null;
	this.oReceive=null;
	if ((this.now.getHours()==0&&this.now.getMinutes()<=10)||this.url.indexOf('?0')>=0||this.url.indexOf('Jigokutsushin0')>=0) {
		document.body.style.backgroundColor='#000000';
		document.body.style.color='#FFFFFF';
		this.toOp();
		setTimeout(function(){
			_this.toJigokutsushin();
		},2000);
	} else{
		document.body.style.backgroundColor='#FFFFFF';
		document.body.style.color='#000000';
		this.toNotFound();
	}
}
WeeHours.prototype.toNotFound=function(){
	this.oBox.innerHTML='<div class="container not_found_404"><h2>Not Found</h2><p>The request URL was not found on this server.<br />hellish world/1.3.33 Server at Jigokutsushin_net Port 80</p></div>';
}
WeeHours.prototype.toOp=function(){
	this.oBox.innerHTML='<img class="op" src="img/fire.gif"/>';
	if (nGV.indexOf('MSIE 8.0')>-1) {
		this.oOp=gquery('.op',this.oBox);
		this.oOp.style.display='block';
		this.oOp.style.margin='10% auto';
	}
}
WeeHours.prototype.toJigokutsushin=function(){
	this.oBox.innerHTML='<div class="jigokutsushin"><p class="msg">あなたの怨み、晴らします。</p><p class="form_wrap form-group">'+
	'<input class="txt form-control" type="text"/></p><p class="form_wrap form-group"><a href="javascript:oWeeHours.toSubmit();" class="btn btn-default">送 信</a></p></div>';
	this.oTxt=gquery('.txt',this.oBox);
	this.oTxt.focus();
	if (nGV.indexOf('MSIE 8.0')>-1) {
		this.oBox.style.fontSize='33px';
		this.oMsg=gquery('.msg',this.oBox);
		this.oJigokutsushin=gquery('.jigokutsushin',this.oBox);
		this.oJigokutsushin.style.margin='10% auto';
		this.oTxt.style.boxSizing='content-box';
		this.oTxt.style.width='305px';
		this.oTxt.style.height='35px';
		this.oTxt.style.fontSize='33px';
		this.oTxt.style.borderWidth='5px';
	}
}
WeeHours.prototype.toSubmit=function(){
	if (this.oTxt.value=='') {
		var _this = this;
		clearInterval(_this.blink);
		this.blink = setInterval(function() {
			_this.count += 1;
			if(_this.count < 7) {
				if(!_this.shine) {
					_this.oTxt.style.borderColor = '#ff6d81';
					_this.shine = !_this.shine;
				} else {
					_this.oTxt.style.borderColor = '#66afe9';
					_this.shine = !_this.shine;
				}
			} else {
				clearInterval(_this.blink);
				_this.shine = false;
				_this.count = null;
				_this.blink = null;
			}
		}, 200);
	}else{
		this.toLoading();
	}
}
WeeHours.prototype.toLoading=function(){
	var _this = this;
	this.oBox.innerHTML='<div class="loading"><i class="glyphicon glyphicon-hourglass"></i></div>';
	if (nGV.indexOf('MSIE 8.0')>-1) {
		this.oLoading=this.oBox.querySelector('.loading');
		this.oLoading.style.margin='20% auto';
		this.oLoading.style.fontSize='80px';
	}
	setTimeout(function(){
		_this.toSuccess();
	},6000);
}
WeeHours.prototype.toSuccess=function(){
	var _this = this;
	this.oBox.innerHTML='<div class="success"><p><i class="glyphicon glyphicon-envelope"></i></p><p>地獄通信</p></div>';
	document.body.style.backgroundColor='#ff6d81';
	document.body.style.color='#000000';
	if (nGV.indexOf('MSIE 8.0')>-1) {
		this.oSuccess=this.oBox.querySelector('.success');
		this.oSuccess.style.margin='10% auto';
		this.oSuccess.style.fontSize='80px';
	}
	setTimeout(function(){
		_this.toReceive();
	},3000);
}
WeeHours.prototype.toReceive=function(){
	this.oBox.innerHTML='<div class="receive"><p>受け取りました</p><p>地獄少女</p></div>';
	if (nGV.indexOf('MSIE 8.0')>-1) {
		this.oReceive=this.oBox.querySelector('.receive');
		this.oReceive.style.margin='10% auto';
		this.oReceive.style.fontSize='80px';
	}
}
var nGV=navigator.appVersion+'';
if (nGV.indexOf('MSIE 8.0')<0) {
	Vue.config.keyCodes.enter=13;
}
var oWeeHours=null;
window.onload=function(){
	RootNodeFont();
	if(nGV.indexOf('UCBrowser')>-1||nGV.indexOf('MSIE')>-1) {
		oWeeHours=new WeeHours();
	}else{
		var Op={
			template:'<img class="op" src="img/fire.gif"/>',
			created:function(){
				document.body.style.backgroundColor='#000000';
				document.body.style.color='#FFFFFF';
				setTimeout(function(){
					router.replace({path:'Jigokutsushin'});
				},2000);
			}
		};
		var Jigokutsushin={
			template:'<div class="jigokutsushin"><p class="msg">あなたの怨み、晴らします。</p><p class="form_wrap form-group">'+
			'<input v-model="txt" @keyup.enter="submit()" class="txt form-control" type="text"/></p>'+
			'<p class="form_wrap form-group"><router-link to="/submit" class="btn btn-default">送 信</router-link></p>'+
			'<router-view @txt-msg="getMsg" :txtval="txt"></router-view></div>',
			data:function(){
				return{
					txt:null,
					shine:false,
					count:null,
					blink:null
				}
			},
			methods:{
				getMsg:function(msg){
					if(msg==0){
						var _this=this;
						clearInterval(_this.blink);
						this.blink=setInterval(function(){
							_this.count+=1;
							if(_this.count<7){
								if(!_this.shine){
									_this.$el.children[1].children[0].style.borderColor='#ff6d81';
									_this.shine=!_this.shine;
								}else{
									_this.$el.children[1].children[0].style.borderColor='#66afe9';
									_this.shine=!_this.shine;
								}
							}else{
								clearInterval(_this.blink);
								_this.shine=false;
								_this.count=null;
								_this.blink=null;
							}
						},200);
					}
				},
				submit:function(){
					router.replace({path:'submit'});
				}
			},
			mounted:function(){
				document.body.style.backgroundColor='#000000';
				document.body.style.color='#FFFFFF';
				this.$el.children[1].children[0].focus();
			}
		};
		var Submit={
			template:'<div v-show="false"></div>',
			data:function(){
				return{
					msg:null
				}
			},
			props:['txtval'],
			mounted:function(){
				if(this.txtval==''||this.txtval==null){
					this.msg=0;
					this.$emit('txt-msg',this.msg);
					msg=null;
					router.replace({path:'jigokutsushin'});
				}else{
					router.replace({path:'loading'});
				}
			}
		};
		var Loading = {
			template: '<div class="loading"><i class="glyphicon glyphicon-hourglass"></i></div>',
			mounted:function(){
				document.body.style.backgroundColor='#000000';
				document.body.style.color='#FFFFFF';
				setTimeout(function(){
					router.replace({path:'success'});
				},6000);
			}
		};
		var Success={
			template:'<div class="success"><p><i class="glyphicon glyphicon-envelope"></i></p><p>地獄通信</p></div>',
			mounted:function(){
				document.body.style.backgroundColor='#ff6d81';
				document.body.style.color='#000000';
				setTimeout(function(){
					router.replace({path:'receive'});
				},3000);
			}
		};
		var Receive={
			template:'<div class="receive"><p>受け取りました</p><p>地獄少女</p></div>',
			mounted:function(){
				document.body.style.backgroundColor='#ff6d81';
				document.body.style.color='#000000';
			}
		};
		var Notfound404={
			template:'<div class="container not_found_404"><h2>Not Found</h2><p>The request URL was not found on this server.<br />hellish world/1.3.33 Server at Jigokutsushin_net Port 80</p></div>',
			created:function(){
				var now=new Date();
				if(window.location.search=='?0'||(now.getHours()==0&&now.getMinutes()<=10)){
					router.replace({path:'op'});
				}
			}
		};
		var routes = [
			{
				path:'/op',
				component:Op
			},
			{
				path:'/jigokutsushin',
				component:Jigokutsushin,
				children:[
					{
						path:'/submit',
						component:Submit
					}
				] 
			},
			{
				path: '/loading',
				component: Loading
			},
			{
				path: '/success',
				component: Success
			},
			{
				path: '/receive',
				component: Receive
			},
			{
				path:'*',
				redirect: '/notfound404'
			},
			{
				path:'/notfound404',
				component:Notfound404
			}
		];
		var router = new VueRouter({
			/*mode: 'history',
			base: __dirname,*/
			routes:routes
		});
		new Vue({
			el: '#box',
			router:router
		});
	}
}
