const PU_LENGTH=6;
//const D=Decimal

//数字格式化
//如果不合法会返回Invalid Notation!
function formatnum(n,f=game.notation){
    if(String(n)=='NaN')return 'NaN';
    if(f=="sci"){
    if(n.lessThan(new D("1e9"))){return Number(String(n.round())).toLocaleString()}
    else if(n.lessThan(new D("1e1000000000"))){return ((n.mantissa*100)/100).toFixed(2)+"e"+Math.floor(n.e).toLocaleString()}
    else if(n.lessThan(new D("1F10"))){return "e"+formatnum(new D(((n.log(10)).times(100),f).round().divideBy(100)))}
    else if(n.slog().lessThan(new D(1e9))){return (Number(String(new D(10).tetrate(n.slog().minus(n.slog().floor()))))).toFixed(2)+"F"+formatnum(n.slog().floor(),f)}
    else{return "F"+formatnum(n.slog(),f)}
    }
    else if(f=="std"){
        var illion_e0=['','U','D','T','Qa','Qi','Sx','Sp','Oc','No'];
        var illion_e1=['','Dc','Vg','Tg','Qag','Qig','Sxg','Spg','Og','Ng'];
        var illion_e2=['','Ce','DCe','TCe','Qae','Qie','SCe','Spe','Oe','Ne'];
        if(n.log10().lessThan(3e12)){
            ill=Math.floor((n.e -3)/3)
            function floor(a){
                return Math.floor(a);
            }
            man=n.mantissa*Math.pow(10,n.e%3);
            if(Math.abs(man-1000)<0.01){
                man=1;
                ill+=1;
            }
            if(ill<-1)return formatnum(n,'sci')
            if(ill==-1)return String(Math.round(man));
            if(ill==0)return man.toFixed(1)+" K";
            if(ill==1)return man.toFixed(1)+" M";
            if(ill==2)return man.toFixed(1)+" B";
            if(ill<1000)return man.toFixed(1)+" "+illion_e0[ill%10]+illion_e1[floor(ill%100/10)]+illion_e2[floor(ill%1000/100)];
            if(ill<1000000)return man.toFixed(1)+" "+illion_e0[floor(ill%10000/1000)]+illion_e1[floor(ill%100000/10000)]+illion_e2[floor(ill%1000000/100000)]+"Mi"+illion_e0[ill%10]+illion_e1[floor(ill%100/10)]+illion_e2[floor(ill%1000/100)];
            if(ill<1000000000)return man.toFixed(1)+" "+illion_e0[floor(ill%10000000/1000000)]+illion_e1[floor(ill%100000000/10000000)]+illion_e2[floor(ill%1000000000/100000000)]+"Mc"+illion_e0[floor(ill%10000/1000)]+illion_e1[floor(ill%100000/10000)]+illion_e2[floor(ill%1000000/100000)]+"Mi"+illion_e0[ill%10]+illion_e1[floor(ill%100/10)]+illion_e2[floor(ill%1000/100)];
        }/*if(n.greaterThan("10^^5"))*/return formatnum(n,"sci");
            //return "("+formatnum(n.log(10).divideBy(3).minus(1),"std")+") - illion";
        
    }
    else if(f=="log"){
        if(n.lessThan(0))return "-"+formatnum(n.times(-1),f);
        if(n.equals(0))return "e(-∞)";
        if(n.lessThan("10^^12"))return "e"+fmt3dig(n.log(10),f);
        else return "F"+fmt3dig(n.slog(),f)
    }
    else if(f=="realsci"){
        if(n.lessThan(new D("1e9"))){return Number(String(n.round())).toLocaleString()}
        else if(n.lessThan(new D("1e1000000000"))){return ((n.mantissa*100)/100).toFixed(2)+"x10<sup>"+Math.floor(n.e).toLocaleString()+"</sup>"}
        else if(n.lessThan(new D("1F6"))){return "10<sup>"+formatnum(new D(((n.log(10)).times(100)).round().divideBy(100)))+"</sup>"}
        else if(n.slog().lessThan(new D(1e9))){return "(10^)<sup>"+formatnum(n.slog().floor())+"</sup>"+(Number(String(new D(10).tetrate(n.slog().minus(n.slog().floor())))) ).toFixed(2)}
        else{return "10↑↑"+formatnum(n.slog())}
    }
    else return "Invalid Notation!";
}
/*

北冥有鱼，其名为鲲。鲲之大，ExpantaNum存不下。
化而为鸟，其名为鹏。鹏之背，OmegaNum会爆炸。

看代码的人你好，如果你做出这道题我会立马更新：
证明：对于任何大于2的偶数a，存在两个质数b和c使得a=b+c

 */
