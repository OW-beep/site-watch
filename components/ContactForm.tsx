"use client";
import { useState} from "react";
import { CONTACT_EMAIL, FORMSPREE_ID} from "@/lib/site";

const field = "w-full border-2 border-sumi bg-white px-3 py-2 text-sm font-normal mt-1";

const KINDS = [
"記事内容の誤り・ご指摘",
"記事内容へのご質問",
"稽古・ツールについてのご感想",
"取材・お仕事のご相談",
"その他",
];

export default function ContactForm() {
const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
e.preventDefault();
const form = e.currentTarget;
const data = new FormData(form);
// FormspreeのIDが設定されていればフォーム送信、なければメール作成画面を開く
if (!FORMSPREE_ID) {
const subject = `お問い合わせ:${String(data.get("kind") || "その他")}`;
const body = [
`お名前:${String(data.get("name") || "")}`,
`メールアドレス:${String(data.get("email") || "")}`,
"",
String(data.get("message") || ""),
].join("\n");
window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
setStatus("sent");
return;
}
setStatus("sending");
try {
const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
method: "POST", body: data, headers: { Accept: "application/json"},
});
if (res.ok) { setStatus("sent"); form.reset();} else setStatus("error");
} catch { setStatus("error");}
}

if (status === "sent") {
return (
<div className="fuda p-6 text-sm leading-relaxed">
{FORMSPREE_ID
? "送信しました。内容を確認のうえ、ご連絡いたします。"
: "メール作成画面を開きました。内容を確認して、そのまま送信してください。開かない場合は、"}
{!FORMSPREE_ID && CONTACT_EMAIL && (
<a href={`mailto:${CONTACT_EMAIL}`} className="underline font-bold">{CONTACT_EMAIL}</a>
)}
{!FORMSPREE_ID && " まで直接お送りください。"}
</div>
);
}

return (
<form onSubmit={onSubmit} className="space-y-4">
<label className="block text-sm font-bold">お名前
<input name="name" required className={field} autoComplete="name" />
</label>
<label className="block text-sm font-bold">メールアドレス
<input name="email" type="email" required className={field} autoComplete="email" />
</label>
<label className="block text-sm font-bold">お問い合わせ種別
<select name="kind" className={field} defaultValue={KINDS[0]}>
{KINDS.map((k) => <option key={k} value={k}>{k}</option>)}
</select>
</label>
<label className="block text-sm font-bold">お問い合わせ内容
<textarea name="message" required rows={6} className={field} />
</label>
<button disabled={status === "sending"} className="stamp px-6 py-2 text-lg bg-white hover:bg-marker disabled:opacity-40">
{status === "sending"? "送信中…": "送信する"}
</button>
{status === "error" && <p className="text-sm text-shu">送信に失敗しました。時間をおいて再度お試しいただくか、{CONTACT_EMAIL} まで直接お送りください。</p>}
<p className="text-xs text-sumi-soft leading-relaxed">
いただいた個人情報は、お問い合わせへの回答以外の目的では利用しません。
詳しくは<a href="/privacy" className="underline">プライバシーポリシー</a>をご覧ください。返信までに数日いただく場合があります。
</p>
</form>
);
}
