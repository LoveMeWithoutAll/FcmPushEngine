# FCM push engine

## Server for FCM Admin

### Send messages via Admin FCM API! 

This Application get messages from MS SQL DB, and Send to individual devices.

## For using this app

1. Set DB config on config/dbConfig.json
1. Set FCM service account key on config/fcmServiceAccountKey.json
1. Set FCM database URL on config/fcmConfig.json
1. Write codes for get datas on service/db.js getPushList function
1. Write codes for send push to devices on service/fcm.js sendMsgList funciton
1. Write codes for push feedback on service/db.js pushFeedback function

## Project setup

```
npm install -g pm2
```

```
pm2 install pm2-logrotate
```

```
npm install
```

## Run
```
npm start
```

### Lints and fixes files
```
npm run lint
```

Contributing
-------------
Changes and improvements are more than welcome! Feel free to fork and open a pull request. 

License
-------------
This project is licensed under the MIT License
