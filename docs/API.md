# Instnce API Documentation

### Weather

- description: Get the current weather
- request: `GET https://api.darksky.net/forecast/`
    - content-type: `application/json`
    - body: object
      - lat: (float) current latitude
      - long: float) current longitude
- response: 200
    - content-type: `application/json`
    - body: object
      - temperature:(int) Current temperature
      - summary: (String) Description of temperature
      - temperatureLow: (int) Daily temperature high
      - temperatureHigh: (int) Daily temperature low
```
$ curl -X POST
       -H "Content-Type: `application/json`"
       -d '{"lat":43.899653199999996,"long":-79.2912593}
       https://api.darksky.net/forecast/weather
```

### Currently playing
- description: Get the currently playing song
- request: `GET https://api.spotify.com/v1/me/player/currently-playing`
- response: 200
  - songId: (String) Song currently playing

```
$ curl -X GET
       -H "Authorization: authKey"
       https://api.spotify.com/v1/me/player/currently-playing
```

### Next Song
- description: Ask to play the next song
- request: `POST https://api.spotify.com/v1/me/player/next`
- response: 200

```
$ curl -X GET
       -H "Authorization: authKey"
       https://api.spotify.com/v1/me/player/next
```

### Previous Song
- description: Ask to play the previous song
- request: `POST https://api.spotify.com/v1/me/player/previous`
- response: 200

```
$ curl -X GET
       -H "Authorization: authKey"
       https://api.spotify.com/v1/me/player/previous
```
### Save Song
- description: Save the current song
- request: `PUT https://api.spotify.com/v1/me/player/save`
- content-type: `application/json`
  - body: object
    - ids: (string) the song id
- response: 200

```
$ curl -X GET
       -H 'Authorization': authKey, 'Content-Type': 'application/json'
       -d '{"ids": "gnaidhaoignapigenapi"}
       https://api.spotify.com/v1/me/player/save

```

### Shuffle Check
- description: Save the current song
- request: `PUT https://api.spotify.com/v1/me/player/shuffle`
- content-type: `application/json`
  - body: object
    - state: (bool) is shuffle on or off
- response: 200

```
$ curl -X GET
       -H 'Authorization': authKey, 'Content-Type': 'application/json'
       -d '{"state": True}
       https://api.spotify.com/v1/me/player/shuffle

```

### Jira Login
- description: log into Jira
- request: `PUT /jira/login`
- response: 200

```
$ curl -X GET
       -H 'Authorization': authKey, 'Content-Type': 'application/json'
       http://localhsot:3000/jira/login
```
### Get issues
- description: Get the current Jira issues
- request `GET /jira/issues`
- response: 200

```
$ curl -X GET
       -H 'Authorization': auth
       http://localhsot:3000/jira/issues
```
### Get repos
- description: Get the github repos
- request `GET https://api.github.com/user/repos`
- response: 200

```
$ curl -X GET
       -H 'Authorization': authKey
       https://api.github.com/user/repos
```
### Repo selected
- description: Get the selected github repo
- request `GET https://api.github.com/:url`
- response: 200

```
$ curl -X GET
       -H 'Authorization': authKey
       https://api.github.com/:url
```
