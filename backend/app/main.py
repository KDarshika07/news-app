import datetime
from fastapi import FastAPI
from services.fetch_news import fetch_news
from services.summariser import analyze_article, summarize_article
from services.article_extractor import extract_article
from pydantic import BaseModel
from enum import Enum
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(CORSMiddleware, 
                   allow_origins=["http://localhost:5173"],
                   allow_credentials=True,
                   allow_methods=["*"],
                   allow_headers=["*"])

class AudienceLevel(str, Enum):
    child = "like I am 5"
    elderly = "elderly reader"
    executive = "C-suite executive"
    college_student = "A college student"

class URLSummaryRequest(BaseModel):
    url: str

class ArticleAnalysis(BaseModel):
    audience: AudienceLevel
    tldr: str
    what_happened: str
    why_it_matters: str
    how_it_affects_me: str
    what_can_i_do: str

class Article(BaseModel):
    title: str
    description: str | None
    link: str
    image: str | None
    published_at: datetime.datetime
    source: str

class UserPreferences(BaseModel):
    profession: str
    explanation_level: AudienceLevel
    genres: list[str]

user_preferences = None

@app.get("/news", response_model=list[Article])
def get_news(language: str):
    if user_preferences is not None:
        news = []
        seen = set()  # To track seen articles and avoid duplicates
        unique_news = []
        for category in user_preferences['genres']:
            news.extend(fetch_news(category, language))
        for article in news:
            if article['link'] not in seen:
                seen.add(article['link']) 
                unique_news.append(article)
        return unique_news

    else:
        return []

@app.post("/summarize-url")
def summarize_url(request: URLSummaryRequest):
    if user_preferences is None:
        return []
    else:
        article_text = extract_article(request.url)
        if article_text is None:
            return {"error": "Could not extract article"}
        summary = analyze_article(article_text, user_preferences['explanation_level'])
        return summary

@app.post("/audience_level")
def audience(request: AudienceLevel):
    return {"audience": request.value}

@app.post("/preferences")
def preferences(request: UserPreferences):
    request = {"profession": request.profession, "explanation_level": request.explanation_level.value, "genres": request.genres}
    global user_preferences
    user_preferences = request
    return request