function fmt3dig(n,f=game.notation){
    if(n.greaterThanOrEqualTo(new D(1e9))){return formatnum(n,f)}
    else return (Math.round(n*1000)/1000).toFixed(3)
}
//if(typeof game == 'undefined')game={};
//游戏信息
var game={};
imprice=[new D(1048576),new D(2e7),new D(1.25e8),new D(1e9),new D(1e10)];
function checkOldVersion(){
    
    if(typeof game.imps=='undefined'){
        game.imps=new Array()
    }
    if(typeof game.prups=='undefined'){
        game.prups=new Array()
    }
    if(typeof game.prestigepoints=='undefined'){
        game.prestigepoints=new D(0)
    }
    for(var i=0;i<=4;i++){
        if(typeof game.imps[i]=='undefined')game.imps[i]=false;
    }
    for(var i=0;i<PU_LENGTH;i++){
        if(typeof game.prups[i]=='undefined')game.prups[i]=false;
    }
    if(typeof game.l0auto=='undefined'){
        game.l0auto=false
    }
    if(typeof game.notation=='undefined')game.notation='sci';
    if(typeof game.pbuy_k=='undefined')game.pbuy_k=new D(1);
    if(typeof game.pbuy1cost=='undefined' || new D(game.pbuy1cost).lessThan(15)/*检查异常情况*/)game.pbuy1cost=new D(15);
    if(typeof game.galaxy == 'undefined')game.galaxy={
        unlocked:false,
        amount:new D(0),
        price:new D(1e18),
        data:new D(0),
        dps:new D(0),
        dups:[
            false,false,false,
            false,false,false
        ]
    }
}
    checkOldVersion()
    function changeToDecimal(){
        checkOldVersion()
        game.codes=new D(game.codes)
        game.cps=new D(game.cps)
        game.u1.bought=new D(game.u1.bought)
        game.u1.price=new D(game.u1.price)
        game.u2.bought=new D(game.u2.bought)
        game.u2.price=new D(game.u2.price)
        game.u3.bought=new D(game.u3.bought)
        game.u3.price=new D(game.u3.price)
        game.prestigepoints=new D(game.prestigepoints)
        game.pbuy_k=new D(game.pbuy_k)
        game.pbuy1cost=new D(game.pbuy1cost)
        game.galaxy.amount=new D(game.galaxy.amount)
        game.galaxy.price=new D(game.galaxy.price)
        game.galaxy.data=new D(game.galaxy.data)
        game.galaxy.dps=new D(game.galaxy.dps);
        }changeToDecimal()
function init(flag=false){//初始化
if(flag||typeof localStorage.CodingIncremental == 'undefined' || localStorage.CodingIncremental=="{}" ){
console.log("初始化开始")
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
    },
    imps:[false,false,false,false,false],
    l0auto:false,
    prestigepoints:new D(0),
    prups:[false,false,false,false,false],
    galaxy:{
        unlocked:false,
        amount:new D(0),
        price:new D(1e18),
        data:new D(0),
        dps:new D(0),
        dups:[
            false,false,false,
            false,false,false
        ]
    },
    notation:"sci",
    pbuy_k:new D(1),
    pbuy1cost:new D(15)
}
console.log("初始化完成")
}
else {
const gamedata=localStorage.getItem("CodingIncremental")
game=JSON.parse(gamedata)}
//以下代码用于将游戏数据转换成Decimal类型
checkOldVersion();
changeToDecimal()
if(typeof game.prups != 'undefined')
if(typeof game.prups[4]!='undefnied')if(game.prups[4])document.getElementById("pbuyables").class="tab";
}
init()



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
function PUupdate(){
    if(typeof game == 'undefined')init()
    for(var i=0;i<PU_LENGTH;i++){
        if(typeof game != 'undefined')
        {document.getElementById("pu"+i).disabled=(game.prups[i]);
        }
        else init()
    }
}
PUupdate()

