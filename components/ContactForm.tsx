"use client";
import { useState } from "react";
import { CONTACT_EMAIL, FORMSPREE_ID } from "@/lib/site";

const field = "w-full border-2 border-sumi bg-white px-3 py-2 text-sm";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  if (!FORMSPREE_ID) {
    return (
      <div className="fuda p-6 text-sm leading-relaxed">
        <p>お問い合わせは、下記のメールアドレスまでお送りください。内容を確認のうえ、ご連絡いたします。</p>
        {CONTACT_EMAIL && (
          <p className="mt-3 font-bold text-lg">
            <a href={`mailto:${CONTACT_EMAIL}`} className="underline">{CONTACT_EMAIL}</a>
          </p>
        )}
        <p className="mt-3 text-xs text-sumi-soft">返信までに数日いただく場合があります。</p>
      </div>
    );
  }
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST", body: new FormData(form), headers: { Accept: "application/json" },
      });
      if (res.ok) { setStatus("sent"); form.reset(); } else setStatus("error");
    } catch { setStatus("error"); }
  }
  if (status === "sent") return <div className="fuda p-6 text-sm">送信しました。確認のうえ、ご連絡いたします。</div>;
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <label className="block text-sm font-bold">お名前<input name="name" required className={field} /></label>
      <label className="block text-sm font-bold">メールアドレス<input name="email" type="email" required className={field} /></label>
      <label className="block text-sm font-bold">お問い合わせ内容<textarea name="message" required rows={6} className={field} /></label>
      <button disabled={status === "sending"} className="stamp px-6 py-2 text-lg bg-white hover:bg-marker">
        {status === "sending" ? "送信中…" : "送信する"}
      </button>
      {status === "error" && <p className="text-sm text-shu">送信に失敗しました。時間をおいて再度お試しください。</p>}
    </form>
  );
}
