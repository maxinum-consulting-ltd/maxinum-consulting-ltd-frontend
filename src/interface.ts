import dayjs from "dayjs";

export interface DataType {
  id: number;
  date: string;
  author: string;
  sum: number;
  category: string;
  comment: string;
}

export interface TransactionFormValues {
  author: string;
  date: dayjs.Dayjs | null;
  sum: number;
  category: string;
  comment: string;
}
