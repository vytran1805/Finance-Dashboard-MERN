/**********************************
 * Identify the type that we need *
 **********************************/

/**
 * Define structure of ExpensesByCategory object
 */
export interface ExpensesByCategory {
  salaries: number;
  services: number;
  supplies: number;
}

/**
 * Defind structure of Month object
 */
export interface Month {
  id: string;
  month: string;
  revenue: number;
  expenses: number;
  operationalExpense: number | null;
  nonOperationalExpenses: number | null;
  _id: string;
}
/**
 * Defind structure of Day object
 */
export interface Day {
  date: string;
  expenses: number;
  id: string;
  revenue: number;
  _id: string;
}
/**
 * this interface represents the obj that we want the response to look like
 * Note: used in api.ts
 */
export interface GetKpisResponse {
  id: string;
  __v: number;
  _id: string;
  totalProfit: number;
  totalExpenses: number;
  totalRevenue: number;
  expensesByCategory: ExpensesByCategory;
  monthlyData: Array<Month>;
  dailyData: Array<Day>;
}
