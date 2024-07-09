export class Cell {
    constructor(
        public value: Op | bigint = Op.Empty,
        public dirty: boolean = false
    ) {}

    toString(): string {
        if (typeof this.value === 'bigint') {
            return this.value.toString();
        } else if (this.value === Op.Empty) {
            return '\u00a0';
        } else {
            return this.value;
        }
    }
}

export enum Op {
    Empty = ' ',
    Left = '<',
    Right = '>',
    Up = '^',
    Down = 'v',
    Add = '+',
    Sub = '-',
    Mul = '*',
    Div = '/',
    Mod = '%',
    Warp = '@',
    Eq = '=',
    NEq = '#',
    Solve = 'S',
    A = 'A',
    B = 'B',
}

export const OP_SYMBOLS = new Set(Object.values(Op) as string[]);
