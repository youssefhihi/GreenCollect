import { WasteType } from "../enum/wasteType";
import { User } from "../user/user.model";
export interface Collect {
    id: string;
    wasteType: WasteType[];
    user: User;
    photos?: string[];
    estimatedWeight: number;
    address: {
        city: string;
        zipecode: string;
    };
    date: string;
    timeSlot: string; 
    note?: string;
    status: 'En attente' | 'Occupée' | 'En cours' | 'Validée' | 'Rejetée';
}