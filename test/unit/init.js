'use strict';

var fs = require('fs');
var thumb = require('../../index');

var image1 = 'test/unit/images/1.png';
var buffer1 = fs.readFileSync(image1);
var image2 = 'test/unit/images/1.jpg';
var buffer2 = fs.readFileSync(image2);
var image3 = 'test/unit/images/1.gif';
var buffer3 = fs.readFileSync(image3);
var image4 = 'test/unit/images/1.tif';
var buffer4 = fs.readFileSync(image4);
var image5 = 'test/unit/images/1.webp';
var buffer5 = fs.readFileSync(image5);

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
    testInitPngBuffer: function(assert) {
        thumb(buffer1)
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
    testInitJPGBuffer: function(assert) {
        thumb(buffer2)
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
    testInitGifBuffer: function(assert) {
        thumb(buffer3)
        .resize(this.options.width,this.options.height)
        .toBuffer(
            function (err, data) {
                assert.ok(!err, 'unexpected error: ' + err);
                assert.notEqual(data, undefined);
                assert.done();
            }
        );
    },
    testInitTifFile: function(assert) {
        thumb(image4)
        .resize(this.options.width,this.options.height)
        .toBuffer(
            function (err, data) {
                assert.ok(!err, 'unexpected error: ' + err);
                assert.notEqual(data, undefined);
                assert.done();
            }
        );
    },
    testInitTifBuffer: function(assert) {
        thumb(buffer4)
        .resize(this.options.width,this.options.height)
        .toBuffer(
            function (err, data) {
                assert.ok(!err, 'unexpected error: ' + err);
                assert.notEqual(data, undefined);
                assert.done();
            }
        );
    },
    testInitWebpFile: function(assert) {
        thumb(image5)
        .resize(this.options.width,this.options.height)
        .toBuffer(
            function (err, data) {
                assert.ok(!err, 'unexpected error: ' + err);
                assert.notEqual(data, undefined);
                assert.done();
            }
        );
    },
    testInitWebpBuffer: function(assert) {
        thumb(buffer5)
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
