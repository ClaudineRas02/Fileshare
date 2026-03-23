--
-- PostgreSQL database dump
--

\restrict SdgkhqrFpdvO6fsuQ0RkLUP28Pt887v9uRowcMhIGcw91YGeINy1DxmKoh93tSi

-- Dumped from database version 18.1
-- Dumped by pg_dump version 18.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: files; Type: TABLE; Schema: public; Owner: qradmin
--

CREATE TABLE public.files (
    id_file integer NOT NULL,
    uploaded_by integer,
    title character varying(255) NOT NULL,
    file_path text NOT NULL,
    file_type character varying(200) NOT NULL,
    description text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.files OWNER TO qradmin;

--
-- Name: files_id_file_seq; Type: SEQUENCE; Schema: public; Owner: qradmin
--

CREATE SEQUENCE public.files_id_file_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.files_id_file_seq OWNER TO qradmin;

--
-- Name: files_id_file_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: qradmin
--

ALTER SEQUENCE public.files_id_file_seq OWNED BY public.files.id_file;


--
-- Name: qrcodes; Type: TABLE; Schema: public; Owner: qradmin
--

CREATE TABLE public.qrcodes (
    id_qrcode integer NOT NULL,
    file_id integer,
    token character varying(12) NOT NULL,
    nb_access integer DEFAULT 0,
    is_active boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.qrcodes OWNER TO qradmin;

--
-- Name: qrcodes_id_qrcode_seq; Type: SEQUENCE; Schema: public; Owner: qradmin
--

CREATE SEQUENCE public.qrcodes_id_qrcode_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.qrcodes_id_qrcode_seq OWNER TO qradmin;

--
-- Name: qrcodes_id_qrcode_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: qradmin
--

ALTER SEQUENCE public.qrcodes_id_qrcode_seq OWNED BY public.qrcodes.id_qrcode;


--
-- Name: users; Type: TABLE; Schema: public; Owner: qradmin
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password text NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.users OWNER TO qradmin;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: qradmin
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO qradmin;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: qradmin
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: files id_file; Type: DEFAULT; Schema: public; Owner: qradmin
--

ALTER TABLE ONLY public.files ALTER COLUMN id_file SET DEFAULT nextval('public.files_id_file_seq'::regclass);


--
-- Name: qrcodes id_qrcode; Type: DEFAULT; Schema: public; Owner: qradmin
--

ALTER TABLE ONLY public.qrcodes ALTER COLUMN id_qrcode SET DEFAULT nextval('public.qrcodes_id_qrcode_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: qradmin
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Name: files files_file_path_key; Type: CONSTRAINT; Schema: public; Owner: qradmin
--

ALTER TABLE ONLY public.files
    ADD CONSTRAINT files_file_path_key UNIQUE (file_path);


--
-- Name: files files_pkey; Type: CONSTRAINT; Schema: public; Owner: qradmin
--

ALTER TABLE ONLY public.files
    ADD CONSTRAINT files_pkey PRIMARY KEY (id_file);


--
-- Name: qrcodes qrcodes_pkey; Type: CONSTRAINT; Schema: public; Owner: qradmin
--

ALTER TABLE ONLY public.qrcodes
    ADD CONSTRAINT qrcodes_pkey PRIMARY KEY (id_qrcode);


--
-- Name: qrcodes qrcodes_token_key; Type: CONSTRAINT; Schema: public; Owner: qradmin
--

ALTER TABLE ONLY public.qrcodes
    ADD CONSTRAINT qrcodes_token_key UNIQUE (token);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: qradmin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_name_key; Type: CONSTRAINT; Schema: public; Owner: qradmin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_name_key UNIQUE (name);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: qradmin
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: files files_uploaded_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: qradmin
--

ALTER TABLE ONLY public.files
    ADD CONSTRAINT files_uploaded_by_fkey FOREIGN KEY (uploaded_by) REFERENCES public.users(id);


--
-- Name: qrcodes qrcodes_file_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: qradmin
--

ALTER TABLE ONLY public.qrcodes
    ADD CONSTRAINT qrcodes_file_id_fkey FOREIGN KEY (file_id) REFERENCES public.files(id_file) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict SdgkhqrFpdvO6fsuQ0RkLUP28Pt887v9uRowcMhIGcw91YGeINy1DxmKoh93tSi

