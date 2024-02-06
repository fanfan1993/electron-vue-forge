import { pull, isDate, isString } from "lodash";
import { identityUtils } from "./identity";

const locals = {
    chinese: {
        boolean: {
            yes: "是",
            no: "否"
        },
        need: {
            mustBe: "必须",
            notMustBe: "不必须"
        },
        packageProperty: {
            volume: "体积",
            weigth: "重量"
        },
        allowed: {
            allow: "启用",
            forbid: "禁用"
        },
        bindStatus: {
            nothing: "未绑定",
            full: "已绑定"
        },
        printLanguage: {
            chinese: "中文",
            english: "英文"
        }
    },
    english: {
        boolean: {
            yes: "Yes",
            no: "No"
        },
        need: {
            mustBe: "Must be",
            notMustBe: "Not must be"
        },
        packageProperty: {
            volume: "Volume",
            weigth: "Weigth"
        },
        allowed: {
            allow: "Allow",
            forbid: "Forbid"
        },
        bindStatus: {
            nothing: "Not bound",
            full: "Is binding"
        },
        printLanguage: {
            chinese: "Chinese",
            english: "English"
        }
    },
    getTexts() {
        const language = identityUtils.getLanguage();
        if (language.isChinese()) {
            return this.chinese;
        } else {
            return this.english;
        }
    }
};

export const utils: Utils = {
    emptyGuid: "00000000-0000-0000-0000-000000000000",
    newGuid(): string {
        const bytes = <any>[];
        const hexDigits = '0123456789abcdef';

        for (let i = 0; i < 36; i++) {
            bytes[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }

        bytes[14] = '4';
        bytes[19] = hexDigits.substr((bytes[19] & 0x3) | 0x8, 1);
        bytes[8] = bytes[13] = bytes[18] = bytes[23] = '-';

        return bytes.join('');
    },
    getHashCode(str: string): number {
        if (!str) {
            return null;
        }

        let hash = 0;

        if (str.length === 0) {
            return hash;
        }

        for (let i = 0; i < str.length; i++) {
            const current = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + current;
            hash = hash & hash;
        }

        return Math.abs(hash);
    },
    clearArray(array: Array<any>): void {
        if (array == null || array.length == 0) {
            return;
        }
        array.splice(0, array.length);
    },
    cloneArray(dest: Array<any>, source: Array<any>, quote: boolean = true): void {
        this.clearArray(dest);
        if (source == null || source.length == 0) {
            return;
        }

        source.forEach(item => {
            if (quote) {
                dest.push(item);
            } else {
                dest.push(JSON.parse(JSON.stringify(item)));
            }
        });
    },
    isEmptyArray<T>(arr: T[]): boolean {
        return arr == null || arr.length == 0;
    },
    arrayExchange<T>(arr: T[], sourceIndex: number, destIndex: number): void {
        if (utils.isEmptyArray(arr) == null || sourceIndex == destIndex) {
            return;
        }

        if (sourceIndex < destIndex && destIndex >= arr.length) {
            return;
        }

        if (destIndex < sourceIndex && destIndex < 0) {
            return;
        }

        const source = arr[sourceIndex];
        const dest = arr[destIndex];

        pull(arr, source);
        pull(arr, dest);

        if (sourceIndex < destIndex) {
            arr.splice(sourceIndex, 0, dest);
            arr.splice(destIndex, 0, source);
        } else {
            arr.splice(destIndex, 0, source);
            arr.splice(sourceIndex, 0, dest);
        }
    },
    isEmptyString(str: any): boolean {
        if (typeof str != "string") {
            str = this.toString(str);
        }
        return str == null || str.length == 0;
    },
    isEmptyGuid(str: any): boolean {
        if (utils.isEmptyString(str)) {
            return true;
        }
        return str == utils.emptyGuid;
    },
    dateFormat(date: any, format: string = "yyyy/MM/dd HH:mm"): string {
        if (date == undefined || (isString(date) && date.length == 0)) {
            return "";
        }

        if (!isDate(date)) {
            date = new Date(date);
        }

        const o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "H+": date.getHours(), //24小时制
            "h+": date.getHours() > 12 ? date.getHours() - 12 : date.getHours(), //12小时制
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "f+": date.getMilliseconds() //毫秒
        } as Record<string, any>;

        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        }

        for (let k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
            }
        }

        return format;
    },
    getDate(year: number, month: number, day: number): Date {
        return new Date(year, month, day)
    },
    getCurrentDate(): Date {
        const now = new Date();
        return utils.getDate(now.getFullYear(), now.getMonth(), now.getDate());
    },
    addDays(date: Date, day: number): Date {
        const millis = date.getTime() + (86400000 * day);
        return new Date(millis);
    },
    addHours(date: Date, hour: number): Date {
        const millis = date.getTime() + (3600000 * hour);
        return new Date(millis);
    },
    addMinutes(date: Date, minutes: number) {
        const millis = date.getTime() + (60000 * minutes);
        return new Date(millis);
    },
    addSeconds(date: Date, second: number) {
        const millis = date.getTime() + (1000 * second);
        return new Date(millis);
    },
    numberFormat(num: any, comma: boolean = true, defaultToEmpty: boolean = false): string {
        if (num == undefined) {
            return "";
        }

        if (isNaN(parseFloat(num))) {
            return num;
        }

        if (defaultToEmpty && num == 0) {
            return "";
        }

        const temp: string = num.toString();

        if (comma) {
            const dotIndex = temp.indexOf(".");
            let val = dotIndex >= 0 ? temp.substring(0, dotIndex) : temp;
            val = val.replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, "$&,");

            if (dotIndex >= 0) {
                val += temp.substring(dotIndex, temp.length);
            }

            return val;
        }

        return temp;
    },
    removeHtml(text: any): string {
        if (text == undefined) {
            return "";
        }

        if (typeof text !== "string") {
            return text;
        }
        return text.replace(/<[^>]+>/g, "");
    },
    displayBool(val: boolean): string {
        const texts = locals.getTexts();
        return val ? texts.boolean.yes : texts.boolean.no;
    },
    getBoolEnumObjects(): any[] {
        const texts = locals.getTexts();
        return [{
            key: true,
            name: texts.boolean.yes
        },
        {
            key: false,
            name: texts.boolean.no
        }]
    },
    displayNeed(val: boolean): string {
        const texts = locals.getTexts();
        return val ? texts.need.mustBe : texts.need.notMustBe;
    },
    displayAllow(val: boolean): string {
        const texts = locals.getTexts();
        return val ? texts.allowed.allow : texts.allowed.forbid;
    },
    stringFormat(template: string, ...args: string[]) {
        if (args.length > 0) {
            let result = template;
            for (let i = 0; i < args.length; i++) {
                const reg = new RegExp("({[" + i + "]})", "g");
                result = result.replace(reg, utils.toString(args[i]));
            }
            return result;
        } else {
            return template;
        }
    },
    toString(val: any): string {
        return val == undefined || val == null ? "" : String(val);
    },
    langText(zhText: string, enText: string): string {
        if (window.isEnglish) {
            return enText ? enText : zhText;
        }
        return zhText;
    }
}