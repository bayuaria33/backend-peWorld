# PE - WORLD BACKEND

# Api documentation
Employee = Pekerja / Worker

Employer = Perekrut / Company

### Register Employee
```http
  POST /users/register/employee
```
Req Body Form: 
| Key | Value |
| :-------- |:------------------------- |
| `email` | **Required**. email |
| `name` | **Required**. name |
| `password` | **Required**. password |
| `confirm` | **Required**. confirm |
| `phone` | **Required**. phone |

### Register Employer
```http
  POST /users/register/employer
```
Req Body Req Body Form: 
| Key | Value |
| :-------- |:------------------------- |
| `email` | **Required**. email |
| `name` | **Required**. name |
| `password` | **Required**. password |
| `confirm` | **Required**. confirm |
| `phone` | **Required**. phone |
| `company_name` | **Required**. company_name |
| `position` | **Required**. position |

### Login
```http
  POST /users/login
```
Req Body Form: 
| Key | Value |
| :-------- | :------------------------- |
| `email` | **Required**. email |
| `password` | **Required**. password |

### Verify User
```http
  POST /users/verify
```
Req Body Form: 
| Key | Value |
| :-------- | :------------------------- |
| `email` | **Required**. email |
| `otp` | **Required**. otp |

### Get all Employee

```http
  GET /employee/all
```
Query Params: 
| Key | Description | Default Value
| :-------- | :------------------------- | :-------- |
| `search` | search query  |null
| `searchBy` | search category |name
| `sortBy`| sort category |created_at
| `sort`| sort query |asc


### Get Employee Profile

```http
  GET /employee/my-profile
```
Auth:
|Key |Value                |
| :-------- |:------------------------- |
| `bearer token` |**Required**. Login accessToken |

### Get Employee Detail by Id

```http
  GET /employee/:id
```
Auth:
|Key |Value                |
| :-------- |:------------------------- |
| `bearer token` |**Required**. Login accessToken |

### Update Employee
```http
  PUT /employee/update-profile
```
Auth:
|Key |Value                |
| :-------- |:------------------------- |
| `bearer token` |**Required**. Login accessToken |

Req Body Form: 
| Key | Value |
| :-------- | :------------------------- |
| `name` | Nama|
| `email` | Nama@email |
| `phone` | 0812 |
| `employee_photo` | image jpeg/png|
| `employee_job` | Web Dev, HR, Manager |
| `employee_description` | Lorem |
| `province_name` | Jawa Tengah |
| `city_name` | Purwokerto |

### Get all Employer

```http
  GET /employer/all
```
Query Params: 
| Key | Description | Default Value
| :-------- | :------------------------- | :-------- |
| `search` | search query  |null
| `searchBy` | search category |name
| `sortBy`| sort category |created_at
| `sort`| sort query |asc


### Get Employer Profile

```http
  GET /employer/my-profile
```
Auth:
|Key |Value                |
| :-------- |:------------------------- |
| `bearer token` |**Required**. Login accessToken |

### Get Employer Detail by Id

```http
  GET /employer/:id
```
Auth:
|Key |Value                |
| :-------- |:------------------------- |
| `bearer token` |**Required**. Login accessToken |

### Update Employer
```http
  PUT /employer/update-profile
```
Auth:
|Key |Value                |
| :-------- |:------------------------- |
| `bearer token` |**Required**. Login accessToken |

Req Body Form: 
| Key | Value |
| :-------- | :------------------------- |
| `company_photo` | image jpeg/png|
| `company_name` | PT. Maju Mundur |
| `company_field` | Finance / IT Services / etc |
| `company_info` | Lorem |
| `position` | Human Resource / Manager / etc |
| `province_name` | Jawa Tengah |
| `city_name` | Purwokerto |

### Get My Portofolio

```http
  GET /porto/myporto
```
Auth:
|Key |Value                |
| :-------- |:------------------------- |
| `bearer token` |**Required**. Login accessToken |

### Insert Portofolio

```http
  POST /porto/
```
Auth:
|Key |Value                |
| :-------- |:------------------------- |
| `bearer token` |**Required**. Login accessToken |

Req Body Form: 
| Key | Value |
| :-------- |:------------------------- |
| `porto_title` | **Required**. My Website |
| `porto_link` | **Required**. repository.com/website |
| `porto_photo` | **Required**. image png / jpg |
| `porto_type` | **Required**. Website |

### Update Portofolio

```http
  PUT /porto/:id
```
Auth:
|Key |Value                |
| :-------- |:------------------------- |
| `bearer token` |**Required**. Login accessToken |

Req Body Form: 
| Key | Value |
| :-------- |:------------------------- |
| `porto_title` |  My Website |
| `porto_link` |  repository.com/website |
| `porto_photo` |  image png / jpg |
| `porto_type` |  Website |

### Delete Portofolio
```http
  DELETE /porto/:id
```
Auth:
|Key |Value                |
| :-------- |:------------------------- |
| `bearer token` |**Required**. Login accessToken |






