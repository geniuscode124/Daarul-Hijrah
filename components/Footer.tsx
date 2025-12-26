import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const navigation = {
  company: [
    { name: "About Us", href: "#" },
    { name: "Contact", href: "#" },
    { name: "FAQ", href: "#" },
  ],
  legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-primary text-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
                 <div className="relative h-14 w-14 overflow-hidden rounded-xl shadow-sm bg-white/5">
                    <Image 
                        src="/logo.png" 
                        alt="Daarul-Hijrah Logo" 
                        fill 
                        className="object-cover"
                    />
                 </div>
                 <span className="font-serif text-2xl font-bold text-accent">Daarul-Hijrah</span>
            </div>
            <p className="text-sm leading-6 text-gray-300 max-w-xs">
              Your trusted source for accessible and authentic Islamic knowledge.
            </p>
            <div className="pt-4 text-sm leading-6 text-gray-300">
               <p>5 Rufus Banjo St, Idimu, Lagos 102213</p>
               <p className="mt-1 text-gray-400">Blazers School, Beside Gidado Mosque</p>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-white">Company</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <Link href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">Legal</h3>
                <ul role="list" className="mt-6 space-y-4">
                    {navigation.legal.map((item) => (
                        <li key={item.name}>
                        <Link href={item.href} className="text-sm leading-6 text-gray-300 hover:text-white transition-colors">
                            {item.name}
                        </Link>
                        </li>
                    ))}
                </ul>
              </div>
            </div>
            <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-white">Subscribe to our newsletter</h3>
                <p className="mt-2 text-sm leading-6 text-gray-300">
                    Receive updates on new courses and special offers.
                </p>
                <form className="mt-6 sm:flex sm:max-w-md gap-x-4">
                    <label htmlFor="email-address" className="sr-only">
                        Email address
                    </label>
                    <div className="relative grow">
                        <input
                            type="email"
                            name="email-address"
                            id="email-address"
                            autoComplete="email"
                            required
                            className="w-full min-w-0 appearance-none rounded-full border-0 bg-white/10 px-4 py-2 text-base text-white ring-1 ring-inset ring-white/10 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-accent sm:text-sm sm:leading-6"
                            placeholder="Enter your email"
                        />
                         <button
                            type="submit"
                            className="absolute inset-y-0 right-0 flex items-center pr-1.5"
                        >
                             <div className="bg-accent rounded-full p-1.5 hover:bg-accent/90 transition-colors cursor-pointer">
                                <ArrowRight className="h-4 w-4 text-white" />
                             </div>
                        </button>
                    </div>
                </form>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-gray-400">
            &copy; 2025 Daarul-Hijrah. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
