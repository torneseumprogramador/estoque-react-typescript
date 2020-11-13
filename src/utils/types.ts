export interface Transaction {
  title: string;
  id: string;
  category: string;
  type: 'income' | 'outcome';
  value: number;
  date: Date;
}
