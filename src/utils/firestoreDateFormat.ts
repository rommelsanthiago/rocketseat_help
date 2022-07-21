import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { format } from 'date-fns'

export function dateFormat(timestamp: FirebaseFirestoreTypes.Timestamp) {
    if(timestamp) {
        const date = new Date(timestamp.toDate());

        const day = format(date, 'dd/MM/yyyy')
        const hour = date.toLocaleTimeString('pt-BR');

        return `${day} às ${hour}`;
    };
};
