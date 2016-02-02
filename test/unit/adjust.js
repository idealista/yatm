'use strict';

var thumb = require('../../index');

var image1 = 'test/unit/images/1.png';

module.exports = {
    setUp : function(callback) {
        this.options = {
            width: 300,
            height: 300,
            adjust: 'wi'
        };
        callback();
    },
    tearDown : function(callback) {
        callback();
    },
    testAdjustBasic: function(assert) {
        thumb(image1)
        .resize(this.options.width,this.options.height)
        .adjust(this.options.adjust)
        .toBuffer(
            function (err, data) {
                assert.ok(!err, 'unexpected error: ' + err);
                assert.notEqual(data, undefined);
                assert.done();
            }
        );
    },
    testAdjustInvalid: function(assert) {
        var adjust = 'bad';
        assert.throws(function(){
            thumb(image1)
            .adjust(adjust);
        });
        assert.done();
    },
    testAdjustNull: function(assert) {
        assert.throws(function(){
            thumb(image1)
            .adjust();
        });
        assert.done();
    }
};
