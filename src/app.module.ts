import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionModule } from '@transaction/transaction.module';
import { join } from 'path';
import { DatabaseModule } from '@database/database.module';
import { AntiFraudModule } from '@antifraud/anti-fraud.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // autoSchemaFile: true,
      sortSchema: true,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schemas/schema.gql'),
    }),
    DatabaseModule,
    TransactionModule,
    AntiFraudModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
