# This is a JWT Authentication Example Module

## To generate ACCESS_TOKEN or REFRESH_TOKEN run below command on node

```js
require('crypto').randomBytes(64); //the token are saved as env variable.
```

## To Run All Servers

| Server      | Command           | Port |
| ----------- | ----------------- | ---- |
| Auth Server | `yarn start:auth` | 5000 |
| Server 1    | `yarn start:s1`   | 4000 |
| Server 2    | `yarn start:s2`   | 3000 |

> Two servers are to demonstrate auth can be done on both server as long as `secret` is same for sister sites or server behind load balancer

## API Specs

| Endpoint                     | Method | Body                                                | Function                                                        |
| ---------------------------- | ------ | --------------------------------------------------- | --------------------------------------------------------------- |
| http://localhost:5000/login  | GET    | body: `{ "username": "Shishir Singh" }`             | Gives Access Token and Refresh Token                            |
| http://localhost:5000/token  | POST   | body: `{"token": <refreshToken> }`                  | Gives access token from refresh token                           |
| http://localhost:3000/posts  | GET    | header: `{"Authorization": "Bearer <accessToken>"}` | Fetch all post for the corresponding user                       |
| http://localhost:5000/logout | DELETE | body: `{"token": <refreshToken> }`                  | Delete refresh token so no new access token using refresh token |

> Examples are added in request.rest file which can be use in VSCode using `REST CLient` Plugin
