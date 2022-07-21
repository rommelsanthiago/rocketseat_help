import { RouteParams } from "../screens/Details";

export declare  global {
    namespace ReactNavigation {
        interface RootParamList {
            home: undefined;
            new: undefined;
            details: RouteParams;
            signIn: undefined;
            signUp: undefined;
        }
    }
};
