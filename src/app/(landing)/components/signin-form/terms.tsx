import { privacyPolicyLink, termsAndConditionsLink } from '@/app/constants/links';
import Link from 'next/link';

export default function Terms() {
  return (
    <div className="text-xs text-linkedin-low-emphasis font-light sm:text-sm max-w-64 mt-2 text-center">
      By signing in, you accept the{' '}
      <Link href={termsAndConditionsLink} target="_blank" className="text-blue-400 hover:underline">
        Terms and Conditions
      </Link>
      , and the{' '}
      <Link href={privacyPolicyLink} target="_blank" className="text-blue-400 hover:underline">
        Privacy Policy
      </Link>
    </div>
  );
}
