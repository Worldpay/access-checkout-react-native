/// <reference types="jest" />
import '@testing-library/react-native/extend-expect';
export declare const mockAddListener: jest.Mock<{
    listener: (event: never) => void;
    remove: jest.Mock<any, any>;
    emit: (_eventType: string, ...params: never[]) => void;
}, [_eventType: string, listener: (event: never) => void, _context?: object | undefined]>;
export declare const MockNativeEventEmitter: jest.Mock<{
    addListener: jest.Mock<{
        listener: (event: never) => void;
        remove: jest.Mock<any, any>;
        emit: (_eventType: string, ...params: never[]) => void;
    }, [_eventType: string, listener: (event: never) => void, _context?: object | undefined]>;
    remove: jest.Mock<any, any>;
}, []>;
