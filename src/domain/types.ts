export type Bar={time:number;open:number;high:number;low:number;close:number};
export type Overlay={id:string;semanticKey:string;kind:'line'|'ema';label:string;price?:number;sourceTime?:number;points?:{time:number;value:number}[]};
export type ChartState={overlays:Overlay[];selectedId?:string;history:{overlays:Overlay[];selectedId?:string}[]};
export type Resolution={overlays:Overlay[];message:string};
