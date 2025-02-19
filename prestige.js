pupgradecosts=[1,2,6,20,60,180]
dataupgradecosts=[100,1200,3e3,5e3,8e3,2e5]
function prestige(){
    if(game.codes.lessThan(1e9)){
        window.alert("代码太少，不能声望！")
    }
    else{
        game.prestigepoints=game.prestigepoints.plus((game.codes.divideBy(1e9)).pow(new D(1).divideBy(3))
        .times(game.galaxy.dups[0]?3:1).floor());
        game.u1={bought:new D(0),price:new D(1)};
        game.u2={bought:new D(0),price:new D(15)};
        game.u3={bought:new D(0),price:new D(1000)};
        game.imps=[false,false,false,game.prups[1]&&game.imps[3],false];
        console.log("玩家进行了声望")
        game.codes=new D(0);
        imp()
    }
}
function buypupgrade(a){
    if(game.prestigepoints.greaterThanOrEqualTo(pupgradecosts[a]) && !game.prups[a]){
        game.prestigepoints=game.prestigepoints.minus(pupgradecosts[a]);
        game.prups[a]=true;
        if(a==4)document.getElementById("pbuyables").className="tab";
    }
    PUupdate()
}
function t4_1(){
    document.getElementById("tab4-1").className="tab";
    document.getElementById("tab4-2").className="hidden";
}
function t4_2(){
    document.getElementById("tab4-2").className="tab";
    document.getElementById("tab4-1").className="hidden";
}
function unlockGalaxy(){
    if(game.codes.lessThan(1e19)){
        window.alert("你还没有足够的代码解锁星系！\n你还差"+fmt3dig(new D(19).minus(game.codes.log10()))+" OoMs")
    }else{
        game.galaxy.unlocked=true;
        game.codes=game.codes.minus(1e19);
        document.getElementById("unlockGalaxyButton").className='hidden';
        document.getElementById("galaxy_main").className="tab";
    }
}
if(game.galaxy.unlocked=true){
    document.getElementById("unlockGalaxyButton").class='hidden';
    document.getElementById("galaxy_main").class="tab";
}
function buyCodeGalaxy(){
    if(game.galaxy.price.greaterThan(game.codes))windows.alert("代码不足");
    else{
        game.codes=game.codes.minus(game.galaxy.price);
        game.galaxy.amount=game.galaxy.amount.plus(1);
        game.galaxy.price=game.galaxy.price.times(1e6);
        
    }  
    document.getElementById("galaxyCost").innerHTML=formatnum(game.galaxy.price); 
    document.getElementById("galaxy").innerHTML=formatnum(game.galaxy.amount);
}
document.getElementById("galaxyCost").innerHTML=formatnum(game.galaxy.price); 
document.getElementById("galaxy").innerHTML=formatnum(game.galaxy.amount);
function maxGalaxy(){
    window.alert("开发中");
}
function DUupdate(){
    for(var i=1;i<=6;i++){
        document.getElementById("du"+i).className=(""+(game.galaxy.dups[i-1]?"boughtdup":"dataupgrade"))
    }
}
DUupdate()
function gupgrade(n){
    if(game.galaxy.data.greaterThan(dataupgradecosts[n]) && !game.galaxy.dups[n]){
        game.galaxy.data=game.galaxy.data.minus(dataupgradecosts[n]);
        game.galaxy.dups[n]=true;
        DUupdate()
    }DUupdate()
}
