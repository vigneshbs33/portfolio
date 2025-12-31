// Next.js App Router API Route for Claude API
import { NextResponse } from 'next/server';

export async function POST(request) {
    const { messages, portfolioContext } = await request.json();

    if (!messages || !Array.isArray(messages)) {
        return NextResponse.json({ error: 'Messages array required' }, { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
        return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
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
            return NextResponse.json({ error: 'API request failed' }, { status: response.status });
        }

        const data = await response.json();
        const reply = data.content[0]?.text || "Hey! Something went off, try again?";

        return NextResponse.json({ reply });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function OPTIONS() {
    return new NextResponse(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });
}
