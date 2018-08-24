interface Symbol {
    toString(): string;

    valueOf(): symbol;
}

interface SymbolConstructor {
    readonly prototype: Symbol;

    (description?: string | number): symbol;

    for(key: string): symbol;

    keyFor(sym: symbol): string | undefined;

    readonly iterator: symbol;
}

declare const Symbol: SymbolConstructor;

interface Iterator<T> {
    next(value?: any): IteratorResult<T>;
}

interface IteratorResult<T> {
    done: boolean;
    value: T;
}

interface Iterable<T> {
    [Symbol.iterator](): Iterator<T>;
}

interface IterableIterator<T> extends Iterator<T> {
    [Symbol.iterator](): IterableIterator<T>;
}