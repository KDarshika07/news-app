import datetime
from fastapi import FastAPI
from services.fetch_news import fetch_news
from services.summariser import analyze_article, summarize_article
from services.article_extractor import extract_article
from pydantic import BaseModel
from enum import Enum

app = FastAPI()

class AudienceLevel(str, Enum):
    child = "like I am 5"
    elderly = "elderly reader"
    executive = "C-suite executive"
    college_student = "A college student"

class URLSummaryRequest(BaseModel):
    url: str
    audience: AudienceLevel

class ArticleAnalysis(BaseModel):
    audience: AudienceLevel
    tldr: str
    what_happened: str
    why_it_matters: str
    how_it_affects_me: str
    what_can_i_do: str

class Article(BaseModel):
    title: str
    description: str
    link: str
    image: str | None
    published_at: datetime
    source: str


@app.get("/news")
def get_news(category: str, language: str):
    return fetch_news(category, language)

@app.post("/summarize-url")
def summarize_url(request: URLSummaryRequest):
    article_text = extract_article(request.url)
    if article_text is None:
        return {"error": "Could not extract article"}
    summary = analyze_article(article_text, request.audience.value)
    return summary