import {
  aboutLink,
  leanvilasLink,
  limitationsLink,
  linkedinProfileLink,
  privacyPolicyLink,
  termsAndConditionsLink
} from '@/lib/constants/links';
import { IconBrandLinkedin } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link href={leanvilasLink} className="flex items-center">
              <span className="flex items-center gap-2 self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                <Image
                  alt="First Comment Logo"
                  className="w-8 h-8 max-w-8 max-h-8 min-h-8 min-w-8"
                  src="/logo.png"
                  overrideSrc="/logo.png"
                  width={32}
                  height={32}
                />
                First Comment
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Resources
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link
                    target="_blank"
                    href="mailto:me@leanvilas.com?subject=First Comment: I have a question"
                    className="hover:underline"
                  >
                    Contact
                  </Link>
                </li>
                <li className="mb-4">
                  <Link target="_blank" href={aboutLink} className="hover:underline">
                    About
                  </Link>
                </li>
                <li className="mb-4">
                  <Link target="_blank" href={limitationsLink} className="hover:underline">
                    Limitations
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Follow us
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link target="_blank" href={linkedinProfileLink} className="hover:underline ">
                    LinkedIn
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                Legal
              </h2>
              <ul className="text-gray-500 dark:text-gray-400 font-medium">
                <li className="mb-4">
                  <Link target="_blank" href={privacyPolicyLink} className="hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link target="_blank" href={termsAndConditionsLink} className="hover:underline">
                    Terms &amp; Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © {new Date().getFullYear()}{' '}
            <Link target="_blank" href={leanvilasLink} className="hover:underline">
              First Comment™
            </Link>
            . All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0">
            <Link
              target="_blank"
              href={linkedinProfileLink}
              className="text-gray-500 hover:text-gray-900 dark:hover:text-white"
            >
              <IconBrandLinkedin />
              <span className="sr-only">LinkedIn Page</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
