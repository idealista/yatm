'use strict';

var thumb = require('../../index');

var image1 = 'test/unit/images/1.png';

module.exports = {
    setUp : function(callback) {
        this.options = {
            width: 300,
            height: 300,
            rotate: 90
        };
        callback();
    },
    tearDown : function(callback) {
        callback();
    },
    testRotateBasic: function(assert) {
        thumb(image1)
        .resize(this.options.width,this.options.height)
        .rotate(this.options.rotate)
        .toBuffer(
            function (err, data) {
                assert.ok(!err, 'unexpected error: ' + err);
                assert.notEqual(data, undefined);
                assert.done();
            }
        );
    },
    testRotateInvalid: function(assert) {
        var rotate = 20;
        assert.throws(function(){
            thumb(image1)
            .rotate(rotate);
        });
        assert.done();
    },
    testRotateNull: function(assert) {
        assert.throws(function(){
            thumb(image1)
            .rotate();
        });
        assert.done();
    }
};
