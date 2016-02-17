# Evaluation Project

This is an evaluation project I was given from a client.

Stack:

React, Redux, Bootstrap, Node, MongoDB

REQUIREMENTS
- Node.js
- MongoDB
- No CRUD frameworks
- Use npm to manage/install project
- Run standalone

INSTRUCTIONS


Create a CRUD interface with 2 inputs:
- Input 1 = NAME (text field)
- Input 2 = AGE (integer field)

Have functionality to:
- Create new record (Name + Age = record)
- Read an existing record
- Update an existing record
- Delete a record
- Search records
- Search by Age and/or Name
- Display all records returned by search
- Display total number of records search returned
- Add pagination with max records per page = 10
- List all records
- Add pagination with max records per page = 10
- Display total number of records
- Write documentation on the use of the APIs

Time estimation by client: 1hr

Time spent: 3hrs


## Installation

1) npm install

### Standalone Mode:

1) mongod
2) npm run deploy && npm start
3) Visit http://localhost:3000

### Dev Mode (With hot reload)

1) mongod
2) npm run dev (in one tab)
3) npm start (in another tab)
4) Visit http://localhost:8080

### Tests

1) mongod
2) npm run test

## Frontend

Located in app/ folder

Frontend is a basic webpack + bootstrap + react + redux app that connects to the backend. Not much work was spent styling.

## Backend (Api Docs)

### Create User

`POST` `/api/v1/users`

Example Body:

    {
      "name": "Curtis",
      "age": 24
    }

Example Response:

    { "_id": "56c24586c18480ad32913dcc"}

### Search Users

`POST` `/api/v1/users/search`

Example Body:

    {
      "name": "Curtis",
      "age": 24,
      "limit": 10,
      "skip": 0
    }

Example Response:

    {
      "count": 1,
      "users": [
        {
          "_id": "56c24586c18480ad32913dcc",
          "name": "Curtis",
          "age": 24
        }
      ]
    }

### Update User

`POST` `/api/v1/users/:id`

Example Body:

    {
      "name": "Curtis",
      "age": 12,
    }

Example Response:

    { "_id": "56c24586c18480ad32913dcc"}


### Delete User

`DELETE` `/api/v1/users/:id`

Example Response:

200 status code

### Get User

`GET` `/api/v1/users/:id`

Example response:

    {
      "_id": "56c24586c18480ad32913dcc",
      "name": "Curtis",
      "age": 24
    }