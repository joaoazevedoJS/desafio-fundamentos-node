import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  private sumValues(type: 'income' | 'outcome'): number {
    const sumValue = this.transactions.reduce((value, transaction) => {
      return transaction.type === type ? value + transaction.value : value;
    }, 0);

    return sumValue;
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const income = this.sumValues('income');
    const outcome = this.sumValues('outcome');

    const balance = {
      income,
      outcome,
      total: income - outcome,
    };

    return balance;
  }

  public create({ title, type, value }: TransactionDTO): Transaction {
    const transactions = new Transaction({ title, type, value });

    this.transactions.push(transactions);

    return transactions;
  }
}

export default TransactionsRepository;
