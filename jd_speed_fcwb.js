/*
京东极速版红包
自动提现微信现金
更新时间：2021-8-2
活动时间：2021-4-6至2021-5-30
活动地址：https://prodev.m.jd.com/jdlite/active/31U4T6S4PbcK83HyLPioeCWrD63j/index.html
活动入口：京东极速版-领红包
已支持IOS双京东账号,Node.js支持N个京东账号
脚本兼容: QuantumultX, Surge, Loon, JSBox, Node.js
============Quantumultx===============
[task_local]
#京东极速版红包
21 0,22 * * * jd_speed_redpocke.js, tag=京东极速版红包, img-url=https://raw.githubusercontent.com/Orz-3/mini/master/Color/jd.png, enabled=true

================Loon==============
[Script]
cron "22 7,9，10 * * *" script-path=jd_speed_redpocke.js,tag=我的京东极速版发财挖宝

===============Surge=================
京东极速版红包 = type=cron,cronexp="23 0,22 * * *",wake-system=1,timeout=3600,script-path=jd_speed_redpocke.js

============小火箭=========
京东极速版红包 = type=cron,script-path=jd_speed_redpocke.js, cronexpr="24 0,22 * * *", timeout=3600, enable=true
*/
const $ = new Env('我的京东极速版发财挖宝');
const notify = $.isNode() ? require('./sendNotify') : '';
//Node.js用户请在jdCookie.js处填写京东ck;
const jdCookieNode = $.isNode() ? require('./jdCookie.js') : '';
let cookiesArr = [], cookie = '', message='',shareCode=[];
let inviteCode='',invitor='';
let reslust = '';
const linkId发财挖宝 = 'pTTvJeSTrpthgk9ASBVGsw';
const JD_API_HOST = 'https://api.m.jd.com/client.action';
if ($.isNode()) {
    Object.keys(jdCookieNode).forEach((item) => {
        cookiesArr.push(jdCookieNode[item])
    })
    if (process.env.JD_DEBUG && process.env.JD_DEBUG === 'false') console.log = () => {
    };
    if (JSON.stringify(process.env).indexOf('GITHUB') > -1) process.exit(0);
} else {
    cookiesArr = [$.getdata('CookieJD'), $.getdata('CookieJD2'), ...jsonParse($.getdata('CookiesJD') || "[]").map(item => item.cookie)].filter(item => !!item);
}

!(async () => {
    if (!cookiesArr[0]) {
        $.msg($.name, '【提示】请先获取京东账号一cookie\n直接使用NobyDa的京东签到获取', 'https://bean.m.jd.com/bean/signIndex.action', {"open-url": "https://bean.m.jd.com/bean/signIndex.action"});
        return;
    }

    for (let i = 0; i < cookiesArr.length; i++) {
        if (cookiesArr[i]) {
            cookie = cookiesArr[i];
            $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
            $.index = i + 1;
            $.isLogin = true;
            $.nickName = '';
            $.blood=0;
            $.colIdx=0;
            $.rowIdx=0;
            $.blood=0;
            $.curRound=0;
            $.infoData='';
            // message = '';
            // console.log("00000000000000");
            // await TotalBean();
            console.log(`\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
            message+=`\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`;
            if (!$.isLogin) {
                $.msg($.name, `【提示】cookie已失效`, `京东账号${$.index} ${$.nickName || $.UserName}\n请重新登录获取\nhttps://bean.m.jd.com/bean/signIndex.action`, {"open-url": "https://bean.m.jd.com/bean/signIndex.action"});

                if ($.isNode()) {
                    await notify.sendNotify(`${$.name}cookie已失效 - ${$.UserName}`, `京东账号${$.index} ${$.UserName}\n请重新登录获取cookie`);
                }
                continue
            }
            await jsRedPacket()


        }
    }
    for (let i = 0; i < cookiesArr.length; i++) {
        if (cookiesArr[i]) {
            cookie = cookiesArr[i];
            $.UserName = decodeURIComponent(cookie.match(/pt_pin=([^; ]+)(?=;?)/) && cookie.match(/pt_pin=([^; ]+)(?=;?)/)[1])
            $.index = i + 1;
            $.isLogin = true;
            $.nickName = '';
            $.blood=0;
            $.colIdx=0;
            $.rowIdx=0;
            $.blood=0;
            $.curRound=0;
            $.infoData='';
            console.log(`\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`);
            message+=`\n******开始【京东账号${$.index}】${$.nickName || $.UserName}*********\n`;

            await do助力(inviteCode,invitor);


        }
    }
    if ($.isNode()) {
        // await notify.sendNotify($.name, message)
    }
})()
    .catch((e) => {
        $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
    })
    .finally(() => {
        $.done();
    })
