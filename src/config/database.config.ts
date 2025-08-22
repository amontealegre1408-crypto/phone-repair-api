import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const getDatabaseConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: 'mysql',
  host: configService.get('DB_HOST'),
  port: +configService.get('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_DATABASE'),
  timezone: 'America/Bogota', // 🔥 Zona horaria Colombia

  // SOLO entidades para la app (sin migraciones)
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],

  // Configuración de la app
  synchronize: false, // SIEMPRE false en producción
  logging: configService.get('NODE_ENV') === 'development',


  // Configuración adicional
  retryAttempts: 3,
  retryDelay: 3000,
  autoLoadEntities: true, // NestJS cargará entidades automáticamente
});
