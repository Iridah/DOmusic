const fs = require('fs');
const chalk = require('chalk');
const { Pool } = require('pg');

// Importación de la variable de entorno PGDATABASE
const db_name = process.env.PGDATABASE; // Nombre de la base de datos

// Configuración de la base de datos
const pool = new Pool({
  user: 'planta', // Reemplaza con tu usuario de PostgreSQL
  password: 'macetero', // Reemplaza con tu contraseña de PostgreSQL
  database: 'musica', // Reemplaza con el nombre de tu base de datos actual
  host: 'localhost', // Reemplaza con la dirección de tu servidor PostgreSQL
  port: 5432 // Reemplaza con el puerto de tu servidor PostgreSQL
});

// Función para crear la base de datos "musica"
async function crearBaseDeDatosMusica() {
  try {
    await pool.query('CREATE DATABASE musica');
    console.log(chalk.green('Base de datos "musica" creada exitosamente'));
  } catch (error) {
    if (error.code === '42P07') {
      console.log(chalk.yellow('La base de datos "musica" ya existe'));
    } else {
      console.error(chalk.red('Error al crear la base de datos:', error));
    }
  }
}

// EXPERIMENTAL - AJUSTAR EL ESQUEMA
async function crearEsquemaMusica() {
    try {
      await pool.query(`CREATE SCHEMA musica`);
      console.log(chalk.green('Esquema "musica" creado exitosamente'));
    } catch (error) {
      if (error.code === '42P07') {
        console.log(chalk.yellow('El esquema "musica" ya existe'));
      } else {
        console.error(chalk.red('Error al crear el esquema:', error));
      }
    }
  }

// Función para crear la tabla "canciones"
async function crearTablaCanciones() {
  try {
    await pool.query(`
      CREATE TABLE musica.canciones (
        id SERIAL PRIMARY KEY,
        banda JSONB NOT NULL,
        nombre_cancion TEXT NOT NULL,
        genero TEXT NOT NULL
      )
    `);
    console.log(chalk.green('Tabla "canciones" creada exitosamente'));
  } catch (error) {
    console.error(chalk.red('Error al crear la tabla:', error));
  }
}

// Ejecución de las funciones
(async () => {
    await crearEsquemaMusica(); // Ejecutar la función para crear el esquema
    await crearBaseDeDatosMusica(); // Ejecutar la función para crear la base de datos (si no existe)
    await crearTablaCanciones(); // Ejecutar la función para crear la tabla
  })();
