window.onload = function(){
	let user=document.getElementById('user');
	let pass=document.getElementById('pass');
	let button=document.getElementById('button');

	button.onclick = function(){
		login();
	};
	
	document.onkeydown = function(e){ 
	  var ev = document.all ? window.event : e;
	  if(ev.keyCode==13) {
	    login();
	  }
	}
	
	function login (){
		u=user.value;
		p=pass.value;
		if(u=="zhangsan" && p==12345){
			alert('success')
		}else{
			location.replace('error.html')
		}
	}
}