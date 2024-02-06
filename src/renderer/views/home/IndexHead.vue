<template>
    <div class="head">
        <div class="logo">
            <img src="@/assets/images/logo.png" />
        </div>
        <div class="menu">
            <ElMenu mode="horizontal" :router="true">
                <template v-for="menu in menus" :key="menu.id">
                    <ElSubMenu v-if="menu.items && menu.items.length > 0" :index="menu.id">
                        <template #title>{{ menu.name }}</template>
                        <ElMenuItem v-for="child in menu.items" :index="child.id" :route="{ path: child.uri }">
                            {{ child.name }}
                        </ElMenuItem>
                    </ElSubMenu>
                    <ElMenuItem v-else :index="menu.id" :route="{ path: menu.uri }">
                        {{ menu.name }}
                    </ElMenuItem>
                </template>
            </ElMenu>
        </div>
        <div class="toolbar">
            <div class="button">
                <ElIcon :size="20" color="#555659">
                    <ElIconLock />
                </ElIcon>
            </div>
            <div class="button" @click="handleLogout">
                <ElIcon :size="20" color="#c10000">
                    <ElIconSwitchButton />
                </ElIcon>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { dialogUtils } from '@/runtime/dialog-utils';
import { identityUtils } from '@/runtime/identity';
const props = defineProps({
    menus: {
        type: Object as PropType<Array<any>>,
    }
})

onMounted(() => {

})

const router = useRouter();

const handleLogout = () => {
    dialogUtils.confirm({
        message: "确定要退出登录吗？",
        onSure: () => {
            identityUtils.removeIdentity();   
        }
    })
}
</script>