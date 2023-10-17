## Routes

### User

- /api/v1/user/ (GET)
- /api/v1/user/:id (GET)
- /api/v1/user/getuser/:email (GET)
- /api/v1/user/signup (POST)
- /api/v1/user/login (POST)
- /api/v1/user/logout (POST)
- /api/v1/user/profile/update/:email (PATCH)
- /api/v1/user/delete/user/1/:id (DELETE)
- /api/v1/user/update/user/1/admin/:id (PUT) (make user to admin)
- /api/v1/user/update/admin/to/1/user/:id (PUT) (make admin to user)

### proposal

- /api/v1/proposal (GET)
- /api/v1/proposal/delete/:id (DELETE)
- /api/v1/proposal/send (POST)

### packages

- /api/v1/package (GET)
- /api/v1/package/:id (GET)
- /api/v1/proposal/newPackage (POST) (full package)
- /api/v1/package/update/1 (PATCH) (Add new condition)
