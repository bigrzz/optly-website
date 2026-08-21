/**
 * OptlyOuts health Worker.
 * Cron every 15 minutes + GET / for an on-demand check of the live Pages site.
 */
const DEFAULT_SITE = "https://optlyouts.awakyn.ai";

async function check(site) {
  const res = await fetch(site, {
    headers: { "user-agent": "OptlyOuts-Health/1.0" },
    redirect: "follow",
  });
  const html = await res.text();
  const ok =
    res.ok &&
    html.includes("OptlyOuts") &&
    html.includes("scan.js") &&
    !html.includes("Optly – Remove");
  return {
    ok,
    status: res.status,
    bytes: html.length,
    site,
    checkedAt: new Date().toISOString(),
  };
}

export default {
  async scheduled(_event, env) {
    const result = await check(env.SITE_URL || DEFAULT_SITE);
    if (!result.ok) {
      throw new Error(`OptlyOuts health failed: ${JSON.stringify(result)}`);
    }
    console.log("health ok", result);
  },

  async fetch(_request, env) {
    const result = await check(env.SITE_URL || DEFAULT_SITE);
    return Response.json(result, { status: result.ok ? 200 : 503 });
  },
};
