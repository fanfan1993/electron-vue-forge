import { computed } from "vue";
import { lang } from "./language"

export const useGlobalLocals = () => {
    return computed(() => {
        return {
            buttonSave: lang({
                en: "Save",
                zh: "保存"
            }),
            buttonClose: lang({
                en: "Close",
                zh: "关闭"
            }),
            buttonConfirm: lang({
                en: "Confirm",
                zh: "确认"
            }),
            buttonCancel: lang({
                en: "Cancel",
                zh: "取消"
            }),
            buttonDelete: lang({
                en: "Delete",
                zh: "删除"
            }),
            buttonSubmit: lang({
                en: "Submit",
                zh: "提交"
            }),
            buttonRemove: lang({
                en: "Remove",
                zh: "删除"
            }),
            buttonEdit: lang({
                en: "Edit",
                zh: "编辑"
            }),
            actions: lang({
                en: "Actions",
                zh: "操作"
            }),
            photo: lang({
                en: "Photo",
                zh: "图片"
            }),
            volume: lang({
                en: "Cube",
                zh: "体积"
            }),
            weight: lang({
                en: "Weight",
                zh: "重量"
            }),
            weightVolume: lang({
                en: "Weight/Cube",
                zh: "重量/体积"
            }),
            pieces: lang({
                en: "PCS",
                zh: "件"
            }),
            void: lang({
                en: "Void",
                zh: "缺省"
            }),
            confirmTitle: lang({
                en: "System message",
                zh: "系统提示"
            }),
            loginRequired: lang({
                en: "Please sign in first",
                zh: "请先登录后再进行操作"
            }),
            hintInput: lang({
                en: "Please enter the content",
                zh: "请输入内容"
            }),
            logicError: lang({
                en: "Sorry, an error has occurred please try again or contact the administrator",
                zh: "抱歉，发生了一个错误请重试或联系管理员"
            }),
        }
    })
}

export const globalLocals = useGlobalLocals();