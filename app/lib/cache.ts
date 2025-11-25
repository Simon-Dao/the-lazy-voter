import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";
import { CACHE_EXPIRATION_SECONDS } from "@/state/Constants";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export async function getJSON(url: string) {
  const exists = await redis.exists(url);

  if (exists) {
    const cachedData = await redis.get<string>(url);
    await redis.expire(url, CACHE_EXPIRATION_SECONDS); // RESET EXPIRATION TIME
    return NextResponse.json(
      { data: cachedData },
      { status: 200 }
    );
  }

  return null;
}

export async function getString(url: string) {
  const exists = await redis.exists(url);

  if (exists) {
    const cachedData = await redis.get<string>(url);
    await redis.expire(url, CACHE_EXPIRATION_SECONDS); // RESET EXPIRATION TIME
    if (cachedData && typeof cachedData === "string") {
      return NextResponse.json(
        { data: cachedData },
        { status: 200 }
      );
    }
    return NextResponse.json({ data: null }, { status: 200 });
  }

  return null;
}

export async function setCache(url: string, dataToCache: string, expiration?: number) {
  await redis.set(url, dataToCache, { ex: expiration || CACHE_EXPIRATION_SECONDS });
}
