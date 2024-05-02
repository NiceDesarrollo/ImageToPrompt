"use client";
import { useSession } from "next-auth/react";
import { products } from "../../products";

function App() {
  const { data: userSession } = useSession();

  const handlePay = async (product, userSession) => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      body: JSON.stringify({
        ...product,
        user: userSession,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const session = await res.json();

    if (session.url) {
      window.location = session.url;
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-transparent to-transparent pb-12 pt-20 sm:pb-16 sm:pt-32 lg:pb-24 xl:pb-32 xl:pt-40">
      <div className="relative z-10">
        <div className="absolute inset-x-0 top-1/2 -z-10 flex -translate-y-1/2 justify-center overflow-hidden [mask-image:radial-gradient(50%_45%_at_50%_55%,white,transparent)]">
          <svg
            className="h-[60rem] w-[100rem] flex-none stroke-blue-600 opacity-20"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="e9033f3e-f665-41a6-84ef-756f6778e6fe"
                width="200"
                height="200"
                x="50%"
                y="50%"
                patternUnits="userSpaceOnUse"
                patternTransform="translate(-100 0)"
              >
                <path d="M.5 200V.5H200" fill="none"></path>
              </pattern>
            </defs>
            <svg x="50%" y="50%" className="overflow-visible fill-blue-50">
              <path
                d="M-300 0h201v201h-201Z M300 200h201v201h-201Z"
                strokeWidth="0"
              ></path>
            </svg>
            <rect
              width="100%"
              height="100%"
              strokeWidth="0"
              fill="url(#e9033f3e-f665-41a6-84ef-756f6778e6fe)"
            ></rect>
          </svg>
        </div>
      </div>
      <div className="px-44 relative z-20 mx-auto max-w-7xl ">
        <section className="flex items-center justify-center mt-10 pb-10">
          <div
            className="p-4 sm:px-10 flex flex-col justify-center items-center text-base h-100vh mx-auto"
            id="pricing"
          >
            <h3 className="text-5xl font-semibold text-center flex gap-2 justify-center mb-10">
              Pay once, use forever
            </h3>
            <div className="isolate mx-auto grid max-w-md grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-2">
              <div className="ring-2 ring-blue-600 rounded-3xl p-8 xl:p-10">
                <div className="flex items-center justify-between gap-x-4">
                  <h3
                    id="tier-extended"
                    className="text-blue-600 text-2xl font-semibold leading-8"
                  >
                    Full
                  </h3>
                  <p className="rounded-full bg-blue-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-blue-600">
                    Most popular
                  </p>
                </div>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="line-through text-2xl font-sans text-gray-500/70">
                    $1500
                  </span>
                  <span className="text-5xl font-bold tracking-tight text-gray-900">
                    $10
                  </span>
                </p>
                <a
                  aria-describedby="tier-extended"
                  className="bg-blue-600 text-white shadow-sm hover:bg-blue-500 mt-6 block rounded-md py-2 px-3 text-center text-base font-medium leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 cursor-pointer"
                  target="_blank"
                  onClick={() =>
                    handlePay(
                      {
                        id: 1,
                        name: "Get life access",
                        price: 1000,
                        image: "https://via.placeholder.com/150",
                      },
                      userSession?.user
                    )
                  }
                >
                  Buy now
                </a>
                <ul
                  role="list"
                  className="mt-8 space-y-3 text-sm leading-6 text-gray-600 xl:mt-10"
                >
                  <li className="flex gap-x-3 text-base">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="h-6 w-5 flex-none text-blue-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    Lifetime access
                  </li>
                  <li className="flex gap-x-3 text-base">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="h-6 w-5 flex-none text-blue-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    24/7 support
                  </li>
                  <li className="flex gap-x-3 text-base">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                      className="h-6 w-5 flex-none text-blue-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    Use your own OpenAI key
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}

export default App;
