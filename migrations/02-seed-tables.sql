DO
$do$
 DECLARE
   records int;
 BEGIN

  -- check authors
  SELECT COUNT(*) INTO records FROM public.authors;
  IF records = 0 THEN
    INSERT INTO public.authors (first_name, last_name) VALUES
      ('Donald', 'Knuth'),
      ('Benoit', 'Mandelbrot');
  END IF;

  -- check publishers
  SELECT COUNT(*) INTO records FROM public.publishers;
  IF records = 0 THEN
    INSERT INTO public.publishers (name) VALUES
      ('Addison-Wesley Professional'),
      ('W H Freeman & Co');
  END IF;

  -- check books
  SELECT COUNT(*) INTO records FROM public.books;
  IF records = 0 THEN
   INSERT INTO public.books (name, isbn, author, publisher) VALUES
    ('The Art of Computer Programming. Vol. 1', '978-0-201-89683-1', 1, 1),
    ('The Fractal Geometry of Nature', '0-7167-1186-9', 2, 2);
  END IF;

 END
$do$;
