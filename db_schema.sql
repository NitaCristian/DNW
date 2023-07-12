-- This makes sure that foreign_key constraints are observed and that errors will be thrown for violations
PRAGMA foreign_keys= ON;

BEGIN TRANSACTION;

create table if not exists users
(
    id         integer primary key autoincrement not null,
    first_name text                              not null,
    last_name  text                              not null,
    email      text                              not null,
    password   text                              not null
);

create table articles
(
    id           integer primary key autoincrement not null,
    title        text                              not null,
    subtitle     text                              not null,
    content      text                              not null,
    likes        int  default 0                    not null,
    dislikes     int  default 0                    not null,
    author_id    integer                           not null,
    created_at   date default current_date         not null,
    published_at date                              null,
    modified_at  date                              null,
    foreign key (author_id) references users (id)
);

CREATE TABLE blog_settings
(
    title       TEXT NOT NULL,
    description TEXT not null
);

create table comments
(
    id         integer primary key autoincrement not null,
    user_id    integer                           not null,
    article_id integer                           not null,
    message    text                              not null,
    created_at date default current_date         not null,
    foreign key (user_id) references users (id),
    foreign key (article_id) references articles (id)
);

insert into blog_settings (title, description)
values ('MicroVerse', 'This is the best blog ever made!');

COMMIT;

