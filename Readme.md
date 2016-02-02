# thumbnailer

A node.js module that provides access to the VIPS library and Exiv2 in order to resize and rotate images.

Tested with VIPS 8.1.1.

## Introduction

Image processor using the libvips C library.

## Installation

The project needs some dependencies for image processing. these dependencies are: nodejs node-gyp, vips and exiv2.

* [nodejs](https://nodejs.org "Node.js") (>=0.10)

```sh
$ wget http://nodejs.org/dist/v0.10.33/node-v0.10.33.tar.gz
$ tar -zxvf node-v0.10.33.tar.gz
$ cd node-v0.10.33/
$ ./configure
$ make
$ sudo make install
```

* [vips](http://www.vips.ecs.soton.ac.uk "VIPS") (>= 8.0)

```sh
$ sudo apt-get install libglib2.0-dev libglib2.0-0 libexif-dev libmagick-dev liborc-0.4
$ wget http://www.vips.ecs.soton.ac.uk/supported/8.1/vips-8.1.1.tar.gz
$ tar -zxvf vips-8.1.1.tar.gz
$ cd vips-8.1.1/
$ ./configure
$ make
$ sudo make install
$ sudo echo 'LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/local/lib:/usr/sbin' >> /etc/profile
$ sudo echo 'export LD_LIBRARY_PATH' >> /etc/profile
$ source /etc/profile
```

* [exiv2](http://www.exiv2.org "Exiv2") (>= 0.23)

```sh
$ wget http://www.exiv2.org/exiv2-0.24.tar.gz
$ tar -zxvf exiv2-0.24.tar.gz
$ cd exiv2-0.24/
$ ./configure --disable-xmp
$ make
$ sudo make install
```

* [node-gyp](https://github.com/nodejs/node-gyp "node-gyp")

```sh
$ sudo npm install -g node-gyp
```

Once the dependencies are installed:

```sh
$ npm install
```

## Testing

Unit testing

```sh
$ npm test
```
Memory leak

```sh
$ ./test/memoryleak/memoryleak.sh
```

## Documentation

* **(path)**

    Set the thumb object with an input path.


* **(buffer)**

    Set the thumb object with an input buffer.


* **resize(width,height)**

    The resized values. One of both could be 0, so the result will adjust to the non zero side.


* **rotate(rotate)**

    Thumb rotation.

    * Values: {0,90,180,270}

* **quality(quality)**

    Desired thumb quality.

    * Values: {0-100}

* **adjust(adjust)**

    Adjusts the image to the width ('wi') or height ('he') if one of them are 0 setted. Usually setted with crop.

    * Values: {'wi', 'he'}


* **crop(crop)**

    Crops the thumb if the resized result doesn't match current ratio, avoiding deformation.

    * Values: {true,false}

* **toBuffer(callback)**

    Transform the thumb object with the desired options and returns the image as a buffer.
