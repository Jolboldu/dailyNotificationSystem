<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nestlective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)

## Description
backend for telegram bot that will send notification 

username of bot : "@dnewstbot"

### links

https://github.com/Ermek99/se - frontend repository part of the project: 

http://ec2-3-127-36-250.eu-central-1.compute.amazonaws.com/  - backend app is serving on aws instance

http://dvijstaticfiles.s3-website.eu-central-1.amazonaws.com/ - landing page of the project

https://trello.com/b/PEfYvpFa/daily-notification-system - trello board to track history of the app

### commands

``/start`` command to start the chat and register user to database

``/me`` command to get hash 



## API description

| URL | method |success response| error response|params|description|
| ------ | ------ | ------ | ------ | ------ |------ |
| ``/user/:hash``| GET |user data| empty object |none |retrieves info from hash
| ``/user/:hash``| POST |true|false |{message:string, time:string} |creates notification
| ``/user/:hash``| PUT |true| false |{message:string, time:string} |updates notification


## Dependencies
Mongodb running server

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

In order to run the app you have to change a telegram token

