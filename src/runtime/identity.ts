import { defineStore } from "pinia";
import { Language, locales } from "./language";

const keys = {
    identity: "ide",
    service: "service",
    authority: "authorities",
    language: "lang",
    superAdmin: "sa"
}

export const useIdentityStore = defineStore("identityStore", {
    state: () => {
        return <Identity>{
            userId: "",
            userName: "",
            serviceId: "",
            corpId: "",
            corpLogo: "",
            languageId: "",
            languageCode: "",
            superAdmin: false,
            logined: false,
            ide: "",
            authorityCodes: new Map<string, string>()
        }
    },
    actions: {
        set(identity: Identity) {
            this.userId = identity.userId;
            this.userName = identity.userName;
            this.serviceId = identity.serviceId;
            this.corpId = identity.corpId;
            this.corpLogo = identity.corpLogo;
            this.languageId = identity.languageId;
            this.languageCode = identity.languageCode;
            this.superAdmin = identity.superAdmin;
            this.logined = identity.logined;
            this.ide = identity.ide;
            this.authorityCodes = identity.authorityCodes;
        },
        clear() {
            this.userId = "";
            this.userName = "";
            this.serviceId = "";
            this.corpId = "";
            this.corpLogo = "";
            this.languageId = "";
            this.languageCode = "";
            this.superAdmin = false;
            this.logined = false;
            this.ide = "";
            this.authorityCodes = new Map<string, string>();
        }
    }
})

export const identityUtils = {
    init(identity: Identity) {
        const identityStore = useIdentityStore();
        identityStore.set(identity);

        if (identity.ide != null && identity.ide.length > 0) {
            localStorage[keys.identity] = identity.ide;
        }

        if (identity.languageCode == locales.en.code) { 
            identityUtils.setLanguage(locales.en);
        } else {
            identityUtils.setLanguage(locales.zh);
        }
    },
    getService(): string {
        return "YWGFX";
    },
    getIdentity() {
        return localStorage[keys.identity] ?? "";
    },
    setIdentity(identity: string) {
        if (identity == null || identity.length == 0) {
            return;
        }

        localStorage[keys.identity] = identity;
    },
    removeIdentity() {
        const identityStore = useIdentityStore();
        identityStore.clear();

        delete localStorage[keys.identity];
        delete localStorage[keys.service];
        delete localStorage[keys.authority];
    },
    getLanguage(): Language {
        const langCode = localStorage[keys.language] ?? locales.zh.code;
        return langCode == locales.en.code ? locales.en : locales.zh;
    },
    setLanguage(language: Language): void {
        localStorage[keys.language] = language.code;
    },
    getHeaders(): any {
        const headers: any = {};
        headers[keys.identity] = this.getIdentity();
        const language = this.getLanguage();
        headers[keys.language] = `${language.id}_${language.code}`;
        headers[keys.service] = this.getService();
        return headers;
    },
    getAuthorities(): Set<string> {
        if (window.authorities == null) {
            return new Set<string>();
        }
        return window.authorities;
    },
    setAuthorities(authorities: string[]): void {
        const authoritiesTemp = new Set<string>();

        if (authorities != null && authorities.length > 0) {
            authorities.forEach(item => {
                authoritiesTemp.add(item);
            })
        }

        window.authorities = authoritiesTemp;
    },
    getSuperAdmin(): boolean {
        return window.isSuperAdmin == undefined ? false : window.isSuperAdmin;
    },
    setSuperAdmin(isSuperAdmin: boolean): void {
        if (isSuperAdmin == undefined) {
            window.isSuperAdmin = false;
            return;
        }
        window.isSuperAdmin = isSuperAdmin;
    }
}