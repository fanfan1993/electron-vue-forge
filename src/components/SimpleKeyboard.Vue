<template>
    <div :class="keyboardClass"></div>
</template>
<script setup lang="ts">
import Keyboard from 'simple-keyboard'
import 'simple-keyboard/build/css/index.css'
import layout from 'simple-keyboard-layouts/build/layouts/chinese' // 中文输入法
import { onMounted , ref, watch} from 'vue';
const emit = defineEmits(['update:text', 'onChange', 'onKeyPress']);
const props = defineProps({
    input: {
        type: String,
        default: "",
    },
    // 固定开头
    keyboardClass: {
        type: String,
        default: "simple-keyboard",
    },
    maxLength: {
        type: Number,
        default: 99,
    }
})

const keyboard = ref<any>(null)
const displayDefault = ref({
    '{bksp}': 'backspace',
    '{lock}': 'caps',
    '{enter}': '> enter',
    '{tab}': 'tab',
    '{shift}': 'shift',
    '{change}': '中文',
    '{space}': ' ',
    '{clear}': '清空',
    '{close}': '关闭',
})

// 监听 modelValue 属性的变化
watch(() => props.input, (newValue) => {
    keyboard.value.setInput(props.input)
})

onMounted(()=>{
    keyboard.value= new Keyboard(props.keyboardClass, {
        onChange: onChange,
        onKeyPress: onKeyPress,
        // layoutCandidates: layout.layoutCandidates,
        layout: {
            // 默认布局
            default: [
                '` 1 2 3 4 5 6 7 8 9 0 - = {bksp}',
                '{tab} q w e r t y u i o p [ ] \\',
                "{lock} a s d f g h j k l ; ' {enter}",
                '{shift} z x c v b n m , . / {clear}',
                '{change} {space} {close}',
            ],
            // shift布局
            shift: [
                '~ ! @ # $ % ^ & * ( ) _ + {bksp}',
                '{tab} Q W E R T Y U I O P { } |',
                '{lock} A S D F G H J K L : " {enter}',
                '{shift} Z X C V B N M < > ? {clear}',
                '{change} {space} {close}',
            ],
        },
        // 按钮展示文字
        display: displayDefault.value,
        // 按钮样式
        buttonTheme: [
            {
                class: 'hg-red close',
                buttons: '{close}',
            },
            {
                class: 'change',
                buttons: '{change}',
            },
        ],
        // 输入限制长度
        maxLength: props.maxLength,
    })
})

const onChange = (input) => {
    keyboard.value.setInput(input)
    emit('onChange', input)
}
// 点击键盘
const onKeyPress = (button, $event) => {
    console.log(button)
    // 点击关闭
    if (button === '{close}') {
        // let keyboard = $event.path[3]
        // 子组件调用父组件的关闭按钮方法
        //  $parent.closekeyboard()
        // keyboard.style.visibility = 'hidden'
        return false
    } else if (button === '{change}') {
        // 切换中英文输入法
        if (keyboard.value.options.layoutCandidates !== null) {
            // this.$set(displayDefault.value, '{change}', '英文')
            // 切换至英文
            keyboard.value.setOptions({
                layoutCandidates: null,
                display: displayDefault.value,
            })
        } else {
            // 切换至中文
            // $set(displayDefault.value, '{change}', '中文')
            keyboard.value.setOptions({
                // layoutCandidates: layout.layoutCandidates,
                display: displayDefault.value,
            })
        }
    } else if (button === '{clear}') {
        keyboard.value.clearInput()
    } else {
        let value =
            $event.target.offsetParent.parentElement.children[0].children[0].value
        // 输入框有默认值时，覆写
        if (value) {
            keyboard.value.setInput(value)
        }
        emit('onKeyPress', button)
    }
    if (button === '{shift}' || button === '{lock}') handleShift()
}
// 切换shift/默认布局
const handleShift = () => {
    let currentLayout = keyboard.value.options.layoutName
    let shiftToggle = currentLayout === 'default' ? 'shift' : 'default'
    keyboard.value.setOptions({
        layoutName: shiftToggle,
    })
}



</script>
<style lang="scss">
:deep() {
    .hg-theme-default {
        width: 70%;

        .hg-button {
            &.hg-red {
                background: #db3e5d;
                color: white;

                &.close {
                    max-width: 200px;
                }
            }

            &.change {
                max-width: 200px;
            }
        }
    }
}
</style>