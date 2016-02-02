'use strict';

var thumb = require('../../index');

var image1 = 'test/unit/images/1.png';

module.exports = {
    setUp : function(callback) {
        this.options = {
            width: 300,
            height: 300,
            crop: true
        };
        callback();
    },
    tearDown : function(callback) {
        callback();
    },
    testCropBasic: function(assert) {
        thumb(image1)
        .resize(this.options.width,this.options.height)
        .crop(this.options.crop)
        .toBuffer(
            function (err, data) {
                assert.ok(!err, 'unexpected error: ' + err);
                assert.notEqual(data, undefined);
                assert.done();
            }
        );
    },
    testCropInvalid: function(assert) {
        var crop = 'yes';
        assert.throws(function(){
            thumb(image1)
            .crop(crop);
        });
        assert.done();
    },
    testCropNull: function(assert) {
        assert.throws(function(){
            thumb(image1)
            .crop();
        });
        assert.done();
    }
};
