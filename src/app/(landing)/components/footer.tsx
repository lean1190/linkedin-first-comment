import { IconBrandLinkedin } from '@tabler/icons-react';
import Image from 'next/image';
import Link from 'next/link';
import {
  aboutLink,
  firstCommentLink,
  limitationsLink,
  linkedinProfileLink,
  privacyPolicyLink,
  termsAndConditionsLink
} from '@/lib/constants/links';

export default function Footer() {
  return (
    // The markup for regions and roles is redundant, but this is a transition period, and this markup is the most robust.
    // biome-ignore lint/a11y/useSemanticElements: https://dequeuniversity.com/rules/axe/4.9/landmark-one-main?application=Vercel%20Toolbar
    <footer className="bg-black" role="contentinfo">
      <div className="mx-auto w-full max-w-(--breakpoint-xl) p-4 py-6 lg:py-8">
        <div className="flex flex-col items-center md:items-start md:flex-row md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link
              href={firstCommentLink}
              className="flex justify-center items-center mb-8 md:justify-start"
            >
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
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © {new Date().getFullYear()}{' '}
            <Link target="_blank" href={firstCommentLink} className="hover:underline">
              First Comment™
            </Link>
            . All Rights Reserved.
          </span>
          <div>
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
