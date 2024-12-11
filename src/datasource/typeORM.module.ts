import { Module, Global } from '@nestjs/common';
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
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: '18091996',
            database: 'ChatBox',
            synchronize: true,
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
