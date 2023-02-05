const DEFAULT_SERVER = "https://paste.0xlogn.dev";

export interface Options {
    server?: string;
    raw?: boolean;
    contentType?: string;
}

interface HasteAPIResult {
    key: string;
}

interface ResolvedOptions extends RequestInit {
    body: string;
    json: true;
    headers: Headers;
}

/** Replaces (npm:url).resolve. Shown in the deprecation notice. */
function resolve(from: string, to: string) {
    const resolvedUrl = new URL(to, new URL(from, "resolve://"));
    if (resolvedUrl.protocol === "resolve:") {
        // `from` is a relative URL.
        const { pathname, search, hash } = resolvedUrl;
        return pathname + search + hash;
    }
    return resolvedUrl.toString();
}

export default async function createPaste(content: string, options: Options = {}, fetchOptions: RequestInit = {}) {
    if (typeof content !== "string") return Promise.reject(new Error(`"content" was not a string. Got ${typeof content}.`));

    if (content === "") return Promise.reject(new Error('"content" was empty.'));

    const hasteServer = options.server ?? DEFAULT_SERVER;
    const postUrl = resolve(hasteServer, "documents");

    const resolvedFetchOptions: ResolvedOptions = Object.assign(
        {
            body: content,
            json: true as const,
            headers: new Headers(),
            method: 'post'
        },
        fetchOptions
    );

    // TODO: Does Hastebin really rely on the content-type header at all? Maybe this is useless.
    resolvedFetchOptions.headers.append("Content-Type", options.contentType ?? "text/plain");

    const {key} = (await fetch(postUrl, resolvedFetchOptions).then((res) => res.json())) as HasteAPIResult;

    if (!key) throw new Error("Haste did not return an actual key!");

    if (options ? options.raw : null) return resolve(hasteServer, `raw/${key}`);
    else return resolve(hasteServer, key);
}
