# Change Log
All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/) and [Keep a changelog](https://github.com/olivierlacan/keep-a-changelog).

## [Unreleased](https://github.com/idealista/yatm/tree/develop)
### Fixed
- [#51](https://github.com/idealista/yatm/issues/51) *Migrate the CI stack to Ansible 8 and molecule 6 on Python 3.10: molecule 3.0.4 was capping paramiko, sh and PyYAML, and the PyYAML cap is what pinned the whole project to an old Python* @danieljesus
- [#51](https://github.com/idealista/yatm/issues/51) *Pin community.docker 4.6.1, since the 3.4.11 bundled with Ansible 8 predates the requests 2.32 hotfix for its vendored Docker SDK* @danieljesus
- [#51](https://github.com/idealista/yatm/issues/51) *Add npm overrides so the transitive dev dependencies capped by jshint and istanbul can be patched, and update nan and grunt to their latest releases* @danieljesus

## [2.1.4](https://github.com/idealista/yatm/tree/2.1.4)
### Fixed
- [#45](https://github.com/idealista/yatm/issues/45) *Update vulnerable npm and Python dependencies reported by Dependabot* @danieljesus
- [#44](https://github.com/idealista/yatm/issues/44) *Fix the molecule build: point apt at archive.debian.org, as buster is EOL, and bump the exiv2 and vips roles to versions that work with Ansible 2.9* @danieljesus
- [#49](https://github.com/idealista/yatm/issues/49) *Remove the orphaned test-requirements.txt: nothing installs from it and its stale pins kept 30 Dependabot alerts open* @danieljesus

## [2.1.3](https://github.com/idealista/yatm/tree/2.1.3)
### Fixed
- [#36](https://github.com/idealista/yatm/issues/36) *Add more missed dependencies* @jmonterrubio

## [2.1.2](https://github.com/idealista/yatm/tree/2.1.2)
### Fixed
- [#36](https://github.com/idealista/yatm/issues/36) *Fix another segmentation fault* @jmonterrubio

## [2.1.1](https://github.com/idealista/yatm/tree/2.1.1)
### Fixed
- [#36](https://github.com/idealista/yatm/issues/36) *Fix segmentation fault* @jmonterrubio

## [2.1.0](https://github.com/idealista/yatm/tree/2.1.0)
### Added
- [#33](https://github.com/idealista/yatm/issues/33) *Use libvips 8.11.2* @jmonterrubio
### Fixed
- [#33](https://github.com/idealista/yatm/issues/33) *Add missed dependencies* @jmonterrubio

## [2.0.0](https://github.com/idealista/yatm/tree/2.0.0)
### Added
- [#20](https://github.com/idealista/yatm/issues/20) *Adding support to Debian Buster and NodeJS 14* @jmonterrubio
### Fixed
- [#23](https://github.com/idealista/yatm/issues/23) *Error publishing npm package from travis* @jmonterrubio

## [1.0.1](https://github.com/idealista/yatm/tree/1.0.1)
### Added
- [#14](https://github.com/idealista/yatm/issues/14) *Adding support to Debian Jessie* @dortega

### Fixed
- [#15](https://github.com/idealista/yatm/issues/15) *Using exiv2-role v1.0.1 because source package download is not working anymore* @dortega

## [1.0.0](https://github.com/idealista/yatm/tree/1.0.0)
### Added
- *First release* @jmonterrubio
