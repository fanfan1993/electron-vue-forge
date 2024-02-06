<template>
    <AppLoading v-if="loading" />
    <template v-else>
        <Index />
        <!-- <Index v-if="logined" />
        <Login v-else /> -->
    </template>
</template>
<script lang="ts" setup>
import { identityUtils, useIdentityStore } from '@/runtime/identity';
// import identityService from '@/api/identity-service';
import Index from './views/home/Index.vue';
// import Login from './views/home/login/Login.vue';

const identityStore = useIdentityStore();
console.log(identityStore);

const loading = ref(true);
const logined = computed(() => {
    return identityStore.logined;
})

onMounted(async () => {
    setTimeout(() => {
        loading.value = false;
    }, 1000);
    // try {
    //     const identity = await identityService.getIdentity();

    //     if (identity.logined) {
    //         identityUtils.init(identity);
    //     } else {
    //         identityUtils.removeIdentity();
    //     }
    // } finally {
    //     loading.value = false;
    // }
})
</script>