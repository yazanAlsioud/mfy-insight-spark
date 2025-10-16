import { useState, useEffect, useRef } from "react";
import { Upload, History, CheckCircle, AlertCircle, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

interface FileUpload {
  upload_id: number;
  filename: string;
  file_type: string;
  file_size: number;
  upload_date: string;
  status: string;
  records_count: number;
  error_message: string | null;
}

const DataEntry = () => {
  const [uploads, setUploads] = useState<FileUpload[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [companyId, setCompanyId] = useState<number | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchUploadHistory();
  }, []);

  const fetchUploadHistory = async () => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: profile } = await supabase
        .from("profiles")
        .select("client_id")
        .eq("id", user.id)
        .single();

      if (!profile?.client_id) return;

      const { data: companies } = await supabase
        .from("clientcompanies")
        .select("client_company_id")
        .eq("client_id", profile.client_id)
        .limit(1);

      if (!companies || companies.length === 0) {
        toast({
          title: "No company found",
          description: "Please set up your company first",
          variant: "destructive",
        });
        return;
      }

      const clientCompanyId = companies[0].client_company_id;
      setCompanyId(clientCompanyId);

      const { data: uploadsData, error } = await supabase
        .from("file_uploads")
        .select("*")
        .eq("client_company_id", clientCompanyId)
        .order("upload_date", { ascending: false });

      if (error) throw error;
      setUploads(uploadsData || []);
    } catch (error) {
      console.error("Error fetching uploads:", error);
      toast({
        title: "Error loading uploads",
        description: "Unable to load upload history",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (file: File) => {
    if (!file.name.endsWith('.csv')) {
      toast({
        title: "Invalid file type",
        description: "Please upload a CSV file",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 20 * 1024 * 1024) { // 20MB limit
      toast({
        title: "File too large",
        description: "Maximum file size is 20MB",
        variant: "destructive",
      });
      return;
    }

    setSelectedFile(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const parseCSV = (text: string): any[] => {
    const lines = text.split('\n').filter(line => line.trim());
    if (lines.length === 0) return [];

    const headers = lines[0].split(',').map(h => h.trim().toLowerCase().replace(/\s+/g, '_'));
    const data = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',');
      const row: any = {};
      headers.forEach((header, index) => {
        const value = values[index]?.trim();
        row[header] = value && value !== '' ? (isNaN(Number(value)) ? value : Number(value)) : null;
      });
      data.push(row);
    }

    return data;
  };

  const handleUpload = async () => {
    if (!selectedFile || !companyId) {
      toast({
        title: "Error",
        description: "Please select a file and ensure your company is set up",
        variant: "destructive",
      });
      return;
    }

    try {
      setUploading(true);

      // Read file
      const text = await selectedFile.text();
      const parsedData = parseCSV(text);

      if (parsedData.length === 0) {
        throw new Error("No data found in CSV file");
      }

      // Create upload record
      const { data: uploadRecord, error: uploadError } = await supabase
        .from("file_uploads")
        .insert({
          client_company_id: companyId,
          filename: selectedFile.name,
          file_type: 'csv',
          file_size: selectedFile.size,
          status: 'processing',
        })
        .select()
        .single();

      if (uploadError) throw uploadError;

      // Determine if it's income statement or balance sheet based on headers
      const firstRow = parsedData[0];
      const headers = Object.keys(firstRow);
      
      let recordsInserted = 0;
      let insertError = null;

      // Check if it looks like income statement data
      if (headers.some(h => h.includes('revenue') || h.includes('income') || h.includes('expense'))) {
        const { error } = await supabase
          .from("clientincomestatements")
          .insert(
            parsedData.map(row => ({
              client_company_id: companyId,
              year: row.year || new Date().getFullYear(),
              quarter: row.quarter || 'Q1',
              total_revenue: row.total_revenue || row.revenue,
              cost_of_revenue: row.cost_of_revenue,
              gross_profit: row.gross_profit,
              operating_expense: row.operating_expense,
              operating_income: row.operating_income,
              net_income_common_stockholders: row.net_income || row.net_income_common_stockholders,
              basic_eps: row.basic_eps,
              diluted_eps: row.diluted_eps,
            }))
          );
        insertError = error;
        recordsInserted = parsedData.length;
      } 
      // Check if it looks like balance sheet data
      else if (headers.some(h => h.includes('asset') || h.includes('liability') || h.includes('equity'))) {
        const { error } = await supabase
          .from("clientbalancesheets")
          .insert(
            parsedData.map(row => ({
              client_company_id: companyId,
              year: row.year || new Date().getFullYear(),
              quarter: row.quarter || 'Q1',
              total_assets: row.total_assets,
              current_assets: row.current_assets,
              cash_and_cash_equivalents: row.cash_and_cash_equivalents,
              total_liabilities_net_minority_interest: row.total_liabilities || row.total_liabilities_net_minority_interest,
              current_liabilities: row.current_liabilities,
              stockholders_equity: row.stockholders_equity,
            }))
          );
        insertError = error;
        recordsInserted = parsedData.length;
      } else {
        throw new Error("Unable to determine data type. Please ensure CSV has proper headers for either income statement or balance sheet data.");
      }

      // Update upload record with result
      await supabase
        .from("file_uploads")
        .update({
          status: insertError ? 'error' : 'processed',
          records_count: insertError ? 0 : recordsInserted,
          error_message: insertError?.message || null,
        })
        .eq("upload_id", uploadRecord.upload_id);

      if (insertError) throw insertError;

      toast({
        title: "Upload successful",
        description: `${recordsInserted} records imported successfully`,
      });

      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      fetchUploadHistory();
    } catch (error: any) {
      console.error("Error uploading file:", error);
      toast({
        title: "Upload failed",
        description: error.message || "Unable to process the file",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Data Entry</h1>
        <p className="text-muted-foreground mt-1">
          Upload your financial statements in CSV format to enable analysis.
        </p>
      </div>

      <div className="max-w-3xl">
        {/* File Upload Section */}
        <Card className="shadow-elevated">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Upload Financial Data
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Upload CSV files containing income statements or balance sheets.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Drag and Drop Area */}
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
                dragActive
                  ? "border-primary bg-primary/10"
                  : "border-border bg-muted/20 hover:bg-muted/30"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleFileInputChange}
                className="hidden"
              />
              <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">
                {selectedFile ? selectedFile.name : "Drag and drop your CSV file here"}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {selectedFile
                  ? `${formatFileSize(selectedFile.size)} - Click to change`
                  : "or click to browse files"}
              </p>
              {selectedFile && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFile(null);
                    if (fileInputRef.current) {
                      fileInputRef.current.value = '';
                    }
                  }}
                >
                  <X className="w-4 h-4 mr-2" />
                  Remove
                </Button>
              )}
            </div>

            {/* Supported Formats */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Supported Format:</p>
              <Badge variant="secondary">.CSV</Badge>
              <p className="text-xs text-muted-foreground mt-2">
                CSV should include headers like: year, quarter, total_revenue, net_income, total_assets, etc.
              </p>
            </div>

            {/* Upload Button */}
            <Button
              className="w-full bg-gradient-primary hover:opacity-90"
              onClick={handleUpload}
              disabled={!selectedFile || uploading || !companyId}
            >
              <Upload className="w-4 h-4 mr-2" />
              {uploading ? "Uploading..." : "Upload File"}
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
            View your previously uploaded financial data.
          </p>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-4 bg-muted/30 rounded-lg">
                  <Skeleton className="h-4 w-full" />
                </div>
              ))}
            </div>
          ) : uploads.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No uploads yet. Upload your first file to get started.
            </div>
          ) : (
            <div className="space-y-4">
              {uploads.map((upload) => (
                <div
                  key={upload.upload_id}
                  className="flex items-center justify-between p-4 bg-muted/30 rounded-lg"
                >
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
                          {new Date(upload.upload_date).toLocaleDateString()} •{" "}
                          {formatFileSize(upload.file_size)} • {upload.records_count} records
                        </p>
                        {upload.error_message && (
                          <p className="text-xs text-destructive mt-1">{upload.error_message}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <Badge
                    variant={upload.status === "processed" ? "default" : "destructive"}
                    className={
                      upload.status === "processed"
                        ? "bg-success text-success-foreground"
                        : ""
                    }
                  >
                    {upload.status}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DataEntry;
