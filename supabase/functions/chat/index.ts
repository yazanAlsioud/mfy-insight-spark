import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.75.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    
    // Get authorization header
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "No authorization header" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey, {
      global: { headers: { Authorization: authHeader } },
    });

    // Get authenticated user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      console.error("User error:", userError);
      return new Response(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("User authenticated:", user.id);

    // Get user's profile to find client_id
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("client_id")
      .eq("id", user.id)
      .single();

    if (profileError || !profile?.client_id) {
      console.error("Profile error:", profileError);
      return new Response(
        JSON.stringify({ error: "User profile not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Client ID:", profile.client_id);

    // Get client_company_id
    const { data: company, error: companyError } = await supabase
      .from("clientcompanies")
      .select("client_company_id")
      .eq("client_id", profile.client_id)
      .single();

    if (companyError || !company?.client_company_id) {
      console.error("Company error:", companyError);
      return new Response(
        JSON.stringify({ error: "Company not found. Please set up your company first." }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log("Client Company ID:", company.client_company_id);

    // Get the user's prompt (last message)
    const userPrompt = messages[messages.length - 1]?.content || "";
    console.log("User prompt:", userPrompt);

    // Call external API
    const apiUrl = "https://agentic-analyst-api-frc7dkeagaakchg2.westeurope-01.azurewebsites.net/ask";
    console.log("Calling external API:", apiUrl);
    
    const apiResponse = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: userPrompt,
        client_company_id: company.client_company_id,
      }),
    });

    if (!apiResponse.ok) {
      const errorText = await apiResponse.text();
      console.error("API error:", apiResponse.status, errorText);
      throw new Error(`API error: ${apiResponse.status}`);
    }

    const apiData = await apiResponse.json();
    console.log("API response received");

    // Extract final_answer and strategy.actions
    const finalAnswer = apiData.final_answer || "No answer available";
    const actions = apiData.strategy?.actions || [];

    // Format response
    let responseText = `${finalAnswer}\n\n`;
    
    if (actions.length > 0) {
      responseText += "**Recommended Actions:**\n";
      actions.forEach((action: string, index: number) => {
        responseText += `${index + 1}. ${action}\n`;
      });
    }

    console.log("Sending formatted response");

    return new Response(
      JSON.stringify({ 
        message: responseText,
        raw_data: apiData 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
