import os
from urllib import response
from dotenv import load_dotenv
import requests

def fetch_news(category, language):
    load_dotenv()
    api_key = os.getenv("NEWS_API_KEY")
    url = "https://newsdata.io/api/1/news"
    params = {
        "country": "IN",
        "apiKey": api_key,
        "category": category,
        "language": language
    }
    response = requests.get(url, params = params)
    data = response.json()
    return data['results']


articles = fetch_news("business", "en")

for a in articles:
    print(a['title'])
    print(a['description'])
    print(a['link'])
    print("-"*50)
