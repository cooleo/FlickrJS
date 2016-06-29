# FlickrJS
flickr nodejs wrapper api

# Install
npm install flickrjs

# Usage

<pre>
var FlickrJS = require('FlickrJS');
var keys = {'api_key': 'API KEY HERE'};
var flickrJS = new Flickr(keys);
</pre>

    //get public photos
<pre>
flickrJS.getPulicPhotos().then(function (result) {
        console.log(result);
    }).catch(function (err) {
        console.log('err:%s',err);
    });
</pre>
  
   </pre>
    // search photos
<pre>
flickrJS.get("photos.search", req.body).then(function (result) {
        console.log(result);
    }).catch(function (err) {
        console.log('err:%s',err);
    });
    
  </pre>
  