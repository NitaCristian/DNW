-- This makes sure that foreign_key constraints are observed and that errors will be thrown for violations
PRAGMA foreign_keys= ON;

BEGIN TRANSACTION;

create table if not exists users
(
    id         integer primary key autoincrement not null,
    first_name text                              not null,
    last_name  text                              not null,
    email      text                              not null,
    password   text                              not null,
    avatar     blob                              null
);

create table articles
(
    id           integer primary key autoincrement not null,
    -- todo: image
    title        text                              not null,
    subtitle     text                              not null,
    content      text                              not null,
    author_id    integer                           not null,
    created_at   date default current_date         not null,
    published_at date                              null,
    modified_at  date                              null,
    foreign key (author_id) references users (id)
);

CREATE TABLE blog_settings
(
    title       TEXT NOT NULL,
    description TEXT,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


create table likes
(
    id         integer primary key autoincrement not null,
    article_id integer                           not null,
    comment_id integer                           not null,
    user_id    integer                           not null,
    foreign key (article_id) references articles (id),
    foreign key (comment_id) references comments (id),
    foreign key (user_id) references users (id)
);

create table comments
(
    id         integer primary key autoincrement not null,
    article_id integer                           not null,
    user_id    integer                           not null,
    message    text                              not null,
    created_at date default current_date         not null,
    foreign key (user_id) references users (id),
    foreign key (article_id) references articles (id)
);

create table tags
(
    id   integer primary key autoincrement not null,
    name text                              not null
);

create table articles_tags
(
    id         integer primary key autoincrement not null,
    article_id integer                           not null,
    tag_id     integer                           not null,
    foreign key (article_id) references articles (id),
    foreign key (tag_id) references tags (id)
);

create table reactions
(
    id    integer primary key autoincrement not null,
    name  text                              not null,
    image blob                              not null
);

create table articles_reactions
(
    id          integer primary key autoincrement not null,
    article_id  integer                           not null,
    reaction_id integer                           not null,
    foreign key (article_id) references articles (id),
    foreign key (reaction_id) references reactions (id)
);

COMMIT;

