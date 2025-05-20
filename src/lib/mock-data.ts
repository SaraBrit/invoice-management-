
import { Invoice, FinancialSummary, Alert, MonthlyReport } from './types';
import { addDays, format, subDays, subMonths } from 'date-fns';

const today = new Date();

export const mockInvoices: Invoice[] = [
  {
    id: 'INV10',
    subject: 'Pre-Project Consultations - Dorothy Perkins',
    status: 'paid',
    invoiceDate: format(subMonths(today, 5), 'dd-MMM-yyyy'),
    dueDate: format(subMonths(today, 5), 'dd-MMM-yyyy'),
    amount: 27721.77,
    client: 'Dorothy Perkins'
  },
  {
    id: 'INV23',
    subject: 'Final Invoice - January',
    status: 'paid',
    invoiceDate: format(subMonths(today, 4), 'dd-MMM-yyyy'),
    dueDate: format(subMonths(today, 3), 'dd-MMM-yyyy'),
    amount: 3287.50,
    client: 'ABC Corp'
  },
  {
    id: 'INV12',
    subject: 'February - Consultation Retainer',
    status: 'paid',
    invoiceDate: format(subMonths(today, 3), 'dd-MMM-yyyy'),
    dueDate: format(subMonths(today, 3), 'dd-MMM-yyyy'),
    amount: 1525.00,
    client: 'XYZ Inc'
  },
  {
    id: 'INV15',
    subject: 'February Invoice',
    status: 'paid',
    invoiceDate: format(subMonths(today, 3), 'dd-MMM-yyyy'),
    dueDate: format(subMonths(today, 3), 'dd-MMM-yyyy'),
    amount: 850.00,
    client: 'GlobalTech'
  },
  {
    id: 'INV16',
    subject: 'Retainer - February',
    status: 'paid',
    invoiceDate: format(subMonths(today, 3), 'dd-MMM-yyyy'),
    dueDate: format(subMonths(today, 3), 'dd-MMM-yyyy'),
    amount: 1500.00,
    client: 'Acme Co'
  },
  {
    id: 'INV17',
    subject: 'Pre-Project Consultations - February',
    status: 'paid',
    invoiceDate: format(subMonths(today, 2), 'dd-MMM-yyyy'),
    dueDate: format(subMonths(today, 2), 'dd-MMM-yyyy'),
    amount: 1712.50,
    client: 'TechStart'
  },
  {
    id: 'INV18',
    subject: 'Website Design - February (Invoice 2)',
    status: 'paid',
    invoiceDate: format(subMonths(today, 2), 'dd-MMM-yyyy'),
    dueDate: format(subMonths(today, 2), 'dd-MMM-yyyy'),
    amount: 1212.50,
    client: 'WebCorp'
  },
  {
    id: 'INV19',
    subject: 'March Development Services',
    status: 'pending',
    invoiceDate: format(subDays(today, 25), 'dd-MMM-yyyy'),
    dueDate: format(addDays(today, 5), 'dd-MMM-yyyy'),
    amount: 3750.00,
    client: 'DevPro'
  },
  {
    id: 'INV20',
    subject: 'UI/UX Design - March',
    status: 'overdue',
    invoiceDate: format(subDays(today, 45), 'dd-MMM-yyyy'),
    dueDate: format(subDays(today, 15), 'dd-MMM-yyyy'),
    amount: 2500.00,
    client: 'DesignHub'
  },
  {
    id: 'INV21',
    subject: 'Content Writing Services',
    status: 'overdue',
    invoiceDate: format(subDays(today, 60), 'dd-MMM-yyyy'),
    dueDate: format(subDays(today, 30), 'dd-MMM-yyyy'),
    amount: 1850.00,
    client: 'ContentMasters'
  },
  {
    id: 'INV22',
    subject: 'Mobile App Development',
    status: 'pending',
    invoiceDate: format(subDays(today, 10), 'dd-MMM-yyyy'),
    dueDate: format(addDays(today, 20), 'dd-MMM-yyyy'),
    amount: 4500.00,
    client: 'AppDev Inc'
  },
];

export const mockFinancialSummary: FinancialSummary = {
  totalBudget: 65000.00,
  totalHours: '462:56',
  totalExpenses: 14400.04,
  fixedAmountTasks: 3940.00,
  totalAmount: 74003.55,
  
  cost: 55797.66,
  margin: 9202.34,
  
  billableHours: '434:31',
  nonBillableHours: '28:25',
  
  billableExpenses: 12037.51,
  nonBillableExpenses: 2362.52,
  
  completeFixedAmount: 200.00,
  outstandingFixedAmount: 3740.00,
  
  invoicedAmount: 66236.45,
  uninvoicedAmount: 7767.10,
  
  percentBudgetUsed: 14,
  percentHoursBillable: 94,
  percentExpensesBillable: 84,
  percentFixedAmountComplete: 5,
  percentInvoiced: 90
};

export const mockAlerts: Alert[] = [
  {
    id: 'alert1',
    type: 'overdue',
    message: 'Invoice INV20 is overdue by 15 days',
    invoiceId: 'INV20',
    read: false,
    createdAt: format(subDays(today, 5), 'yyyy-MM-dd')
  },
  {
    id: 'alert2',
    type: 'overdue',
    message: 'Invoice INV21 is overdue by 30 days',
    invoiceId: 'INV21',
    read: false,
    createdAt: format(subDays(today, 10), 'yyyy-MM-dd')
  },
  {
    id: 'alert3',
    type: 'approaching',
    message: 'Invoice INV19 is due in 5 days',
    invoiceId: 'INV19',
    read: true,
    createdAt: format(subDays(today, 2), 'yyyy-MM-dd')
  },
  {
    id: 'alert4',
    type: 'exceeded',
    message: 'Budget exceeded by $4,500 for project "Mobile App Development"',
    read: false,
    createdAt: format(subDays(today, 1), 'yyyy-MM-dd')
  }
];

export const mockMonthlyReports: MonthlyReport[] = [
  {
    month: 'January',
    year: 2023,
    totalInvoiced: 31009.27,
    totalPaid: 31009.27,
    totalOverdue: 0,
    invoiceCount: 2
  },
  {
    month: 'February',
    year: 2023,
    totalInvoiced: 6800.00,
    totalPaid: 6800.00,
    totalOverdue: 0,
    invoiceCount: 5
  },
  {
    month: 'March',
    year: 2023,
    totalInvoiced: 12600.00,
    totalPaid: 8250.00,
    totalOverdue: 4350.00,
    invoiceCount: 3
  },
  {
    month: 'April',
    year: 2023,
    totalInvoiced: 0,
    totalPaid: 0,
    totalOverdue: 0,
    invoiceCount: 0
  }
];
