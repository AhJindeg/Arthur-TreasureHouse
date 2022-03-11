drop database if exists tedu;

create database tedu;

use tedu;

create table emp(
  eid int,
  ename varchar(5),
  addr varchar(25),
  phone int
);

insert into emp values('35','taotao','beidajie','12138');
insert into emp values('49','bao','xidajie','12198');