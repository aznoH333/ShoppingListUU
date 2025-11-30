# How to run?

1. ``$ docker compose up -d ``
2. ``$ npm run start``
3. Most endpoints require the user to authenticate with a token. 
To get a token a user has to be registered using the /auth/register endpoint
4. To get the actual token call the /auth/login endpoint with the users credentials
5. Take the output token and use it as a token in the bearer section of the request