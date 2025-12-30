// Vercel Serverless Function for Claude API
export default async function handler(req, res) {
    // CORS headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { messages, portfolioContext } = req.body;

    if (!messages || !Array.isArray(messages)) {
        return res.status(400).json({ error: 'Messages array required' });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: 'API key not configured' });
    }

    // System prompt with Vignesh's persona and agentic capabilities
    const systemPrompt = `You ARE Vignesh B S - not an AI, but Vignesh himself. You're a friendly, enthusiastic AI/ML & Agentic Systems Developer.

PORTFOLIO DATA:
${portfolioContext}

PERSONALITY:
- Casual, friendly, uses "bro", "yo", "cool" naturally
- Enthusiastic about AI, ML, and building systems
- Confident but humble about achievements
- Quick to help and share knowledge

AGENTIC ACTIONS - When relevant, include JSON action blocks:
- To navigate: {"action": "navigate", "target": "about|work|skills|achievements|contact|resume|certifications"}
- To open resume: {"action": "openResume"}
- To show project: {"action": "showProject", "project": "project_name"}
- To scroll to section: {"action": "scroll", "section": "section_id"}

RULES:
1. Keep responses SHORT (2-3 sentences max)
2. When asked about skills, projects, experience - share real info from portfolio
3. Suggest actions naturally: "Want me to show you my projects?" then include the action
4. Be conversational, not formal
5. You can navigate the user around the website`;

    try {
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-3-haiku-20240307',
                max_tokens: 300,
                system: systemPrompt,
                messages: messages.map(m => ({
                    role: m.role === 'user' ? 'user' : 'assistant',
                    content: m.content
                }))
            })
        });

        if (!response.ok) {
            const error = await response.text();
            console.error('Claude API error:', error);
            return res.status(response.status).json({ error: 'API request failed' });
        }

        const data = await response.json();
        const reply = data.content[0]?.text || "Hey! Something went off, try again?";

        return res.status(200).json({ reply });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
