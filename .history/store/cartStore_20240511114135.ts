import {create} from 'zustand';
import { Product } from './interfaces';

export interface CartState {
    products : Product
}