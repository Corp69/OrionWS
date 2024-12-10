interface DriverError {
    length: number;
    name: string;
    severity: string;
    code: string;
    detail: string;
    schema: string;
    table: string;
    constraint: string;
    file: string;
    line: string;
    routine: string;
}

export interface ErrorBD {
    query: string;
    parameters: (string | number)[];
    driverError: DriverError;
    length: number;
    severity: string;
    code: string;
    detail: string;
    schema: string;
    table: string;
    constraint: string;
    file: string;
    line: string;
    routine: string;
}