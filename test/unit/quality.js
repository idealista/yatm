'use strict';

var thumb = require('../../index');

var image1 = 'test/unit/images/1.png';

module.exports = {
    setUp : function(callback) {
        this.options = {
            width: 300,
            height: 300,
            quality: 90
        };
        callback();
    },
    tearDown : function(callback) {
        callback();
    },
    testQualityBasic: function(assert) {
        thumb(image1)
        .resize(this.options.width,this.options.height)
        .quality(this.options.quality)
        .toBuffer(
            function (err, data) {
                assert.ok(!err, 'unexpected error: ' + err);
                assert.notEqual(data, undefined);
                assert.done();
            }
        );
    },
    testQualityInvalid: function(assert) {
        var quality = 120;
        assert.throws(function(){
            thumb(image1)
            .quality(quality);
        });
        assert.done();
    },
    testQualityNull: function(assert) {
        assert.throws(function(){
            thumb(image1)
            .quality();
        });
        assert.done();
    }
};
