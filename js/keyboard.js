/*
 *
 */
var disappearTime = 100; //键盘消失动画时间
var appearTime = 100; //键盘出现动画时间
var pwd_Array = []; //密码
var key_container_h = window.screen.height * 0.55; //键盘&密码框高度
var keyRect_h = window.screen.height * 0.3; //键盘高度
var if_release = true; //清空
var if_random = true; //随机键

(function() {
	$('.keyCell').each(function(index, obj) {
		obj.addEventListener('tap', function() {
			keyEvent(index);
		})
	}, null);
}());

function getRandomKeyvalue() {
	if(if_random) {
		var number_arr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
		var func_arr = ['c', 'del'];
		var new_arr = [];
		var circleTimes = number_arr.length;
		var keycell = $('.keyCell');

		for(var i = 0; i < circleTimes; i++) {
			var index = Math.floor(Math.random() * number_arr.length);
			var elem = number_arr[index];
			new_arr.push(elem);
			number_arr.splice(index, 1);
		}

		new_arr.splice(9, 0, func_arr[0]);
		new_arr.splice(11, 9, func_arr[1]);
		for(var i = 0; i < keycell.length; i++) {
			keycell[i].innerText = new_arr[i];
		}

	} else {
		var number_arr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'c', '0', 'del'];
		var keycell = $('.keyCell');
		for(var i = 0; i < keycell.length; i++) {
			keycell[i].innerText = number_arr[i];
		}
	}
}

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
	getRandomKeyvalue();
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
	pwd_Array.length >= 6 ? prePay() : '';
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
	console.log(pwd_Array);
}

function forgetPwd() {
	console.log('忘记密码');
}