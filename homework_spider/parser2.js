/**
 * Created by Administrator on 2016/11/18.
 */
var Mongo = require('./mongo_homework');
var cheerio = require('cheerio');
var request = require('request');
var fs = require('fs');
/* var Pg = require('./pg');



function update(obj) {
    Pg.community_pg.upsert(obj).then(function(e, d){
        if(e) return console.log(e);
        console.log('更新成功...');
    });
}
*/
function update(obj) {
    Mongo.community.findOneAndUpdate({
        community_id: obj.community_id
    }, obj, {
        upsert: true
    }, function(e, d) {
        console.log('updated_successfully');
    });
}

function parser2(e, res, body, communityId, lat, lng, plateName, districtName, communityName, price) {
    var $ = cheerio.load(body);
    var a = $('.res-info').find('.col-2');
    var propertyType = a.find("ol li:nth-child(1)").find('.other').text().replace(/\s/g, "");
    var age = a.find("ol li:nth-child(2)").find('.other').text().replace(/\s/g, "");
    var propertyFee = a.find("ol li:nth-child(3)").find('.other').text().replace(/\s/g, "");
    var propertyCompany = a.find("ol li:nth-child(4)").find('.other').text().replace(/\s/g, "");
    var developCompany = a.find("ol li:nth-child(5)").find('.other').text().replace(/\s/g, "");
    var buildingCount = a.find("ol li:nth-child(6)").find('.other').text().replace(/\s/g, "");
    var houseCount = a.find("ol li:nth-child(7)").find('.other').text().replace(/\s/g, "");
    var result = {};
    result.community_id = communityId;
    result.property_type = propertyType;
    result.age = 2017 - parseInt(age);
    result.property_fee = parseInt(propertyFee);
    result.property_company = propertyCompany;
    result.develop_company = developCompany;
    result.building_count = parseInt(buildingCount);
    result.house_count = parseInt(houseCount);
    result.lat = lat;
    result.lng = lng;
    result.plate= plateName;
    result.district_name = districtName;
    result.community_name = communityName;
    result.price = price;


    console.log(result);
    update(result);
}



module.exports = parser2;