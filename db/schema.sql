
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL
);

CREATE SEQUENCE news_id_seq
    START WITH 1001
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE news_articles (
  id BIGINT PRIMARY KEY DEFAULT nextval('news_id_seq'),
  title TEXT,
  description TEXT,
  url TEXT,
  url_to_image TEXT,
  source TEXT,
  published_at TIMESTAMP,
  category_id INTEGER REFERENCES categories(id),
  author TEXT,
  content TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'reader', -- 'admin', 'reader', 'editor'
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  article_id INTEGER REFERENCES news_articles(id) ON DELETE CASCADE,
  user_id INTEGER REFERENCES users(id),
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE subscription_types (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,       -- e.g., 'Daily News', 'Breaking Alerts'
  description TEXT,         -- e.g., 'Top headlines every morning'
  is_default BOOLEAN DEFAULT FALSE
);

CREATE TABLE user_subscriptions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  subscription_type_id INTEGER REFERENCES subscription_types(id) ON DELETE CASCADE,
  is_active BOOLEAN DEFAULT TRUE,
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, subscription_type_id)  -- Prevents duplicate subscriptions
);