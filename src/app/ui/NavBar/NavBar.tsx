"use client";

import { Dialog } from "@headlessui/react";
import { MinusIcon, ArrowsPointingOutIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Icon from "./Icon";
import Link from "next/link";
import { signOut } from "next-auth/react";

interface INavBar {
  showLogin?: boolean;
  showLogOut?: boolean;
  showDashboard?: boolean;
}

const navigation = [{ name: "Dashboard", href: "/dashboard" }];

const NavBar: React.FC<INavBar> = ({ showLogin, showLogOut, showDashboard }) => {
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Nav bar"
        >
          <Icon height={100} width={100} />

          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>

              <ArrowsPointingOutIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="hidden lg:flex lg:gap-x-12">
            {showDashboard &&
              navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  {item.name}
                </Link>
              ))}
          </div>

          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {showLogin && (
              <Link
                href={"/login"}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Login <span aria-hidden="true">&rarr;</span>
              </Link>
            )}

            {showLogOut && (
              <div
                onClick={() => {
                  signOut();
                }}
                className="text-sm font-semibold leading-6 text-red-500 cursor-pointer"
              >
                Log out <span aria-hidden="true">&rarr;</span>
              </div>
            )}
          </div>
        </nav>

        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Icon height={60} width={60} />
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <MinusIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                {/* <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div> */}
                <div className="py-6">
                  {showLogin && (
                    <Link
                      href={"/Login"}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      Login
                    </Link>
                  )}
                  {showLogOut && (
                    <div
                      onClick={() => {
                        signOut();
                      }}
                      className="text-sm font-semibold leading-6 text-red-500 cursor-pointer"
                    >
                      Log out <span aria-hidden="true">&rarr;</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </>
  );
};

export default NavBar;
