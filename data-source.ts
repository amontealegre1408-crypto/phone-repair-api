import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'phone_repair_db',
  timezone: 'America/Bogota', // 🔥 Zona horaria Colombia

  // SOLO para migraciones
  entities: ['src/**/*.entity{.ts,.js}'],
  migrations: ['src/migrations/*{.ts,.js}'],

  // Configuración CLI
  synchronize: false,
  logging: ['error', 'migration'],

  // Solo mostrar logs de migración
  logger: 'advanced-console',

  // Configuración para CLI
  migrationsTableName: 'typeorm_migrations',
});
