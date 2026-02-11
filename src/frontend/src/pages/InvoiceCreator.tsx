import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, Download, Upload } from 'lucide-react';
import { toast } from 'sonner';
import InvoicePreview from '../components/InvoicePreview';
import { indianStates } from '../lib/states';

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  taxPercent: number;
}

export interface InvoiceData {
  businessName: string;
  businessAddress: string;
  businessGSTIN: string;
  businessState: string;
  businessLogo?: string;
  clientName: string;
  clientAddress: string;
  clientGSTIN: string;
  clientState: string;
  invoiceNumber: string;
  invoiceDate: string;
  items: InvoiceItem[];
}

export default function InvoiceCreator() {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    businessName: '',
    businessAddress: '',
    businessGSTIN: '',
    businessState: '',
    clientName: '',
    clientAddress: '',
    clientGSTIN: '',
    clientState: '',
    invoiceNumber: `INV-${Date.now()}`,
    invoiceDate: new Date().toISOString().split('T')[0],
    items: [{ id: '1', description: '', quantity: 1, rate: 0, taxPercent: 18 }],
  });

  const [showPreview, setShowPreview] = useState(false);
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Logo file size should be less than 2MB');
        return;
      }
      setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setInvoiceData({ ...invoiceData, businessLogo: reader.result as string });
      };
      reader.readAsDataURL(file);
      toast.success('Logo uploaded successfully');
    }
  };

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: '',
      quantity: 1,
      rate: 0,
      taxPercent: 18,
    };
    setInvoiceData({ ...invoiceData, items: [...invoiceData.items, newItem] });
  };

  const removeItem = (id: string) => {
    if (invoiceData.items.length === 1) {
      toast.error('At least one item is required');
      return;
    }
    setInvoiceData({
      ...invoiceData,
      items: invoiceData.items.filter((item) => item.id !== id),
    });
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setInvoiceData({
      ...invoiceData,
      items: invoiceData.items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      ),
    });
  };

  const validateForm = (): boolean => {
    if (!invoiceData.businessName.trim()) {
      toast.error('Business name is required');
      return false;
    }
    if (!invoiceData.clientName.trim()) {
      toast.error('Client name is required');
      return false;
    }
    if (!invoiceData.businessState) {
      toast.error('Business state is required');
      return false;
    }
    if (!invoiceData.clientState) {
      toast.error('Client state is required');
      return false;
    }
    if (invoiceData.items.some((item) => !item.description.trim())) {
      toast.error('All items must have a description');
      return false;
    }
    return true;
  };

  const handlePreview = () => {
    if (validateForm()) {
      setShowPreview(true);
    }
  };

  return (
    <div className="container py-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Create GST Invoice</h1>
          <p className="text-muted-foreground">
            Fill in the details below to generate your GST-compliant invoice
          </p>
        </div>

        {showPreview ? (
          <InvoicePreview
            invoiceData={invoiceData}
            onBack={() => setShowPreview(false)}
          />
        ) : (
          <div className="space-y-6">
            {/* Business Details */}
            <Card>
              <CardHeader>
                <CardTitle>Business Details</CardTitle>
                <CardDescription>Your business information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Business Name *</Label>
                    <Input
                      id="businessName"
                      value={invoiceData.businessName}
                      onChange={(e) =>
                        setInvoiceData({ ...invoiceData, businessName: e.target.value })
                      }
                      placeholder="Enter business name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessGSTIN">GSTIN (Optional)</Label>
                    <Input
                      id="businessGSTIN"
                      value={invoiceData.businessGSTIN}
                      onChange={(e) =>
                        setInvoiceData({ ...invoiceData, businessGSTIN: e.target.value.toUpperCase() })
                      }
                      placeholder="22AAAAA0000A1Z5"
                      maxLength={15}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessAddress">Business Address</Label>
                  <Textarea
                    id="businessAddress"
                    value={invoiceData.businessAddress}
                    onChange={(e) =>
                      setInvoiceData({ ...invoiceData, businessAddress: e.target.value })
                    }
                    placeholder="Enter complete business address"
                    rows={3}
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="businessState">State *</Label>
                    <Select
                      value={invoiceData.businessState}
                      onValueChange={(value) =>
                        setInvoiceData({ ...invoiceData, businessState: value })
                      }
                    >
                      <SelectTrigger id="businessState">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent 
                        className="state-select-dropdown"
                        position="popper"
                        align="start"
                        sideOffset={4}
                      >
                        {indianStates.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessLogo">Business Logo (Optional)</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="businessLogo"
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById('businessLogo')?.click()}
                        className="w-full"
                      >
                        <Upload className="mr-2 h-4 w-4" />
                        {logoFile ? logoFile.name : 'Upload Logo'}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Client Details */}
            <Card>
              <CardHeader>
                <CardTitle>Client Details</CardTitle>
                <CardDescription>Your client's information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="clientName">Client Name *</Label>
                    <Input
                      id="clientName"
                      value={invoiceData.clientName}
                      onChange={(e) =>
                        setInvoiceData({ ...invoiceData, clientName: e.target.value })
                      }
                      placeholder="Enter client name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="clientGSTIN">Client GSTIN (Optional)</Label>
                    <Input
                      id="clientGSTIN"
                      value={invoiceData.clientGSTIN}
                      onChange={(e) =>
                        setInvoiceData({ ...invoiceData, clientGSTIN: e.target.value.toUpperCase() })
                      }
                      placeholder="22AAAAA0000A1Z5"
                      maxLength={15}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clientAddress">Client Address</Label>
                  <Textarea
                    id="clientAddress"
                    value={invoiceData.clientAddress}
                    onChange={(e) =>
                      setInvoiceData({ ...invoiceData, clientAddress: e.target.value })
                    }
                    placeholder="Enter client address"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clientState">Client State *</Label>
                  <Select
                    value={invoiceData.clientState}
                    onValueChange={(value) =>
                      setInvoiceData({ ...invoiceData, clientState: value })
                    }
                  >
                    <SelectTrigger id="clientState">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent 
                      className="state-select-dropdown"
                      position="popper"
                      align="start"
                      sideOffset={4}
                    >
                      {indianStates.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Invoice Details */}
            <Card>
              <CardHeader>
                <CardTitle>Invoice Details</CardTitle>
                <CardDescription>Invoice number and date</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="invoiceNumber">Invoice Number</Label>
                    <Input
                      id="invoiceNumber"
                      value={invoiceData.invoiceNumber}
                      onChange={(e) =>
                        setInvoiceData({ ...invoiceData, invoiceNumber: e.target.value })
                      }
                      placeholder="INV-001"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="invoiceDate">Invoice Date</Label>
                    <Input
                      id="invoiceDate"
                      type="date"
                      value={invoiceData.invoiceDate}
                      onChange={(e) =>
                        setInvoiceData({ ...invoiceData, invoiceDate: e.target.value })
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Items */}
            <Card>
              <CardHeader>
                <CardTitle>Items / Services</CardTitle>
                <CardDescription>Add items or services to the invoice</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {invoiceData.items.map((item, index) => (
                  <div key={item.id} className="space-y-4 p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">Item {index + 1}</h4>
                      {invoiceData.items.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      )}
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2 md:col-span-2">
                        <Label>Description *</Label>
                        <Input
                          value={item.description}
                          onChange={(e) =>
                            updateItem(item.id, 'description', e.target.value)
                          }
                          placeholder="Item or service description"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Quantity</Label>
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            updateItem(item.id, 'quantity', parseFloat(e.target.value) || 1)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Rate (₹)</Label>
                        <Input
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.rate}
                          onChange={(e) =>
                            updateItem(item.id, 'rate', parseFloat(e.target.value) || 0)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Tax %</Label>
                        <Select
                          value={item.taxPercent.toString()}
                          onValueChange={(value) =>
                            updateItem(item.id, 'taxPercent', parseFloat(value))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">0%</SelectItem>
                            <SelectItem value="5">5%</SelectItem>
                            <SelectItem value="12">12%</SelectItem>
                            <SelectItem value="18">18%</SelectItem>
                            <SelectItem value="28">28%</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Amount</Label>
                        <Input
                          value={`₹${(item.quantity * item.rate).toFixed(2)}`}
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <Button onClick={addItem} variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Item
                </Button>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex justify-end gap-4">
              <Button onClick={handlePreview} size="lg" className="bg-gradient-to-r from-indian-saffron to-indian-orange hover:opacity-90">
                <Download className="mr-2 h-5 w-5" />
                Preview & Download
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
