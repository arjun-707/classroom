# book-cupboard
google book api app

# steps
* ```brew tap heroku/brew && brew install heroku```
* ```mkdir book-cupboard```
* ```cd book-cupboard```
* ```npm init```
* setup package.json file and project
* ```git add .```
* ```git commit -am "<message>"```
* ```git push origin main```
* ```heroku buildpacks:set heroku/nodejs --app book-cupboard```
* ```heroku git:remote -a book-cupboard```
* ```heroku config:set PORT=3000```
* ```heroku config:set NODE_ENV=development```
* ```heroku config:set MONGO_URI=<connection-url>```
* ```git push heroku main```

# to watch logs
* ```heroku logs --tail```

# test
https://book-cupboard.herokuapp.com/