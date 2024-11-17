import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ITransactionRepository } from '@transaction/domain/ports/transaction.repository.interface';
import { Transaction } from '@transaction/domain/models/transaction.model';
import { TransactionEntity } from '@transaction/infraestructure/entities/transaction.entity';

@Injectable()
export class TransactionRepository implements ITransactionRepository {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: Repository<TransactionEntity>,
  ) {}

  async create(transaction: Transaction): Promise<Transaction> {
    const transactionEntity = this.transactionRepository.create(transaction);
    return this.transactionRepository.save(transactionEntity);
  }

  async findById(id: string): Promise<Transaction | null> {
    const transaction = await this.transactionRepository.findOne({
      where: { transactionExternalId: id },
    });
    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }
    return transaction;
  }

  async findAll(): Promise<Transaction[]> {
    return this.transactionRepository.find();
  }

  async find(
    offset: number,
    limit: number,
    filters: Partial<Transaction>,
  ): Promise<Transaction[]> {
    return this.transactionRepository.find({
      where: filters,
      skip: offset,
      take: limit,
      order: { createdAt: 'DESC' },
    });
  }
  async patch(
    id: string,
    partialTransaction: Partial<Transaction>,
  ): Promise<Transaction> {
    const transactionOriginal = await this.transactionRepository.findOne({
      where: { transactionExternalId: id },
    });
    if (!transactionOriginal) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }

    const mergedTransaction = this.transactionRepository.merge(
      transactionOriginal,
      partialTransaction,
    );

    return this.transactionRepository.save(mergedTransaction);
  }

  async update(
    id: string,
    updatedTransaction: Partial<Transaction>,
  ): Promise<void> {
    const existingTransaction = await this.transactionRepository.findOne({
      where: { transactionExternalId: id },
    });
    if (!existingTransaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }
    const { createdAt, ...updatedData } = updatedTransaction;
    await this.transactionRepository.update(id, updatedData);
  }
}
