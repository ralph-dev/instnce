# Instnce API Documentation

### Weather

- description: Get the current weather
- request: `GET /weather`
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
       http://localhsot:3000/weather
```

### Currently playing
- description: Get the currently playing song
- request: `GET spotify/player/currently-playing`
- response: 200
  - songId: (String) Song currently playing

```
$ curl -X GET
       -H "Authorization: authKey"
       http://localhsot:3000/spotify/player/currently-playing
```

### Next Song
- description: Ask to play the next song
- request: `POST spotify/player/next`
- response: 200

```
$ curl -X GET
       -H "Authorization: authKey"
       http://localhsot:3000/spotify/player/next
```

### Previous Song
- description: Ask to play the previous song
- request: `POST spotify/player/previous`
- response: 200

```
$ curl -X GET
       -H "Authorization: authKey"
       http://localhsot:3000/spotify/player/previous
```
### Save Song
- description: Save the current song
- request: `PUT spotify/player/save`
- content-type: `application/json`
  - body: object
    - ids: (string) the song id
- response: 200

```
$ curl -X GET
       -H 'Authorization': authKey, 'Content-Type': 'application/json'
       -d '{"ids": "gnaidhaoignapigenapi"}
       http://localhsot:3000/spotify/player/previous

```

### Shuffle Check
- description: Save the current song
- request: `PUT spotify/player/shuffle`
- content-type: `application/json`
  - body: object
    - state: (bool) is shuffle on or off
- response: 200

```
$ curl -X GET
       -H 'Authorization': authKey, 'Content-Type': 'application/json'
       -d '{"state": True}
       http://localhsot:3000/spotify/player/shuffle

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
- request `GET /github/user/repos`
- response: 200

```
$ curl -X GET
       -H 'Authorization': authKey
       http://localhsot:3000/github/user/repos
```
### Repo selected
- description: Get the selected github repo
- request `GET /github/:url`
- response: 200

```
$ curl -X GET
       -H 'Authorization': authKey
       http://localhsot:3000/github/:url
```
