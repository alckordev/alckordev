import { NextResponse } from "next/server";
import z from "zod/v4";

const schema = z.object({
  email: z.email(),
  status: z.enum([
    "subscribed",
    "unsubscribed",
    "cleaned",
    "pending",
    "transactional",
  ]),
});

const MAILCHIMP_API_KEY = process.env.MAILCHIMP_API_KEY!;
const MAILCHIMP_SERVER = process.env.MAILCHIMP_SERVER!;
const MAILCHIMP_LIST_ID = process.env.MAILCHIMP_LIST_ID!;

const getAuthHeader = () => {
  const token = Buffer.from(`anystring:${MAILCHIMP_API_KEY}`).toString(
    "base64",
  );
  return `Basic ${token}`;
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input", details: parsed.error.issues },
        { status: 400 },
      );
    }

    const { email: email_address, status } = parsed.data;

    const fetched = await fetch(
      `https://${MAILCHIMP_SERVER}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members?skip_merge_validation=true`,
      {
        method: "POST",
        headers: {
          Authorization: getAuthHeader(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email_address,
          status,
        }),
      },
    );

    const data = await fetched.json();

    if (!fetched.ok) {
      return NextResponse.json(
        { error: "Mailchimp error", ...data },
        { status: fetched.status },
      );
    }

    return NextResponse.json(
      {
        status: 200,
        email: data.email_address,
        id: data.id,
      },
      { status: 200 },
    );
  } catch (err) {
    console.error("subscribe error:", err);
    return NextResponse.json(
      { error: "Internal error", details: String(err) },
      { status: 500 },
    );
  }
}
