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
window.onload=function(){
	RootNodeFont();
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
		template:'<form role="form"><p class="msg">あなたの怨み、晴らします。</p><div class="form_wrap form-group"><input class="txt form-control" type="text"/></div><div class="form_wrap form-group"><router-link to="/loading" class="btn btn-default">送 信</router-link></router-link></div></form>',
		mounted(){
			document.body.style.backgroundColor='#000000';
			document.body.style.color='#FFFFFF';
			this.$el.children[1].children[0].focus();
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
			component:Jigokutsushin
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
//		mode: 'history',
//		base: __dirname,
		routes
	});
	new Vue({
		el: '#box',
		router
	});
}
