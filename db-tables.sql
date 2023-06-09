CREATE TABLE users (
    id VARCHAR PRIMARY KEY,
    name VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    phone VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    role VARCHAR NOT NULL,
    otp VARCHAR,
    created_at TIMESTAMP);

CREATE TABLE employer (
    id SERIAL PRIMARY KEY,
    users_id VARCHAR NOT NULL,
    company_name VARCHAR NOT NULL,
    company_field VARCHAR,
    company_info VARCHAR,
    company_photo VARCHAR DEFAULT 'https://res.cloudinary.com/dedas1ohg/image/upload/v1679471260/peworld_images/Default_pfp_odp1oi.svg',
    province_id VARCHAR,
    province_name VARCHAR,
    city_id VARCHAR,
    city_name VARCHAR,
    position VARCHAR,
    company_email VARCHAR
    CONSTRAINT fk_users
      FOREIGN KEY(users_id) 
	  REFERENCES users(id));

CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    users_id VARCHAR NOT NULL,
    employee_photo VARCHAR DEFAULT 'https://res.cloudinary.com/dedas1ohg/image/upload/v1679471260/peworld_images/Default_pfp_odp1oi.svg',
    employee_job VARCHAR DEFAULT NULL,
    employee_description VARCHAR DEFAULT NULL,
    province_id VARCHAR,
    province_name VARCHAR,
    city_id VARCHAR,
    city_name VARCHAR,
    linkedin VARCHAR,
    github VARCHAR,
    instagram VARCHAR
    CONSTRAINT fk_users
      FOREIGN KEY(users_id) 
	  REFERENCES users(id)
    );

CREATE TABLE skill (
    id SERIAL PRIMARY KEY,
    users_id VARCHAR NOT NULL,
    skills VARCHAR NOT NULL,
    CONSTRAINT fk_users
      FOREIGN KEY(users_id) 
	  REFERENCES users(id)
    );

CREATE TABLE experience (
    id SERIAL PRIMARY KEY,
    users_id VARCHAR NOT NULL,
    company_name VARCHAR NOT NULL,
    experience_description VARCHAR,
    position VARCHAR,
    work_start_date VARCHAR,
    work_end_date VARCHAR,
    created_at TIMESTAMP,
    deleted_at TIMESTAMP
    CONSTRAINT fk_users
      FOREIGN KEY(users_id) 
	  REFERENCES users(id)
    );    

CREATE TABLE portofolio (
    id SERIAL PRIMARY KEY,
    users_id VARCHAR NOT NULL,
    porto_title VARCHAR,
    porto_link VARCHAR,
    porto_photo VARCHAR,
    porto_type VARCHAR,
    created_at TIMESTAMP,
    deleted_at TIMESTAMP,
    CONSTRAINT fk_users
      FOREIGN KEY(users_id) 
	  REFERENCES users(id)
    );

    CREATE TABLE hire (
    id VARCHAR primary key,
    employee_id VARCHAR,
    employer_id VARCHAR,
    hire_description VARCHAR,
    position VARCHAR,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
    );

    CREATE TABLE message (
      id SERIAL PRIMARY KEY,
      hire_id VARCHAR,
      receiver_id VARCHAR,
      sender_id VARCHAR,
      chat TEXT,
      created_at TIMESTAMP
    );