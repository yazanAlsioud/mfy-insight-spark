import { MessageSquare, Send, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const Chatbot = () => {
  const suggestedQuestions = [
    "What are my main cost drivers this quarter?",
    "How does my profit margin compare to industry average?",
    "Show me revenue trends for the past 6 months",
    "What recommendations do you have for cost optimization?",
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">AI Financial Assistant</h1>
        </div>
        <p className="text-muted-foreground">
          Ask me anything about your financial data. I'll provide insights and recommendations.
        </p>
      </div>

      {/* Chat Interface */}
      <Card className="shadow-elevated min-h-[700px] flex flex-col">
        <CardHeader className="border-b border-border">
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5" />
            Chat with AI Assistant
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 p-6 space-y-4">
          {/* Welcome Message */}
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="bg-muted p-4 rounded-lg rounded-tl-none max-w-md">
              <p className="text-sm">
                Hello! I'm your AI financial assistant. I can help you analyze your financial data, 
                compare performance with industry benchmarks, and provide actionable insights. 
                What would you like to know?
              </p>
            </div>
          </div>

          {/* Suggested Questions */}
          <div className="space-y-3 py-4">
            <p className="text-sm font-medium text-muted-foreground">Suggested questions:</p>
            <div className="grid gap-2 sm:grid-cols-2">
              {suggestedQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="h-auto p-3 text-left justify-start text-wrap"
                  onClick={() => {
                    // Handle suggested question click
                    console.log("Selected question:", question);
                  }}
                >
                  <span className="text-sm">{question}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-2 pt-4">
            <Badge variant="secondary" className="flex items-center gap-1">
              <MessageSquare className="w-3 h-3" />
              Natural Language
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              AI-Powered Insights
            </Badge>
            <Badge variant="secondary" className="flex items-center gap-1">
              <div className="w-3 h-3 bg-chart-revenue rounded-full" />
              Data Visualization
            </Badge>
          </div>
        </CardContent>

        {/* Input Area */}
        <div className="p-4 border-t border-border">
          <div className="flex space-x-2">
            <Input
              placeholder="Ask me about your financial data..."
              className="flex-1"
            />
            <Button size="icon" className="bg-gradient-primary hover:opacity-90">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Chatbot;