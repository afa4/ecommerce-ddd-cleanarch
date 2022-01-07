create schema ccca;

create table ccca.item
(
    id_item     serial primary key,
    category    text,
    description text,
    price       numeric,
    width       integer,
    height      integer,
    length      integer,
    weight      integer
);

insert into ccca.item (id_item, category, description, price, width, height, length, weight)
values (1, 'Eletrodomésticos', 'Freezer', 1000, 200, 100, 50, 40);
insert into ccca.item (id_item, category, description, price, width, height, length, weight)
values (2, 'Instrumentos Musicais', 'Guittar', 2000, 100, 30, 10, 3);
insert into ccca.item (id_item, category, description, price, width, height, length, weight)
values (3, 'Livraria', 'Book', 50, 20, 15, 10, 1);

create table ccca.coupon
(
    code        text,
    percentage  numeric,
    expire_date timestamp,
    primary key (code)
);

insert into ccca.coupon (code, percentage, expire_date)
values ('VALE20', 20, '2023-10-10T10:00:00');
insert into ccca.coupon (code, percentage, expire_date)
values ('VALE20_EXPIRED', 20, '2020-10-10T10:00:00');

create table ccca.order
(
    id_order   serial,
    coupon     text,
    code       text,
    cpf        text,
    issue_date timestamp,
    freight    numeric,
    sequence   integer,
    primary key (id_order)
);

create table ccca.order_item
(
    id_order integer,
    id_item  integer,
    price    numeric,
    quantity integer,
    primary key (id_order, id_item)
);
