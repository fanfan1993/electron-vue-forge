<template>
    <AppLoading v-if="loading" />
    <div v-else class="app-index">
        <IndexHead :menus="menus" />
        <div class="body">
            <RouterView v-slot="{ Component, route }">
                <component :is="Component" :key="route.name" />
            </RouterView>
        </div>
    </div>
</template>
<script lang="ts" setup>
// import homeService from '@/api/home-service';
import IndexHead from "./IndexHead.vue";

const loading = ref(false);
const menus = ref([]);

onMounted(async () => {
    setTimeout(() => {
        menus.value = [
            {
                name: '数据看板',
                id: '1',
                // uri: '/dashboard',
                uri: '/',
                version: 2,
                items: []
            },
            {
                name: '零售订单',
                id: '2',
                uri: '/dashboard',
                version: 3,
                items: [
                    {
                        name: '订单结账',
                        id: '2-1',
                        uri: '/order-checkout',
                        version: 2,
                    },
                    {
                        name: '订单查询',
                        id: '2-2',
                        uri: '/order-query',
                        version: 2,
                    },
                ]
            },
            {
                name: '商品管理',
                id: '3',
                uri: '/',
                version: 3,
                items: [
                    {
                        name: '售价管理',
                        id: '3-1',
                        uri: '/pricing-manage',
                        version: 2,
                    },
                    {
                        name: '商品查询',
                        id: '3-2',
                        uri: '/product-query',
                        version: 3,
                    },
                ]
            },
            {
                name: '库存预警',
                id: '4',
                uri: '/stock-alert',
                version: 2,
                items: []
            },
        ]
        loading.value = false;
    }, 1000);
    // try {
    //     loading.value = true;
    //     const model = await homeService.getIndexModel();
    //     menus.value = model.menus;
    // } finally {
    //     loading.value = false;
    // }
})
</script>
<style scoped>
@import "index.scss";
</style>