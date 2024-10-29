import { title, subtitle } from "./components/primitives";

export default function Home() {
  return (
    <>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 bg-black text-white">
        <div className="inline-block max-w-xl text-center justify-center">
          <span className={title()}>Welcome to&nbsp;</span> <br />
          <span className={title({ color: "blue" })}>Your Next Bank,</span>
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
            <li>User-friendly interface for easy navigation</li>
            <li>Personalized financial insights and recommendations</li>
          </ul>
        </div>
      </section>

      <footer className="bg-gray-800 text-white text-center py-4 mt-10">
        <p className="text-sm">
          © {new Date().getFullYear()} Your Next Bank. All rights reserved.
        </p>
        <p className="text-sm">
          <a href="/privacy" className="hover:underline">Privacy Policy</a> |{" "}
          <a href="/terms" className="hover:underline">Terms of Service</a>
        </p>
      </footer>
    </>
  );
}
