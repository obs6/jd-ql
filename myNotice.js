const $ = new Env('mytest');
const notify = $.isNode() ? require('./sendNotify') : '';
let jdNotify = true;//是否关闭通知，false打开通知推送，true关闭通知推送

await notify.sendNotify(`testsendNotify`, `sendNotifytest`);
        