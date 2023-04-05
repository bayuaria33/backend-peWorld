# PE - WORLD BACKEND
Our hiring app API is built using ExpressJS and NodeJS, and is designed to connect Employers with Employees. The app features two distinct user roles - Employees and Employers - and includes key information about each user's experience, skills, and portfolio.

# Database Schema
![Database Schema](/schema/db_diagram.png)

# ENV Keys
```bash
BASE_URL=
PORT=
DB_USER=
DB_HOST=
DB_NAME=
DB_PASS=
DB_PORT=
JWT_ACCESS_KEY= 
JWT_REFRESH_KEY= 
PHOTO_NAME=
PHOTO_KEY=
PHOTO_SECRET=
IMAGE_NAME_PORTO=
IMAGE_KEY_PORTO=
IMAGE_SECRET_PORTO=
EMAIL_NAME=
EMAIL_PASSWORD=
```

# Installation
Clone the project

```bash
  git clone https://github.com/bayuaria33/backend-peWorld/
```

Go to the project directory

```bash
  cd backend-peWorld/
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  nodemon
```

# Api documentation
Employee = Pekerja / Worker

Employer = Perekrut / Company




---
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




---
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




---
### Login
```http
  POST /users/login
```
Req Body Form: 
| Key | Value |
| :-------- | :------------------------- |
| `email` | **Required**. email |
| `password` | **Required**. password |




---
### Verify User
```http
  POST /users/verify
```
Req Body Form: 
| Key | Value |
| :-------- | :------------------------- |
| `email` | **Required**. email |
| `otp` | **Required**. otp |




---
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





---
### Get Employee Profile

```http
  GET /employee/my-profile
```
Auth:
|Key |Value                |
| :-------- |:------------------------- |
| `bearer token` |**Required**. Login accessToken |




---
### Get Employee Detail by Id

```http
  GET /employee/:id
```
Auth:
|Key |Value                |
| :-------- |:------------------------- |
| `bearer token` |**Required**. Login accessToken |




---
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
| `linkedin` | linkedin.com/ |
| `github` | github.com/ |
| `instagram` | @instagram |
---
### Get Employee count
```http
  GET /employee/count/employee
```




---



---
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





---
### Get Employer Profile

```http
  GET /employer/my-profile
```
Auth:
|Key |Value                |
| :-------- |:------------------------- |
| `bearer token` |**Required**. Login accessToken |




---
### Get Employer Detail by Id

```http
  GET /employer/:id
```
Auth:
|Key |Value                |
| :-------- |:------------------------- |
| `bearer token` |**Required**. Login accessToken |




---
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
| `name` | Nama|
| `email` | Nama@email |
| `phone` | 0812 |
| `company_photo` | image jpeg/png|
| `company_name` | PT. Maju Mundur |
| `company_field` | Finance / IT Services / etc |
| `company_info` | Lorem |
| `position` | Human Resource / Manager / etc |
| `province_name` | Jawa Tengah |
| `city_name` | Purwokerto |




---
### Get My Portofolio

```http
  GET /porto/myporto
```
Auth:
|Key |Value                |
| :-------- |:------------------------- |
| `bearer token` |**Required**. Login accessToken |




---
### Get Portofolio by Portofolio Id

```http
  GET /porto/:id
```

---

### Get Portofolio by User Id

```http
  GET /porto/user/:id
```

---
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




---
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




---
### Delete Portofolio
```http
  DELETE /porto/:id
```
Auth:
|Key |Value                |
| :-------- |:------------------------- |
| `bearer token` |**Required**. Login accessToken |





---
### Get My Experiences

```http
  GET /exp/myexp
```
Auth:
|Key |Value                |
| :-------- |:------------------------- |
| `bearer token` |**Required**. Login accessToken |




---
### Get Experience By Id
```http
  GET /exp/:id
```
Auth:
|Key |Value                |
| :-------- |:------------------------- |
| `bearer token` |**Required**. Login accessToken |




---
### Get Experiences By User Id

```http
  GET /exp/user/:id
```




---
### Insert Experience

```http
  POST /exp/
```
Auth:
|Key |Value                |
| :-------- |:------------------------- |
| `bearer token` |**Required**. Login accessToken |

