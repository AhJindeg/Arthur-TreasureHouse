#声明编码集
set names utf8;

#丢弃再创建数据库xz
drop database if exists xz;

#创建数据库 声明编码
create database xz charset=utf8;

#进入数据库
use xz;

#创建表
create table family(
  fid int primary key,
  fname varchar(16) default 'weizhi'
);

#插入数据
insert into family 
values(10,'联想'),(20,'戴尔'),(30,'小米'),(40,default);

#创建表
create table laptop(
  fid int primary key auto_increment,
  title varchar(64),
  price decimal(7,2) default 3000,
  spec varchar(32),
  detail varchar(5000),
  shelfTime date,
  isOnsale bool,
  familyId int,
  #将familuId作为外键列，取值范围会到另一个表主键列
  foreign key(familyId) references family(fid)
);

#插入数据
insert into laptop
values(null,'灵越燃7000',4999,'新品ThinkBook14笔记本电脑','i7-7500U 8G 256GSSD 2G独显','2021-8-3',1,10),
(null,'戴尔 G15游戏本',9799,'手提英特尔酷睿外星人灵越笔记本电脑','i5-11260H 512G固态硬盘','2021-8-3',1,20),
(null,'RedmiBookPro14英寸红米锐龙',default,'RedmiBookPro 14英寸红米锐龙R5荣耀灰R7轻薄办公全金属笔记本','XMA2006-xx AMD R5 5500U','2021-8-3',1,30);
insert into laptop(fid,title) values(null,'荣耀5000');