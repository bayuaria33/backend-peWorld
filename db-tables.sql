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

  SELECT message.chat, message.hire_id, message.receiver_id, message.sender_id, 
  sender.name AS sender_name,
  receiver.name AS receiver_name
  FROM message
  JOIN users AS sender ON message.sender_id = sender.id
  JOIN users AS receiver ON message.receiver_id = receiver.id
  WHERE hire_id = '4955a95a-f129-42c1-831d-9ae5b4e6d00b' ORDER BY message.created_at ASC;

  SELECT count(*) FROM users WHERE role = 'employee' LIMIT 100 OFFSET 0;

  SELECT users.id, users.name, users.email, users.phone, employee.employee_photo as photo, employee.employee_job as job, employee.employee_description as description, employee.province_name as province, employee.city_name as city, employee.github as github, employee.linkedin as linkedin, employee.instagram as instagram, skill.skills
    FROM users
    JOIN employee ON users.id = employee.users_id
    JOIN skill ON users.id = skill.users_id
    WHERE users.role = 'employee' AND users.id = '8ae318c6-007f-4499-bb14-0e3a87c0e1a4';

    SELECT * FROM users WHERE users.id = '8ae318c6-007f-4499-bb14-0e3a87c0e1a4' AND users.role = 'employee';

    ALTER TABLE ONLY employee 
      ALTER COLUMN employee_job SET DEFAULT '',
      ALTER COLUMN employee_description SET DEFAULT '',
      ALTER COLUMN province_name SET DEFAULT '',
      ALTER COLUMN city_name SET DEFAULT '',
      ALTER COLUMN github SET DEFAULT '',
      ALTER COLUMN linkedin SET DEFAULT '',
      ALTER COLUMN instagram SET DEFAULT '';