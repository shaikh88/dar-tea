# Database Design

Phase 2 Reference

## User

id
email
name
role
createdAt
updatedAt

## Product

id
name
slug
description
price
imageUrl
status
createdAt
updatedAt

## Address

id
userId
line1
line2
city
state
postalCode

## Order

id
userId
status
paymentStatus
totalAmount
createdAt

## OrderItem

id
orderId
productId
quantity
unitPrice

## Roles

USER
ADMIN