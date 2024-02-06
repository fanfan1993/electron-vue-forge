<template>
    <div class="component-box">
        <ElTooltip
            placement="top"
            v-bind="filteredAttrs" 
            effect="light"
            :content="placeholder"
            v-if="filteredAttrs.isTip"
        >
            <ElInput 
                v-bind="filteredAttrs" 
                :placeholder="placeholder" 
                :modelValue="modelValue"
                @update:modelValue="updateValue"
            >
            <template v-for="(index, name) in $slots" v-slot:[name]>
                <slot :name="name" />
            </template>
            <!-- <template #append v-if="filteredAttrs.appendtype">
                <template v-if="filteredAttrs.appendtype == 1 "> {{filteredAttrs.appendTitle}}</template>  
                <template v-else-if="filteredAttrs.appendtype == 2 "> 
                    <ElButton :icon="Search" />
                </template>  
            </template>  -->
        </ElInput>
       </ElTooltip>
       <template v-else>
            <label v-if="label" class="component-label">{{ label }}</label>
            <ElInput 
                v-bind="filteredAttrs" 
                :placeholder="placeholder" 
                :modelValue="modelValue"
                @update:modelValue="updateValue"
            >
            <template slot="prefix">$</template>
            <template v-if="filteredAttrs.appendTitle" slot="append">{{filteredAttrs.appendTitle}}</template> 
        </ElInput>
    </template>
    </div>
</template>
    
<script setup lang='ts'>
import { Search } from '@element-plus/icons-vue'
const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
    placeholder: {
        type: String,
        default: ''
    },
    modelValue: {
        type: String,
        default: ''
    },
})
const attrs = useAttrs()
// 过滤掉 modelValue 和 placeholder 属性
const filteredAttrs = computed(() => {
    const { modelValue, placeholder, ...otherAttrs } = attrs || {};
    console.log(otherAttrs)
    return otherAttrs;
})

// 使用响应式引用来同步 modelValue
const inputValue = ref(props.modelValue);
// 使用响应式引用来同步 placeholder
const label = ref('');
label.value = props.modelValue ? props.placeholder : '';

// 监听 modelValue 属性的变化
watch(() => props.modelValue, (newValue) => {
    inputValue.value = newValue;
    label.value = newValue ? props.placeholder : '';
})

// 更新 value 时，发出事件以通知父组件
const updateValue = (newValue: string) => {
    emit('update:modelValue', newValue);
}
// const val = computed({
//     get: () => pops.value,
//     set:() => emit('update:value', value)
// })
</script>
<style scoped lang="scss">
:deep(.el-input__wrapper) {
    padding: 0 ;
}
</style>