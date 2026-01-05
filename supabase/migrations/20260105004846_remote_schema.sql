


SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE TYPE "public"."document_type" AS ENUM (
    'CPF',
    'RG',
    'CNH'
);


ALTER TYPE "public"."document_type" OWNER TO "postgres";


CREATE TYPE "public"."drivers_license_type" AS ENUM (
    'A',
    'B',
    'C',
    'D',
    'E',
    'ACC',
    'AB'
);


ALTER TYPE "public"."drivers_license_type" OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."addresses" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "zipcode" character varying NOT NULL,
    "number" character varying,
    "street" character varying,
    "neighborhood" character varying,
    "city" character varying NOT NULL,
    "state" character varying NOT NULL,
    "country" character varying DEFAULT 'BRAZIL'::character varying NOT NULL,
    "coordinates" character varying
);


ALTER TABLE "public"."addresses" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."instructor_profiles" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "age" bigint,
    "specialty" "text",
    "description" "text",
    "years_of_experience" bigint,
    "complement" "text",
    "is_professional" boolean,
    "current_drivers_license_type" "public"."drivers_license_type"
);


ALTER TABLE "public"."instructor_profiles" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."instructors" (
    "id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "drivers_license" "text",
    "rating" smallint,
    "is_active" boolean,
    "profile_id" "uuid",
    "address_id" "uuid"
);


ALTER TABLE "public"."instructors" OWNER TO "postgres";


COMMENT ON TABLE "public"."instructors" IS 'Table related to entety teachers';



CREATE TABLE IF NOT EXISTS "public"."users" (
    "id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "instructor_id" "uuid",
    "student_id" "uuid",
    "photo_url" "text",
    "name" "text" NOT NULL,
    "wallet_id" "uuid",
    "document_type" "public"."document_type" DEFAULT 'CPF'::"public"."document_type",
    "document" "text",
    "address_id" "uuid"
);


ALTER TABLE "public"."users" OWNER TO "postgres";


COMMENT ON TABLE "public"."users" IS 'User refereces to supabase user';



ALTER TABLE ONLY "public"."addresses"
    ADD CONSTRAINT "addresses_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."instructors"
    ADD CONSTRAINT "instructor_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."instructor_profiles"
    ADD CONSTRAINT "instructor_profiles_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_student_id_key" UNIQUE ("student_id");



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_teacher_id_key" UNIQUE ("instructor_id");



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_wallet_id_key" UNIQUE ("wallet_id");



ALTER TABLE ONLY "public"."instructors"
    ADD CONSTRAINT "instructor_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "public"."addresses"("id") ON UPDATE CASCADE ON DELETE SET NULL;



ALTER TABLE ONLY "public"."instructors"
    ADD CONSTRAINT "instructor_id_fkey" FOREIGN KEY ("id") REFERENCES "public"."users"("instructor_id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."instructors"
    ADD CONSTRAINT "instructor_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "public"."instructor_profiles"("id") ON UPDATE CASCADE ON DELETE SET NULL;



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "public"."addresses"("id") ON UPDATE CASCADE ON DELETE SET NULL;



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE "public"."addresses" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."instructor_profiles" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."instructors" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."users" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";








































































































































































GRANT ALL ON TABLE "public"."addresses" TO "anon";
GRANT ALL ON TABLE "public"."addresses" TO "authenticated";
GRANT ALL ON TABLE "public"."addresses" TO "service_role";



GRANT ALL ON TABLE "public"."instructor_profiles" TO "anon";
GRANT ALL ON TABLE "public"."instructor_profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."instructor_profiles" TO "service_role";



GRANT ALL ON TABLE "public"."instructors" TO "anon";
GRANT ALL ON TABLE "public"."instructors" TO "authenticated";
GRANT ALL ON TABLE "public"."instructors" TO "service_role";



GRANT ALL ON TABLE "public"."users" TO "anon";
GRANT ALL ON TABLE "public"."users" TO "authenticated";
GRANT ALL ON TABLE "public"."users" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES TO "service_role";































drop extension if exists "pg_net";


