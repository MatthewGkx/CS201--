var request = require('request');
var fs = require('fs');
//

var Mongo = require('./mongo_homework');

var poolCount = 2;
var timeout = 2000;

var parser = require('./parser');

function Pool(urls){
    this.urls = urls;
    this.reset();
    this.init();
}


Pool.prototype = {
    reset: function(){
        this.spiderIndex = 0;
        this.queryingIndex = 0;
    },
    init: function(){
        this.querying = [];
    },
    done: function(){


            console.log('Hahahahahahaahahah Mission Complete!');
            process.exit();

    },
    process: function(e, res, body){
        if (!e && res.statusCode == 200) {
            parser(e, res, body);
            return this.onProcessed();
        } else {
            console.log('Wrong!');
            return this.onProcessed();
        }
    },
    onProcessed: function(){
        this.queryingIndex--;
        setTimeout(function(){
            this.query();
        }.bind(this), timeout);
    },
    query: function(){
        if (this.queryingIndex > poolCount) return;
        var url = this.urls[this.spiderIndex];
        console.log("number" + this.spiderIndex + " of " + this.urls.length + "urls");
        if(this.spiderIndex >= this.urls.length) return this.done();
        request.get(url, function(e, res, body){
            this.process(e, res, body);
        }.bind(this));
        this.spiderIndex = this.spiderIndex + 1;
        this.queryingIndex = this.queryingIndex + 1;
        if(this.queryingIndex < poolCount) this.query();
    }
};
module.exports = Pool;