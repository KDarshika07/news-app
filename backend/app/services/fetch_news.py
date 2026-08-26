import os
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

    response = requests.get(url, params=params)

    # Raise an error if NewsData itself returned an HTTP error
    response.raise_for_status()

    data = response.json()

    # Check whether the API returned an error response
    if data.get("status") != "success":
        raise Exception(
            f"NewsData API error: {data}"
        )

    results = data.get("results", [])

    final_data = []

    for article in results:

        # Ignore unexpected non-dictionary results
        if not isinstance(article, dict):
            continue

        news_item = {
            "title": article.get("title"),
            "description": article.get("description"),
            "link": article.get("link"),
            "image": article.get("image_url"),
            "published_at": article.get("pubDate"),
            "source": article.get("source_name")
        }

        final_data.append(news_item)

    return final_data
