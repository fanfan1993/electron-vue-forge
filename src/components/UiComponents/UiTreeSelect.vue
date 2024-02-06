<template>
    <div class="component-box">
        <label v-if="label" class="component-label">{{ label }}</label>
        <ElTreeSelect
            v-bind="filteredAttrs" 
            :placeholder="placeholder" 
            :modelValue="modelValue"
            @update:modelValue="updateValue"
        >
            <template v-for="(index, name) in $slots" v-slot:[name]>
                <slot :name="name" />
            </template>
        </ElTreeSelect>
    </div>
</template>
    
<script setup lang='ts'>
const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
    placeholder: {
        type: String,
        default: ''
    },
    modelValue: {
        type: Object,
        default: {}
    },
})

const attrs = useAttrs()
const filteredAttrs = computed(() => {
    const { modelValue, placeholder, ...otherAttrs } = attrs || {};
    return otherAttrs;
})

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
// v-model="inputVal"
// :data="treeData"
// :render-after-expand="false"
// class="tree-box"
// filterable 
// clearable
// @change="handleChanged"
</script>