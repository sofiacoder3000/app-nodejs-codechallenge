import { Injectable, NotFoundException } from '@nestjs/common';
import { ITransactionRepository } from '@transaction/domain/ports/transaction.repository.interface';
import { Transaction } from '@transaction/domain/models/transaction.model';
import { mockTransactions } from '@mocks/transactions.mock';

@Injectable()
export class MockTransactionRepository implements ITransactionRepository {
  transactions = mockTransactions;

  async create(transaction: Transaction): Promise<Transaction> {
    this.transactions.push(transaction);
    return transaction;
  }

  async findById(id: string): Promise<Transaction | null> {
    return (
      this.transactions.find((t) => t.transactionExternalId === id) || null
    );
  }

  async findAll(): Promise<Transaction[]> {
    return this.transactions;
  }

  async find(
    offset: number,
    limit: number,
    filters: Partial<Transaction>,
  ): Promise<Transaction[]> {
    return this.transactions
      .filter((t) => {
        return Object.entries(filters).every(([key, value]) => {
          return t[key] === value;
        });
      })
      .filter((_, i) => i > offset - 1 && i < offset + limit);
  }

  async patch(
    id: string,
    partialTransaction: Partial<Transaction>,
  ): Promise<Transaction> {
    const transactionIndex = this.transactions.findIndex(
      (t) => t.transactionExternalId === id,
    );

    if (transactionIndex === -1) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }

    this.transactions[transactionIndex] = {
      ...this.transactions[transactionIndex],
      ...partialTransaction,
    };

    return this.transactions[transactionIndex];
  }

  async update(id: string, transaction: Transaction): Promise<void> {
    const transactionIndex = this.transactions.findIndex(
      (t) => t.transactionExternalId === id,
    );

    if (transactionIndex === -1) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }

    this.transactions[transactionIndex] = transaction;
  }
}
