import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            // imports: [ConfigModule],
            useFactory: () => ({
                type: 'mysql',
                host: '127.0.0.1',
                port: 3306,
                username: 'eonsang',
                password: '1111',
                database: 'sample',
                entities: [],
                synchronize: true,
            }),
            inject: [],
        })
    ],
})
export class DatabaseModule {}
