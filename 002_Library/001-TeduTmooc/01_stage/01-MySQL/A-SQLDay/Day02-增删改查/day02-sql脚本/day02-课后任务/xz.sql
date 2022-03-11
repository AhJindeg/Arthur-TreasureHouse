#客户端连接服务器端使用的编码是utf-8
set names utf8;

#丢弃数据库，如果存在
drop database if exists xz;

#创建新的数据库,设置存储的编码为utf-8
create database xz charset=utf8;

#进入创建的数据库
use xz;

#创建新的数据表
create table user(
  uid int,
  uname varchar(16),
  upwd varchar(32),
  email varchar(32),
  phone varchar(11),
  userName varchar(16),
  regTime varchar(10),
  isOnline varchar(1)
);

#插入数据
insert into user values('01','涛','123456789','757466@','123456789','taotao','2018-02-03','shi');
insert into user values('02','cheng','987654321','3214510@','987654321','cjb','2018-06-05','shi');
insert into user values('03','peng','546879213','3274210@','546879213','wjp','2018-11-07','shi');
insert into user values('04','ma','147258963','32786750@','147258963','mjy','2018-07-09','shi');
insert into user values('05','yi','951738246','387546410@','951738246','way','2018-02-27','shi');

#修改数据
update user set email='123152@tedu.cn',phone='1779988640' 
where uid='01';

#删除数据
delete from user where uid='02';