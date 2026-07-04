# Rate Limiter

## Overview

This project implements a per-client rate limiter using the Sliding Window Log algorithm.

The rate limiter allows a configurable number of requests within a configurable time window and blocks requests when the limit is exceeded.

---

## Algorithm Chosen

Sliding Window Log

---

## Why I Chose This Algorithm

I selected the Sliding Window Log algorithm because:

- It is simple to implement.
- It provides accurate request counting.
- It avoids the burst problem of the Fixed Window algorithm.
- It is suitable for small and medium-sized applications.

---

## Assumptions

- Each client is identified using the `client` query parameter.
- Request history is stored in memory using a JavaScript Map.
- Data is lost if the server restarts.

---

## API

### Endpoint

GET

```
/api/request?client=alice
```

### Success Response

```
200 OK
```

```json
{
    "message": "Request Allowed"
}
```

### Blocked Response

```
429 Too Many Requests
```

```json
{
    "message": "Too Many Requests",
    "retryAfter": 10
}
```

---

## Running the Project

Install dependencies

```bash
npm install
```

Start the server

```bash
npm run dev
```

Run tests

```bash
npm test
```

---

## Edge Cases Considered

1. A client exceeding the allowed request limit.
2. Multiple clients should have independent request limits.

---

## Concurrency

If multiple requests from the same client arrive at the exact same time, an in-memory implementation may experience race conditions in a highly concurrent environment. In production, this can be handled using Redis or atomic operations.

---

## Improvements

With more time, I would:

- Store request data in Redis.
- Support distributed rate limiting.
- Add automated unit testing using Jest.
- Deploy the API to a cloud platform.
