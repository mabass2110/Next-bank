import { title, subtitle } from "./components/primitives";

export default function Home() {
  return (
    <>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-xl text-center justify-center">
          <span className={title()}>Welcome to&nbsp;</span>
          <span className={title()}>Your Bank</span>
          <br />
          <span className={title()}>
            Your trusted partner in financial management.
          </span>
          <div className={subtitle({ class: "mt-4" })}>
            Secure, easy, and convenient banking at your fingertips.
          </div>
        </div>


        
        <div className="mt-10">
          <h2 className="text-2xl font-bold">App Features</h2>
          <ul className="list-disc list-inside mt-4">
            <li>24/7 access to your accounts</li>
            <li>Secure transactions and data protection</li>
            <li>Instant deposits and withdrawals</li>
            <li>Detailed transaction history and analytics</li>
          </ul>
        </div>
      </section>
    </>
  );
}
