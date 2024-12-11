import { Module, Global } from '@nestjs/common';
import { parse } from 'path';
import { DataSource } from 'typeorm';

@Global()
@Module({
  imports: [],
  providers: [
    {
      provide: DataSource,
      inject: [],
      useFactory: async () => {
        try {
          const dataSouce = new DataSource({
            type: 'postgres',
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            synchronize: true,
            ssl: process.env.ENV === 'production',
            entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          });
          await dataSouce.initialize();
          console.log('Database connected');
          return dataSouce;
        } catch (error) {
          console.log('Database connection failed');
          return null;
        }
      },
    },
  ],
  exports: [DataSource],
})
export class TypeORMModule {}
