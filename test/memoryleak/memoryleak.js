'use strict';

var fs = require('fs');
var thumb = require('../../index');

var image1 = 'test/unit/images/1.png';

var options = {
    width: 300,
    height: 300,
    rotate: 180,
    quality: 85,
    adjust: 'wi',
    crop: true
};

function testInitFromFile (options, callback) {
    thumb(image1)
    .resize(options.width,options.height)
    .rotate(options.rotate)
    .quality(options.quality)
    .adjust(options.adjust)
    .crop(options.crop)
    .toBuffer(callback);
}

function testInitFromBuffer (options, callback) {
    thumb(fs.readFileSync(image1))
    .resize(options.width,options.height)
    .rotate(options.rotate)
    .quality(options.quality)
    .adjust(options.adjust)
    .crop(options.crop)
    .toBuffer(callback);
}

testInitFromFile(options,
    function () {
        console.log('done filed');
        return;
    }
);

testInitFromBuffer(options,
    function () {
        console.log('done buffered');
        return;
    }
);
