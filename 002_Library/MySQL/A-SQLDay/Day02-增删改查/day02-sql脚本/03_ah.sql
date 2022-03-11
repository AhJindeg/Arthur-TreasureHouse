#丢弃数据库，如果存在jd
drop database if exists jd;

#创建数据库jd
create database jd;

#进入数据库jd
use jd;

#创建保存学生数据的表student
create table student(
  sid int,
  name varchar(20),
  sex varchar(2),
  score int
);

#插入数据
insert into student values('1','tao','M','83');
insert into student values('2','dong','W','91');