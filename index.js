'use strict';

var thumbnailer = require('./build/Release/yatm');

/**
  * Representation of a Thumbnail with its attributes
  * @class
  * @constructor
  * @param {string|Buffer} input - The path (string) or the {@link https://nodejs.org/api/buffer.html#buffer_class_buffer|Buffer}
  * that represents binary data of this Thumbnail directly
  */
var Thumb = function(input) {
    if (!(this instanceof Thumb)) {
        return new Thumb(input);
    }
    this.options = {
        input : {
            buffer: null,
        },
        watermark : {
            path: '',
            buffer: null
        },
        width: 0,
        height: 0,
        quality: 80,
        rotate: 0,
        adjust: '',
        crop: false
    };
    setImage(this.options.input, input);
    return this;
};

module.exports = Thumb;

/**
 * Sets the size of this Thumb to the specified width and height
 * @memberof Thumb
 * @param {number} width - new Width for this Thumb (should be an integer >= 0)
 * @param {number} height - new Height for this Thumb (should be an integer >= 0)
 * @return {Thumb} This Thumb resized to specified width and height
 */
Thumb.prototype.resize = function(width, height) {
    if (!isPositiveOrZeroInteger(width)) {
      throw new Error('Invalid width: ' + width + '. Width should be >= 0');
    }

    if (!isPositiveOrZeroInteger(height)) {
      throw new Error('Invalid height: ' + height + '. Height should be >= 0');
    }

    this.options.width = width;
    this.options.height = height;

    return this;
};

/**
 * Rotates this Thumb the specified angle of rotation
 * @memberof Thumb
 * @param {number} angle - rotation angle (should be 0, 90, 180 or 270 degrees)
 * @return {Thumb} This Thumb rotated the specified angle
 */
Thumb.prototype.rotate = function(angle) {
    if (!isValidAngle(angle)) {
      throw new Error('Unsupported angle: ' + angle + '. Supported values are (0, 90, 180, 270)');
    }

    this.options.rotate = angle;
    return this;
};

/**
 * Sets the quality of this Thumb the specified value
 * @memberof Thumb
 * @param {number} quality - quality value (should be in the range [0, 100])
 * @return {Thumb} This Thumb with this level of quality
 */
Thumb.prototype.quality = function(quality) {
    if (!isValidQuality(quality)) {
      throw new Error('Invalid quality: ' + quality + '. Valid quality value should be in the range [0-100]');
    }

    this.options.quality = quality;
    return this;
};

Thumb.prototype.adjust = function(adjust) {
    if (!isValidAdjust(adjust)) {
      throw new Error('Invalid adjust: ' + adjust + '. Adjust valid values are (wi, he)');
    }

    this.options.adjust = adjust;
    return this;
};

Thumb.prototype.crop = function(crop) {
    if (!isValidCrop(crop)) {
      throw new Error('Invalid crop: ' + crop + '. Crop valid values are (true,false)');
    }

    this.options.crop = crop;
    return this;
};

/**
 * Applies provided watermark to this Thumb
 * @memberof Thumb
 * @param {string|Buffer} input - The path (string) or the {@link https://nodejs.org/api/buffer.html#buffer_class_buffer|Buffer}
 * that represents binary data of the watermark to apply directly
 * @return {Thumb} This Thumb with this watermark applied
 */
Thumb.prototype.watermark = function(input) {
    setImage(this.options.watermark, input);
    return this;
};

Thumb.prototype.hasWatermark = function() {
    return (this.options.watermark.path !== null &&
            this.options.watermark.path !== '') ||
           this.options.watermark.buffer !== null;
};

Thumb.prototype.toBuffer = function(callback) {
    var input = getImage(this.options.input);
    if (input) {
        thumbnailer.
        transform(input,
                  this.options.width,
                  this.options.height,
                  this.options.quality,
                  this.options.crop,
                  getImage(this.options.watermark),
                  this.options.rotate,
                  this.options.adjust,
                  callback);
    } else {
        callback('Undefined input');
    }
};

function setImage(dest, input) {
    if (typeof input === 'string') {
        dest.path = input;
    } else if (typeof input === 'object' && input instanceof Buffer) {
        dest.buffer = input;
    } else {
        throw new Error('Unsupported input ' + typeof input);
    }
}

function getImage(input) {
    var img;
    if (input.buffer !== null) {
        img = input.buffer;
    } else if (input.path !== null &&
               input.path !== '') {
        img = input.path;
    }
    return img;
}

function isPositiveOrZeroInteger(num) {
    return typeof num === 'number' &&
           !Number.isNaN(num) &&
           num % 1 === 0 &&
           num >= 0;
}

function isValidAngle(angle) {
    return typeof angle === 'number' &&
           !Number.isNaN(angle) &&
           [0, 90, 180, 270].indexOf(angle) !== -1;
}

function isValidQuality(quality) {
    return typeof quality === 'number' &&
           !Number.isNaN(quality) &&
           quality % 1 === 0 &&
           quality >= 0 &&
           quality <= 100;
}

function isValidAdjust(adjust) {
    return ['wi', 'he'].indexOf(adjust) !== -1;
}

function isValidCrop(crop) {
    return typeof crop === 'boolean';
}
