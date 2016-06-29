var path = require("path")
    , https = require('https')
    , fs = require('fs')
    , _  = require('lodash')
    , request = require('request');

var Promise = require('bluebird');
var feedParser = require('feedparser');


var FlickrJS = function(keys) {
    this.apiKey = keys.api_key;
    this.apiUrl = "https://api.flickr.com/services/rest/?";
    this.public_photos_url = "https://api.flickr.com/services/feeds/photos_public.gne"
};


FlickrJS.prototype.getPulicPhotos = function(){
    var feeds = [];
    return Promise.promisify(function (done) {
        request(this.public_photos_url, [{poole: false}, {timeout: 6000}], function (err, response, body) {
            feedParser
                .parseString(body)
                .on('article', function (a) {
                    var feed = {};
                    feed.title = a.title;
                    feed.description = a.description;
                    feed.date = a.date;
                    feed.pubdate = a.pubdate;
                    feed.link = a.link;
                    feed.origlink = a.origlink;
                    feed.author = a.author;
                    feed.guid = a.guid;
                    feed.comments = a.comments;
                    feed.image = a.enclosures;
                    feed.categories = a.categories;
                    feed.source = a.source;
                    feeds.push(feed);
                })
                .on('error', function (error) {
                    console.log(error);
                    return done(error);
                })
                .on('complete', function () {
                    done(null, feeds);
                });
        });
    })();

};


Flickr.prototype.get = function(method, opts) {
    var api_url = this.apiUrl
        + "&method=flickr." + method
        + "&api_key=" + this.apiKey
        + "&format=json"
        + "&nojsoncallback=1";

    for (var item in opts) {
        api_url += "&" + item + "=" + opts[item];
    }

    return Promise.promisify(function (done) {
        request(api_url, function (err, response, body) {
            if(err) {
                return done(err);
            } else {
                console.log('body-------JSON' + JSON.stringify(body));
                done(null, body);
            }
        });
    })();
};

module.exports = FlickrJS;
