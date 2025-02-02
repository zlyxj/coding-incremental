pupgradecosts=[1,2,6,20,60,180]
function prestige(){
    if(game.codes.lessThan(1e9)){
        window.alert("代码太少，不能声望！")
    }
    else{
        game.prestigepoints=game.prestigepoints.plus((game.codes.divideBy(1e9)).pow(new D(1).divideBy(3)).floor());
        game.u1={bought:new D(0),price:new D(1)};
        game.u2={bought:new D(0),price:new D(15)};
        game.u3={bought:new D(0),price:new D(1000)};
        game.imps=[false,false,false,game.prups[1]&&game.imps[3],false];
        //console.log("玩家进行了声望")
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