function update(){//每50ms运行一次的更新函数
    if(game.pbuy_k.lessThan(1))game.pbuy_k=new D(1);
    game.cps=(game.u1.bought.times(game.imps[4]?game.u1.bought.pow(0.5).plus(1):1)
    .times(game.imps[0]?5:1/*如果导入了powerfulU1，则×5*/)
    .times(game.imps[2]?(game.codes.plus(1).log(100).plus(1)/*如果导入了CodesToU1则生效*/ ):1)).plus(1)
    .times((game.u2.bought.plus(1).times(game.imps[1]?(game.prups[3]?1.75:1.35):1))
    .pow(game.u3.bought.plus(1).pow(0.5))).times(game.prups[0]?3:1)
    .times(game.prups[2]?game.codes.plus(1).log(114514/*最臭的声望升级*/).plus(1):1)
    .pow(game.pbuy_k.max(1))
    .times(game.galaxy.data.plus(1).log(Math.E).plus(1))
    .times(game.galaxy.dups[2]?2:1)
    if(game.cps.greaterThanOrEqualTo(1e40)){//软上限
        var exceed=game.cps.log10().minus(40).times(0.75);
        game.cps=new Decimal(1e40).times(new D(10).pow(exceed));
        document.getElementById('softcap').className='tab';
    }else document.getElementById('softcap').className='hidden';
    //console.log(game.cps);
    setTimeout(function(){},1000)
    game.codes=game.codes.plus(game.cps.times(0.05))
    document.getElementById("codewrote").innerHTML=formatnum(game.codes)
    document.getElementById("codingspeed").innerHTML=formatnum(game.cps)
    document.getElementById("u1effect").innerHTML=formatnum(game.u1.bought)
    document.getElementById("u1price").innerHTML=formatnum(game.u1.price)
    document.getElementById("u2effect").innerHTML=formatnum(game.u2.bought.plus(1))
    document.getElementById("u2realeffect").innerHTML=formatnum(((game.u2.bought.plus(1).times(game.imps[1]?(game.prups[3]?1.75:1.35):1)).pow(game.u3.bought.plus(1).pow(0.5))))
    document.getElementById("u2price").innerHTML=formatnum(game.u2.price)
    document.getElementById("u3effect").innerHTML=fmt3dig(game.u3.bought.plus(1).pow(0.5))
    document.getElementById("u3price").innerHTML=formatnum(game.u3.price)
    if(game.u3.bought.greaterThanOrEqualTo(9))document.getElementById("u3scaling").innerHTML="<del>坐地起价的</del>遥远的"
    for(var i=1;i<=5;i++){
        if(true==true){document.getElementById("i"+String(i)).className=(game.imps[i-1]==true)?"boughtimp":"imp"}
    }
    if(game.imps[3]&&game.l0auto){buyu1max();buyu2max();buyu3max();}
    document.getElementById("L0Auto").innerHTML=game.l0auto?"开":"关"
    document.getElementById("L0AutoButton").style.display=game.imps[3]?"inline":"none";
    document.getElementById("ppgain").innerHTML=formatnum((game.codes.divideBy(1e9)).pow(new D(1).divideBy(3)).times(game.galaxy.dups[0]?3:1).floor());
    document.getElementById("pp").innerHTML=formatnum(game.prestigepoints);
    if(game.prups[5]){
        if(game.codes.greaterThan(1048576))game.imps[0]=true;
        if(game.codes.greaterThan(2e7))game.imps[1]=true;
        if(game.codes.greaterThan(1.25e8))game.imps[2]=true;
        if(game.codes.greaterThan(1e9))game.imps[3]=true;
        if(game.codes.greaterThan(1e10))game.imps[4]=true;
    }
    game.galaxy.data=game.galaxy.data.plus(new D(4).pow(game.galaxy.amount.times(game.galaxy.dups[4]?1.5:1)).minus(1).times(0.05).times(game.galaxy.dups[1]?3:1)
    .times(game.galaxy.dups[3]?game.prestigepoints.plus(1).max(0).log(Math.E).pow(0.5).plus(1):1));
    if(game.galaxy.dups[5]){
        game.prestigepoints=game.prestigepoints.plus((game.codes.divideBy(1e9)).pow(new D(1).divideBy(3)).times(0.005).times(game.galaxy.dups[1]?3:1));
    }
    document.getElementById('data').innerHTML=formatnum(game.galaxy.data);
    document.getElementById('dps').innerHTML=fmt3dig((new D(4).pow(game.galaxy.amount.times(game.galaxy.dups[4]?1.5:1)).minus(1).times(0.05).times(game.galaxy.dups[1]?3:1)
    .times(game.galaxy.dups[3]?game.prestigepoints.plus(1).max(0).log(Math.E).pow(0.5).plus(1):1).times(20)));
    document.getElementById('dataeffect').innerHTML=fmt3dig(game.galaxy.data.plus(1).log(Math.E).plus(1));
}
function pbuyable1(){
    if(typeof game.pbuy1cost == 'undefined')game.pbuy1cost=new D(15);
    if(game.prestigepoints.greaterThanOrEqualTo(game.pbuy1cost)){
        game.prestigepoints=game.prestigepoints.minus(game.pbuy1cost);
        game.pbuy1cost=game.pbuy1cost.times(1.85);
        game.pbuy_k=game.pbuy_k.plus(0.025);
        document.getElementById("pbuy_k").innerHTML=fmt3dig(game.pbuy_k);
        document.getElementById("pbuy1cost").innerHTML=formatnum(game.pbuy1cost);
    }
}
function buyu1(){
    if(game.codes.greaterThanOrEqualTo(game.u1.price)){
        game.codes=game.codes.minus(game.prups[2]?0:game.u1.price)
        game.u1.price=getu1price(game.u1.bought.plus(1))
        game.u1.bought=game.u1.bought.plus(1)
    }
}
function buyu2(){
    if(game.codes.greaterThanOrEqualTo(game.u2.price)){
        game.codes=game.codes.minus(game.prups[2]?0:game.u2.price)
        game.u2.price=getu2price(game.u2.bought.plus(1))
        game.u2.bought=game.u2.bought.plus(1)
    }
}
function buyu3(){
    if(game.codes.greaterThanOrEqualTo(game.u3.price)){
        game.codes=game.codes.minus(game.prups[2]?0:game.u3.price)
        game.u3.price=getu3price(new D(game.u3.bought.plus(1)))
        game.u3.bought=game.u3.bought.plus(1)
    }
}
function buyu3max(){
    if(game.codes.greaterThanOrEqualTo(game.u3.price)){
        buy=getu3buyable(game.codes).minus(game.u3.bought).floor()
        game.u3.bought=new D(game.u3.bought).plus(buy)
        game.u3.price=game.u3.price.times(new D(50).pow(buy))
        game.codes=game.codes.minus(game.prups[2]?0:getu3price(new D(game.u3.bought.minus(1))))
    }
}
function buyu2max(){
    if(game.codes.greaterThanOrEqualTo(game.u2.price)){
        buy=game.codes.divideBy(15).log(1.6).plus(1).minus(game.u2.bought).floor()
        game.u2.bought=game.u2.bought.plus(buy)
        game.u2.price=game.u2.price.times(new D(1.6).pow(buy))
        game.codes=game.codes.minus(game.prups[2]?0:getu2price(game.u2.bought.minus(1)))
    }
}
function buyu1max(){
    if(game.codes.greaterThanOrEqualTo(game.u1.price)){
        buy=game.codes.log(1.2).plus(1).minus(game.u1.bought).floor()
        game.u1.bought=game.u1.bought.plus(buy)
        game.u1.price=getu1price(game.u1.bought)
        game.codes=game.codes.minus(game.prups[2]?0:getu1price(game.u1.bought.minus(1)))
    }
}
function t(a){
    for(var i=1;i<=5;i++){
        document.getElementById("tab"+i).className=((i==a)?"tab":"hidden");
    }
}
function save(){//保存函数
    if(typeof game != 'undefined')
    localStorage.CodingIncremental=JSON.stringify(game);
    else
    init();
}
function imp(a){
if(game.imps[a-1]==false){
            if(game.codes.greaterThanOrEqualTo(imprice[a-1])){
                game.codes=game.codes.minus(imprice[a-1])
                game.imps[a-1]=true;
document.getElementById("i"+String(a)).className="boughtimp"
                
            }
        }
}
function L0AutoToggle(){
    game.l0auto=!(game.l0auto);
}
setInterval(update,50)
setInterval(save,10000)
function hardreset(){
    var confirm=prompt("是否确认重置？这不会解锁任何加成！请输入\"coding incremental reset\"以确认。")
    if(confirm=="coding incremental reset"){
        game=undefined;
        localStorage.removeItem("CodingIncremental");
        init(true);
        save();
    }
    else{
        window.alert("重置已取消。")
    }
}
function exportSave(){
    document.getElementById("save").value=btoa(JSON.stringify(game));
}
function importSave(){
    var Save=prompt("粘贴存档...")
    game=JSON.parse(atob(Save));
    init();
    checkOldVersion();
}
function changeNotation(){
    var new_notation=prompt("输入一个新的计数法\nsci:科学 std:标准 log:对数 realsci:真科学\n有些数字不受计数法影响。");
    if(formatnum(new D(0),new_notation)=='Invalid Notation!')
        window.alert("输入的计数法无效。");
    else game.notation=new_notation;
}
document.getElementById("pbuy_k").innerHTML=fmt3dig(game.pbuy_k);
document.getElementById("pbuy1cost").innerHTML=formatnum(game.pbuy1cost);
document.getElementById("galaxy").innerHTML=formatnum(game.galaxy.amount);
if(game.galaxy.unlocked){
    document.getElementById("unlockGalaxyButton").className='hidden';
    document.getElementById("galaxy_main").className="tab";
}
