import {api} from '@/constants';

const getAllProduct = async () => {
    try {
        const data = await api.get()
    } catch (error) {
        console.error(error);
    }
}