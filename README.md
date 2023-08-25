# whistleBlower


| Method | URL                                           | Description                               | Frontend Interaction        |
|--------|-----------------------------------------------|-------------------------------------------|-----------------------------|
| GET    | `/auditlogs/:id/logs`                         | Retrieve audit logs by ID                 | Display audit logs          |
| GET    | `/categories/`                                | Get all categories                        | List categories             |
| POST   | `/categories/`                                | Create a new category                     | Create category form        |
| GET    | `/categories/:id`                             | Get category by ID                        | Display category details    |
| PUT    | `/categories/:id`                             | Update category by ID                     | Edit category form          |
| DELETE | `/categories/:id`                             | Delete category by ID                     | Delete category button      |
| GET    | `/priorities/`                                | Get all priorities                        | List priorities             |
| GET    | `/priorities/queries/:color`                  | Get priorities by color                   | Filter by color             |
| POST   | `/replies/`                                   | Create a new reply                        | Reply to report form        |
| GET    | `/replies/:reportId`                          | Get replies by report ID                  | List replies for a report   |
| PUT    | `/replies/:id`                                | Update reply by ID                        | Edit reply form             |
| DELETE | `/replies/:id`                                | Delete reply by ID                        | Delete reply button         |
| GET    | `/reports/client/dashboard`                   | Get client dashboard                      | Client dashboard view       |
| GET    | `/reports/admin/dashboard`                    | Get admin dashboard                       | Admin dashboard view        |
| POST   | `/reports/create`                             | Create a new report                       | Create report form          |
| GET    | `/reports`                                    | Get all reports                           | List all reports            |
| GET    | `/reports/:id`                                | Get report by ID                          | Display report details      |
| PUT    | `/reports/:id`                                | Update report by ID                       | Edit report form            |
| DELETE | `/reports/:id`                                | Delete report by ID                       | Delete report button        |
| PUT    | `/reports/:id/status`                         | Update report status by ID                | Change report status        |
| GET    | `/search/reports`                             | Search reports                            | Search reports view         |
| GET    | `/search/categories`                          | Search categories                         | Search categories view      |
| POST   | `/users/register`                             | Register a new user                       | Registration form           |
| POST   | `/users/login`                                | Login a user                              | Login form                  |
| POST   | `/users/register-admin`                       | Register a new admin user                 | Admin registration form     |
| GET    | `/users/profile`                              | Get user profile                          | User profile view           |
