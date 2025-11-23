import { NextResponse } from "next/server";
import puppeteer from "puppeteer";
import * as cheerio from "cheerio";

export async function GET(request: Request) {
  return await getCandidateIdFromName(request);
}

//TODO: Move this code to an EC2 instance with puppeteer installed!
export async function getCandidateIdFromName(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");
  const state = searchParams.get("state");

  try {
    const browser = await puppeteer.launch({
      headless: false, // <-- important
      args: ["--disable-blink-features=AutomationControlled"],
    });
    const page = await browser.newPage();

    // Navigate the page to a URL.
    await page.goto("https://www.congress.gov/members");

    // Open the search menu using the keyboard.
    for (let i = 0; i < 0; i++) {
      await page.keyboard.press("Tab");
    }
    await page.keyboard.type(name || "");
    await page.keyboard.press("Enter");
    await page.waitForNavigation();
    const members = await page.$$eval("#main > ol > li.expanded", els => els.map(el => el.innerHTML.trim()));
    
    let congress_id = "";

    for(const member of members) {
      const $ = cheerio.load(member);
      const memberState = $("div.quick-search-member > div.member-profile.member-image-exists > span:nth-child(1) > span").text().trim();
      if(memberState !== state) {
        continue;
      }
      const href = $(".result-heading > a").attr("href")?.trim();
      const tokens = href?.split("/");

      congress_id = tokens?.[3]?.split('?')?.[0] ?? "";
    }
    await browser.close();

    return NextResponse.json({ congress_id }, { status: 200 });
  } catch (error) {
    console.error("Error fetching candidate data:", error);
    return NextResponse.json(
      { error: "Failed to fetch candidate data" },
      { status: 500 }
    );
  }
}
