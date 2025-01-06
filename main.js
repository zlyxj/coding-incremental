//数字格式化
function formatnum(n){
    if(n.lessThan(new D("1e9"))){return Number(String(n.round())).toLocaleString()}
    else if(n.lessThan(new D("1e1000000000"))){return (Math.round(n.mantissa*100)/100)+"e"+Math.floor(n.e).toLocaleString()}
    else if(n.lessThan(new D("1F10"))){return "e"+formatnum(new D(((n.log(10)).times(100)).round().divideBy(100)))}
    else if(n.slog().lessThan(new D(1e9))){return Math.round(100*Number(String(new D(10).tetrate(n.slog().minus(n.slog().floor())))))/100+"F"+formatnum(n.slog().floor())}
    else{return "F"+formatnum(n.slog())}
}
function fmt3dig(n){
    if(n.greaterThanOrEqualTo(new D(1e9))){return formatnum(n)}
    else return (Math.round(n*1000)/1000).toLocaleString()
}
//游戏信息
if(localStorage.CodingIncremental == undefined){
var game={
    codes:new D(1),
    cps:new D(0),
    u1:{
        bought:new D(0),
        price:new D(1)
    },
    u2:{
        bought:new D(0),
        price:new D(15)
    },
    u3:{
        bought:new D(0),
        price:new D(1000)
    },
    imps:[false,false]
}
}
else {
const gamedata=localStorage.getItem("CodingIncremental")
var game=JSON.parse(gamedata)}
//检查是否有缺失的信息
if(game.imps==undefined){
    game.imps=new Array(2)
}
for(var i=0;i<2;i++){
    if(game.imps[i]==undefined)game.imps[i]=false;
}
//以下代码用于将游戏数据转换成Decimal类型
game.codes=new D(game.codes)
game.cps=new D(game.cps)
game.u1.bought=new D(game.u1.bought)
game.u1.price=new D(game.u1.price)
game.u2.bought=new D(game.u2.bought)
game.u2.price=new D(game.u2.price)
game.u3.bought=new D(game.u3.bought)
game.u3.price=new D(game.u3.price)
function getu1price(n){
    return new D(1.2).pow(n)
}
function getu2price(n){
    return new D(1.6).pow(n).times(15)
}
function getu3price(n){
    if((n).lessThan(10)){return new D(50).pow(n).times(1000)}
    else {return getu3price(new D(9)).times(new D(85).pow(n))}
}
function getu3buyable(n){
    if((n).lessThan(1000*Math.pow(50,9)))return n.divideBy(1000).log(50).plus(1).floor().max(0)
    else return new D(9).plus(n.divideBy(1000*Math.pow(50,9)).log(85).plus(1).floor())
}
function update(){//每50ms运行一次的更新函数
    game.cps=(game.u1.bought.times(game.imps[0]?2:1)).plus(1).times((game.u2.bought.plus(1).times(game.imps[1]?1.35:1)).pow(game.u3.bought.plus(1).pow(0.5)))
    game.codes=game.codes.plus(game.cps.times(0.05))
    document.getElementById("codewrote").innerHTML=formatnum(game.codes)
    document.getElementById("codingspeed").innerHTML=formatnum(game.cps)
    document.getElementById("u1effect").innerHTML=formatnum(game.u1.bought)
    document.getElementById("u1price").innerHTML=formatnum(game.u1.price)
    document.getElementById("u2effect").innerHTML=formatnum(game.u2.bought.plus(1))
    document.getElementById("u2price").innerHTML=formatnum(game.u2.price)
    document.getElementById("u3effect").innerHTML=fmt3dig(game.u3.bought.plus(1).pow(0.5))
    document.getElementById("u3price").innerHTML=formatnum(game.u3.price)
    if(game.u3.bought.greaterThanOrEqualTo(9))document.getElementById("u3scaling").innerHTML="<del>坐地起价的</del>遥远的"
    for(var j=0;j<2;j++){
        document.getElementById("i"+(j+1))className=game.imps[j]?"boughtimp":"imp"
    }
}
function buyu1(){
    if(game.codes.greaterThanOrEqualTo(game.u1.price)){
        game.codes=game.codes.minus(game.u1.price)
        game.u1.price=getu1price(game.u1.bought.plus(1))
        game.u1.bought=game.u1.bought.plus(1)
    }
}
function buyu2(){
    if(game.codes.greaterThanOrEqualTo(game.u2.price)){
        game.codes=game.codes.minus(game.u2.price)
        game.u2.price=getu2price(game.u2.bought.plus(1))
        game.u2.bought=game.u2.bought.plus(1)
    }
}
function buyu3(){
    if(game.codes.greaterThanOrEqualTo(game.u3.price)){
        game.codes=game.codes.minus(game.u3.price)
        game.u3.price=getu3price(new D(game.u3.bought.plus(1)))
        game.u3.bought=game.u3.bought.plus(1)
    }
}
function buyu3max(){
    if(game.codes.greaterThanOrEqualTo(game.u3.price)){
        buy=getu3buyable(game.codes).minus(game.u3.bought).floor()
        game.u3.bought=new D(game.u3.bought).plus(buy)
        game.u3.price=game.u3.price.times(new D(50).pow(buy))
        game.codes=game.codes.minus(getu3price(new D(game.u3.bought.minus(1))))
    }
}
function buyu2max(){
    if(game.codes.greaterThanOrEqualTo(game.u2.price)){
        buy=game.codes.divideBy(15).log(1.6).plus(1).minus(game.u2.bought).floor()
        game.u2.bought=game.u2.bought.plus(buy)
        game.u2.price=game.u2.price.times(new D(1.6).pow(buy))
        game.codes=game.codes.minus(getu2price(game.u2.bought.minus(1)))
    }
}
function buyu1max(){
    if(game.codes.greaterThanOrEqualTo(game.u1.price)){
        buy=game.codes.log(1.2).plus(1).minus(game.u1.bought).floor()
        game.u1.bought=game.u1.bought.plus(buy)
        game.u1.price=getu1price(game.u1.bought)
        game.codes=game.codes.minus(getu1price(game.u1.bought.minus(1)))
    }
}
function t1(){
    document.getElementById("tab1").className="tab"
    document.getElementById("tab2").className="hidden"
    document.getElementById("tab3").className="hidden"
}
function t2(){
    document.getElementById("tab2").className="tab"
    document.getElementById("tab1").className="hidden"
    document.getElementById("tab3").className="hidden"
}
function t3(){
    document.getElementById("tab3").className="tab"
    document.getElementById("tab1").className="hidden"
    document.getElementById("tab2").className="hidden"
}
function save(){//保存函数
    localStorage.CodingIncremental=JSON.stringify(game)
}
function imp(a){
if(game.imps[a-1]==false){
switch(a){
    case 1:
        {
            if(game.codes.greaterThanOrEqualTo(1048576)){
                game.codes=game.codes.minus(1048576)
                game.imps[a-1]=true;
                break;
                
            }
        }
    case 2:
        {
            if(game.codes.greaterThanOrEqualTo(2147483647)){
                game.codes=game.codes.minus(2147483647)
                game.imps[a-1]=true
                break;
            }
        }
}
}
}
setInterval(update,50)
setInterval(save,10000)
function hardreset(){
    var confirm=prompt("是否确认重置？这不会解锁任何加成！请输入\"coding incremental reset\"以确认。")
    if(confirm=="coding incremental reset"){
        game={
            codes:new D(1),
            cps:new D(0),
            u1:{
                bought:new D(0),
                price:new D(1)
            },
            u2:{
                bought:new D(0),
                price:new D(15)
            },
            u3:{
                bought:new D(0),
                price:new D(1000)
            }
        }
    }
    else{
        window.alert("重置已取消。")
    }
}