Req Body Form: 
| Key | Value |
| :-------- |:------------------------- |
| `position` | **Required**. Engineer |
| `company_name` | **Required**. Tokopedia |
| `experience_description` | **Required**. Lorem |
| `work_start_date` | **Required**. month year |
| `work_end_date` | **Required**. month year |




---
### Update Experience
```http
  PUT /exp/:id
```
Auth:
|Key |Value                |
| :-------- |:------------------------- |
| `bearer token` |**Required**. Login accessToken |

Req Body Form: 
| Key | Value |
| :-------- |:------------------------- |
| `position` | Engineer |
| `company_name` | Tokopedia |
| `experience_description` | Lorem |
| `work_start_date` | month year |
| `work_end_date` | month year |




---
### Delete Experience
```http
  DELETE /exp/:id
```
Auth:
|Key |Value                |
| :-------- |:------------------------- |
| `bearer token` |**Required**. Login accessToken |




---
### Get My skills
```http
  GET /skill/myskill
```
Auth:
|Key |Value                |
| :-------- |:------------------------- |
| `bearer token` |**Required**. Login accessToken |




---
### Get skill by skill Id
```http
  GET /skill/:id
```




---
### Insert skill

```http
  POST /skill
```
Auth:
|Key |Value                |
| :-------- |:------------------------- |
| `bearer token` |**Required**. Login accessToken |

Req Body Form: 
| Key | Value |
| :-------- |:------------------------- |
| `skills` | **Required**. "Javascript, HTML, CSS" |





---
### Update skill

```http
  PUT /skill/:id
```
Auth:
|Key |Value                |
| :-------- |:------------------------- |
| `bearer token` |**Required**. Login accessToken |

Req Body Form: 
| Key | Value |
| :-------- |:------------------------- |
| `skills` | **Required**. "Javascript, HTML, CSS" |




---
### Delete skill

```http
  DELETE /skill/:id
```
Auth:
|Key |Value                |
| :-------- |:------------------------- |
| `bearer token` |**Required**. Login accessToken |





---
### Insert Hire (Employer only)

```http
  POST /hire/:id
```

( :id = id employee)


Auth:
|Key |Value                |
| :-------- |:------------------------- |
| `bearer token` |**Required**. Login accessToken |

Req Body Form: 
| Key | Value |
| :-------- |:------------------------- |
| `position` | **Required**. "Fulltime Backend Developer" |
| `hire_description` | **Required**. "Membuat fitur dan maintenance untuk API dan posisi remote" |
| `chat` | **Required**. "Selamat siang apakah anda tertarik untuk menjadi developer kami?" |




---
### Insert Message (Employer & Employee)
```http
  POST /hire/messages/:hire_id
```

Auth:
|Key |Value                |
| :-------- |:------------------------- |
| `bearer token` |**Required**. Login accessToken |

Req Body Form: 
| Key | Value |
| :-------- |:------------------------- |
| `receiver_id` | **Required**. "id lawan bicara" |
| `chat` | **Required**. "Baiklah akan saya infokan ke tim saya terlebih dahulu" |






---
### Get list of hire conversations (Employer)
```http
  GET /hire/myhire
```
Auth:
|Key |Value                |
| :-------- |:------------------------- |
| `bearer token` |**Required**. Login accessToken |




---
### Get list of hire conversations (Employee)
```http
  GET /hire/mymsg
```
Auth:
|Key |Value                |
| :-------- |:------------------------- |
| `bearer token` |**Required**. Login accessToken |

---

### Get user OTP by Email
```http
  POST /users/otp
```
Req Body Form: 
| Key | Value |
| :-------- |:------------------------- |
| `email` | **Required**. email |






---
### Get confirm user OTP
```http
  POST /users/otp/confirm
```
Req Body Form: 
| Key | Value |
| :-------- |:------------------------- |
| `otp` | **Required**. otp |
| `email` | **Required**. email |






---
### Reset user password 
```http
  POST /users/resetPassword
```
Req Body Form: 
| Key | Value |
| :-------- |:------------------------- |
| `email` | **Required**. email |
| `password` | **Required**. password |
| `confirm` | **Required**. confirm password |






---
