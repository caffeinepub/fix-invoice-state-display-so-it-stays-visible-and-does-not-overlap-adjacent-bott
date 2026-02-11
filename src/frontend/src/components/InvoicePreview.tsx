import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Download } from 'lucide-react';
import type { InvoiceData } from '../pages/InvoiceCreator';
import { calculateGST } from '../lib/gst';
import { toast } from 'sonner';

// Declare html2pdf from CDN
declare global {
  interface Window {
    html2pdf: any;
  }
}

interface InvoicePreviewProps {
  invoiceData: InvoiceData;
  onBack: () => void;
}

export default function InvoicePreview({ invoiceData, onBack }: InvoicePreviewProps) {
  const gstCalculation = calculateGST(invoiceData);
  const isInterState = invoiceData.businessState !== invoiceData.clientState;

  const handleDownload = () => {
    const element = document.getElementById('invoice-preview');
    if (!element) return;

    if (!window.html2pdf) {
      toast.error('PDF library not loaded. Please refresh the page.');
      return;
    }

    const opt = {
      margin: 10,
      filename: `${invoiceData.invoiceNumber}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    window.html2pdf()
      .set(opt)
      .from(element)
      .save()
      .then(() => {
        toast.success('Invoice downloaded successfully!');
      })
      .catch(() => {
        toast.error('Failed to download invoice');
      });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button onClick={onBack} variant="outline">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Edit
        </Button>
        <Button onClick={handleDownload} className="bg-gradient-to-r from-indian-saffron to-indian-orange hover:opacity-90">
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
      </div>

      <Card className="p-8" id="invoice-preview">
        <div className="space-y-6">
          {/* Header */}
          <div className="invoice-header grid grid-cols-1 md:grid-cols-2 gap-6 border-b pb-6">
            <div className="invoice-party flex items-start gap-4 min-w-0">
              {invoiceData.businessLogo && (
                <img
                  src={invoiceData.businessLogo}
                  alt="Business Logo"
                  className="h-16 w-16 object-contain flex-shrink-0"
                />
              )}
              <div className="min-w-0 flex-1">
                <h1 className="text-2xl font-bold break-words">{invoiceData.businessName}</h1>
                {invoiceData.businessAddress && (
                  <p className="text-sm text-muted-foreground mt-1 whitespace-pre-line break-words">
                    {invoiceData.businessAddress}
                  </p>
                )}
                {invoiceData.businessGSTIN && (
                  <p className="text-sm mt-1 break-words">
                    <span className="font-medium">GSTIN:</span> {invoiceData.businessGSTIN}
                  </p>
                )}
                <p className="invoice-state text-sm break-words">
                  <span className="font-medium">State:</span> {invoiceData.businessState}
                </p>
              </div>
            </div>
            <div className="invoice-meta text-left md:text-right min-w-0">
              <h2 className="text-3xl font-bold text-indian-orange">INVOICE</h2>
              <p className="text-sm mt-2 break-words">
                <span className="font-medium">Invoice #:</span> {invoiceData.invoiceNumber}
              </p>
              <p className="text-sm break-words">
                <span className="font-medium">Date:</span>{' '}
                {new Date(invoiceData.invoiceDate).toLocaleDateString('en-IN')}
              </p>
            </div>
          </div>

          {/* Bill To */}
          <div>
            <h3 className="font-semibold mb-2">Bill To:</h3>
            <div className="text-sm min-w-0">
              <p className="font-medium break-words">{invoiceData.clientName}</p>
              {invoiceData.clientAddress && (
                <p className="text-muted-foreground whitespace-pre-line break-words">{invoiceData.clientAddress}</p>
              )}
              {invoiceData.clientGSTIN && (
                <p className="mt-1 break-words">
                  <span className="font-medium">GSTIN:</span> {invoiceData.clientGSTIN}
                </p>
              )}
              <p className="invoice-state break-words">
                <span className="font-medium">State:</span> {invoiceData.clientState}
              </p>
            </div>
          </div>

          {/* Items Table */}
          <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-3 text-sm font-medium">Description</th>
                  <th className="text-right p-3 text-sm font-medium">Qty</th>
                  <th className="text-right p-3 text-sm font-medium">Rate</th>
                  <th className="text-right p-3 text-sm font-medium">Tax %</th>
                  <th className="text-right p-3 text-sm font-medium">Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData.items.map((item, index) => (
                  <tr key={item.id} className={index % 2 === 0 ? 'bg-background' : 'bg-muted/30'}>
                    <td className="p-3 text-sm">{item.description}</td>
                    <td className="p-3 text-sm text-right">{item.quantity}</td>
                    <td className="p-3 text-sm text-right">₹{item.rate.toFixed(2)}</td>
                    <td className="p-3 text-sm text-right">{item.taxPercent}%</td>
                    <td className="p-3 text-sm text-right font-medium">
                      ₹{(item.quantity * item.rate).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex justify-end">
            <div className="w-full max-w-sm space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span className="font-medium">₹{gstCalculation.subtotal.toFixed(2)}</span>
              </div>
              {isInterState ? (
                <div className="flex justify-between text-sm">
                  <span>IGST ({gstCalculation.totalTaxPercent}%):</span>
                  <span className="font-medium">₹{gstCalculation.totalTax.toFixed(2)}</span>
                </div>
              ) : (
                <>
                  <div className="flex justify-between text-sm">
                    <span>CGST ({(gstCalculation.totalTaxPercent / 2).toFixed(2)}%):</span>
                    <span className="font-medium">₹{(gstCalculation.totalTax / 2).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>SGST ({(gstCalculation.totalTaxPercent / 2).toFixed(2)}%):</span>
                    <span className="font-medium">₹{(gstCalculation.totalTax / 2).toFixed(2)}</span>
                  </div>
                </>
              )}
              <div className="flex justify-between text-lg font-bold border-t pt-2">
                <span>Total:</span>
                <span className="text-indian-orange">₹{gstCalculation.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t pt-6 text-center text-xs text-muted-foreground">
            <p>Generated using Free Invoice Generator</p>
            <p className="mt-1">This is a computer-generated invoice and does not require a signature</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
