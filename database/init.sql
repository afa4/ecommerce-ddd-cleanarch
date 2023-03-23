create table item (
    id_item serial primary key,
    category varchar(100),
    description varchar(100),
    price numeric,
    width integer,
    height integer,
    length integer,
    weight integer
);
insert into item (
        id_item,
        category,
        description,
        price,
        width,
        height,
        length,
        weight
    )
values (
        1,
        'Eletrodomésticos',
        'Freezer',
        1000,
        200,
        100,
        50,
        40
    );
insert into item (
        id_item,
        category,
        description,
        price,
        width,
        height,
        length,
        weight
    )
values (
        2,
        'Instrumentos Musicais',
        'Guittar',
        2000,
        100,
        30,
        10,
        3
    );
insert into item (
        id_item,
        category,
        description,
        price,
        width,
        height,
        length,
        weight
    )
values (3, 'Livraria', 'Book', 50, 20, 15, 10, 1);
create table coupon (
    code varchar(100),
    percentage numeric,
    expire_date timestamp,
    primary key (code)
);
insert into coupon (code, percentage, expire_date)
values ('VALE20', 20, '2023-10-10T10:00:00');
insert into coupon (code, percentage, expire_date)
values ('VALE20_EXPIRED', 20, '2020-10-10T10:00:00');
create table order_ (
    id_order integer AUTO_INCREMENT,
    coupon varchar(100),
    code varchar(100),
    cpf varchar(100),
    issue_date timestamp,
    freight numeric,
    seq integer,
    primary key (id_order)
);
insert into order_(coupon, code, cpf, issue_date, freight, seq)
values (
        'VALE20',
        '202100000001',
        '935.411.347-80',
        now(),
        1,
        0
    );
create table order_item (
    id_order integer,
    id_item integer,
    price integer,
    quantity integer,
    primary key (id_order, id_item)
);
create table warehouse_event (
    id_warehouse_event serial,
    id_item integer,
    quantity integer,
    event_type varchar(100),
    primary key (id_warehouse_event)
);