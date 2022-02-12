DROP TABLE IF EXISTS slimes;

CREATE TABLE slimes (
    id serial PRIMARY KEY,
    name varchar(255),
    rating int,
    title_id int
);

DROP TABLE IF EXISTS titles;

CREATE TABLE titles (
    id serial PRIMARY KEY,
    name varchar(50)
);
