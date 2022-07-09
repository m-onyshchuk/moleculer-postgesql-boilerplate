DO
$do$
  BEGIN

    CREATE TABLE IF NOT EXISTS public.authors (
      id SERIAL,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      CONSTRAINT authors_pkey PRIMARY KEY (id)
    );

    CREATE TABLE IF NOT EXISTS public.publishers (
      id SERIAL,
      name TEXT NOT NULL,
      CONSTRAINT publishers_pkey PRIMARY KEY (id)
    );

    CREATE TABLE IF NOT EXISTS public.books (
      id SERIAL,
      name TEXT NOT NULL,
      isbn TEXT NOT NULL,
      author int REFERENCES authors (id),
      publisher int REFERENCES publishers (id),
      CONSTRAINT books_pkey PRIMARY KEY (id)
    );

  END
$do$;
