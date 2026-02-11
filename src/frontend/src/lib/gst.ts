import type { InvoiceData } from '../pages/InvoiceCreator';

export interface GSTCalculation {
  subtotal: number;
  totalTax: number;
  totalTaxPercent: number;
  total: number;
  isInterState: boolean;
}

export function calculateGST(invoiceData: InvoiceData): GSTCalculation {
  const isInterState = invoiceData.businessState !== invoiceData.clientState;

  let subtotal = 0;
  let totalTax = 0;
  let totalTaxableAmount = 0;

  invoiceData.items.forEach((item) => {
    const itemTotal = item.quantity * item.rate;
    const itemTax = (itemTotal * item.taxPercent) / 100;
    subtotal += itemTotal;
    totalTax += itemTax;
    totalTaxableAmount += itemTotal;
  });

  const totalTaxPercent = totalTaxableAmount > 0 ? (totalTax / totalTaxableAmount) * 100 : 0;
  const total = subtotal + totalTax;

  return {
    subtotal,
    totalTax,
    totalTaxPercent,
    total,
    isInterState,
  };
}
