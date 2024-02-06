interface Window {
    isEnglish: boolean;
    language: string;
    identity: string;
    authorities: Set<string>;
    isSuperAdmin: boolean;
    router: Router;
    commonUtils: CommonUtils;
    highcharts: any
}

declare interface L {
    zh: string;
    en: string;
}

declare class HttpResult<T extends any> {
    success: boolean;
    message: string;
    errorCode: number;
    action: number;
    value: T;
}

declare interface Identity {
    userId: string;
    userName: string;
    serviceId: string;
    corpId: string;
    corpLogo: string?;
    languageId: string;
    languageCode: string;
    superAdmin: boolean;
    logined: boolean;
    ide: string;
    authorityCodes: Map<string>;
}

declare interface Utils {
    emptyGuid: string;
    newGuid(): string;
    getHashCode(str: string): number;
    cloneArray(dest: Array<any>, source: Array<any>, quote?: boolean);
    clearArray(array: Array<any>): void;
    isEmptyArray<T>(arr: T[]): boolean;
    arrayExchange<T>(arr: T[], sourceIndex: number, destIndex: number): void;
    isEmptyString(str: any): boolean;
    isEmptyGuid(str: any): boolean;
    dateFormat(date: any, format: string): string;
    getDate(year: number, month: number, day: number): Date;
    getCurrentDate(): Date;
    addDays(date: Date, day: number): Date;
    addHours(date: Date, hour: number): Date;
    addMinutes(date: Date, minutes: number): Date;
    addSeconds(date: Date, second: number): Date;
    numberFormat(num: any, comma?: boolean, defaultToEmpty?: boolean): string;
    removeHtml(text: any): string;
    displayBool(val: boolean): string;
    getBoolEnumObjects(): any[];
    displayNeed(val: boolean): string;
    displayAllow(val: boolean): string;
    stringFormat(template: string, ...args: string[]): string;
    toString(val: any): string;
    langText(zhText: string, enText: string): string;
}

declare interface DialogUtils {
    notification(opts: { title?: string, message: string, type: 'success' | 'warning' | 'info' | 'error' });
    confirm(opts: { title?: string, message: string, onSure: () => void, onCancel?: () => void });
    // dailogConfirm: (message: string, onSure: () => void) => void;
    // showLoading: () => void;
    // closeLoading: () => void;
    // executeLoading: <T>(loading: boolean, call: () => Promise<T>) => Promise<T>;
    // notify: (opts: { success: boolean, message: string }) => void;
    // alert(opts: { title?: string, message: string, onSure?: () => void });
}

declare interface CommonUtils {
    renderLwh: (l: number, w: number, h: number, lengthUnitCode?: string = null) => string;
}