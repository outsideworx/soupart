export async function redirect(context: any, originUrl: string) {
    const authToken = context.env.APP_CLIENTS_SOUPART_TOKEN;
    const requestHeaders = new Headers(context.request.headers);
    if (authToken) {
        requestHeaders.set("X-Caller-Id", "come-in-and-find-out");
        requestHeaders.set("X-Auth-Token", authToken);
    }

    const requestUrl = new URL(context.request.url);
    const response = await fetch(originUrl + requestUrl.search, {
        method: context.request.method,
        headers: requestHeaders,
        body: context.request.method !== "GET" && context.request.method !== "HEAD"
            ? await context.request.text()
            : undefined,
        redirect: "follow"
    });

    const responseHeaders = new Headers();
    response.headers.forEach((value, key) => {
        responseHeaders.set(key, value);
    });
    return new Response(response.body, {
        status: response.status,
        headers: responseHeaders
    });
}