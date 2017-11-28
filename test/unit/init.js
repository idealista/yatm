'use strict';

var fs = require('fs');
var thumb = require('../../index');

var image1 = 'test/unit/images/1.png';
var image2 = 'test/unit/images/1.jpg';
var image3 = 'test/unit/images/1.gif';

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
    testInitPngFile: function(assert) {
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
    testInitJPGFile: function(assert) {
        thumb(image2)
        .resize(this.options.width,this.options.height)
        .toBuffer(
            function (err, data) {
                assert.ok(!err, 'unexpected error: ' + err);
                assert.notEqual(data, undefined);
                assert.done();
            }
        );
    },
    testInitGifFile: function(assert) {
        thumb(image3)
        .resize(this.options.width,this.options.height)
        .toBuffer(
            function (err, data) {
                assert.ok(!err, 'unexpected error: ' + err);
                assert.notEqual(data, undefined);
                assert.done();
            }
        );
    },
    testInitNoFile: function(assert) {
        var imageBad = 'test/unit/NoImage.png';
        thumb(imageBad)
        .resize(this.options.width,this.options.height)
        .toBuffer(
            function (err, data) {
                assert.ok(err, 'Image not found or invalid type.VipsForeignLoad: file \"' +
                          imageBad +' \" not found');
                assert.equal(data, undefined);
                assert.done();
            }
        );
    },
    testInitBuffer: function(assert) {
        thumb(fs.readFileSync(image1))
        .resize(this.options.width,this.options.height)
        .toBuffer(
            function (err, data) {
                assert.ok(!err, 'unexpected error: ' + err);
                assert.notEqual(data, undefined);
                assert.done();
            }
        );
    },
    testInitNull: function(assert) {
        assert.throws(function(){
            thumb();
        });
        assert.done();
    }
};
