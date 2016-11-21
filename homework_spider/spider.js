/**
 * Created by Administrator on 2016/11/18.
 */



var request = require('request');
var fs = require('fs');
var getURLs = require('./get_lianjiaURLs');
var Pool = require('./pool');


getURLs(function(urls){
    new Pool(urls).query();
});