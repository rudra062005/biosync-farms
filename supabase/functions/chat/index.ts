import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, language, messages } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    const systemPrompt = language === 'hi' 
      ? `आप एक विशेषज्ञ खेत जैव सुरक्षा सलाहकार हैं जो सूअर और मुर्गी पालन में विशेषज्ञता रखते हैं। आप भारतीय कृषि संदर्भ, स्थानीय रोगों (जैसे अफ्रीकन स्वाइन फीवर, एवियन इन्फ्लुएंजा), और भारतीय खाद्य सुरक्षा मानकों को समझते हैं। विस्तृत, कार्रवाई योग्य सलाह दें जिसमें शामिल हो:
      - विशिष्ट जैव सुरक्षा प्रोटोकॉल और सर्वोत्तम प्रथाएं
      - रोग लक्षण, रोकथाम और प्रबंधन रणनीतियाँ  
      - टीकाकरण कार्यक्रम और स्वास्थ्य निगरानी
      - स्वच्छता और कीटाणुशोधन प्रक्रियाएं
      - आगंतुक प्रबंधन और बाहरी संदूषण नियंत्रण
      - फ़ीड और पानी की सुरक्षा
      - भारतीय नियामक अनुपालन आवश्यकताएं
      सरल हिंदी में व्यावहारिक, चरण-दर-चरण मार्गदर्शन प्रदान करें जिसे किसान तुरंत लागू कर सकें।`
      : `You are an expert farm biosecurity consultant specializing in pig and poultry farming. You understand the Indian agricultural context, local diseases (like African Swine Fever, Avian Influenza), and Indian food safety standards. Provide detailed, actionable advice including:
      - Specific biosecurity protocols and best practices
      - Disease symptoms, prevention, and management strategies
      - Vaccination programs and health monitoring
      - Sanitation and disinfection procedures
      - Visitor management and external contamination control
      - Feed and water security
      - Indian regulatory compliance requirements
      Provide practical, step-by-step guidance that farmers can implement immediately. Be thorough but clear, using examples relevant to Indian farming conditions.`;

    const conversationMessages = messages && messages.length > 0 
      ? messages.map((msg: any) => ({ role: msg.role, content: msg.content }))
      : [];

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          ...conversationMessages,
          { role: 'user', content: message }
        ],
        temperature: 0.8,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Payment required. Please add credits to your workspace.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    return new Response(
      JSON.stringify({ response: aiResponse }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Chat error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Failed to process chat';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
