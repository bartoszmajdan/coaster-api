# Coaster API

## Requirements

-   Docker
-   Docker Compose
-   Node.js 20.x
-   Redis

## Setup

```bash
git clone git@github.com:bartoszmajdan/coaster-api.git
cd coaster-api
```

## Configuration

```bash
cp .env.example .env.development
cp .env.example .env.production
```

Set the correct values in the .env files

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Docker

Run production and development environments with docker compose.
Before running the following command, make sure you have the correct values in the .env files.

Production PORT: 3051
Development PORT: 3050

```bash
docker compose up
```

## API Documentation

### 1. Ping the Server

**GET** `/api/ping`

This route is used to check if the server is running and responsive.

##### Request:

```bash
curl -X GET http://localhost:3000/api/ping
```

##### Response:

```json
200 OK
{
    "message": "pong"
}
```

### 2. Create a New Coaster

**POST** `/api/coasters`

##### Request:

```bash
curl -X POST http://localhost:3050/api/coasters \
-H "Content-Type: application/json" \
-d '{
    "staffCount": 10,
    "clientsCount": 100,
    "routeLength": 1500,
    "openingHour": "08:00",
    "closingHour": "20:00"
}'
```

##### Response:

```json
201 Created
{
    "id": "b76ca3d8-409c-4d57-9a0e-548a77ba6dd7"
}
```

### 3. Update an Existing Coaster

**PUT** `/api/coasters/:coasterId`

##### Request:

```bash
curl -X PUT http://localhost:3050/api/coasters/{coasterId} \
-H "Content-Type: application/json" \
-d '{
    "staffCount": 12,
    "clientsCount": 120,
    "openingHour": "09:00",
    "closingHour": "21:00"
}'
```

##### Response:

```
200 OK
```

### 4. Add a Wagon to a Coaster

**POST** `/api/coasters/:coasterId/wagons`

##### Request:

```bash
curl -X POST http://localhost:3050/api/coasters/{coasterId}/wagons \
-H "Content-Type: application/json" \
-d '{
    "seatsCount": 24,
    "wagonSpeed": 80
}'
```

##### Response:

```json
201 Created
{
    "id": "d5964e8e-cb28-4d8e-b3b3-36b4437e23d4"
}
```

### 5. Delete a Wagon from a Coaster

**DELETE** `/api/coasters/:coasterId/wagons/:wagonId`

##### Request:

```bash
curl -X DELETE http://localhost:3050/api/coasters/{coasterId}/wagons/{wagonId}
```

##### Response:

```json
200 OK
```

### Field Descriptions:

-   `staffCount`: The number of staff members managing the coaster.
-   `clientsCount`: The number of clients the coaster can handle throughout the day.
-   `routeLength`: The length of the coaster's track (in meters).
-   `openingHour`: Opening hour (24-hour format).
-   `closingHour`: Closing hour (24-hour format).
-   `seatsCount`: Number of seats in a wagon.
-   `wagonSpeed`: Speed of the wagon (in m/s).

### URL Path Parameters

-   `{coasterId}`: The ID of the roller coaster to update, or to which wagons are being added or deleted.
-   `{wagonId}`: The ID of the wagon to be deleted.
