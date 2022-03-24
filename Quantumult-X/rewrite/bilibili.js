// 用于调整嗶哩嗶哩（港澳台版本）首页Tab、底栏按钮等的脚本
// ^https?://app\.bilibili\.com\/x\/resource\/show\/tab\/v2 url script-response-body https://raw.githubusercontent.com/YM1099/ProxyUtility/master/Quantumult-X/rewrite/bilibili.js

var body = $response.body;
var obj = JSON.parse(body);

// Tab，保留“直播、推薦、熱門”
var count = 0;
list = [731, 477, 478];
for (const element of obj['data']['tab']) {
    if (!list.includes(element['id'])) {
        obj['data']['tab'].splice(count, 1);
    }
    count = count + 1;
}

// Top_more，移除“更多分區”
var count = 0;
for (const element of obj['data']['top_more']) {
    if (element['id'] === 740) {
        obj['data']['top_more'].splice(count, 1);
        break;
    }
    count = count + 1;
}

// 底栏，移除“發燒影片”，调换“首頁”、“動態”顺序
var count = 0;
for (const element of obj['data']['bottom']) {
    if (element['id'] === 736) {
        obj['data']['bottom'].splice(count, 1);
        break;
    }
    count = count + 1;
}
obj['data']['bottom'] = [obj['data']['bottom'][1], obj['data']['bottom'][0], obj['data']['bottom'][2]];

body = JSON.stringify(obj);
$done(body);
