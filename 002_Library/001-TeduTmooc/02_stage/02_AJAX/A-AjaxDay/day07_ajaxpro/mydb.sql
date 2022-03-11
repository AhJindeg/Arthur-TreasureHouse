-- mydb sql
-- 创建一个-- mydb数据库
/* SET NAMES UTF8; */
/* DROP DATABASE IF EXISTS xz; */
/* CREATE DATABASE mydb CHARSET = UTF8; */

-- 进入 mydb 数据库
/* use mydb; */

-- 创建一张用户表userinfo
-- u_member会员
-- 电话号码不能重复
create table userinfo(
  u_id int auto_increment primary key,
  u_names varchar(255) not null,
  u_phone varchar(255) not null unique,
  u_member INT not null
) ENGINE = InnoDB charset = utf8;

INSERT INTO
  userinfo(u_names, u_phone, u_member)
VALUES 
('tom','15201076723',1),
('nancy','15201197440',0),
('jack','15101075644',1),
('bob','15910257181',0),
('lily','13522162834',1),
('Kate','13661217464',0),
('emma','13522162843',0),
('bale','13671357146',0),
('coy','13522172419',0),
('ball','15910779501',1),
('dan','15910780895',1);

-- 创建管理员表和数据

create table admin(
  a_id int auto_increment primary key,
  a_names varchar(255) not null unique,
  a_pwd varchar(255) not null
) ENGINE = InnoDB charset = utf8;

INSERT INTO
  admin(a_names, a_pwd)
VALUES
  ('zhangsan', '123'),
  ('lisi', '123'),
  ('wangwu', '123');