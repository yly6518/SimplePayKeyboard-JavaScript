/*
 * 密码输入结束重写callFunc
 */
var disappearTime = 100; //键盘消失动画时间
var appearTime = 100; //键盘出现动画时间
var pwd_Array = []; //密码
var if_release = true; //清空
var key_container_h = window.screen.height * 0.55; //键盘&密码框高度
var keyRect_h = window.screen.height * 0.3; //键盘高度
(function() {
	$('.keyCell').each(function(index, obj) {
		obj.addEventListener('tap', function() {
			keyEvent(index);
		})
	}, null);
})();

function closeKeyboard() {
	$('#keyboard_main').animate({
		height: 0
	}, disappearTime, null, function() {
		$('#keyboard_container').hide();
		release();
	});
	$('#keyRect').animate({
		height: 0
	}, disappearTime);
}

function callKeyboard() {
	$('#keyboard_container').show();
	$('#keyboard_main').animate({
		height: key_container_h
	}, appearTime);
	$('#keyRect').animate({
		height: keyRect_h
	}, appearTime);
}

function keyEvent(i) {
	if(i == 9) {
		clearPwd();
	} else if(i == 11) {
		delPwd();
	} else {
		addNumber(i);
	}
}

function clearPwd() {
	pwd_Array = [];
	$('.dot').each(function(index, obj) {
		obj.style.display = 'none';
	});
}

function delPwd() {
	pwd_Array.pop();
	var dots = document.getElementsByClassName('dot');
	dots[pwd_Array.length].style.display = 'none';
}

function addNumber(i) {
	if(pwd_Array.length >= 6) {
		return;
	} else {
		var keyValue = $('.keyCell')[i].innerText;
		pwd_Array.push(keyValue);
		drawDot();
	}
	pwd_Array.length >= 6 ? callFunc() : '';
}

function drawDot() {
	var dots = document.getElementsByClassName('dot');
	var index = pwd_Array.length - 1;
	dots[index].style.display = 'flex';
}

function release() {
	if_release == true ? clearPwd() : '';
}

function prePay() {
	console.log('密码输入结束');
}

function forgetPwd(){
	console.log('忘记密码');
}
