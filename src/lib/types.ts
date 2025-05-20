
export interface Invoice {
  id: string;
  subject: string;
  status: 'paid' | 'pending' | 'overdue';
  invoiceDate: string;
  dueDate: string;
  amount: number;
  client: string;
}

export interface FinancialSummary {
  totalBudget: number;
  totalHours: string;
  totalExpenses: number;
  fixedAmountTasks: number;
  totalAmount: number;
  
  cost: number;
  margin: number;
  
  billableHours: string;
  nonBillableHours: string;
  
  billableExpenses: number;
  nonBillableExpenses: number;
  
  completeFixedAmount: number;
  outstandingFixedAmount: number;
  
  invoicedAmount: number;
  uninvoicedAmount: number;
  
  percentBudgetUsed: number;
  percentHoursBillable: number;
  percentExpensesBillable: number;
  percentFixedAmountComplete: number;
  percentInvoiced: number;
}

export interface Alert {
  id: string;
  type: 'overdue' | 'approaching' | 'exceeded';
  message: string;
  invoiceId?: string;
  read: boolean;
  createdAt: string;
}

export interface MonthlyReport {
  month: string;
  year: number;
  totalInvoiced: number;
  totalPaid: number;
  totalOverdue: number;
  invoiceCount: number;
}
