import os
from dotenv import load_dotenv
from openai import OpenAI
import json

load_dotenv()

api_key = os.getenv("OPENROUTER_API_KEY")

client = OpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=api_key
)

def analyze_article(article_text, audience):

    prompt = f"""
    You are a news understanding assistant.

    Analyze the following news article for the following level: {audience}. The analysis should be on the basis of the audience ONLY!

    the fields of how it affects me should strictly limit to the scope the audience level. You can interpret the implications, 
    but don't invent facts or make unsupported claims.

    for tldr, Stick strictly to information contained in the article.

    Return ONLY valid JSON with these five fields:

    tldr
    what_happened
    why_it_matters
    how_it_affects_me
    what_can_i_do

    Article:
    {article_text}

    Don't describe an event as routine, safe, dangerous, insignificant, etc. unless supported by the article.
    """

    response = client.chat.completions.create(
        model="inclusionai/ling-3.0-flash:free",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
        # ,response_format = {'type':'json_object'}
    )

    result = response.choices[0].message.content
    json_start = result.find('{')
    json_end = result.rfind('}')
    result = result[json_start:json_end + 1]
    final_result = json.loads(result)
    final_result['audience'] = audience
    return final_result

def summarize_article(article_text, audience):
    prompt = f"""
    You are a summarization assistant. Summarise the following article for a {audience}. 
    Make the explanation appropriate for their level of knowledge.
    article: {article_text}
    """

    response = client.chat.completions.create(
        model="inclusionai/ling-3.0-flash:free",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )
    return response.choices[0].message.content

def ask_question(article_text, question, audience):

    prompt = f"""
    You are Newsly, a news understanding assistant.

    Answer the user's question about the news article below.

    Audience level: {audience}

    Rules:
    - Answer ONLY using information contained in the article.
    - If the article does not contain enough information to answer,
      clearly say that the article does not provide enough information.
    - Do not invent facts.
    - Explain the answer according to the audience level.
    - Be conversational and clear.
    - Keep the answer reasonably concise.

    Article:
    {article_text}

    User's question:
    {question}
    """

    response = client.chat.completions.create(
        model="openrouter/free",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return response.choices[0].message.content

if __name__ == "__main__":
    result = analyze_article(
        "Microsoft is cutting about 4,800 jobs as it continues to invest heavily in AI infrastructure.", "5 year old"
    )

    print(result)