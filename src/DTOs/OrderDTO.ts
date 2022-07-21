import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

import { OrderStatus } from "../components/Order";

export type OrderFirestoreDTO = {
    patrimony: string;
    description: string;
    status: OrderStatus;
    solution?: string;
    created_at: FirebaseFirestoreTypes.Timestamp;   
    closed_at: FirebaseFirestoreTypes.Timestamp;   
};
