#设置客户端连接服务器端的编码
set names utf8;
#丢弃数据库如果存在
drop database if exists xz;
#创建新的数据库，设置存储编码
create database xz charset=utf8;
#进入数据库
use xz;
#创建分类的表
create table family(
  fid int primary key,
  fname varchar(16) default '未知'
);
#插入数据
insert into family values(10,'联想');
insert into family values
(20,'戴尔'),
(30,'小米');
insert into family values(40,default);
insert into family(fid) values(50);
#创建商品的表
create table laptop(
  lid int primary key auto_increment,
  title varchar(64) unique not null,
  price decimal(7,2) default 3000,  #99999.99
  spec varchar(32),
  detail varchar(5000),
  shelfTime date,
  isOnsale boolean,
  familyId int,
  #将familyId作为外键列，取值范围会到另一个表主键列
  foreign key(familyId) references family(fid)
);
#插入数据
insert into laptop values(1,'小米Air',4199,'开发版','详情1','2019-1-1',1,30);
insert into laptop values(2,'thinkpadE470',3199,'商务版','详情2','2016-5-1',0,10);
insert into laptop values(3,'外星人',15300,'游戏版','详情3','2020-12-31',1,20);
insert into laptop values(4,'外星人2',default,'游戏版1',default,default,1,20);
insert into laptop(lid,title) values(5,'荣耀5000');
insert into laptop(lid,title) values(null,'荣耀5001');
insert into laptop(lid,title) values(null,'荣耀5002');