# UTPJudge Frontend

[![Build Status](https://travis-ci.org/in-silico/judge-frontend.svg?branch=master)](https://travis-ci.org/in-silico/judge-frontend)
[![dependencies Status](https://david-dm.org/in-silico/judge-frontend/status.svg)](https://david-dm.org/in-silico/judge-frontend)
[![npm version](https://badge.fury.io/js/npm.svg)](https://badge.fury.io/js/npm)

Frontend Service for UTPJudge project, it aims to deliver a responsive user interface for programming contests, it will use the [RESTful API](https://en.wikipedia.org/wiki/Representational_state_transfer) provided by the [judge-backend](https://github.com/in-silico/judge-backend) to get the judging done.



Requirements/Dependencies
=========================

- [NodeJS](https://nodejs.org/en/)

Installation
============

    npm install

In order to authenticate users with the github API you need to do some
extra work:

- [Configure a reverse proxy + dns](https://github.com/in-silico/utpjudge#set-up-judge-behind-reverse-proxy)
- [Get API keys from github](https://github.com/in-silico/utpjudge#get-api-keys-from-github)


Run
===

    npm start

or you can use this for development

    npm run start-dev


Contributing
============

Contribution to this project is welcome and it is suggested using pull requests
in github that will then be reviewed and merged or commented on. A more specific
contribution guideline is outlined on the [zmq site](http://zeromq.org/docs:contributing),
we use that guide as reference.

Please feel free to add yourself to the
[COLLABORATORS](https://github.com/in-silico/judge-frontend/blob/master/COLLABORATORS)
file in an alphanumerically sorted way before you raise the pull request.

Licensing
=========

The project is released under the MPLv2 license.

Please see LICENSE for full details.

___
<a href="//github.com/in-silico" target="_blank"><p align="center"><img src="https://cloud.githubusercontent.com/assets/14989202/11768037/94347c26-a18e-11e5-84ad-a8554c9fe75d.png" width=110px></img></p></a>

<p align="center">Developed by In-silico.</p>
