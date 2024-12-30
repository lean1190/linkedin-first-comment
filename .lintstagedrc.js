import { relative } from 'path';

const buildEslintCommand = (filenames) => {
    const fileCommands = filenames
        .map((f) => relative(process.cwd(), f))
        .join(' --file ');

    return `next lint --fix --file ${fileCommands}`;
};

const config = {
    '*.{js,jsx,ts,tsx}': [buildEslintCommand],
    '*.{ts,tsx}': [() => 'npx tsc --skipLibCheck --noEmit']
};

export default config;
