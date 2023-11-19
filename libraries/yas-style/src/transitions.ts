import { durations, easings } from "./tokens";

export const transitions = {
  emphasizedBeginAndEndOnScreen: `${durations.long2} ${easings.emphasized}`,
  emphasizedEnter: `${durations.medium4} ${easings.emphasizedDecelerate}`,
  emphasizedExit: `${durations.short4} ${easings.emphasizedAccelerate}`,
  standardBeginAndEndOnScreen: `${durations.medium2} ${easings.standard}`,
  standardEnter: `${durations.medium1} ${easings.standardDecelerate}`,
  standardExit: `${durations.short4} ${easings.standardAccelerate}`,
};
