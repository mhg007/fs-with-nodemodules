import { ElLoading } from 'element-plus';
export const ElLoader = () => {
    return ElLoading.service({
        lock: true,
        text: '',
        background: 'rgba(0, 0, 0, 0.7)',
      })
        
      
}