var merge = {};
async function jsRedPacket() {
    try {
        // await invite();
        // const body = {
        //     "newUiSwitch": "1",
        //     "deis": "ey",
        //     "pass": "",
        //     "pagesize": "10",
        //     "page": "1"
        // };
        await getHomeAndInvite();
        await apTaskList();

        while ($.infoData.blood>1){
            if($.infoData.roundList && $.infoData.roundList[$.infoData.curRound-1].chunks){
                let itemList=$.infoData.roundList[$.infoData.curRound-1].chunks;

                for(let item of itemList){
                    if(item.state===null){
                        $.colIdx=item.colIdx;
                        $.rowIdx=item.rowIdx;
                        // console.log("1111"+$.colIdx);
                        do挖宝($.colIdx,$.rowIdx,$.infoData.curRound);
                        await $.wait(3 * 1000);
                        await getHomeAndInvite();
                        await $.wait(1 * 1000);
                        console.log("还剩机会："+$.infoData.blood);
                        break;

                    }
                }
            }
        }
        if($.infoData.blood===1&&$.infoData.roundList[0].cashAmount!="0.00"&&inviteCode===""){

            inviteCode=$.infoData.inviteCode;
            invitor=$.infoData.markedPin;
        }

        // await showMsg()

    } catch (e) {
        $.logErr(e)
    }
}
function showMsg() {
    return new Promise(resolve => {
        if (message) $.msg($.name, '', `京东账号${$.index}${$.nickName}\n${message}`);
        resolve()
    })
}

function getHomeAndInvite() {
    return new Promise(resolve => {
        $.get(taskGetUrl('happyDigHome',
            {"linkId":linkId发财挖宝}),
            async (err, resp, data) => {
                try {
                    if (err) {
                        console.log(`${JSON.stringify(err)}`)
                        console.log(`${$.name} API请求失败，请检查网路重试`)
                    } else {
                        if (safeGet(data)) {
                            data = JSON.parse(data);
                            if(data.code ===0){

                                // console.log(`${data.data.inviteCode}====${data.data.markedPin}`)
                                // console.log(`${data.data.blood}`)
                                // console.log(`-----${data.data.curRound}`)
                                $.blood=data.data.blood;
                                $.curRound=data.data.curRound;
                                $.infoData=data.data;
                                // console.log(`${JSON.stringify($.infoData)}`)
                                // console.log(`------------------`)


                            }


                        }
                    }
                } catch (e) {
                    $.logErr(e, resp)
                } finally {
                    resolve(data);
                }
            })
    })
}

