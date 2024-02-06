<template>
    <div class="component-box">
        <label v-if="label" class="component-label">{{ label }}</label>
        <ElDatePicker 
            v-bind="filteredAttrs" :placeholder="placeholder" :modelValue="modelValue"
            @update:modelValue="updateValue" 
        />
    </div>
</template>
    
<script setup lang='ts'>
import { ElDatePicker } from 'element-plus';

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
    return otherAttrs;
})

// 使用响应式引用来同步 modelValue
const inputValue = ref(props.modelValue);
// 使用响应式引用来同步 placeholder
const label = ref('');

// 监听 modelValue 属性的变化
watch(() => props.modelValue, (newValue) => {
    inputValue.value = newValue;
    label.value = newValue ? props.placeholder : '';
})

// 更新 value 时，发出事件以通知父组件
const updateValue = (newValue: string) => {
    emit('update:modelValue', newValue);
}
// v-model="inputVal"
// type="date"
// :placeholder="placeholder"
// @change="handleChanged"
</script>