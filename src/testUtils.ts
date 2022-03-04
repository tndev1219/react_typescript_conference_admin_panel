// based on https://blog.pragmatists.com/genuine-guide-to-testing-react-redux-applications-6f3265c11f63
import { ReactWrapper } from "enzyme";

const flushAllPromises =
    (): Promise<any> =>
        new Promise(resolve => setImmediate(resolve));

export const flushRequestsAndUpdate =
    async (enzymeWrapper: ReactWrapper): Promise<void> => {
        await flushAllPromises();
        enzymeWrapper.update();
    };