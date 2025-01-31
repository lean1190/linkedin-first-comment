import Link from 'next/link';

export default function Terms() {
  return (
    <div className="text-xs text-linkedin-low-emphasis font-light sm:text-sm max-w-64 mt-2 text-center">
      By signing in, you accept the{' '}
      <Link
        href="https://docs.google.com/document/d/1KDnu3je8eVxjDMYLc4lIMOevS8woJswO9QMa3mr_USY/edit?usp=sharing"
        target="_blank"
        className="text-blue-400 hover:underline"
      >
        Terms and Conditions
      </Link>
      , and the{' '}
      <Link
        href="https://docs.google.com/document/d/1xjg0vza2iiA4w3WO9kPcK9PbYPFFRPWNQVCG1VqOa-0/edit?usp=sharing"
        target="_blank"
        className="text-blue-400 hover:underline"
      >
        Privacy Policy
      </Link>
    </div>
  );
}
