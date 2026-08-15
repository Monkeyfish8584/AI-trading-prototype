import {z} from 'zod';
const strict=<T extends z.ZodRawShape>(shape:T)=>z.object(shape).strict();
export const CommandSchema=z.discriminatedUnion('type',[
 strict({type:z.literal('ADD_MONDAY_OPEN'),week:z.enum(['current','previous'])}),
 strict({type:z.literal('ADD_PREVIOUS_DAY_RANGE')}),strict({type:z.literal('ADD_PREVIOUS_WEEK_RANGE')}),
 strict({type:z.literal('ADD_NY_MIDNIGHT_OPEN'),tradingDate:z.literal('current_chart_date')}),
 strict({type:z.literal('ADD_EMA'),period:z.literal(50),source:z.literal('close')}),
 strict({type:z.literal('ADD_HORIZONTAL_LINE'),userPrice:z.number().finite(),label:z.string().max(80).optional()}),
 strict({type:z.literal('REMOVE_OVERLAY'),target:strict({overlayId:z.string().optional(),semanticKey:z.string().optional()}).refine(x=>!!x.overlayId||!!x.semanticKey)}),
 strict({type:z.literal('CLEAR_OVERLAYS')}),strict({type:z.literal('UNDO')})]);
export type Command=z.infer<typeof CommandSchema>;
export type Interpretation={kind:'command';command:Command}|{kind:'clarification_required'|'unsupported';message:string};
export const validateCommand=(input:unknown)=>CommandSchema.safeParse(input);
