

var keyword = process.argv[2];
const cheerio = require('cheerio');
var https = require('https');
var options = {
    host: 'www.zhihu.com',
    port: 443,
    path: '/search?type=content&q='+encodeURI(keyword)
};
console.error(keyword);
var html = '';
https.get(options, function (res) {
    res.on('data', function (data) {
        html +=data;
    }).on('end', function () {
        var $ = cheerio.load(html);
        var item= $('.Card').find('.AnswerItem');
        var result_array = [];
        for(var i = 0; i < item.length; i++){
            result_array.push({
                title: item.eq(i).find('.ContentItem-title .Highlight').text(),
                subtitle: item.eq(i).find('.RichContent .RichContent-inner .RichText').text(),
                arg: item.eq(i).find('.ContentItem-title meta').attr('content')
            })
        }
        console.log(JSON.stringify({items: result_array}));
    })
});


