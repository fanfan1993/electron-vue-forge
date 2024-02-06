
interface Locales {
    zh: Language,
    en: Language,
}

export class Language {
    id: string
    name: string
    code: string

    isEnglish() {
        return this.code == locales.en.code;
    }

    isChinese() {
        return this.code == locales.zh.code;
    }

    constructor(id: string, name: string, code: string) {
        this.id = id;
        this.name = name;
        this.code = code;
    }
}

export const locales: Locales = {
    zh: new Language("00000000-0000-0000-0000-000000000000", "中文", "zh"),
    en: new Language("83713766-C9E0-4B3C-BD6D-0808836ADC45", "English", "en")
}

export const lang = (l: L | { zh: string, en: string }): string => {
    return window.isEnglish ? l.en : l.zh;
}