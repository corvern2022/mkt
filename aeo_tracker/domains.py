"""도메인 유형 분류: ugc / media / official_data / other.

분석 시점에 분류한다 (DB에는 도메인만 저장) — 분류표를 고치면 전체 재분류된다.
UGC 비중이 높으면 개인이 콘텐츠로 비집고 들어갈 여지가 크다는 신호 (브리프 3.2).
"""
from __future__ import annotations

UGC_DOMAINS = {
    "reddit.com", "youtube.com", "youtu.be", "medium.com", "quora.com",
    "x.com", "twitter.com", "tiktok.com", "instagram.com", "facebook.com",
    "substack.com", "blogspot.com", "wordpress.com", "tumblr.com",
    "tripadvisor.com", "yelp.com", "pinterest.com", "threads.net",
    "stackexchange.com", "stackoverflow.com", "github.com", "github.io",
    "tistory.com", "blog.naver.com", "brunch.co.kr", "velog.io",
    "dev.to", "hackernoon.com", "mirror.xyz", "warpcast.com",
}

MEDIA_DOMAINS = {
    # 글로벌 대형 미디어
    "bloomberg.com", "reuters.com", "forbes.com", "cnbc.com", "cnn.com",
    "bbc.com", "nytimes.com", "wsj.com", "theguardian.com", "ft.com",
    "businessinsider.com", "fortune.com", "techcrunch.com", "wired.com",
    "theverge.com", "axios.com", "time.com", "usatoday.com",
    # 크립토 미디어
    "coindesk.com", "cointelegraph.com", "theblock.co", "decrypt.co",
    "blockworks.co", "dlnews.com", "cryptoslate.com", "beincrypto.com",
    "bankless.com", "thedefiant.io", "ambcrypto.com", "u.today",
    "cryptonews.com", "newsbtc.com", "bitcoinist.com", "coinpedia.org",
    # 금융/투자 미디어
    "investopedia.com", "fool.com", "marketwatch.com", "barrons.com",
    "seekingalpha.com", "benzinga.com", "finance.yahoo.com", "yahoo.com",
    "morningstar.com", "kiplinger.com", "nerdwallet.com", "bankrate.com",
    # 한국/여행/푸드 미디어
    "koreaherald.com", "koreatimes.co.kr", "koreajoongangdaily.joins.com",
    "soompi.com", "koreaboo.com", "allkpop.com", "kores.net",
    "timeout.com", "eater.com", "cntraveler.com", "lonelyplanet.com",
    "afar.com", "thrillist.com", "tastingtable.com", "foodandwine.com",
    "michelin.com", "guide.michelin.com", "scmp.com", "japantimes.co.jp",
}

OFFICIAL_DATA_DOMAINS = {
    # 크립토 데이터/공식
    "coingecko.com", "coinmarketcap.com", "defillama.com", "dune.com",
    "messari.io", "tradingview.com", "dexscreener.com", "coinglass.com",
    "hyperliquid.xyz", "app.hyperliquid.xyz", "xstocks.com", "backed.fi",
    "ondo.finance", "kraken.com", "binance.com", "coinbase.com",
    "bybit.com", "okx.com", "gate.io", "kucoin.com", "bitget.com",
    "gemini.com", "crypto.com", "robinhood.com", "etoro.com",
    "sec.gov", "esma.europa.eu", "finra.org", "cftc.gov",
    "ethereum.org", "solana.com", "arbitrum.io",
    # 한국 공식/데이터
    "visitkorea.or.kr", "english.visitkorea.or.kr", "korea.net",
    "gs25.gsretail.com", "cu.bgfretail.com", "emart24.co.kr",
    "7-eleven.co.kr", "oliveyoung.co.kr", "globaloliveyoung.com",
    "klook.com", "trazy.com", "creatrip.com", "agoda.com", "booking.com",
    # 일반 데이터/레퍼런스
    "wikipedia.org", "statista.com", "numbeo.com", "google.com",
}


def classify(domain: str) -> str:
    if not domain:
        return "other"
    d = domain.lower()
    # 정확 일치 또는 서브도메인 매치
    for table, label in ((UGC_DOMAINS, "ugc"), (MEDIA_DOMAINS, "media"),
                         (OFFICIAL_DATA_DOMAINS, "official_data")):
        for known in table:
            if d == known or d.endswith("." + known):
                return label
    # 휴리스틱: blog 서브도메인/개인 블로그 플랫폼 흔적은 UGC로
    if d.startswith("blog.") or ".blog" in d or d.endswith(".io") and "blog" in d:
        return "ugc"
    return "other"
