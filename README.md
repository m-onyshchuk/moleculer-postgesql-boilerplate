# Boilerplate with Moleculer.js framework and PostgreSQL

## Summary
This is a tiny example of usage PostgreSQL with Moleculer.js and without moleculer-db module. 

It can be useful when you:
* don`t need CRUD support 
* have a lot of services so need careful attitude to DB connections

## Usage

1) Clone this repository
2) Run `npm install`
3) Run `sudo npm run dc:up` to create PostgreSQL database and run PostgreSQL in Docker container
4) Run `npm run start` to start application
5) Open in browser `http://localhost:3000/api/test/run?search=nature` or `http://localhost:3000/api/test/run?search=art`
6) Terminate application
7) Run `sudo npm run dc:dn` to stop PostgreSQL
