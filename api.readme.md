# API Documentation

## Account Manager (Port 3000)

### Authentication

#### Login

- **URL**: `http://localhost:3000/login`
- **Method**: POST
- **Body**:
  ```json
  {
    "email": "srarfian@gmail.com",
    "password": "password"
  }
  ```
- **Response**:
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "808eb516-cc39-4748-a25f-c64ec30ae225",
      "email": "srarfian@gmail.com"
    }
  }
  ```

#### Register

- **URL**: `http://localhost:3000/register`
- **Method**: POST
- **Body**:
  ```json
  {
    "email": "rahvayana88@gmail.com",
    "password": "password"
  }
  ```
- **Response**:
  ```json
  {
    "message": "User registered successfully",
    "userId": "2ee444db-8cb7-47b2-bfa7-ef4818e8ea87"
  }
  ```

#### Logout

- **URL**: Not specified
- **Method**: GET
- **Response**:
  ```json
  {
    "message": "Logged out successfully"
  }
  ```

### Account Management

#### Create Account

- **URL**: `http://localhost:3000/accounts`
- **Method**: POST
- **Auth**: Bearer Token
- **Body**:
  ```json
  {
    "accountType": "RAHVA 3"
  }
  ```
- **Response**:
  ```json
  {
    "id": "088b6f70-070e-4f2c-8bd4-0b9922fc7532",
    "accountType": "RAHVA 3",
    "balance": 0,
    "createdAt": "2024-08-19T22:59:44.885Z"
  }
  ```

#### Get All Accounts

- **URL**: `http://localhost:3000/accounts`
- **Method**: GET
- **Auth**: Bearer Token
- **Response**:
  ```json
  [
    {
      "id": "088b6f70-070e-4f2c-8bd4-0b9922fc7532",
      "accountType": "RAHVA 3",
      "balance": 0
    },
    {
      "id": "2fffe7be-bc3e-4d7a-93e1-3af1c6f4ca30",
      "accountType": "TABUNGAN",
      "balance": 100
    }
  ]
  ```

#### Get Account by ID

- **URL**: `http://localhost:3000/accounts/{accountId}`
- **Method**: GET
- **Auth**: Bearer Token
- **Response**:
  ```json
  {
    "id": "088b6f70-070e-4f2c-8bd4-0b9922fc7532",
    "accountType": "RAHVA 3",
    "balance": 0,
    "createdAt": "2024-08-19T22:59:44.885Z"
  }
  ```

#### Update Account

- **URL**: `http://localhost:3000/accounts/{accountId}`
- **Method**: PUT
- **Auth**: Bearer Token
- **Body**:
  ```json
  {
    "accountType": "TABUNGAN",
    "balance": 100
  }
  ```
- **Response**:
  ```json
  {
    "id": "088b6f70-070e-4f2c-8bd4-0b9922fc7532",
    "accountType": "TABUNGAN",
    "balance": 100,
    "updatedAt": "2024-08-19T23:01:38.415Z"
  }
  ```

#### Delete Account

- **URL**: `http://localhost:3000/accounts/{accountId}`
- **Method**: DELETE
- **Auth**: Bearer Token
- **Response**:
  ```json
  {
    "message": "Account deleted successfully"
  }
  ```

### Transaction History

#### Get Transaction History

- **URL**: `http://localhost:3000/transactions/{accountId}`
- **Method**: GET
- **Auth**: Bearer Token
- **Response**:
  ```json
  [
    {
      "id": "01489a4b-03e5-4180-88c9-2256acbf1516",
      "type": "DEPOSIT",
      "amount": 100,
      "timestamp": "2024-08-19T22:49:42.468Z"
    },
    {
      "id": "7ac56cf6-ea1e-4194-8175-a745ec692827",
      "type": "WITHDRAW",
      "amount": 50,
      "timestamp": "2024-08-19T22:50:42.468Z"
    }
  ]
  ```

#### Delete Transaction History

- **URL**: `http://localhost:3000/transactions/{transactionId}`
- **Method**: DELETE
- **Auth**: Bearer Token
- **Response**:
  ```json
  {
    "message": "Transaction deleted successfully"
  }
  ```

## Payment Manager (Port 3001)

### Payments

#### Send Money

