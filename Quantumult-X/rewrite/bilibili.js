// 用于调整嗶哩嗶哩（港澳台版本）首页Tab、底栏按钮等的脚本
// ^https?://app\.bilibili\.com\/x\/resource\/show\/tab\/v2 url script-response-body https://raw.githubusercontent.com/YM1099/ProxyUtility/master/Quantumult-X/rewrite/bilibili.js

var body = $response.body;
var obj = JSON.parse(body);

// Tab，保留“直播、推薦、熱門”
list = [731, 477, 478];
for (let i = obj['data']['tab'].length - 1; i >= 0; i--) {
    if (!list.includes(obj['data']['tab'][i]['id'])) {
        obj['data']['tab'].splice(i, 1);
    }
}

// Top_more，移除“更多分區”
for (let i = obj['data']['top_more'].length - 1; i >= 0; i--) {
    if (obj['data']['top_more'][i]['id'] === 740) {
        obj['data']['top_more'].splice(i, 1);
    }
}

// 底栏，移除“發燒影片”，调换“首頁”、“動態”顺序
for (let i = obj['data']['top_more'].length - 1; i >= 0; i--) {
    if (obj['data']['top_more'][i]['id'] === 736) {
        obj['data']['top_more'].splice(i, 1);
    }
}
obj['data']['bottom'] = [obj['data']['bottom'][1], obj['data']['bottom'][0], obj['data']['bottom'][2]];

body = JSON.stringify(obj);
$done(body);
