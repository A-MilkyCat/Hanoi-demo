var num,latest_usable_num = 0;
var stuff = new Array; 
var stuff_index = new Array;
function check_num(){ 
    num = document.getElementById("num").value;
    document.getElementById("num").value = "";
    try{
        if (isNaN(num)==true) throw "It's not a number";
        if (num=="") throw "Null";
        HI = Number(num);
        if (num<1) throw "Too small"
        if (num>15) throw "Too big";
    }catch(respond){
        document.getElementById("show_respond").innerHTML = respond;
        return ;
    }
    document.getElementById("show_respond").innerHTML = "";
    for (var i=1;i<=latest_usable_num;i++){
        var brick = document.getElementById(`brick${i}`);
        brick.remove();
    }
    latest_usable_num = num;
    var box = document.getElementById("box1");
    //box.empty();
    for (var i=num;i>=1;i--){
        var brick = document.createElement("div").cloneNode(true);//important!!!
        brick.className = "brick";
       // brick.className = "brick_animation";
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
    var brick1 = document.getElementById("brick2");
}
var t = 0;
function move_brick(){//onclick buttom
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
    t = 1;
    _move(1,2,3,num);
    console.log(t);
}
////////////////////////////////////////////////////////////////
function move_brick_up(num,index,boxA_index,boxB_index){
    var start;
    start = Date.now();
    var brick = document.getElementById(`brick${index}`);
    var boxA = document.getElementById(`box${boxA_index}`);
    var boxB = document.getElementById(`box${boxB_index}`);
    var timer = window.setInterval(function(){
        var timePassed = Date.now()-start;
        if (timePassed>=2000){
            clearInterval(timer);
            return ;
        }
        move_to_top(timePassed,index);
    },20);
}                   /////0-2000
                    /////0-180
function move_to_top(timePassed,index){
    document.getElementById(`brick${index}`).style.bottom = timePassed / (100/9) + 'px';
    // console.log(brick_move);
}
function move_brick_horizontal(num,index,boxA_index,boxB_index){
    var start = Date.now();
    var brick = document.getElementById(`brick${index}`);
    var boxA = document.getElementById(`box${boxA_index}`);
    var boxB = document.getElementById(`box${boxB_index}`);
    var timer = window.setInterval(function(){
        var timePassed = Date.now()-start;
        if (timePassed>=2000){
            clearInterval(timer);
            return ;
        }
        move_to_right(timePassed);
    },20);
    
}                   /////0-2000
                    /////0-200
function move_to_right(timePassed){
    brick1.style.left = timePassed/5  + 'px';
}
function move_brick_down(num,index,boxA_index,boxB_index){
    var start = Date.now();
    var brick = document.getElementById(`brick${index}`);
    var boxA = document.getElementById(`box${boxA_index}`);
    var boxB = document.getElementById(`box${boxB_index}`);
    var timer = window.setInterval(function(){
        var timePassed = Date.now()-start;
        if (timePassed>=2000){
            clearInterval(timer);
            return ;
        }
        //brick1.style.bottom = 200 + "px";
        move_to_bottom(timePassed);
    },20);
}                   /////0-2000
                    /////0-180
function move_to_bottom(timePassed){
    brick1.style.bottom = 180 - timePassed / (100/9) + 'px';
}
//////////////////////////////////////////////
function _move(f1,f2,f3,n){
    if (n==1) {
        var get3 = document.getElementById(`box${f3}`);
        var give1 = document.getElementById(`box${f1}`);
        var givething = document.getElementById(`brick${stuff[f1][stuff_index[f1]]}`);
        stuff_index[f3] += 1;
        stuff[f3][stuff_index[f3]] = stuff[f1][stuff_index[f1]];
        // setTimeout(`move_brick_up(${num},${stuff[f1][stuff_index[f1]]},${f1},${f3})`,1000*(t-1)*3);
        // setTimeout(`move_brick_horizontal(${num},${stuff[f1][stuff_index[f1]]},${f1},${f3})`,1000*(t-1)*3+1000);
        // setTimeout(`move_brick_down(${num},${stuff[f1][stuff_index[f1]]},${f1},${f3})`,1000*(t-1)*3+2000);
        stuff_index[f1] -= 1;
        setTimeout(function(){
            get3.appendChild(givething);
            givething.style.left = 0 + "px";
            givething.style.top = 0 + "px";
        },1000*(t-1)+1000);
        t ++;
	}else{
		 _move(f1,f3,f2,n-1); 
         var get3 = document.getElementById(`box${f3}`);
         var give1 = document.getElementById(`box${f1}`);
         var givething = document.getElementById(`brick${stuff[f1][stuff_index[f1]]}`);
         stuff_index[f3] += 1;
         stuff[f3][stuff_index[f3]] = stuff[f1][stuff_index[f1]];
        //  setTimeout(`move_brick_up(${num},${stuff[f1][stuff_index[f1]]},${f1},${f3})`,1000*(t-1)*3);
        //  setTimeout(`move_brick_horizontal(${num},${stuff[f1][stuff_index[f1]]},${f1},${f3})`,1000*(t-1)*3+1000);
        //  setTimeout(`move_brick_down(${num},${stuff[f1][stuff_index[f1]]},${f1},${f3})`,1000*(t-1)*3+2000);
         stuff_index[f1] -= 1;
         setTimeout(function(){
            get3.appendChild(givething);
            givething.style.left = 0 + "px";
            givething.style.top = 0 + "px";
        },1000*(t-1)+1000);
        t ++;
		_move(f2,f1,f3,n-1);
	}
}