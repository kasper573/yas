import { durations, easings } from "./tokens";

export const transitions = {
  emphasizedBeginAndEndOnScreen: `${durations.long2} ${easings.emphasized}`,
  standardBeginAndEndOnScreen: `${durations.medium2} ${easings.standard}`,
  emphasizedEnter: `${durations.medium4} ${easings.emphasizedDecelerate}`,
  standardEnter: `${durations.medium1} ${easings.standardDecelerate}`,
  emphasizedExit: `${durations.short4} ${easings.emphasizedAccelerate}`,
  standardExit: `${durations.short4} ${easings.standardAccelerate}`,
};
