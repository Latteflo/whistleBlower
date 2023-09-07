# WhistleBlower API Documentation

## Table of Contents

- [User Routes](#user-routes)
- [Report Routes](#report-routes)
- [Reply Routes](#reply-routes)
- [Search Routes](#search-routes)
- [Priority Routes](#priority-routes)
- [Category Routes](#category-routes)
- [Audit Routes](#audit-routes)

---

## User Routes

| Method | URL                    | Description                   | Frontend Interaction    |
|--------|------------------------|-------------------------------|--------------------------|
| POST   | `/users/register`      | Register a new user           | Registration form        |
| POST   | `/users/register-admin`| Register a new admin user     | Admin registration form  |
| POST   | `/users/login`         | Login a user                  | Login form               |
| GET    | `/users/profile`       | Get user profile              | User profile view        |
| GET    | `/users/client/dashboard` | Get client dashboard      | Client dashboard view    |
| GET    | `/users/admin/dashboard`  | Get admin dashboard       | Admin dashboard view     |
| GET    | `/users/all`           | Get all users (Admin only)    | Admin user list view     |

## Report Routes

| Method | URL                        | Description                             | Frontend Interaction      |
|--------|----------------------------|-----------------------------------------|----------------------------|
| POST   | `/reports/create`          | Create a new report                     | Create report form         |
| PATCH  | `/reports/media/:id`       | Update report media by ID               | Update media form          |
| GET    | `/reports/all`             | Get all reports (Admin only)            | Admin report list view     |
| GET    | `/reports/:id`             | Get report by ID                        | Display report details     |
| GET    | `/reports/priority`        | Get reports by priority color (Admin only)| Admin priority view      |
| GET    | `/reports/status`          | Get reports by status (Admin only)      | Admin status view          |
| PUT    | `/reports/:id`             | Update report by ID                     | Edit report form           |
| PUT    | `/reports/:id/status`      | Update report status by ID              | Change report status       |
| DELETE | `/reports/:id`             | Delete report by ID                     | Delete report button       |

## Reply Routes

| Method | URL                      | Description                      | Frontend Interaction        |
|--------|--------------------------|----------------------------------|------------------------------|
| POST   | `/replies/create`        | Create a new reply               | Reply to report form         |
| GET    | `/replies/:reportId`     | Get replies by report ID         | List replies for a report    |
| PUT    | `/replies/:id`           | Update reply by ID               | Edit reply form              |
| DELETE | `/replies/:id`           | Delete reply by ID               | Delete reply button          |

## Search Routes

| Method | URL                      | Description                 | Frontend Interaction         |
|--------|--------------------------|-----------------------------|-------------------------------|
| GET    | `/search/reports`        | Search reports              | Search reports view           |
| GET    | `/search/categories`     | Search categories           | Search categories view        |

## Priority Routes

| Method | URL                      | Description                           | Frontend Interaction         |
|--------|--------------------------|---------------------------------------|-------------------------------|
| POST   | `/priorities/initialize`  | Initialize priorities (Admin only)    | Admin initialize priorities  |
| GET    | `/priorities/get-all`     | Get all priorities (Admin only)       | Admin priorities view        |
| GET    | `/priorities/:color`      | Get reports by priority color (Admin only) | Admin priority color view |
| GET    | `/priorities/:id`         | Get reports by priority ID (Admin only) | Admin priority ID view    |

## Category Routes

| Method | URL                      | Description                           | Frontend Interaction         |
|--------|--------------------------|---------------------------------------|-------------------------------|
| POST   | `/categories/create`     | Create a new category (Admin only)    | Admin create category form   |
| GET    | `/categories/get-all`    | Get all categories (Admin only)       | Admin categories view        |
| GET    | `/categories/:id`        | Get category by ID (Admin only)       | Admin category details view  |
| GET    | `/categories/:id/reports`| Get reports by category ID (Admin only)| Admin category reports view |
| PUT    | `/categories/:id`        | Update category by ID (Admin only)    | Admin edit category form     |
| DELETE | `/categories/:id`        | Delete category by ID (Admin only)    | Admin delete category button |

## Audit Routes

| Method | URL                      | Description                           | Frontend Interaction         |
|--------|--------------------------|---------------------------------------|-------------------------------|
| POST   | `/audits/log`            | Create a new audit log (Admin only)   | Admin create audit log       |
| GET    | `/audits/:id/logs`       | Get audit logs by report ID (Admin only)| Admin view audit logs      |

