from fastapi import FastAPI
from services.fetch_news import fetch_news

app = FastAPI()

@app.get("/news")
def get_news(category: str, language: str):
    return fetch_news(category, language)
