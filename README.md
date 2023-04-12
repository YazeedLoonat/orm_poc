## Description

Based on the [Nest](https://github.com/nestjs/nest) starter repository.
Leverages [TypeORM](https://typeorm.io/) 
Leverages [Prisma](https://www.prisma.io/) 
Leverages [Sequelize](https://sequelize.org/) kinda 
Based on Entities from [Bloom](https://github.com/bloom-housing/bloom)

This is a PoC/experiment to test a few different ORMs with how Bloom set up its entities. 
This for sure could use some clean up, but the query meta data should still stay relevent.

There are a few different endpoints all listed out in the app.controller.ts file. Inside that file you'll find the different URLs.
My recommendation is to hit the `_validate_` endpoints since that includes meta data, and doesn't clog things up with actually trying to render what could be a ton of text.
You can hit this using a tool like postman, or just throwing the commented URLs into a browser.

## Installation

```bash
$ yarn install
```
make sure the .env file's db placement is what you're looking for
```bash
$ yarn typeorm:setup
$ yarn prisma:setup
```
Hit http://localhost:3000/typeorm_seeding & http://localhost:3000/prisma_seeding to seed starting data

## Running the app

```bash
$ yarn start
```

## Prisma
<a href="https://docs.nestjs.com/recipes/prisma" target="_blank"> Prisma Docs </a>

## TypeORM
<a href="https://docs.nestjs.com/recipes/sql-typeorm" target="_blank"> TypeORM Docs </a>

## Sequelize
<a href="https://docs.nestjs.com/recipes/sql-sequelize" target="_blank"> Sequelize Docs </a>
Sequelize seems to want people to create the models/migrations from the cli which doesn't seem ideal for more complex models
<a href="https://sequelize.org/docs/v6/other-topics/migrations" target="_blank"> sequelize docs </a>
<a href="https://stackoverflow.com/questions/27835801/" target="_blank"> stackoverflow question </a>
<a href="https://victoronwuzor.medium.com/how-to-setup-sequelize-migration-in-a-nestjs-project-b4aec1f88612" target="_blank"> medium blog </a>

I ended up dropping Sequelize investigation for this because of its lack of migrations based off of models instead of doing it all through the cli. 


Reach out if you have any questions!