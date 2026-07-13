import http from "node:http";

const port = Number(process.env.PORT ?? 8787);
const dashscopeApiKey = process.env.DASHSCOPE_API_KEY;
const qwenModel = process.env.QWEN_MODEL ?? "qwen-plus";
const dashscopeUrl = "https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions";

function sendJson(response, status, body) {
  response.writeHead(status, {
    "Access-Control-Allow-Origin": process.env.ALLOWED_ORIGIN ?? "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json; charset=utf-8",
  });
  response.end(JSON.stringify(body));
}

async function readJson(request) {
  const chunks = [];
  for await (const chunk of request) {
    chunks.push(chunk);
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

const server = http.createServer(async (request, response) => {
  if (request.method === "OPTIONS") {
    sendJson(response, 204, {});
    return;
  }

  if (request.method !== "POST" || request.url !== "/api/qwen-chat") {
    sendJson(response, 404, { error: "Not found" });
    return;
  }

  if (!dashscopeApiKey) {
    sendJson(response, 500, { error: "Missing DASHSCOPE_API_KEY" });
    return;
  }

  try {
    const body = await readJson(request);
    const messages = [
      ...(body.messages ?? []),
      {
        role: "system",
        content: `Structured platform context: ${JSON.stringify(body.context ?? {})}`,
      },
    ];

    const upstream = await fetch(dashscopeUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${dashscopeApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: body.model ?? qwenModel,
        messages,
      }),
    });

    const data = await upstream.json();
    if (!upstream.ok) {
      sendJson(response, upstream.status, { error: data.error?.message ?? "Qwen request failed" });
      return;
    }

    sendJson(response, 200, {
      text: data.choices?.[0]?.message?.content ?? "",
    });
  } catch (error) {
    sendJson(response, 500, { error: error instanceof Error ? error.message : "Unknown error" });
  }
});

server.listen(port, () => {
  console.log(`Qwen proxy listening on http://localhost:${port}/api/qwen-chat`);
});
