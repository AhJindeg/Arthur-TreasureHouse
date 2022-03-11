set names utf8;

drop database if exists sina;

create database sina charset=utf8;

use sina;

create table news(
  nid int comment '编号',
  title varchar(32) comment '标题',
  ctime varchar(10) comment '发表时间',
  origin varchar(32) comment '来源',
  detail varchar(32) comment '详情介绍'
);

insert into news values
(01,'来呀','2205-01-25','haong','afgioneoiughapjgv'),
(02,'haode','2015-05-24','hain','aonfawnbfusdanun');

update news set title='震惊18岁小伙竟然...',detail='你能想到他..这..嗯？' where nid='01';

delete from news where nid='02'
