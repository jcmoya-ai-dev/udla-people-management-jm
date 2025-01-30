-- Table: public.Persons

-- DROP TABLE IF EXISTS public."Persons";

CREATE TABLE IF NOT EXISTS public."Persons"
(
    "Id" SERIAL PRIMARY KEY,
    "Name" VARCHAR(100) NOT NULL,
    "Email" TEXT NOT NULL,
    "Age" INTEGER NOT NULL,
    "Address" TEXT NOT NULL,
    "Gender" TEXT NOT NULL,
    "Status" TEXT NOT NULL
);

-- Inserción de datos correcta
INSERT INTO public."Persons" ("Name", "Email", "Age", "Address", "Gender", "Status")
VALUES 
    ('Juan Moya', 'jcmoya.ai.dev@gmail.com', 31, 'Quito', 'Masculino', 'activo'),
    ('Persona1', 'persona1@gmail.com', 31, 'Quito', 'Masculino', 'activo'),
    ('Persona2', 'persona2@gmail.com', 31, 'Quito', 'Masculino', 'activo'),
    ('Persona3', 'persona3@gmail.com', 31, 'Quito', 'Femenino', 'activo'),
    ('Persona4', 'persona4@gmail.com', 31, 'Quito', 'Otro', 'activo'),
    ('Persona5', 'persona5@gmail.com', 15, 'Quito', 'Femenino', 'activo');
