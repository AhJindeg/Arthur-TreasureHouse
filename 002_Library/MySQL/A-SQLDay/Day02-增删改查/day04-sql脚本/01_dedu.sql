set names utf8;

drop database if exists tedu;

create database tedu charset=utf8;

use tedu;

create table dept(
  did int primary key auto_increment,
  dname varchar(16) unique
);

insert into dept values(10,'研发部');
insert into dept values(20,'运营部');
insert into dept values(30,'市场部');
insert into dept values(40,'测试部');

create table emp(
  eid int primary key auto_increment,
  ename varchar(16) not null,
  sex boolean default 0,   # 1 男   0 女
  birthday date,
  salary decimal(7,2),
  detptId int,
  foreign key(detptId) references dept(did)
);

insert into emp values(null,'tao',default,'1977-7-1',56832,20);