// 大转盘任务
function apTaskList() {
    return new Promise(resolve => {
        $.get(taskGetUrl('apTaskList',
            {"linkId":linkId发财挖宝}),
            async (err, resp, data) => {
                try {
                    if (err) {
                        console.log(`${JSON.stringify(err)}`)
                        console.log(`${$.name} API请求失败，请检查网路重试`)
                    } else {
                        if (safeGet(data)) {
                            data = JSON.parse(data);
                            if(data.code ===0){
                                for(let task of data.data){
                                    // {"linkId":"toxw9c5sy9xllGBr3QFdYg","taskType":"SIGN","taskId":67,"channel":4}
                                    //{"linkId":"pTTvJeSTrpthgk9ASBVGsw","taskType":"BROWSE_CHANNEL","taskId":454,"channel":4,"itemId":"https://signfree.jd.com/?activityId=PiuLvM8vamONsWzC0wqBGQ","checkVersion":false}
                                    if(!task.taskFinished && ['BROWSE_CHANNEL'].includes(task.taskType)){

                                        if(task.timePeriod===30){
                                            console.log(`去做任务${task.taskShowTitle}`)
                                            // await apDoTaskList(task.taskType,task.id,4,task.taskSourceUrl)
                                        }else {
                                            console.log(`去做任务${task.taskShowTitle}`);
                                            await apDoTask(task.taskType,task.id,4,task.taskSourceUrl)
                                        }
                                    }
                                }
                            }
                        }
                    }
                } catch (e) {
                    $.logErr(e, resp)
                } finally {
                    resolve(data);
                }
            })
    })
}
function apDoTaskList(taskType,taskId,channel,itemId) {
    // console.log({"linkId":"toxw9c5sy9xllGBr3QFdYg","taskType":taskType,"taskId":taskId,"channel":channel,"itemId":itemId})
    return new Promise(resolve => {
        $.get(taskGetUrl('apTaskList',
            {"linkId":linkId发财挖宝,"taskType":taskType,"taskId":taskId,"channel":channel,"itemId":itemId}),
            async (err, resp, data) => {
                try {
                    if (err) {
                        console.log(`${JSON.stringify(err)}`)
                        console.log(`${$.name} API请求失败，请检查网路重试`)
                    } else {
                        if (safeGet(data)) {
                            data = JSON.parse(data);
                            if(data.code ===0 && data.status){
                                if(data.status.finished){
                                    console.log(`任务完成成功`)
                                }
                                else {
                                    for(let task of data.taskItemList){
                                        console.log(`去做任务${task.itemName}`)




                                    }



                                }

                            }
                            else{
                                console.log(JSON.stringify(data))
                            }
                        }
                    }
                } catch (e) {
                    $.logErr(e, resp)
                } finally {
                    resolve(data);
                }
            })
    })
}

