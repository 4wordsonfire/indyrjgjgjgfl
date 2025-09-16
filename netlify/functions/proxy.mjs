// netlify/functions/proxy.mjs
export async function handler(event) {
  try {
    const target = event.queryStringParameters && event.queryStringParameters.url;
    if (!target) return { statusCode: 400, body: "url required" };
    const host = new URL(target).hostname;
    if (!host.endsWith("aviationweather.gov")) {
      return { statusCode: 403, body: "blocked" };
    }
    const r = await fetch(target);
    const body = await r.text();
    return {
      statusCode: r.status,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": r.headers.get("content-type") || "application/json"
      },
      body
    };
  } catch (e) {
    return { statusCode: 500, body: String(e) };
  }
}
