import { Upload, FileText, History, CheckCircle, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const DataEntry = () => {
  const uploadHistory = [
    {
      filename: "Q3_2024_financials.csv",
      uploadDate: "2024-09-15",
      status: "processed",
      size: "2.4 MB",
      records: 156
    },
    {
      filename: "August_2024_statements.pdf",
      uploadDate: "2024-09-01",
      status: "processed",
      size: "1.8 MB",
      records: 89
    },
    {
      filename: "July_2024_data.xlsx",
      uploadDate: "2024-08-15",
      status: "processed",
      size: "3.1 MB",
      records: 203
    },
    {
      filename: "Q2_2024_backup.csv",
      uploadDate: "2024-07-30",
      status: "error",
      size: "1.2 MB",
      records: 0
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Data Entry</h1>
        <p className="text-muted-foreground mt-1">
          Upload your financial statements or manually enter data to get started with analysis.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* File Upload Section */}
        <Card className="shadow-elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Upload Financial Data
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Upload CSV, Excel, or PDF files containing your financial statements.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Drag and Drop Area */}
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center bg-muted/20 hover:bg-muted/30 transition-colors cursor-pointer">
              <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                Drag and drop your files here
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                or click to browse files
              </p>
              <Button variant="outline">
                Browse Files
              </Button>
            </div>

            {/* Supported Formats */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Supported Formats:</Label>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary">.CSV</Badge>
                <Badge variant="secondary">.XLSX</Badge>
                <Badge variant="secondary">.XLS</Badge>
                <Badge variant="secondary">.PDF</Badge>
              </div>
            </div>

            {/* Upload Button */}
            <Button className="w-full bg-gradient-primary hover:opacity-90">
              <Upload className="w-4 h-4 mr-2" />
              Upload Files
            </Button>
          </CardContent>
        </Card>

        {/* Manual Entry Section */}
        <Card className="shadow-elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Manual Data Entry
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Enter your financial data manually using the form below.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="revenue">Total Revenue</Label>
                <Input id="revenue" placeholder="$2,400,000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expenses">Operating Expenses</Label>
                <Input id="expenses" placeholder="$1,200,000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="netIncome">Net Income</Label>
                <Input id="netIncome" placeholder="$480,000" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="period">Period</Label>
                <Input id="period" placeholder="Q3 2024" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea 
                id="notes" 
                placeholder="Add any relevant notes about this financial period..."
                className="min-h-[100px]"
              />
            </div>

            <Button className="w-full" variant="outline">
              Save Financial Data
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Upload History */}
      <Card className="shadow-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="w-5 h-5" />
            Upload History
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            View and manage your previously uploaded financial data.
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {uploadHistory.map((upload, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    {upload.status === "processed" ? (
                      <CheckCircle className="w-5 h-5 text-success" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-destructive" />
                    )}
                    <div>
                      <p className="font-medium text-foreground">{upload.filename}</p>
                      <p className="text-sm text-muted-foreground">
                        {upload.uploadDate} • {upload.size} • {upload.records} records
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge 
                    variant={upload.status === "processed" ? "default" : "destructive"}
                    className={upload.status === "processed" ? "bg-success text-success-foreground" : ""}
                  >
                    {upload.status}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataEntry;