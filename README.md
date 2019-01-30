### Getting Started
Clone this repository and install dependencies
```
> git clone https://github.com/AnjanishKumar/simply-notify.git
>

> npm install
```
#### Starting subscriber service (Level 2)
Open a new thwminal and run the following command
```
> npm run subscriber
```

#### Starting api service
Open a new thwminal and run the following command
```
> npm run api
```

#### Default envitonment variable
* PORT: `8080`
* RABBITMQ_URL: `amqp://localhost`
* DB_URI: `mongodb://localhost/simply-notify`


#### API Endpoint

// record a notification click
```
POST /api/notifications/:notificationId/click
```
// return the click count of notifications in specified range
```
GET /api/notifications/:notificationId/click
```
// record a notification view
```
POST /api/notifications/:notificationId/view
```
// return the view count of notifications in specified range
```
GET /api/notifications/:notificationId/view
```
// return the subscriber click count in specified range
```
GET /api/subscribers/:subscriberId/click
```
// return the subscriber view count in specified range
```
GET /api/subscribers/:subscriberId/view
```
