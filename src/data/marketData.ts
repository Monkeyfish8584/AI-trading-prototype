import type {Bar} from '../domain/types';
export type SymbolMeta={symbol:string;zone:string;sessionHour:number;holidays:string[]};
export interface MarketDataProvider{bars(symbol:string):Bar[];meta(symbol:string):SymbolMeta}
const date=(s:string)=>Math.floor(Date.parse(s)/1000);
function generate(symbol:string,base:number,missingMidnight=false):Bar[]{const out:Bar[]=[];let i=0;for(let d=new Date('2024-01-02T00:00:00Z');d<=new Date('2024-03-15T23:00:00Z');d=new Date(d.getTime()+3600000)){const day=d.getUTCDay();if(day===0||day===6)continue;if(d.toISOString().startsWith('2024-01-15'))continue;if(missingMidnight&&d.toISOString()==='2024-03-15T04:00:00.000Z')continue;const open=base+i*.1;out.push({time:date(d.toISOString()),open,high:open+1,low:open-1,close:open+.5});i++}return out}
const datasets={AAPL:generate('AAPL',100),MSFT:generate('MSFT',200),MISSING:generate('MISSING',300,true)};
export class StaticMarketDataProvider implements MarketDataProvider{bars(symbol:string){const bars=datasets[symbol as keyof typeof datasets];if(!bars)throw Error('Unknown symbol');validateBars(bars);return bars}meta(symbol:string){return{symbol,zone:'America/New_York',sessionHour:9,holidays:['2024-01-15']}}}
export function validateBars(bars:Bar[]){let last=-Infinity;for(const b of bars){if(b.time<=last||b.low>Math.min(b.open,b.close)||b.high<Math.max(b.open,b.close)||b.low>b.high)throw Error('Invalid OHLC fixture');last=b.time}}
