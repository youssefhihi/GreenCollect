import { WasteType } from "../enum/wasteType";
export interface Collect {
    id: string;
    wasteType: WasteType;
    userId: string;
    photos?: string[];
    estimatedWeight: number;
    address: {
        city: string;
        zipecode: string;
    };
    date: string;
    timeSlot: string; 
    note?: string;
    status: 'pending' | 'in progress' | 'completed';
}