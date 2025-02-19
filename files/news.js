function g(){return Math.random()<0.01}
const NEWSLENGTH=26
function updatenews(){
    var news=[
        ["1,000,000,006+1=0",true],
        ["北冥有鱼，其名为鲲。鲲之大，long long存不下。",true],
        ["<a href='https://www.bilibili.com/video/BV1GJ411x7h7/?spm_id_from=333.337.search-card.all.click'>此链接不是rick roll</a>",true],
        ["这条新闻是九九成稀罕物。(真的，这条新闻比其他新闻稀有100倍)",'g()'],
        [formatnum(game.codes)+"?这数字弱爆了",true],
        ["e9e15年增量一场空，不小心丢档见祖宗",true],
        ["超光速粒子会产生T    i    m    e",true],
        ["There's a lot of prestiges.",'game.prestigepoints.greaterThanOrEqualTo(10)'],
        ["import turtle;",'game.imps[0]'],
        ["井include《iosteam》",true],
        ["<button onclick='function f(){game.codes=game.codes.times(1.001)}'>点击这条新闻以将你的代码数乘以1.001。</button>",true],
        ["2147183646,2147483647,-2147483648",true],
        ["4294967294,4294967295,0",true],
        ["cout&lt;&lt;news_arr[n++];",true],
        ["'BREAKING' NEWS : 这是第2<sup>1024</sup>+1条新闻。新闻终于不用再强制大坍缩了!",true],
        ["本游戏还有5<del>e308</del>小时更新。",true],
        ["import bits/stdpython.h",true],
        ["新闻被重复播放还叫新闻吗？",true],
        ["新款同伴符文：+1.7976e308%幸福。耶！",true],
        ["此版本中，本游戏共有"+NEWSLENGTH+"条不同的新闻。",true],
        ["你知道吗，作者是OIer，所以滚动新闻中可能会夹带<del>私货</del>C++与OI相关内容",true],
        ["进入Teresa的时候不要忘记写：freopen(AD1,\"w\",\"teresa.out\")",true],
        ["/*看不见我*/",true],
        ["break_quantum.js支持{10,10,10,10}的数字。break_ghost.js支持{10,10[10]10}的数字。",true],
        ["科技这么发达了吗，都有K65路公交车了，比葛立恒数还大",true],
        ["ψ(Ω<sup>Ω<sup>Ω<sup>Ω<sup>Ω<sup>...</sup></sup></sup></sup></sup>)",true]
    ]
    var num=Math.floor(Math.random()*NEWSLENGTH);
    if(eval(news[num][1]))
        document.getElementById("news").innerHTML=news[num][0];
    else
        updatenews()
}
setInterval(updatenews,5000)
updatenews()
