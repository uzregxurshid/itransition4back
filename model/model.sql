create database users;

use users;

create table user(
  id int(11) not null auto_increment,
  name varchar(255) not null,
  email varchar(255) not null,
  password varchar(255) not null,
  registration_time datetime not null,
  last_login_time datetime not null,
  status boolean not null,
  primary key(id)
);

INSERT INTO user(name, email, password, registration_time, last_login_time, status) 
VALUES('admin', 'admin@gmail.com', 'admin', '2018-01-01 00:00:00', '2018-01-01 00:00:00', 1);


CREATE TABLE "user" (
  id serial,
  name varchar(255) NOT NULL,
  email varchar(255) unique NOT NULL,
  password varchar(255) NOT NULL,
  registration_time TIMESTAMP NOT NULL,
  last_login_time TIMESTAMP NOT NULL,
  status int NOT NULL,
  PRIMARY KEY (id)
);

