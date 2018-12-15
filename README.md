# gendiff.js
[![maintainability](https://api.codeclimate.com/v1/badges/4c84c295db266ebccdea/maintainability)](https://codeclimate.com/github/brasid/project-lvl2-s381/maintainability)
[![test coverage](https://api.codeclimate.com/v1/badges/4c84c295db266ebccdea/test_coverage)](https://codeclimate.com/github/brasid/project-lvl2-s381/test_coverage)
[![build status](https://travis-ci.org/brasid/project-lvl2-s381.svg?branch=master)](https://travis-ci.org/brasid/project-lvl2-s381)

##
A simple cli utility to find the difference betweeen two configuration files. This is a student's project provided by [hexlet](https://ru.hexlet.io).
For now it works with .json, .yml and .ini config files.

Project mentor - [@Kirill Mokevnin](https://github.com/mokevnin).
##

## Installation
```sh
npm install -g brasid-difference-generator
```
[![asciicast](https://asciinema.org/a/216289.svg)](https://asciinema.org/a/216289)

## Usage
The utility can present diff in different formats. For now there are three formats: 'standart', 'plain' and 'json'
### Comparing files using standart output
```sh
gendiff <firstConfig> <secondConfig>
```
[![asciicast](https://asciinema.org/a/216987.svg)](https://asciinema.org/a/216987)

### Comparing files using plain output
```sh
gendiff --format plain <firstConfig> <secondConfig>
gendiff -f plain <firstConfig> <secondConfig>
```

[![asciicast](https://asciinema.org/a/217073.svg)](https://asciinema.org/a/217073)

### Comparing files using json output
```sh
gendiff --format json <firstConfig> <secondConfig>
gendiff -f json <firstConfig> <secondConfig>
```
[![asciicast](https://asciinema.org/a/217085.svg)](https://asciinema.org/a/217085)
