<template>
    <router-link to="/">返回</router-link>

    <div class="login">
        <div class="login-header">
            <div class="lang-item" :class="{ 'selected': isEnglish }" @click="handleLanguageChange(locales.en)">
                <i class="en"></i>
                <span>English</span>
            </div>
            <div class="lang-item" :class="{ 'selected': !isEnglish }" @click="handleLanguageChange(locales.zh)">
                <i class="zh"></i>
                <span>简体中文</span>
            </div>
        </div>
        <div class="login-body">
            <div class="login-left">
                <h2>Connect the globe with trade</h2>
                <div class="sub-heading">
                    Change the world via intelligent manufacturing
                </div>
                <div class="sub-heading">
                    Suppliers and purchasers jointly form a network organization to build a community of interests and share
                    win-win value. Only when all stakeholders cooperate in good faith and maintain the win-win situation,
                    can PFA.com platform achieve sustainable development.
                </div>
                <div class="sub-heading">
                    Customer information and transaction data are strictly confidential, providing customers with a safe and
                    reliable procurement platform. Offering customers with high-quality services with our professionalism.
                    Providing customers with convenient operations by simplifying relevant processes.
                </div>
            </div>
            <div class="login-right">
                <div class="login-box">
                    <div class="header">
                        <img src="@/assets/images/logo-64.png" />
                        <h2>PFA Retails Terminal</h2>
                    </div>
                    <div class="login-form">
                        <div class="form-group">
                            <i class="input-icon icon-corp"></i>
                            <input type="text" v-model="loginSubmit.corpName" :placeholder="locals.hintCorpName" />
                        </div>
                        <div class="form-group">
                            <i class="input-icon icon-user"></i>
                            <input type="text" v-model="loginSubmit.userName" :placeholder="locals.hintUserName" />
                        </div>
                        <form class="form-group">
                            <i class="input-icon icon-pwd"></i>
                            <input type="password" v-model="loginSubmit.password" autocomplete="off"
                                :placeholder="locals.hintPassword" />
                        </form>

                        <div class="form-group">
                            <button @click="handleLoginSubmit">{{ locals.login }}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="login-footer">
            <p>
                <span>Copyright © 2015-2024 HangZhou Yunshu Tech All Rights Reserved</span>
                <a href="http://cloud-tree.net/" target="_blank">www.cloud-tree.net</a>
            </p>
        </div>
    </div>
    <div>
        {{locals.hintCorpName}}
    </div>
</template>
<script setup lang="ts">
console.log(localStorage)
const loginSubmit = reactive({
    corpName: localStorage["corpName"],
    userName: localStorage["userName"],
    password: "",
})

const options = ref<any>(
    [
        { text: '选项一', value: '1' },
        { text: '选项二', value: '2' },
        { text: '选项三', value: '3' },
    ]
)

const locals = computed(() => {
    return {
        hintCorpName: lang({
            zh: "请输入公司名称",
            en: "Please enter the company name"
        }),
        hintUserName: lang({
            zh: "请输入用户名",
            en: "Please enter the username"
        }),
        hintPassword: lang({
            zh: "请输入密码",
            en: "Please enter the password"
        }),
        login: lang({
            zh: "登录",
            en: "Submit"
        })
    }
})
</script>
<style lang="scss" scoped>
@import "login.scss";
</style>