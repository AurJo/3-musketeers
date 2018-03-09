# cash

> complete the cash/README.md file with a complete description of installation, usage... of the library

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**  *generated with [DocToc](https://github.com/thlorenz/doctoc)*

- [Introduction](#introduction)
- [Installation](#installation)
- [Dependencies](#dependencies)
- [Usage](#usage)
  - [Conversion](#conversion)
		- [Examples of conversion](@examples_of_conversiob)
  - [Commands](#commands)
		- [Examples of commands](@examples_of_commands)


<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Introduction

Convert your money into an other currency

## Installation

* Fork the project via `github`
* Clone your forked repository project `https://github.com/YOUR_USERNAME/3-musketeers`

```sh
❯ cd /path/to/workspace
❯ git clone git@github.com:YOUR_USERNAME/3-musketeers.git
```
##Dependencies

* Go to your repository
* Install the dependencies

``` sh
> cd /path/3-musketeers/cash
> npm install
```

You can verify yours dependencies going to [cash/package.json]. You will see your dependencies. You must have :
		* chalk
		* conf
		* got
		* money
		* ora
		* update-notifier

## Usage

### Conversion

To convert an amount into a currency

``` sh
> cd /path/3-musketeers/cash/bin
> node index.js <amount> <currency>
```

You can find the list of currencies : http://akep.us/currencies

#### Examples of conversion
```sh
> node index.js 1 usd
> node index.js 1 usd eur pln aud
```

### Commands

To run others commands

```sh
> node index.js <command>
```

#### Examples of commands
```sh
> node index.js --save, -s         Save currencies as default currencies
> node index.js --help, -h         Display help message
> node index.js --version, -v   Display version number
```
