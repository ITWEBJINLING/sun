let user=document.getElementById('user');
let pass=document.getElementById('pass');
let button=document.getElementById('button');
button.onclick=function(){
	u=user.value;
	p=pass.value;
	if(u=="zhangsan" && p==12345){
		alert('success')
	}else{
		location.replace('error.html')
	}
}