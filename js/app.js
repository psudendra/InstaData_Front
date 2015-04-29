$(function() {

    //Set up instafeed
    var feed = new Instafeed({
        clientId: 'b43d12249ab94d259a64eb13e5461a2c',
        target: 'instafeed',
        get: 'popular',
        useHttp: true,
        links: true,
        limit: 20,
        sortBy: 'most-liked',
        resolution: 'standard_resolution',
        template: '<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3"><div class="photo-box"><div class="image-wrap"><a href="{{link}}"><img src="{{image}}"></a><div class="likes">{{likes}} Likes</div></div><div class="description">{{caption}}<div class="date">{{model.date}}</div></div></div></div>'
    });
    feed.run();

    var locfeed = new Instafeed({
        clientId: 'b43d12249ab94d259a64eb13e5461a2c',
        target: 'CUfeed',
        get: 'location',
        locationId: 312533997,
        useHttp: true,
        links: true,
        limit: 20,
        sortBy: 'most-liked',
        resolution: 'standard_resolution',
        template: '<div class="col-xs-12 col-sm-6 col-md-4 col-lg-3"><div class="photo-box"><div class="image-wrap"><a href="{{link}}"><img src="{{image}}"></a><div class="likes">{{likes}} Likes</div></div><div class="description">{{caption}}<div class="date">{{model.date}}</div></div></div></div>'
    });
    locfeed.run();
});