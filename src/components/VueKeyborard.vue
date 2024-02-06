<template>
    <div class="keyboard">
        <div class="input" @click.stop="show">
            <!-- <div @click.stop="show" v-for="(item, index) in length" :key="index"
                :class="['box-item', isFocus && currentInput === index ? 'active' : '', text[index] ? 'hight-light' : '']">
                <span>{{ inputText[index] }}</span>
            </div> -->
            <div  v-for="(item, index) in length" :key="index">
                <span>{{ inputText[index] }}</span>
            </div>
            
        </div>
        <!-- 点击键盘以外的区域隐藏键盘 -->
        <div @click.stop="hide" v-if="showKeyboard" class="bg"></div>
        <div ref="cusBoard" v-if="showKeyboard" class="cus-board">
            <div v-for="(line, index) in keys" :key="'line' + index" class="letter-line">
                <div v-if="index === keys.length - 2" @click.stop="tabText" class="action control">
                    <!-- <img :src="require('@/assets/keyboard.png')" /> -->
                    Tab
                </div>
                <div v-if="index === keys.length - 1" @click.stop="hide" class="action control">
                    {{locals.close}}
                </div>
                <div @click="e => clickKey(e)" @mousedown="mousedown" v-for="key in line" :key="key" :data-text="key"
                    class="item">{{ key }}</div>
                <div v-if="index === keys.length - 1" @click.stop="handleDel" class="action control">
                    <!-- <img :src="require('@/assets/delete.png')" /> -->
                    {{locals.del}}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const locals = computed(() => {
    return {
        del: lang({
            zh: '删除',
            en: 'Delete'
        }),
        close: lang({
            zh: '关闭',
            en: 'Close'
        }),
        status: lang({
            zh: '转化',
            en: 'Tab'
        }),

    }
})
const emit = defineEmits(['update:text','accept']);
const props = defineProps({
    text: {
        type: String,
        default: "",
    },
    defaultVal: {
        type: String,
        default: "",
    },
    length: {
        type: Number,
        default: 99,
    }
})
const typeMode = ref<boolean>(true)
const bigLetter = ref<string[][]>([
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
])
const smallLetter = ref<string[][]>([
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
])
const numberArr = ref<number[]>([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
const textMode = ref<any>()
textMode.value = bigLetter.value
// 键盘的key
const keys = ref<any>([
    numberArr.value,
    ...textMode.value
])

const showKeyboard = ref<boolean>(false) // 控制键盘显隐
const isFocus = ref<boolean>(false)  // 是否聚焦

const inputText = ref<any>([])
// inputText.value = []
const cusBoard = ref<HTMLElement>(null);

const currentInput = computed(() => {
    const length = inputText.value.length || 0;
    return length;
})

const show = () => {
    isFocus.value = true;
    showKeyboard.value = true;
    // 需定时器执行 否则会找不到dom
    setTimeout(() => {
        // 升起键盘
        // console.log( this.$refs)
        cusBoard.value.style.transform = `translateY(0)`;
    }, 20);
}
const hide = () => {
    // 失去焦点
    isFocus.value = false;
    // 降下键盘
    cusBoard.value.style.transform = `translateY(100%)`;
    // 需定时器执行 否则会没有动画过度
    setTimeout(() => {
        showKeyboard.value = false;
    }, 500);
    if( inputText.value.length > 0) {
        let textString = inputText.value.join('');
        emit("accept", textString);
    }

}
/**
 * 按下
 * @param {object} el 点击事件
 * @return {void}
 */
const clickKey = (el: any) => {
    // 点击目标
    const { target } = el;

    let text = props.text;
    // 文本达到上限 不做处理 返回
    // if (text.length >= props.length) return;
    // if (inputText.value.length >= props.length) return;
    // 拼接点击的 值
    const content = target.innerText;
    text += content;
    inputText.value.push(content)
    // text.push({content})

    // 更新文本数据源
    emit("update:text", text);

    // 背景色改变
    target.style.background = "rgb(228, 229, 228)";
    // 添加激活className 显示反馈
    target.classList.add("active");

    // 通过定时器实现过渡效果
    setTimeout(() => {
        // 背景色改变
        target.style.background = "#fff";
        // 移除className
        target.classList.remove("active");
    }, 200);

}
const mousedown = (el: any) => {
}

const handleDel = () => {
    if (props.defaultVal && props.text.indexOf(props.defaultVal) === 0) {
        // 有默认开头 如果文本只有固定开头 没有任何输入 点击删除不做任何操作
        return;
    }
    // 从后面开始 删除一个文本
    // let text = this.text;
    let text = inputText.value;
    text = text.slice(0, text.length - 1);
    inputText.value = text
    emit("update:text", text);
}

// Tab文件
const tabText = () => {
    typeMode.value = !typeMode.value
    textMode.value = typeMode.value ? bigLetter.value : smallLetter.value
    keys.value = [numberArr.value, ...textMode.value]
}

</script>
  
<style lang="scss" scoped>
.keyboard {
    user-select: none;
}

.bg {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    // background: rgba(255, 255, 255, 0);
    background: rgba(000, 000, 000, 0.4);
}

.input {
    display: flex;
    align-items: center;
    // justify-content: space-between;
    margin: 0 auto;
    height: 50px;
    line-height: 50px;
    border: 1px solid salmon;
}

.box-item {
    flex-basis: 35px;
    height: 40px;
    border: 1px solid #bfbfbf;
    border-radius: 2px;
    display: flex;
    align-items: center;
    justify-content: center;

    &.active {
        position: relative;
        border-color: #348fec;

        &::after {
            position: absolute;
            content: "";
            width: 1px;
            height: 50%;
            background-color: #333333;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            animation: inputFocusLine 1s infinite;
        }
    }

    &.hight-light {
        border-color: #348fec;
    }
}

@keyframes inputFocusLine {
    0% {
        opacity: 1;
    }

    50% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}

.cus-board {
    // font-size: 15px;
    // width: 375px;
    width: 100%;
    background: rgb(246, 247, 246);
    padding: 15px 5px 30px 5px;
    position: fixed;
    z-index: 9999;
    bottom: 0;
    left: 0;
    right: 0;
    transform: translateY(100%);
    transition: all 0.5s;

    .active {
        &::after {
            // position: absolute;
            // top: -72px;
            // // top:-2.2em;
            // left: 0;
            // width: 60px;
            // height: 72px;
            // background-color: #ffffff;
            // content: attr(data-text);
            // animation: itemActive 0.5s infinite;
        }
    }
}

.item,
.action {
    // width: 32px;
    // height: 40px;
    // width: 60px;
    // height: 72px;

    flex: 40;
    height: 2.2em;
    line-height: 2.2em;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, .6);
    border-radius: .35em;
    // border-radius: 8px;
    background-color: white;
    // line-height: 72px;
    text-align: center;
    position: relative;

    img {
        display: inline-block;
        width: 16px;
        height: 16px;
    }
    &.control {
        color: #fff;
        background-color: #7d7d7d;
        border-color: #656565;
    }
    &:hover {
        color: #333;
        background-color: #d6d6d6;
        border-color: #adadad;
    }
}

@keyframes itemActive {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(2);
    }

    100% {
        transform: scale(1);
    }
}

.line {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 15px;
}

.letter-line {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .item,
    .action {
        margin: 3px;
    }
}
</style>