import express from "express";
import { chromium } from "playwright";

const app = express();
app.use(express.json());

let browser;

app.post("/open", async (req, res) => {
  const { url } = req.body;

  if (!browser) {
    browser = await chromium.launch({ headless: false });
  }

  const page = await browser.newPage();
  await page.goto(url);

  res.json({ status: "opened", url });
});

app.post("/close", async (_, res) => {
  if (browser) {
    await browser.close();
    browser = null;
  }
  res.json({ status: "closed" });
});

app.listen(3001, () => {
  console.log("Playwright agent listening on port 3001");
});

