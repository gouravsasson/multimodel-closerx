{
	"info": {
		"_postman_id": "277c7423-ed17-405a-b659-973b9c15b1f9",
		"name": "dental",
		"schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
		"_exporter_id": "28855810",
		"_collection_link": "https://dental-1689.postman.co/workspace/dental-Workspace~026989a2-6c52-4024-9e2b-fdfc9d42a50c/collection/28855810-277c7423-ed17-405a-b659-973b9c15b1f9?action=share&source=collection_link&creator=28855810"
	},
	"item": [
		{
			"name": "auth",
			"item": [
				{
					"name": "signup",
					"request": {
						"method": "POST",
						"header": [],
						"url": {
							"raw": "http://localhost:8000/api/auth/register/",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "8000",
							"path": [
								"api",
								"auth",
								"register",
								""
							]
						}
					},
					"response": []
				},
				{
					"name": "user-logingin",
					"request": {
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \"email\":\"abcd@gmail.com\",\r\n    \"password\":\"2RrZRE6GUTus\"\r\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "http://localhost:8000/api/auth/user-login/",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "8000",
							"path": [
								"api",
								"auth",
								"user-login",
								""
							]
						}
					},
					"response": []
				},
				{
					"name": "request-email",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM0NjU0NzkyLCJpYXQiOjE3MzQ0Mzg3OTIsImp0aSI6IjZjMWMxZDIxNWIwZjQyNzM5YTY3MjA3MWI5OTc0ZWU3IiwidXNlcl9pZCI6M30.FY8NBfQ7gK_X-RZWzZE8DxgycQv7JqlioBMvRMZtPe0",
									"type": "string"
								}
							]
						},
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\r\n  \"email\": \"123@example.com\"\r\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "http://localhost:8000/api/auth/request-email/",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "8000",
							"path": [
								"api",
								"auth",
								"request-email",
								""
							]
						}
					},
					"response": []
				},
				{
					"name": "password-reset",
					"protocolProfileBehavior": {
						"disableBodyPruning": true
					},
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM0NjU0NzkyLCJpYXQiOjE3MzQ0Mzg3OTIsImp0aSI6IjZjMWMxZDIxNWIwZjQyNzM5YTY3MjA3MWI5OTc0ZWU3IiwidXNlcl9pZCI6M30.FY8NBfQ7gK_X-RZWzZE8DxgycQv7JqlioBMvRMZtPe0",
									"type": "string"
								}
							]
						},
						"method": "GET",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "http://localhost:8000/api/auth/password-reset/<uidb64>/<token>/",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "8000",
							"path": [
								"api",
								"auth",
								"password-reset",
								"<uidb64>",
								"<token>",
								""
							]
						}
					},
					"response": []
				},
				{
					"name": "password-reset-complete",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM0NTUyMjYwLCJpYXQiOjE3MzQzMzYyNjAsImp0aSI6IjcwZGZlZWU3N2JjYTQzYTU5NzcxODU2ZGZlZTlhM2I2IiwidXNlcl9pZCI6NSwiZmlyc3RfbmFtZSI6ImFiYyIsImxhc3RfbmFtZSI6ImJjYSIsImVtYWlsIjoiYWJjQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmZWQiOmZhbHNlfQ.vF5r4MMivX_vHcLqf3TJB4xjjguWpcf27Gsn2pkgkJA",
									"type": "string"
								}
							]
						},
						"method": "POST",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\r\n  \"password\": \"newpassword123\",\r\n  \"token\": \"<TOKEN>\",\r\n  \"uidb64\": \"<UIDB64>\"\r\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "http://localhost:8000/api/auth/password-reset-complete/",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "8000",
							"path": [
								"api",
								"auth",
								"password-reset-complete",
								""
							]
						}
					},
					"response": []
				},
				{
					"name": "email-verify",
					"protocolProfileBehavior": {
						"disableBodyPruning": true
					},
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM0NjUzMTc2LCJpYXQiOjE3MzQ0MzcxNzYsImp0aSI6ImE4ZDdkMWE0NmNlZTQ3YmVhZjliNmI2YzlhZmE1NDc2IiwidXNlcl9pZCI6M30.1ecoSZlChYuzj6IkFf4tJo6PZGrPHLDDNahllhY8v68",
									"type": "string"
								}
							]
						},
						"method": "GET",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "http://localhost:8000/api/auth/email-verify/<uidb64>/<token>/",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "8000",
							"path": [
								"api",
								"auth",
								"email-verify",
								"<uidb64>",
								"<token>",
								""
							]
						}
					},
					"response": []
				},
				{
					"name": "/change_password/",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM0NjcxMTc5LCJpYXQiOjE3MzQ0NTUxNzksImp0aSI6IjAxZTcyMzNhOWM2ZTRkNDhhZmRhMDY3MGMzMjgxMjM2IiwidXNlcl9pZCI6M30.i9DSBw1SfgtHFus_9Wlkh_sAh0n3HuxSSef8k4ITGMc",
									"type": "string"
								}
							]
						},
						"method": "PUT",
						"header": [],
						"body": {
							"mode": "raw",
							"raw": "{\r\n    \"old_password\":\"Manoj@12345\",\r\n    \"new_password1\":\"Manoj@1234\",\r\n    \"new_password2\": \"Manoj@1234\"\r\n}",
							"options": {
								"raw": {
									"language": "json"
								}
							}
						},
						"url": {
							"raw": "http://localhost:8000/api/auth/change_password/",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "8000",
							"path": [
								"api",
								"auth",
								"change_password",
								""
							]
						}
					},
					"response": []
				},
				{
					"name": "/user-detail/",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM0OTAzMzkzLCJpYXQiOjE3MzQ2ODczOTMsImp0aSI6IjMzZDc0MDZlMDkzNDQzYTBiMGE4ZmVhOWZhNmJlZGY2IiwidXNlcl9pZCI6MjN9.iRWMoeHp5pw_ewCbIheT_-r90UipVhM93B67bkypeyI",
									"type": "string"
								}
							]
						},
						"method": "GET",
						"header": [],
						"url": {
							"raw": "localhost:8000/api/auth/user-detail/",
							"host": [
								"localhost"
							],
							"port": "8000",
							"path": [
								"api",
								"auth",
								"user-detail",
								""
							]
						}
					},
					"response": []
				},
				{
					"name": "template get",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM0OTIxNzU4LCJpYXQiOjE3MzQ3MDU3NTgsImp0aSI6ImI0NzhkNjY0MzRlODRkZDBiYjJkZTk5OWU3YjhhNGRmIiwidXNlcl9pZCI6MzB9.3HQMszr3ZFnUNfdUMhWJQSgv_xjoUhAzdHBm-MOxti0",
									"type": "string"
								}
							]
						},
						"method": "GET",
						"header": [
							{
								"key": "schema-name",
								"value": "e742e48a-08cf-406d-897f-78d9c5dcacdd",
								"type": "text"
							}
						],
						"url": {
							"raw": "http://localhost:8000/api/template/",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "8000",
							"path": [
								"api",
								"template",
								""
							]
						}
					},
					"response": []
				}
			]
		},
		{
			"name": "dental",
			"item": [
				{
					"name": "agency POST",
					"request": {
						"method": "GET",
						"header": []
					},
					"response": []
				}
			]
		},
		{
			"name": "agent",
			"item": [
				{
					"name": "agent get",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM0OTIxNzU4LCJpYXQiOjE3MzQ3MDU3NTgsImp0aSI6ImI0NzhkNjY0MzRlODRkZDBiYjJkZTk5OWU3YjhhNGRmIiwidXNlcl9pZCI6MzB9.3HQMszr3ZFnUNfdUMhWJQSgv_xjoUhAzdHBm-MOxti0",
									"type": "string"
								}
							]
						},
						"method": "GET",
						"header": [
							{
								"key": "schema-name",
								"value": "e742e48a-08cf-406d-897f-78d9c5dcacdd",
								"type": "text"
							}
						],
						"url": {
							"raw": "http://localhost:8000/api/agents/",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "8000",
							"path": [
								"api",
								"agents",
								""
							]
						}
					},
					"response": []
				},
				{
					"name": "agent get",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM0OTIxNzU4LCJpYXQiOjE3MzQ3MDU3NTgsImp0aSI6ImI0NzhkNjY0MzRlODRkZDBiYjJkZTk5OWU3YjhhNGRmIiwidXNlcl9pZCI6MzB9.3HQMszr3ZFnUNfdUMhWJQSgv_xjoUhAzdHBm-MOxti0",
									"type": "string"
								}
							]
						},
						"method": "POST",
						"header": [
							{
								"key": "schema-name",
								"value": "e742e48a-08cf-406d-897f-78d9c5dcacdd",
								"type": "text"
							}
						],
						"url": {
							"raw": "http://localhost:8000/api/agents/",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "8000",
							"path": [
								"api",
								"agents",
								""
							]
						}
					},
					"response": []
				},
				{
					"name": "agent PATCH",
					"request": {
						"auth": {
							"type": "bearer",
							"bearer": [
								{
									"key": "token",
									"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM0OTIxNzU4LCJpYXQiOjE3MzQ3MDU3NTgsImp0aSI6ImI0NzhkNjY0MzRlODRkZDBiYjJkZTk5OWU3YjhhNGRmIiwidXNlcl9pZCI6MzB9.3HQMszr3ZFnUNfdUMhWJQSgv_xjoUhAzdHBm-MOxti0",
									"type": "string"
								}
							]
						},
						"method": "PATCH",
						"header": [
							{
								"key": "schema-name",
								"value": "e742e48a-08cf-406d-897f-78d9c5dcacdd",
								"type": "text"
							}
						],
						"url": {
							"raw": "http://localhost:8000/api/agents/4/update/",
							"protocol": "http",
							"host": [
								"localhost"
							],
							"port": "8000",
							"path": [
								"api",
								"agents",
								"4",
								"update",
								""
							]
						}
					},
					"response": []
				}
			]
		},
		{
			"name": "token/refresh/",
			"request": {
				"auth": {
					"type": "bearer",
					"bearer": [
						{
							"key": "token",
							"value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzM0NjcxNDE5LCJpYXQiOjE3MzQ0NTU0MTksImp0aSI6IjBmNjE5ODg3NDcxOTQ3Yjk4NzY0YTcyMWM4ODZjNTdhIiwidXNlcl9pZCI6M30.-NSvnIgUIfeYqsPu6uxGaemyU92B5FVKxxtmSIWL96s",
							"type": "string"
						}
					]
				},
				"method": "POST",
				"header": [],
				"body": {
					"mode": "raw",
					"raw": "{\r\n    \"refresh\": [\r\n        \"This field is required.\"\r\n    ]\r\n}",
					"options": {
						"raw": {
							"language": "json"
						}
					}
				},
				"url": {
					"raw": "http://localhost:8000/api/auth/token/refresh/",
					"protocol": "http",
					"host": [
						"localhost"
					],
					"port": "8000",
					"path": [
						"api",
						"auth",
						"token",
						"refresh",
						""
					]
				}
			},
			"response": []
		}
	]
}