// 大转盘做任务
function apDoTask(taskType,taskId,channel,itemId) {
    // console.log({"linkId":"toxw9c5sy9xllGBr3QFdYg","taskType":taskType,"taskId":taskId,"channel":channel,"itemId":itemId})
    return new Promise(resolve => {
        $.get(taskGetUrl('apDoTask',
            {"linkId":linkId发财挖宝,"taskType":taskType,"taskId":taskId,"channel":channel,"itemId":itemId}),
            async (err, resp, data) => {
                try {
                    if (err) {
                        console.log(`${JSON.stringify(err)}`)
                        console.log(`${$.name} API请求失败，请检查网路重试`)
                    } else {
                        if (safeGet(data)) {
                            data = JSON.parse(data);
                            if(data.code ===0 && data.data && data.data.finished){
                                console.log(`任务完成成功`)
                            }else{
                                console.log(JSON.stringify(data))
                            }
                        }
                    }
                } catch (e) {
                    $.logErr(e, resp)
                } finally {
                    resolve(data);
                }
            })
    })
}
function do助力(shareCode,invitor) {
    return new Promise(resolve => {
        const body =
            {"linkId":linkId发财挖宝,
                "inviter":invitor,
                "inviteCode":shareCode
            }
        $.get(taskGetUrl("happyDigHelp",body), async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if (safeGet(data)) {
                        data = JSON.parse(data);
                        if (data.code === 0) {
                            // console.log(`${JSON.stringify(data)}`)
                            console.log(data.errMsg)
                        } else {
                            console.log(data.errMsg)
                        }
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data);
            }
        })
    })
}
function do挖宝(colIdx,rowIdx,curRound) {
    return new Promise(resolve => {
        const body = {
            "round":curRound,
            "rowIdx":rowIdx,
            "colIdx":colIdx,
            "linkId":linkId发财挖宝
        }
        $.get(taskGetUrl("happyDigDo",body), async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${JSON.stringify(err)}`)
                    console.log(`${$.name} API请求失败，请检查网路重试`)
                } else {
                    if (safeGet(data)) {
                        data = JSON.parse(data);
                        if (data.code === 0) {
                            console.log(data.errMsg)
                        } else {
                            console.log(data.errMsg)
                        }
                    }
                }
            } catch (e) {
                $.logErr(e, resp)
            } finally {
                resolve(data);
            }
        })
    })
}
function taskGetUrl(function_id, body) {
    return {
        url: `https://api.m.jd.com/?functionId=${function_id}&body=${escape(JSON.stringify(body))}&t=${+new Date()}&appid=activities_platform&client=H5&clientVersion=1.0.0`,
        headers: {
            'Cookie': cookie,
            'Origin': 'https://bnzf.jd.com',
            "Accept": "application/json, text/plain, */*",
            "Connection": "keep-alive",
            'Host': 'api.m.jd.com',
            'user-agent': $.isNode() ? (process.env.JS_USER_AGENT ? process.env.JS_USER_AGENT : (require('./JS_USER_AGENTS').USER_AGENT)) : ($.getdata('JSUA') ? $.getdata('JSUA') : "'jdltapp;iPad;3.1.0;14.4;network/wifi;Mozilla/5.0 (iPad; CPU OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
            'Accept-Language': 'zh-Hans-CN;q=1,en-CN;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
            'Content-Type': "application/x-www-form-urlencoded",
            'Referer': `https://bnzf.jd.com/?activityId=${linkId发财挖宝}`,
        }
    }
}


function getCoupon() {
    return new Promise(resolve => {
        let options = {
            url: `https://wq.jd.com/activeapi/queryjdcouponlistwithfinance?state=1&wxadd=1&filterswitch=1&_=${Date.now()}&sceneval=2&g_login_type=1&callback=jsonpCBKB&g_ty=ls`,
            headers: {
                'authority': 'wq.jd.com',
                "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
                'accept': '*/*',
                'referer': 'https://wqs.jd.com/',
                'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
                'cookie': cookie
            }
        }
        $.get(options, async (err, resp, data) => {
            try {
                data = JSON.parse(data.match(new RegExp(/jsonpCBK.?\((.*);*/))[1]);
                let couponTitle = ''
                let couponId = ''
                // 删除可使用且非超市、生鲜、京贴
                let useable = data.coupon.useable
                // console.log(`=================${JSON.stringify(useable)}`);
                for (let i = 0; i < useable.length; i++) {
                    if (useable[i].limitStr.indexOf("全品类")>-1) {
                        $.todayEndTime = new Date(new Date(new Date().getTime()).setHours(23, 59, 59, 999)).getTime();
                        $.tomorrowEndTime = new Date(new Date(new Date().getTime() + 24 * 60 * 60 * 1000).setHours(23, 59, 59, 999)).getTime();
                        $.couponEndTime = useable[i].endTime;




                        $.platFormInfo = useable[i].platFormInfo;

                        message += `【全品类券】=满${useable[i].quota}-${useable[i].discount} =====(${$.platFormInfo})\n`;
                        message += `${useable[i].couponTitle} =====${useable[i].limitStr}\n`;
                        if ($.couponEndTime < $.todayEndTime) {
                            // console.log(`=================${useable[i].couponTitle}`);
                            // message += `【京东红包】${$.jdRed}(将过期${$.jdRedExpire.toFixed(2)})元 \n`;
                            message += `🧧🧧(今日将过期)===`;
                        }else if ($.couponEndTime < $.tomorrowEndTime) {
                            message += `🧧(明日将过期)===`;
                        }
                        message += `过期时间: ${getLocalTime($.couponEndTime)}\n`;
                        message += `*********************************************\n`;

                    }


                    if (useable[i].couponTitle.indexOf('极速版APP活动') > -1 && useable[i].couponTitle.indexOf('频道：') > -1) {

                        $.todayEndTime = new Date(new Date(new Date().getTime()).setHours(23, 59, 59, 999)).getTime();
                        $.tomorrowEndTime = new Date(new Date(new Date().getTime() + 24 * 60 * 60 * 1000).setHours(23, 59, 59, 999)).getTime();
                        $.couponEndTime = useable[i].endTime;
                        $.startIndex = useable[i].couponTitle.indexOf('频道：') + 3;
                        $.endIndex = useable[i].couponTitle.indexOf('元') + 1;

                        $.couponName = useable[i].couponTitle.substring($.startIndex, $.endIndex);


                        // console.log(`=================${useable[i].couponTitle}`);

                        if ($.couponEndTime < $.todayEndTime) {
                            // console.log(`=================${useable[i].couponTitle}`);
                            // message += `【京东红包】${$.jdRed}(将过期${$.jdRedExpire.toFixed(2)})元 \n`;
                            message += `【极速优惠券】${$.couponName}(今日将过期🧧🧧🧧🧧) \n`;
                        } else if ($.couponEndTime < $.tomorrowEndTime) {
                            message += `【极速优惠券】${$.couponName}(明日将过期) \n`;
                        }

                    }
                    //*****白条券



                }

            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve();
            }
        })

    })
}
function getLocalTime(nS) {
    return new Date(parseInt(nS)).toLocaleString().replace(/:\d{1,2}$/, ' ');
}

function taskPostUrl(function_id, body) {
    return {
        url: `https://api.m.jd.com/`,
        body: `appid=activities_platform&functionId=${function_id}&body=${escape(JSON.stringify(body))}&t=${+new Date()}`,
        headers: {
            'Cookie': cookie,
            'Host': 'api.m.jd.com',
            'Accept': '*/*',
            'Connection': 'keep-alive',
            // 'user-agent': $.isNode() ? (process.env.JS_USER_AGENT ? process.env.JS_USER_AGENT : (require('./JS_USER_AGENTS').USER_AGENT)) : ($.getdata('JSUA') ? $.getdata('JSUA') : "'jdltapp;iPad;3.1.0;14.4;network/wifi;Mozilla/5.0 (iPad; CPU OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
            'user-agent': "jdltapp;iPhone;3.3.2;14.3;b488010ad24c40885d846e66931abaf532ed26a5;network/4g;hasUPPay/0;pushNoticeIsOpen/0;lang/zh_CN;model/iPhone11,8;addressid/2005183373;hasOCPay/0;appBuild/1049;supportBestPay/0;pv/220.46;apprpd/;ref/JDLTSubMainPageViewController;psq/0;ads/;psn/b488010ad24c40885d846e66931abaf532ed26a5|520;jdv/0|iosapp|t_335139774|liteshare|CopyURL|1618673222002|1618673227;adk/;app_device/IOS;pap/JA2020_3112531|3.3.2|IOS 14.3;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1 ",
            'Accept-Language': 'zh-Hans-CN;q=1,en-CN;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
            'Content-Type': "application/x-www-form-urlencoded",
            "referer": "https://an.jd.com/babelDiy/Zeus/q1eB6WUB8oC4eH1BsCLWvQakVsX/index.html"
        }
    }
}


function taskGetUrl(function_id, body) {
    return {
        url: `https://api.m.jd.com/?appid=activities_platform&functionId=${function_id}&body=${escape(JSON.stringify(body))}&t=${+new Date()}`,
        headers: {
            'Cookie': cookie,
            'Host': 'api.m.jd.com',
            'Accept': '*/*',
            'Connection': 'keep-alive',
            'user-agent': $.isNode() ? (process.env.JS_USER_AGENT ? process.env.JS_USER_AGENT : (require('./JS_USER_AGENTS').USER_AGENT)) : ($.getdata('JSUA') ? $.getdata('JSUA') : "'jdltapp;iPad;3.1.0;14.4;network/wifi;Mozilla/5.0 (iPad; CPU OS 14_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
            'Accept-Language': 'zh-Hans-CN;q=1,en-CN;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
            'Content-Type': "application/x-www-form-urlencoded",
            "referer": "https://an.jd.com/babelDiy/Zeus/q1eB6WUB8oC4eH1BsCLWvQakVsX/index.html"
        }
    }

}


function TotalBean() {
    return new Promise(async resolve => {
        const options = {
            url: "https://me-api.jd.com/user_new/info/GetJDUserInfoUnion",
            headers: {
                Host: "me-api.jd.com",
                Accept: "*/*",
                Connection: "keep-alive",
                Cookie: cookie,
                "User-Agent": $.isNode() ? (process.env.JD_USER_AGENT ? process.env.JD_USER_AGENT : (require('./USER_AGENTS').USER_AGENT)) : ($.getdata('JDUA') ? $.getdata('JDUA') : "jdapp;iPhone;9.4.4;14.3;network/4g;Mozilla/5.0 (iPhone; CPU iPhone OS 14_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148;supportJDSHWK/1"),
                "Accept-Language": "zh-cn",
                "Referer": "https://home.m.jd.com/myJd/newhome.action?sceneval=2&ufc=&",
                "Accept-Encoding": "gzip, deflate, br"
            }
        }
        $.get(options, (err, resp, data) => {
            try {
                if (err) {
                    $.logErr(err)
                } else {
                    if (data) {
                        data = JSON.parse(data);
                        // console.log(data)
                        if (data['retcode'] === "1001") {
                            $.isLogin = false; //cookie过期
                            return;
                        }
                        if (data['retcode'] === "0" && data.data && data.data.hasOwnProperty("userInfo")) {
                            $.nickName = data.data.userInfo.baseInfo.nickname;
                        }
                    } else {
                        console.log('京东服务器返回空数据');
                    }
                }
            } catch (e) {
                $.logErr(e)
            } finally {
                resolve();
            }
        })
    })
}

function safeGet(data) {
    try {
        if (typeof JSON.parse(data) == "object") {
            return true;
        }
    } catch (e) {
        console.log(e);
        console.log(`京东服务器访问数据为空，请检查自身设备网络情况`);
        return false;
    }
}

function jsonParse(str) {
    if (typeof str == "string") {
        try {
            return JSON.parse(str);
        } catch (e) {
            console.log(e);
            $.msg($.name, '', '请勿随意在BoxJs输入框修改内容\n建议通过脚本去获取cookie')
            return [];
        }
    }
}

// prettier-ignore
function Env(t, e) {
    "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0);

    class s {
        constructor(t) {
            this.env = t
        }

        send(t, e = "GET") {
            t = "string" == typeof t ? {url: t} : t;
            let s = this.get;
            return "POST" === e && (s = this.post), new Promise((e, i) => {
                s.call(this, t, (t, s, r) => {
                    t ? i(t) : e(s)
                })
            })
        }

        get(t) {
            return this.send.call(this.env, t)
        }

        post(t) {
            return this.send.call(this.env, t, "POST")
        }
    }

    return new class {
        constructor(t, e) {
            this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`)
        }

        isNode() {
            return "undefined" != typeof module && !!module.exports
        }

        isQuanX() {
            return "undefined" != typeof $task
        }

        isSurge() {
            return "undefined" != typeof $httpClient && "undefined" == typeof $loon
        }

        isLoon() {
            return "undefined" != typeof $loon
        }

        toObj(t, e = null) {
            try {
                return JSON.parse(t)
            } catch {
                return e
            }
        }

        toStr(t, e = null) {
            try {
                return JSON.stringify(t)
            } catch {
                return e
            }
        }

        getjson(t, e) {
            let s = e;
            const i = this.getdata(t);
            if (i) try {
                s = JSON.parse(this.getdata(t))
            } catch {
            }
            return s
        }

        setjson(t, e) {
            try {
                return this.setdata(JSON.stringify(t), e)
            } catch {
                return !1
            }
        }

        getScript(t) {
            return new Promise(e => {
                this.get({url: t}, (t, s, i) => e(i))
            })
        }

        runScript(t, e) {
            return new Promise(s => {
                let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
                i = i ? i.replace(/\n/g, "").trim() : i;
                let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
                r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r;
                const [o, h] = i.split("@"), n = {
                    url: `http://${h}/v1/scripting/evaluate`,
                    body: {script_text: t, mock_type: "cron", timeout: r},
                    headers: {"X-Key": o, Accept: "*/*"}
                };
                this.post(n, (t, e, i) => s(i))
            }).catch(t => this.logErr(t))
        }

        loaddata() {
            if (!this.isNode()) return {};
            {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e);
                if (!s && !i) return {};
                {
                    const i = s ? t : e;
                    try {
                        return JSON.parse(this.fs.readFileSync(i))
                    } catch (t) {
                        return {}
                    }
                }
            }
        }

        writedata() {
            if (this.isNode()) {
                this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path");
                const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile),
                    s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data);
                s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r)
            }
        }

        lodash_get(t, e, s) {
            const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
            let r = t;
            for (const t of i) if (r = Object(r)[t], void 0 === r) return s;
            return r
        }

        lodash_set(t, e, s) {
            return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t)
        }

        getdata(t) {
            let e = this.getval(t);
            if (/^@/.test(t)) {
                const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : "";
                if (r) try {
                    const t = JSON.parse(r);
                    e = t ? this.lodash_get(t, i, "") : e
                } catch (t) {
                    e = ""
                }
            }
            return e
        }

        setdata(t, e) {
            let s = !1;
            if (/^@/.test(e)) {
                const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i),
                    h = i ? "null" === o ? null : o || "{}" : "{}";
                try {
                    const e = JSON.parse(h);
                    this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i)
                } catch (e) {
                    const o = {};
                    this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i)
                }
            } else s = this.setval(t, e);
            return s
        }

        getval(t) {
            return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null
        }

        setval(t, e) {
            return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null
        }

        initGotEnv(t) {
            this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar))
        }

        get(t, e = (() => {
        })) {
            t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {"X-Surge-Skip-Scripting": !1})), $httpClient.get(t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {hints: !1})), $task.fetch(t).then(t => {
                const {statusCode: s, statusCode: i, headers: r, body: o} = t;
                e(null, {status: s, statusCode: i, headers: r, body: o}, o)
            }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => {
                try {
                    if (t.headers["set-cookie"]) {
                        const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
                        s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar
                    }
                } catch (t) {
                    this.logErr(t)
                }
            }).then(t => {
                const {statusCode: s, statusCode: i, headers: r, body: o} = t;
                e(null, {status: s, statusCode: i, headers: r, body: o}, o)
            }, t => {
                const {message: s, response: i} = t;
                e(s, i, i && i.body)
            }))
        }

        post(t, e = (() => {
        })) {
            if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {"X-Surge-Skip-Scripting": !1})), $httpClient.post(t, (t, s, i) => {
                !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i)
            }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {hints: !1})), $task.fetch(t).then(t => {
                const {statusCode: s, statusCode: i, headers: r, body: o} = t;
                e(null, {status: s, statusCode: i, headers: r, body: o}, o)
            }, t => e(t)); else if (this.isNode()) {
                this.initGotEnv(t);
                const {url: s, ...i} = t;
                this.got.post(s, i).then(t => {
                    const {statusCode: s, statusCode: i, headers: r, body: o} = t;
                    e(null, {status: s, statusCode: i, headers: r, body: o}, o)
                }, t => {
                    const {message: s, response: i} = t;
                    e(s, i, i && i.body)
                })
            }
        }

        time(t, e = null) {
            const s = e ? new Date(e) : new Date;
            let i = {
                "M+": s.getMonth() + 1,
                "d+": s.getDate(),
                "H+": s.getHours(),
                "m+": s.getMinutes(),
                "s+": s.getSeconds(),
                "q+": Math.floor((s.getMonth() + 3) / 3),
                S: s.getMilliseconds()
            };
            /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length)));
            for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length)));
            return t
        }

        msg(e = t, s = "", i = "", r) {
            const o = t => {
                if (!t) return t;
                if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? {"open-url": t} : this.isSurge() ? {url: t} : void 0;
                if ("object" == typeof t) {
                    if (this.isLoon()) {
                        let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"];
                        return {openUrl: e, mediaUrl: s}
                    }
                    if (this.isQuanX()) {
                        let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl;
                        return {"open-url": e, "media-url": s}
                    }
                    if (this.isSurge()) {
                        let e = t.url || t.openUrl || t["open-url"];
                        return {url: e}
                    }
                }
            };
            if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) {
                let t = ["", "==============📣系统通知📣=============="];
                t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t)
            }
        }

        log(...t) {
            t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator))
        }

        logErr(t, e) {
            const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
            s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t)
        }

        wait(t) {
            return new Promise(e => setTimeout(e, t))
        }

        done(t = {}) {
            const e = (new Date).getTime(), s = (e - this.startTime) / 1e3;
            this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t)
        }
    }(t, e)
}

function randomString(e) {
    e = e || 32;
    let t = "abcdefghijklmnopqrstuvwxyz0123456789", a = t.length, n = "";
    for (let i = 0; i < e; i++)
        n += t.charAt(Math.floor(Math.random() * a));
    return n
}