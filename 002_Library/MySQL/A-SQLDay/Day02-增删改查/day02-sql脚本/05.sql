create database if not exists sty;

use sty;

create table styl(
  id int comment  '编号',
  name varchar(5) comment '姓名'
);

insert into styl(id,name) values
(1,'tao'),
(2,'peng');

select * from styl;