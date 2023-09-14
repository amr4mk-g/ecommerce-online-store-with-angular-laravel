# Complete online store project, Using Angular and Laravel

The user can view all products, and after logging in, he can choose and add any item to his cart, then complete the payment to send the order, in addition to viewing all previous orders and his profile.

The admin after logging in, can view all products and modify them in terms of name, image, price, and available quantity. He can also view and modify all customer orders, in addition to the ability to temporarily disable any customer’s account.

## Usage: backend

```bash
cd backend
npm install
php artisan migrate
php artisan db:seed
php artisan serve
```

## Usage: Store

```bash
cd Store
npm install
ng serve
```
For testing: [email:  admin@example.com, password:  admin@example]

## Usage: Admin

```bash
cd Admin
npm install
ng serve
```
For testing: [email:  amr@example.com, password:  amr@example]
