/**
 * Created by Administrator on 2016/11/18.
 */

var Mongo = require('./mongo_homework');
var cheerio = require('cheerio');
var request = require('request');
var parser2 = require('./parser2')



/*function update(obj) {
    Mongo.community.findOneAndUpdate({
        community_id: obj.community_id
    }, obj, {
        upsert: true
    }, function(e, d) {
        console.log('updated_successfully');
    });
}*/
/*
function parser2(e, res, body){
    var $ = cheerio.load(body);
    var a = $('.res-info').find('.col-2').find('li');
    propertyType = a[0].find('.other').text().replace(/\s/g,"");
    age = a[1].find('.other').text().replace(/\s/g,"");
    // var propertyFee = a[2].find('.other').text().replace(/\s/g,"");
    propertyCompany = a[3].find('.other').text().replace(/\s/g,"");
    developCompany = a[4].find('.other').text().replace(/\s/g,"");
    buildingCount = a[5].find('.other').text().replace(/\s/g,"");
    houseCount = a[6].find('.other').text().replace(/\s/g,"");
}
*/
function parser(e, res, body){
    var $ = cheerio.load(body);
    var listNode = $('.list-wrap');
    listNode.find('li').each(function(i, node){
        node = $(node);
        var infoNode = node.find('.actshowMap_list');
        var xiaoqu = infoNode.attr('xiaoqu');
        xiaoqu = xiaoqu.replace(/\'/g, '"');//展示的数据不是标准的json, 处理成标准的json，json要双引号 ['aa'] => ["aa"]
        //console.log(typeof(xiaoqu));
        xiaoqu = JSON.parse(xiaoqu);
        var lat = xiaoqu[1], lng = xiaoqu[0], communityName = xiaoqu[2];
        var districtName = infoNode.attr('districtname');
        var plateName = infoNode.attr('platename');
        var communityId = node.find('.pic-panel').find('a').attr('key');
        var price = node.find('.price').find('.num').text().replace(/\s/g,"");
        var urlDetails = 'http://sh.lianjia.com/xiaoqu/' + communityId + '.html';
       /* request.get(urlDetails,function(e, res, body){
            var result = {
                community_id: communityId,
                lat: lat,
                lng: lng,
                plate: plateName,
                district_name: districtName,
                community_name: communityName,
                price: parseInt(price)
            };
            if(!e && res.statusCode == 200){
                setTimeout(function () {
                parser2(e, res, body, result, communityId);},2500);
            } else {
                console.log('No details...');
            }


            //console.log(result);
            //update(result);
        }); */
        request.get(urlDetails,function(e, res, body){

            if(!e && res.statusCode == 200){
                setTimeout(function () {
                    parser2(e, res, body, communityId, lat, lng, plateName, districtName, communityName, price);},1000);
            } else {
                console.log('No details...');
            }

    });
    });
}
    module.exports = parser;