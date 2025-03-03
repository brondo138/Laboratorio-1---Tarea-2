import * as readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';

export const rd = readline.createInterface({input, output});