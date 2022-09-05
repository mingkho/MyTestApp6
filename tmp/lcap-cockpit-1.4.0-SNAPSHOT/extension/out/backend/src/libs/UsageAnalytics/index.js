"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trackUsage = exports.getTracker = exports.initTracker = void 0;
const constants_1 = require("./constants");
const FakeTracker_1 = require("./FakeTracker");
const objects_1 = require("./objects");
const SwaTracker_1 = require("./SwaTracker");
const trackerFactory = (tracker) => {
    switch (tracker) {
        case objects_1.TrackerTypes.SWA:
            return (0, SwaTracker_1.initSwaTracker)();
        default:
            return Promise.resolve(FakeTracker_1.fakeTracker);
    }
};
const inst = { current: Promise.resolve(undefined) };
const initTracker = (trackerType = objects_1.TrackerTypes.SWA) => inst.current = trackerFactory(trackerType);
exports.initTracker = initTracker;
const getTracker = () => inst.current;
exports.getTracker = getTracker;
const trackUsage = (evt, ...rest) => inst.current.then(tracker => tracker
    ? tracker.track(evt, rest)
    : constants_1.ERR.NO_INST());
exports.trackUsage = trackUsage;
//# sourceMappingURL=index.js.map