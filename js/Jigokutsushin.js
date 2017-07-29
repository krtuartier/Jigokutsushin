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
function WeeHours(){
	var _this=this;
	this.now=new Date();
	this.url=window.location+'';
	this.oBox=document.getElementById('box');
	this.oTxt=null;
	this.shine=false;
	this.count=null;
	this.blink=null;
	if ((this.now.getHours()==0&&this.now.getMinutes()<=10)||this.url.indexOf('?0')>=0) {
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
}
WeeHours.prototype.toJigokutsushin=function(){
	this.oBox.innerHTML='<div class="jigokutsushin"><p class="msg">あなたの怨み、晴らします。</p><p class="form_wrap form-group">'+
	'<input class="txt form-control" type="text"/></p><p class="form_wrap form-group"><a href="javascript:oWeeHours.toSubmit();" class="btn btn-default">送 信</a></p></div>';
	this.oTxt=this.oBox.querySelector('.txt');
	this.oTxt.focus();
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
	setTimeout(function(){
		_this.toSuccess();
	},6000);
}
WeeHours.prototype.toSuccess=function(){
	var _this = this;
	this.oBox.innerHTML='<div class="success"><p><i class="glyphicon glyphicon-envelope"></i></p><p>地獄通信</p></div>';
	document.body.style.backgroundColor='#ff6d81';
	document.body.style.color='#000000';
	setTimeout(function(){
		_this.toReceive();
	},3000);
}
WeeHours.prototype.toReceive=function(){
	this.oBox.innerHTML='<div class="receive"><p>受け取りました</p><p>地獄少女</p></div>';
}
Vue.config.keyCodes.enter=13;
var oWeeHours=null;
window.onload=function(){
	RootNodeFont();
	var oBox=document.getElementById('box');
	oBox.innerHTML=navigator.userAgent;
	return;
	if(navigator.userAgent.indexOf('UCBrowser') > -1) {
		oWeeHours=new WeeHours();
	}else{
		var Op={
			template:'<img class="op" src="img/fire.gif"/>',
			created(){
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
			data(){
				return{
					txt:null,
					shine:false,
					count:null,
					blink:null
				}
			},
			methods:{
				getMsg(msg){
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
				submit(){
					router.replace({path:'submit'});
				}
			},
			mounted(){
				document.body.style.backgroundColor='#000000';
				document.body.style.color='#FFFFFF';
				this.$el.children[1].children[0].focus();
			}
		};
		var Submit={
			template:'<div v-show="false"></div>',
			data(){
				return{
					msg:null
				}
			},
			props:['txtval'],
			mounted(){
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
			mounted(){
				document.body.style.backgroundColor='#000000';
				document.body.style.color='#FFFFFF';
				setTimeout(function(){
					router.replace({path:'success'});
				},6000);
			}
		};
		var Success={
			template:'<div class="success"><p><i class="glyphicon glyphicon-envelope"></i></p><p>地獄通信</p></div>',
			mounted(){
				document.body.style.backgroundColor='#ff6d81';
				document.body.style.color='#000000';
				setTimeout(function(){
					router.replace({path:'receive'});
				},3000);
			}
		};
		var Receive={
			template:'<div class="receive"><p>受け取りました</p><p>地獄少女</p></div>',
			mounted(){
				document.body.style.backgroundColor='#ff6d81';
				document.body.style.color='#000000';
			}
		};
		var Notfound404={
			template:'<div class="container not_found_404"><h2>Not Found</h2><p>The request URL was not found on this server.<br />hellish world/1.3.33 Server at Jigokutsushin_net Port 80</p></div>',
			created(){
				var now=new Date();
				if(window.location.search=='?0'||(now.getHours()==0&&now.getMinutes()<=10)){
					router.replace({path:'op'});
				}
			}
		};
		const routes = [
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
		const router = new VueRouter({
			/*mode: 'history',
			base: __dirname,*/
			routes
		});
		new Vue({
			el: '#box',
			router
		});
	}
}
