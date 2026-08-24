import trafilatura

import trafilatura


def extract_article(url: str) -> str | None:
    downloaded = trafilatura.fetch_url(url)

    if downloaded is None:
        return None

    extracted = trafilatura.extract(downloaded)

    if extracted is None:
        return None

    return extracted

if __name__  == "__main__":
    url = "https://www.livemint.com/news/india/iran-war-govt-repatriated-over-4000-stranded-indian-seafarers-says-minister-sarbananda-sonowal-11786236076891.html"
    article_content = extract_article(url)
    print(article_content)