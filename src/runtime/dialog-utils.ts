import { globalLocals } from "./global-locals";
import { ElNotification, ElMessageBox } from "element-plus"

export const dialogUtils: DialogUtils = {
    notification(opts: { title?: string, message: string, type: 'success' | 'warning' | 'info' | 'error' }) {
        ElNotification({
            title: opts.title ?? '',
            message: opts.message,
            type: opts.type,
        })
    },
    confirm(opts: { title?: string, message: string, onSure: () => void, onCancel?: () => void }) {
        ElMessageBox.confirm(opts.message, opts.title ?? 'System Message', {
            confirmButtonText: 'OK',
            cancelButtonText: 'Cancel',
            type: 'info',
        }).then(() => {
            opts.onSure();
        }).catch((err) => {
            if (opts.onCancel) {
                opts.onCancel();
            }
        });
    }
}