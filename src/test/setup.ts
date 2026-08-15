import '@testing-library/jest-dom/vitest';
Object.defineProperty(globalThis,'crypto',{value:{randomUUID:(()=>{let n=0;return()=>`overlay-${++n}`})()}});
class ResizeObserver{observe(){}unobserve(){}disconnect(){}}Object.defineProperty(globalThis,'ResizeObserver',{value:ResizeObserver});
