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
    final_data =[]
    for article in data['results']:
        news_item = {
            'title': article.get('title'),
            'description': article.get('description'),
            'link': article.get('link'),
            'image': article.get('image_url'),
            'published at': article.get('pubDate'),
            'source': article.get('source_name')
        }
        final_data.append(news_item)
    return final_data