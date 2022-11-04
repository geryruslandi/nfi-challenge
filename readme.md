# About Project
This project is using Express JS for http server framework

Here is the list of features inside this test
* For Test framework, im using JEST.
* For ORM im using Sequelize (wrapped with Sequelize-Typescript)
* For model transformer to be returned to response, im creating custom transformer class for each of model
* for Token Authentication, im using passport and JWT strategy
* for request data validation, im using express validator
* for business logic i put it inside service
* for all of environtment variables, i put it inside config file

# Getting Started
Steps to run this app on your local machine:
* clone this repo
* make sure you have latest Nodejs and Yarn, this project tested with `NodeJS version 14.18.3` and `Yarn version 1.22.19`
* create database for this project
* copy .env.example to .env and .env.test
* .env is for running this app on your local, .env.test is for running this app on testing environtment
* put your db credential to each of .env and .env.test
* `yarn install`
* `yarn migrate`

after those steps completed, you can test this app.

if you want to run `Automation TEST` that i made, you can run
```
yarn test
```
> for now im using mysql as database driver for unit test, but the best database for test's performance sake is sqlite3

<br>

There is six endpoints that already made :
* Login
* registration
* (auth user) deposit
* (auth user) withdrawal
* (admin) deposit
* (admin) withdrawal

## Login ``(POST: /auth/login)``
required parameters:
* username = `required|string|min:6`
* password = `required|string|min:8`

Error response :
* standart error message

Success response example:
```
{
  "code": 1000,
  "data": {
    "user": {
      "id": 1,
      "username": "geryruslandi",
      "private_data": {
        "id": 1,
        "balance": 55.5
      }
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImdlcnlydXNsYW5kaSIsImlhdCI6MTY2NzU0OTQ3OSwiZXhwIjoxNjY4MTU0Mjc5fQ.qNFV2MSahWsYr0WIbh-nnN7lYe_AEdc-ssrOyHCKYaU"
  }
}
```

> This token need to be used as Bearer Token on Authorization header for each requests that need an authentication ((auth) deposit, (auth) withdraw)

## Register ``(POST: /auth/registration)``
required parameters:
* username = `required|string|min:6`
* password = `required|string|min:8`

Error response :
* standart error message

Success response example:
```
{
  "code": 1000,
  "data": {
    "user": {
      "id": 3,
      "username": "geryruslandi_test",
      "private_data": {
        "id": 3,
        "balance": 0
      }
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImdlcnlydXNsYW5kaV90ZXN0IiwiaWF0IjoxNjY3NTQ5NjAzLCJleHAiOjE2NjgxNTQ0MDN9.RBorSbKJ5e_TnIY8E-feNc6M1_JA2OuK26TgKQOcFBI"
  }
}
```

## (Auth) Deposit ``(POST: /transactions/deposit)``
> Bearer Token Needed

required parameters:
* amount = `required|numeric|min:1`

Error response :
* standart error message

Success response example:
```
{
  "code": 1000,
  "data": {
    "private_data": {
      "id": 1,
      "balance": 335.5
    },
    "deposit": 70
  }
}
```

## (Auth) Withdraw ``(POST: /transactions/withdraw)``
> Bearer Token Needed

required parameters:
* amount = `required|numeric|min:1`

Error response :
* standart error message

Success response example:
```
{
  "code": 1000,
  "data": {
    "private_data": {
      "id": 1,
      "balance": 55.5
    },
    "withdraw": 70
  }
}
```

___
### <b>IMPORTANT NOTE!!</b>
ADMIN ENDPOINTS IS NOT GUARDED WITH ANY OF MIDDLEWARE YET, AS THERE IS NO REQUIREMENT FOR IT
___


## (Admin) Deposit ``(POST: /admin/transactions/deposit)``
> Bearer Token Needed

required parameters:
* amount = `required|numeric|min:1`
* user_id = `required`

Error response :
* standart error message

Success response example:
```
{
  "code": 1000,
  "data": {
    "private_data": {
      "id": 1,
      "balance": 335.5
    },
    "deposit": 70
  }
}
```

## (Admin) Withdraw ``(POST: /transactions/withdraw)``
> Bearer Token Needed

required parameters:
* amount = `required|numeric|min:1`
* user_id = `required`

Error response :
* standart error message

Success response example:
```
{
  "code": 1000,
  "data": {
    "private_data": {
      "id": 1,
      "balance": 55.5
    },
    "withdraw": 70
  }
}
```
