set names utf8;

drop database if exists xuezi;

create database xuezi charset=utf8;

use xuezi;

create table laptop(
  lid int primary key,
  title varchar(64),
  price decimal(7,2) not null,
  stockCount smallint,
  pic varchar(255),
  shelfTime datetime,
  isindex bool
);

insert into laptop 
values(01,'小鱼干',null,3308,'xiaoyugan.jpg','2108-12-15 12:01:06',false),
(02,'大鱼干','66.6',74,'dayugan.jpg','2108-11-15 12:45:12',true);