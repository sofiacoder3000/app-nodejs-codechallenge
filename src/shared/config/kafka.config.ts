import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'transaction-service', // Identifica tu servicio
  brokers: ['localhost:9092'],
});
// const kafka = new Kafka({
//   clientId: 'anti-fraud',
//   brokers: [this.configService.get<string>('KAFKA_BROKER')],
// });

export const kafkaProducer = kafka.producer();
export const kafkaConsumer = kafka.consumer({ groupId: 'anti-fraud-group' });
export const KAFKA_TOPICS = {
  TRANSACTION_CREATED: 'transaction_created',
};
