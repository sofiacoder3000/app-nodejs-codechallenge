import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionModule } from '@transaction/Transaction.module';
// import databaseConfig from '@infraestructure/config/database.config';
import { join } from 'path';
import { DatabaseModule } from '@database/Database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // load: [databaseConfig],
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
