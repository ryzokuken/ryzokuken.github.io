import { MessageFormat } from 'npm:messageformat@next'

const decoder = new TextDecoder("utf-8");
const msg = decoder.decode(Deno.readFileSync(Deno.args[0]));

const mf = new MessageFormat(msg, Deno.args[1].split(','));
console.log(mf.format(JSON.parse(Deno.args[2] ?? '')));