- **URL**: `http://localhost:3001/api/payments/send`
- **Method**: POST
- **Auth**: Bearer Token
- **Body**:
  ```json
  {
    "amount": 3,
    "currency": "USD",
    "fromAccountId": "2fffe7be-bc3e-4d7a-93e1-3af1c6f4ca30",
    "toAccountId": "088b6f70-070e-4f2c-8bd4-0b9922fc7532"
  }
  ```
- **Response**:
  ```json
  {
    "transactionId": "9b5521112-d3c3-4bf4-866f-00e1300f5e9f",
    "status": "SUCCESS",
    "amount": 3,
    "currency": "USD",
    "timestamp": "2024-08-19T22:05:51.054Z"
  }
  ```

#### Withdraw

- **URL**: `http://localhost:3001/api/payments/withdraw`
- **Method**: POST
- **Auth**: Bearer Token
- **Body**:
  ```json
  {
    "accountId": "2fffe7be-bc3e-4d7a-93e1-3af1c6f4ca30",
    "amount": 3,
    "currency": "USD"
  }
  ```
- **Response**:
  ```json
  {
    "transactionId": "c8cd758d-8374-4192-9305-fac78982c4e0",
    "status": "SUCCESS",
    "amount": 3,
    "currency": "USD",
    "timestamp": "2024-08-19T22:09:51.248Z"
  }
  ```

#### Get Transactions

- **URL**: `http://localhost:3001/api/payments/transactions`
- **Method**: GET
- **Auth**: Bearer Token
- **Response**:
  ```json
  [
    {
      "id": "9b5521112-d3c3-4bf4-866f-00e1300f5e9f",
      "type": "TRANSFER",
      "amount": 3,
      "currency": "USD",
      "fromAccountId": "2fffe7be-bc3e-4d7a-93e1-3af1c6f4ca30",
      "toAccountId": "088b6f70-070e-4f2c-8bd4-0b9922fc7532",
      "timestamp": "2024-08-19T22:05:51.054Z"
    },
    {
      "id": "c8cd758d-8374-4192-9305-fac78982c4e0",
      "type": "WITHDRAW",
      "amount": 3,
      "currency": "USD",
      "accountId": "2fffe7be-bc3e-4d7a-93e1-3af1c6f4ca30",
      "timestamp": "2024-08-19T22:09:51.248Z"
    }
  ]
  ```

### Recurring Payments / Auto Debit

#### Create Recurring Payment

- **URL**: `http://localhost:3001/api/payments/recurring`
- **Method**: POST
- **Auth**: Bearer Token
- **Body**:
  ```json
  {
    "accountId": "2fffe7be-bc3e-4d7a-93e1-3af1c6f4ca30",
    "amount": 7,
    "currency": "USD",
    "interval": "WEEKLY",
    "toAccountId": "088b6f70-070e-4f2c-8bd4-0b9922fc7532"
  }
  ```
- **Response**:
  ```json
  {
    "id": "7ac56cf6-ea1e-4194-8175-a745ec692827",
    "status": "ACTIVE",
    "accountId": "2fffe7be-bc3e-4d7a-93e1-3af1c6f4ca30",
    "amount": 7,
    "currency": "USD",
    "interval": "WEEKLY",
    "toAccountId": "088b6f70-070e-4f2c-8bd4-0b9922fc7532",
    "createdAt": "2024-08-19T22:37:20.962Z"
  }
  ```

#### Get All Recurring Payments

- **URL**: `http://localhost:3001/api/payments/recurring`
- **Method**: GET
- **Auth**: Bearer Token
- **Response**:
  ```json
  [
    {
      "id": "7ac56cf6-ea1e-4194-8175-a745ec692827",
      "status": "ACTIVE",
      "accountId": "2fffe7be-bc3e-4d7a-93e1-3af1c6f4ca30",
      "amount": 7,
      "currency": "USD",
      "interval": "WEEKLY",
      "toAccountId": "088b6f70-070e-4f2c-8bd4-0b9922fc7532",
      "createdAt": "2024-08-19T22:37:20.962Z"
    }
  ]
  ```

#### Deactivate Recurring Payment

- **URL**: `http://localhost:3001/api/payments/recurring/{recurringPaymentId}`
- **Method**: GET
- **Auth**: Bearer Token
- **Response**:
  ```json
  {
    "id": "7ac56cf6-ea1e-4194-8175-a745ec692827",
    "status": "INACTIVE",
    "message": "Recurring payment deactivated successfully"
  }
  ```
