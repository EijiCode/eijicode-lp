import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactRequestBody {
  name: string;
  email: string;
  company?: string;
  message: string;
}

/* Rate limit: 3 sends per IP per rolling 24h. In-memory — resets on
   restart/redeploy, and is per-instance on serverless hosting. */
const RATE_LIMIT = 3;
const WINDOW_MS = 24 * 60 * 60 * 1000;
const submissionLog = new Map<string, number[]>();

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

function recentSubmissions(key: string): number[] {
  const now = Date.now();
  const recent = (submissionLog.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  submissionLog.set(key, recent);
  return recent;
}

function pruneLog() {
  if (submissionLog.size < 500) return;
  const now = Date.now();
  for (const [key, times] of submissionLog) {
    if (times.every((t) => now - t >= WINDOW_MS)) submissionLog.delete(key);
  }
}

export async function POST(request: Request) {
  let body: ContactRequestBody;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "リクエストの形式が正しくありません" },
      { status: 400 }
    );
  }

  const { name, email, company, message } = body;

  if (!name || typeof name !== "string" || name.trim() === "") {
    return NextResponse.json(
      { error: "お名前は必須です" },
      { status: 400 }
    );
  }

  if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "有効なメールアドレスを入力してください" },
      { status: 400 }
    );
  }

  if (!message || typeof message !== "string" || message.trim() === "") {
    return NextResponse.json(
      { error: "お問い合わせ内容は必須です" },
      { status: 400 }
    );
  }

  pruneLog();
  const clientIp = getClientIp(request);
  if (recentSubmissions(clientIp).length >= RATE_LIMIT) {
    return NextResponse.json(
      { error: "1日の送信回数の上限に達しました。明日以降にあらためてお試しください。" },
      { status: 429 }
    );
  }

  const toEmail = process.env.CONTACT_TO_EMAIL;
  if (!toEmail) {
    console.error("CONTACT_TO_EMAIL environment variable is not set");
    return NextResponse.json(
      { error: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  }

  const emailBody = [
    `お名前: ${name}`,
    `メールアドレス: ${email}`,
    company ? `会社名: ${company}` : null,
    "",
    "お問い合わせ内容:",
    message,
  ]
    .filter((line) => line !== null)
    .join("\n");

  try {
    await resend.emails.send({
      from: "EijiCode <info@eijicode.com>",
      to: toEmail,
      subject: `【EijiCode】お問い合わせ: ${name}様`,
      text: emailBody,
    });

    submissionLog.set(clientIp, [...recentSubmissions(clientIp), Date.now()]);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Failed to send email:", error);
    return NextResponse.json(
      { error: "メールの送信に失敗しました。しばらく経ってから再度お試しください。" },
      { status: 500 }
    );
  }
}
