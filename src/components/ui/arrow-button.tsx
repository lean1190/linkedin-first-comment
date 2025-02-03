import { Button } from './button';

const Arrow = ({ right }: { right: boolean }) => (
  <span
    aria-hidden="true"
    className={`inline-block translate-x-0 ${right ? 'group-hover:translate-x-1' : 'group-hover:-translate-x-1'} transition-transform ease-in-out duration-200`}
  >
    {right ? ' →' : '← '}
  </span>
);

export const ArrowButton = ({ text, right = true }: { text: string; right?: boolean }) => (
  <Button size="sm" className="group">
    {!right ? <Arrow right={false} /> : null}
    {text}
    {right ? <Arrow right={true} /> : null}
  </Button>
);
