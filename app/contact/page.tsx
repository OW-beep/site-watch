import ContactForm from "@/components/ContactForm";

export const metadata = { title: "お問い合わせ" };

export default function ContactPage() {
  return (
    <main className="max-w-2xl mx-auto px-5 py-12">
      <h1 className="font-display text-4xl mb-4"><span className="marker">お問い合わせ</span></h1>
      <p className="text-sm leading-loose mb-8">記事内容へのご指摘やご質問は、下記からお送りください。内容を確認のうえ、ご連絡いたします。</p>
      <ContactForm />
    </main>
  );
}
