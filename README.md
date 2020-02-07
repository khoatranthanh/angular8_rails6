# README

## Information
- Database: PostgreSQL
- Front-end: Angular 8
- Rails 6.0.2.1
- Ruby 2.6.3

## Problem
- A bit hard from setup project from scratch with both front-end and API.
- Create test, question and answer 1 time. Should be have a better way than my way.
- Angualr 8 support create and edit dynamic elements.
- Because Test will be have conflict with some default Rails attribute that why I'm create database model with name Topic instead of Test.

## API Document
- Should include `X-IWA-DEVICE-ID` for detect call API from mobile application.
- Should include `X-IWA-AUTHORIZE` for authorize API.
- All is authorize API exclude Login.
```
1. Login using email and password
POST /api/v1/login
params: email, password
response:
{
    "status": 200,
    "result": {
        "id": 2,
        "email": "user@example.com",
        "authentication_token": "d-dGqYsso2xNhvCikCgP",
        "name": "user",
        "role": "student",
        "created_at": "2020-02-07T02:52:08.865Z",
        "updated_at": "2020-02-07T03:45:08.631Z"
    }
}
```
```
2. Logout
POST /api/v1/logout
response:
{
    "status": 200,
    "result": {}
}
```
```
3. Get list of Tests
POST /api/v1/tests
response:
{
    "status": 200,
    "result": [
        {
            "id": 1,
            "name": "a",
            "description": "a",
            "questions": [
                {
                    "id": 5,
                    "title": "a",
                    "description": "a",
                    "answers": [
                        {
                            "id": 4,
                            "content": "1",
                            "correct": "false"
                        }
                    ]
                },
                {
                    "id": 7,
                    "title": "b",
                    "description": "b",
                    "answers": []
                }
            ]
        }
    ]
}
```
```
4. Get Test
POST /api/v1/tests/:id
response:
{
    "status": 200,
    "result": {
        "id": 1,
        "name": "a",
        "description": "a",
        "questions": [
            {
                "id": 5,
                "title": "a",
                "description": "a",
                "answers": [
                    {
                        "id": 4,
                        "content": "1",
                        "correct": "false"
                    }
                ]
            },
            {
                "id": 7,
                "title": "b",
                "description": "b",
                "answers": []
            }
        ]
    }
}
```
```
5. Save Test results
POST /api/v1/users/:id/answers/:answer_id
response:
{
    "status": 200,
    "result": {}
}
```

Error Response:
```
{
    "status": 500,
    "message": "Need login!"
}
```
