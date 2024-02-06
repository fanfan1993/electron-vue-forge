<template>
    <div class="component-box">
        <label v-if="label" class="component-label">{{ label }}</label>
        <ElSelect 
            v-bind="filteredAttrs" 
            :placeholder="placeholder" 
            :modelValue="modelValue"
            @update:modelValue="updateValue"
        >
            <template v-for="(index, name) in $slots" v-slot:[name]>
                <slot :name="name" />
            </template>
            <ElCheckbox
                v-if="filteredAttrs.multiple"
                v-model="selectAll"
                :indeterminate="indeterminate"
                @change="handleCheckAll"
            >{{locals.selectAll}}
            </ElCheckbox>
            <ElOption 
                v-for="item in filteredAttrs.selectData"
                :key="item[filteredAttrs.valueKey]" 
                :label="filteredAttrs.customLabel ? customLabelHandler(item) : item[filteredAttrs.labelKey]"
                :value="item[filteredAttrs.valueKey]"
            />
        </ElSelect>
    </div>
</template>
    
<script setup lang='ts'>
import type { CheckboxValueType } from 'element-plus'
const locals = computed(() => {
    return {
        selectAll: lang({
            zh: "全选",
            en: "All"
        }),
    }
})
const emit = defineEmits(["update:modelValue"]);
const props = defineProps({
    placeholder: {
        type: String,
        default: ''
    },
    modelValue: {
        type: String || Array as PropType<any[]>,
        default: ''
    },
    //是否多选
    // multiple: {
    //     type: String,
    //     default: ''
    // },
    // 传入的option数组中，要作为最终选择项的键值key
    // valueKey: {
    //   type: String,
    //   default: 'key'
    // },
    // // 传入的option数组中，要作为显示项的键值名称
    // labelKey: {
    //   type: String,
    //   default: 'label'
    // },
})

const selectAll = ref<boolean>(false)
const indeterminate = ref<boolean>(false)
const attrs = useAttrs()
// 过滤掉 modelValue 和 placeholder 属性
const filteredAttrs = computed(() => {
    const { modelValue, placeholder, ...otherAttrs } = attrs || {};
    console.log(otherAttrs)
    return otherAttrs as any;
})

// 使用响应式引用来同步 modelValue
const inputValue = ref<any>(props.modelValue);
// 使用响应式引用来同步 placeholder
const label = ref('');

watch(() => props.modelValue, (newValue) => {
    inputValue.value = newValue;
    label.value = newValue ? props.placeholder : '';

    if(filteredAttrs.value.multiple) {
        if (newValue.length === 0) {
            selectAll.value = false
            indeterminate.value = false
        } else if (newValue.length === filteredAttrs.value.selectData.length) {
            selectAll.value = true
            indeterminate.value = false
        } else {
            indeterminate.value = true
        }
    }
})

const updateValue = (newValue: string | any[]) => {
    emit('update:modelValue', newValue);
}

 // 自定义label显示
const customLabelHandler = (item: any) => {
    return eval(item[filteredAttrs.value.customLabel])
}

const handleCheckAll = (val: CheckboxValueType) => {
  indeterminate.value = false
  if (val) {
    inputValue.value = filteredAttrs.value.selectData.map((_ : any) => _.value)
  } else {
    inputValue.value = []
  }
  updateValue(inputValue.value)
}
</script>
<style lang="scss" scoped>
  .el-checkbox {
    padding: 10px;
    display: flex;
    height: unset;
    border-bottom: 1px solid var(--el-border-color-light);
  }
</style>