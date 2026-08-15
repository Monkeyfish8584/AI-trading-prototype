import type {Interpretation} from './schema';
export interface CommandInterpreter{interpret(text:string):Promise<Interpretation>}
export interface LlmInterpreter extends CommandInterpreter{}
export class RuleInterpreter implements CommandInterpreter{async interpret(raw:string):Promise<Interpretation>{
 const text=raw.trim().toLowerCase();
 if(/^(mark|show|add) (the )?(current )?monday(?:'s)? open$/.test(text)||text==='monday open')return{kind:'command',command:{type:'ADD_MONDAY_OPEN',week:'current'}};
 if(/previous monday open|last monday open/.test(text))return{kind:'command',command:{type:'ADD_MONDAY_OPEN',week:'previous'}};
 if(/previous day range|prior day range/.test(text))return{kind:'command',command:{type:'ADD_PREVIOUS_DAY_RANGE'}};
 if(/previous week range|prior week range/.test(text))return{kind:'command',command:{type:'ADD_PREVIOUS_WEEK_RANGE'}};
 if(/ny midnight( open)?/.test(text))return{kind:'command',command:{type:'ADD_NY_MIDNIGHT_OPEN',tradingDate:'current_chart_date'}};
 if(/^(add|show|mark) ema ?50$|^ema ?50$/.test(text))return{kind:'command',command:{type:'ADD_EMA',period:50,source:'close'}};
 const m=text.match(/^(?:add|mark) (?:a )?(?:horizontal )?line (?:at )?(-?\d+(?:\.\d+)?)(?: (?:labelled|labeled) (.+))?$/);if(m)return{kind:'command',command:{type:'ADD_HORIZONTAL_LINE',userPrice:Number(m[1]),...(m[2]?{label:m[2]}:{})}};
 if(text==='clear overlays'||text==='clear')return{kind:'command',command:{type:'CLEAR_OVERLAYS'}};if(text==='undo')return{kind:'command',command:{type:'UNDO'}};
 return text?{kind:'unsupported',message:'That command is not supported in v0.1.'}:{kind:'clarification_required',message:'Enter a chart command.'};
}}
