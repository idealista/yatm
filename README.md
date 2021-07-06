![Logo](https://raw.githubusercontent.com/idealista/yatm/master/logo.gif)

[![Build Status](https://travis-ci.com/idealista/yatm.svg?branch=master)](https://travis-ci.com/idealista/yatm)
[![npm version](https://badge.fury.io/js/yatm.svg)](https://badge.fury.io/js/yatm)

# YATM - Yet Another Thumbnail Manager

A Node.js module that provides access to the VIPS library and Exiv2 in order to resize and rotate images.

- [Getting Started](#getting-started)
	- [Prerequisities](#prerequisities)
	- [Installing](#installing)
- [Usage](#usage)
- [Testing](#testing)
- [Built With](#built-with)
- [Versioning](#versioning)
- [Authors](#authors)
- [License](#license)
- [Contributing](#contributing)

## Getting Started

### Prerequisities

Node.js installed. Tested with v14.17.0.

In version 2.0.0, the support for nodejs <= 8 and debian != buster is discontinued and not tested.  

## Installation

```
$ npm install yatm
```

In order to avoid external dependencies, add

```
LD_LIBRARY_PATH={{path to project/global node_modules}}/yatm/deps/lib/
```

to your Node.js environment. Usually:

```
export LD_LIBRARY_PATH={{path to project/global node_modules}}/yatm/deps/lib/
```

## Usage

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

## Testing

* Unit testing

```
$ npm test
```
* Memory leak

```
$ ./test/memoryleak/memoryleak.sh
```

* Full testing, that creates a docker container and installs all dependencies

```
$ molecule test
```

## Built With

![Ansible](https://img.shields.io/badge/ansible-2.9.14-green.svg)
![Molecule](https://img.shields.io/badge/molecule-3.0.4-green.svg)
![Goss](https://img.shields.io/badge/goss-0.3.16-green.svg)


## Versioning

For the versions available, see the [tags on this repository](https://github.com/idealista/yatm/tags).

Additionaly you can see what change in each version in the [CHANGELOG.md](CHANGELOG.md) file.

## Authors

* **Idealista** - *Work with* - [idealista](https://github.com/idealista)

See also the list of [contributors](https://github.com/idealista/yatm/contributors) who participated in this project.

## License

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

This project is licensed under the [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0) license - see the [LICENSE](LICENSE) file for details.

## Contributing

Please read [CONTRIBUTING.md](.github/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.
