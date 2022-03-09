var num,latest_usable_num = 0;
var stuff = new Array; 
var stuff_index = new Array;
var step = 1, is_moving = false;
var every_step = new Array;
//  步驟.給.收  為一數字 ex 第一步 1給3 --> 113
function check_num(){ 
    num = document.getElementById("num").value;
    document.getElementById("num").value = "";
    try{
        var k = 0;
        if (isNaN(num)==true) throw "It's not a number";
        if (num=="") throw "Null";
        k = Number(num);
        if (k<1) throw "Too small"
        if (k>15) throw "Too big";
    }catch(respond){
        document.getElementById("show_respond").innerHTML = respond;
        num = latest_usable_num;
        return ;
    }
    document.getElementById("show_respond").innerHTML = "";
    /////////////////////////////////召喚方塊
    for (var i=1;i<=latest_usable_num;i++){
        var brick = document.getElementById(`brick${i}`);
        brick.remove();
    }
    latest_usable_num = Number(num);
    var box = document.getElementById("box1");
    //box.empty();
    for (var i=num;i>=1;i--){
        var brick = document.createElement("div").cloneNode(true);//important!!!
        brick.className = "brick";
        brick.id = `brick${i}`;
        brick.innerHTML = i;
        box.append(brick);
    }
    for (var i=1;i<=num;i++){
        var brick_image = document.getElementById(`brick${i}`);
        switch (i%4){
            case 0: brick_image.style['background-color'] = 'red';break;
            case 1: brick_image.style['background-color'] = 'purple';break;
            case 2: brick_image.style['background-color'] = 'gold';break;
            case 3: brick_image.style['background-color'] = 'green';break;
        }
        brick_image.style.width = i*(180/num) +'px';
    }
    step = 1;
    every_step = new Array;
    for (var i=1;i<=3;i++){
        stuff[i] = new Array;
        if (i==1)
            for (var j=num ; j>=1 ; j--){
                stuff[i][j] = num-j+1;
            }
        else{
            for (var j=num ; j>=1 ; j--){
                stuff[i][j] = 0;
            }
        }
    } 
    stuff_index[1] = num;
    stuff_index[2] = 0;
    stuff_index[3] = 0;
    pre_move(1,2,3,num);
    step = 1;
    console.log(every_step)
}
var t = 0;
function pre_move(f1, f2, f3, n){
    if (n==1) {
        every_step[step] = f3 + 10*f1 + 100*step;
        step ++;
	}else{
        pre_move(f1,f3,f2,n-1); 
        every_step[step] = f3 + 10*f1 + 100*step;
        step ++;
        pre_move(f2,f1,f3,n-1);
	}
}
function auto_move(){//onclick buttom
    if (step != 1){
        document.getElementById("show_respond").innerText = "初始狀態才可自動";
        return;
    }
    t = 1;
    _move(1,2,3,num);
    console.log(step);
}
function _move(f1,f2,f3,n){
    if (n==1) {
        var get3 = document.getElementById(`box${f3}`);
        var give1 = document.getElementById(`box${f1}`);
        var givething = document.getElementById(`brick${stuff[f1][stuff_index[f1]]}`);
        stuff_index[f3] += 1;
        stuff[f3][stuff_index[f3]] = stuff[f1][stuff_index[f1]];
        stuff_index[f1] -= 1;
        setTimeout(function(){
            get3.appendChild(givething);
            givething.style.left = 0 + "px";
            givething.style.top = 0 + "px";
        },1000*(t-1)+1000);
        t ++;
        every_step[step] = f3 + 10*f1 + 100*step;
        step ++;
	}else{
            _move(f1,f3,f2,n-1); 
            /////////////
        // 以下是依給三
            var get3 = document.getElementById(`box${f3}`);
            var give1 = document.getElementById(`box${f1}`);
            var givething = document.getElementById(`brick${stuff[f1][stuff_index[f1]]}`);
            stuff_index[f3] += 1;
            stuff[f3][stuff_index[f3]] = stuff[f1][stuff_index[f1]];
            stuff_index[f1] -= 1;
            setTimeout(function(){
            get3.appendChild(givething);
            givething.style.left = 0 + "px";
            givething.style.top = 0 + "px";
        },1000*(t-1)+1000);
        t ++;
        every_step[step] = f3 + 10*f1 + 100*step;
        step ++;
		_move(f2,f1,f3,n-1);
	}
}
function Prev(){
    console.log(every_step)
    if (is_moving == true){
        document.getElementById("show_respond2").innerText = "Box is moving";
        return;
    }
    if (step <= 1){
        return;
    }else{
        step = step-1;
        var givebox = every_step[step] % 10;
        var give1 = document.getElementById(`box${givebox}`)
        var buffer = parseInt(every_step[step] / 10);
        var getbox = buffer % 10;
        var get = document.getElementById(`box${getbox}`)
        console.log(givebox, getbox)
        var givething = document.getElementById(`brick${stuff[givebox][stuff_index[givebox]]}`);
        stuff_index[getbox] += 1;
        stuff[getbox][stuff_index[getbox]] = stuff[givebox][stuff_index[givebox]];
        stuff_index[givebox] -= 1;
        get.appendChild(givething);
    }
}
function Next(){
    var respond;
    if (is_moving == true){
        respond = document.getElementById("show_respond2")
        respond.innerText = "Box is moving";
        return;
    }
    if (step >= Math.pow(2, num)){
        return;
    }else{
        var getbox = every_step[step] % 10;
        var buffer = parseInt(every_step[step] / 10);
        var givebox = buffer % 10;
        var give1 = document.getElementById(`box${givebox}`)
        var get1 = document.getElementById(`box${getbox}`)
        console.log(givebox, getbox)
        var givething = document.getElementById(`brick${stuff[givebox][stuff_index[givebox]]}`);
        stuff_index[getbox] += 1;
        stuff[getbox][stuff_index[getbox]] = stuff[givebox][stuff_index[givebox]];
        stuff_index[givebox] -= 1;
        get1.appendChild(givething);
        step += 1;
    }
}