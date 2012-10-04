create table PERSON (
 ID SERIAL PRIMARY KEY,
 NAME varchar(100)
 );

create table BEER (
 ID SERIAL PRIMARY KEY,
 LABEL varchar(50)
 );

create table PERSON2BEER (
 PERSON_ID integer not null references PERSON (ID),
 BEER_ID integer not null references BEER (ID),
 primary key (PERSON_ID, BEER_ID)
 );

insert into person (name) values ('Michael Hausenblas');
insert into person (name) values ('Richard Cyganiak');
insert into beer (label) values ('Guinness');
insert into beer (label) values ('Bud');
insert into beer (label) values ('Heineken');
insert into person2beer (person_id, beer_id) values (1, 1);
insert into person2beer (person_id, beer_id) values (1, 3);
insert into person2beer (person_id, beer_id) values (2, 1);
insert into person2beer (person_id, beer_id) values (2, 2);