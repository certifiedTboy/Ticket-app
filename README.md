<div align="center" id="top"> 
 
  &#xa0;

</div>

<h1 align="center">Ticket App</h1>

<p align="center">
  <img alt="Github top language" src="https://img.shields.io/github/languages/top/certifiedTboy/ticket-app?color=56BEB8">

  <img alt="Github language count" src="https://img.shields.io/github/languages/count/certifiedTboy/ticket-app?color=56BEB8">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/certifiedTboy/ticket-app?color=56BEB8">

</p>

- [Introduction](#Introduction)
- [Technologies](#Technologies)
- [Get Started](#Get-Started)

<br>

## Introduction

Ticket app is a simple web application built with micro-services architecture in mind.

It is strictly backend heavy, has focussed was on building an application with the micro-services architecture

The application is broken down into different services handling different operations on the application

Natstreaming is used for handling event emittion and subscription between services

## Technologies

The following technologies were used:

- [Node JS](#)
- [Javascript](#)
- [Typescript](#)
- [MongoDB](#)
- [Mongoose](#)
- [Docker](#)
- [Kubernetes](#)
- [Natstreaming](#)
- [Jest](#)
- [Supertest](#)
- [Github wfa for CI/CD](#)

## Get-Started

```bash
# Clone this project
$ git clone https://github.com/certifiedTboy/Ticket-app.git

# Access
$ cd Ticket-app
$ cd each services folder

# Install dependencies
$ npm install

# create a common package for https exceptions, response handler and natstreaming event emitters and subscription

# checkout more info to publishing a package on NPM
$ cd common
$ npm install
$ npm run build
$ npm publish

# After publishing the common service as a npm package, ensure it is installed or updated in other services as part of their dependencies

# create docker image from other services except common
$ docker build -t docker_username/service_name .

# push docker image to docker hub
$ docker push docker_username/service_name

# update all .yaml files with the created docker images respectively

# install skaffold to your machine
https://skaffold.dev/docs/install/#managed-ide

# Run the project
$ skaffold run dev

# Run test
$ cd each services folder with automated tests
$ npm run test

```

<a href="">Voila!</a> <a href="#top">Back to top</a>
