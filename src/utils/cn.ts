/**
 * Class Name Utility (cn)
 * Combines clsx and tailwind-merge for clean class handling
 */

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export default cn;

