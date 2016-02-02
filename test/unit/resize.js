'use strict';

var thumb = require('../../index');

var image1 = 'test/unit/images/1.png';

module.exports = {
    setUp : function(callback) {
        this.options = {
            width: 300,
            height: 300
        };
        callback();
    },
    tearDown : function(callback) {
        callback();
    },
    testResizeBasic: function(assert) {
        thumb(image1)
        .resize(this.options.width,this.options.height)
        .toBuffer(
            function (err, data) {
                assert.ok(!err, 'unexpected error: ' + err);
                assert.notEqual(data, undefined);
                assert.done();
            }
        );
    },
    testResizeNoHeight: function(assert) {
        assert.throws(function(){
            thumb(image1)
            .resize(this.options.width);
        });
        assert.done();
    },
    testResizeNoWidth: function(assert) {
        assert.throws(function(){
            thumb(image1)
            .resize(null,this.options.height);
        });
        assert.done();
    },
    testResizeNoWidthAndHeight: function(assert) {
        assert.throws(function(){
            thumb(image1)
            .resize();
        });
        assert.done();
    },
    testResizeInvalidWidth: function(assert) {
        var width = -1;
        assert.throws(function(){
            thumb(image1)
            .resize(width);
        });
        assert.done();
    },
    testResizeInvalidHeight: function(assert) {
        var height = -1;
        assert.throws(function(){
            thumb(image1)
            .resize(this.options.width,height);
        });
        assert.done();
    }
};
