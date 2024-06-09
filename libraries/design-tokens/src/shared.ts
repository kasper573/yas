// This file is generated. Do not modify manually.

export type Color = typeof color;
export const color = {
  blue: {
    "50": "rgb(245, 250, 254)",
    "100": "rgb(231, 243, 254)",
    "200": "rgb(211, 234, 253)",
    "300": "rgb(187, 223, 251)",
    "400": "rgb(168, 213, 250)",
    "500": "rgb(144, 202, 249)",
    "600": "rgb(71, 167, 245)",
    "700": "rgb(12, 128, 223)",
    "800": "rgb(8, 86, 150)",
    "900": "rgb(4, 42, 73)",
    "950": "rgb(2, 22, 39)",
  },
  green: {
    "50": "rgb(233, 246, 239)",
    "100": "rgb(215, 239, 226)",
    "200": "rgb(175, 223, 197)",
    "300": "rgb(132, 205, 166)",
    "400": "rgb(92, 189, 137)",
    "500": "rgb(65, 160, 110)",
    "600": "rgb(52, 127, 87)",
    "700": "rgb(38, 94, 64)",
    "800": "rgb(27, 65, 45)",
    "900": "rgb(13, 33, 22)",
    "950": "rgb(6, 15, 10)",
  },
  red: {
    "50": "rgb(251, 236, 233)",
    "100": "rgb(248, 220, 216)",
    "200": "rgb(240, 182, 173)",
    "300": "rgb(233, 148, 134)",
    "400": "rgb(226, 113, 96)",
    "500": "rgb(218, 75, 54)",
    "600": "rgb(185, 54, 34)",
    "700": "rgb(138, 40, 25)",
    "800": "rgb(90, 26, 17)",
    "900": "rgb(47, 14, 9)",
    "950": "rgb(22, 6, 4)",
  },
  orange: {
    "50": "rgb(253, 247, 237)",
    "100": "rgb(250, 237, 214)",
    "200": "rgb(245, 221, 178)",
    "300": "rgb(240, 202, 138)",
    "400": "rgb(234, 184, 97)",
    "500": "rgb(229, 167, 58)",
    "600": "rgb(203, 138, 27)",
    "700": "rgb(153, 104, 20)",
    "800": "rgb(104, 71, 14)",
    "900": "rgb(50, 34, 7)",
    "950": "rgb(27, 18, 4)",
  },
  gray: {
    "50": "rgb(233, 237, 242)",
    "100": "rgb(210, 220, 228)",
    "200": "rgb(165, 185, 202)",
    "300": "rgb(121, 150, 175)",
    "400": "rgb(84, 114, 141)",
    "500": "rgb(57, 78, 96)",
    "600": "rgb(46, 62, 77)",
    "700": "rgb(34, 47, 58)",
    "800": "rgb(23, 31, 38)",
    "900": "rgb(11, 16, 19)",
    "950": "rgb(6, 8, 10)",
  },
  teal: {
    "50": "rgb(232, 248, 247)",
    "100": "rgb(209, 240, 239)",
    "200": "rgb(162, 226, 223)",
    "300": "rgb(112, 210, 206)",
    "400": "rgb(65, 195, 190)",
    "500": "rgb(48, 151, 148)",
    "600": "rgb(38, 120, 117)",
    "700": "rgb(28, 89, 87)",
    "800": "rgb(20, 62, 61)",
    "900": "rgb(10, 31, 30)",
    "950": "rgb(5, 15, 15)",
  },
  white: {
    "100": "rgb(255, 255, 255)",
    "87": "rgba(255, 255, 255, 0.87)",
    "50": "rgba(255, 255, 255, 0.50)",
    "25": "rgba(255, 255, 255, 0.25)",
  },
  black: {
    "100": "rgb(0, 0, 0)",
    "87": "rgba(0, 0, 0, 0.87)",
    "50": "rgba(0, 0, 0, 0.50)",
    "25": "rgba(0, 0, 0, 0.25)",
  },
};
export type Text = typeof text;
export const text = {
  family: { default: "Inter" as const },
  weight: { regular: "Light" as const, bold: "Medium" as const },
  size: {
    "1": 13,
    "2": 14,
    "3": 15,
    "4": 18,
    "5": 24,
    "6": 32,
    "7": 48,
    "8": 64,
    "9": 94,
    "10": 128,
  },
};
export type Space = typeof space;
export const space = { xs: 1, s: 2, m: 4, l: 8, xl: 16, "2xl": 24, "3xl": 40 };
export type Radius = typeof radius;
export const radius = { s: 2, m: 4, circle: 9999, l: 8 };
export type Typography = typeof typography;
export const typography = {
  caption: {
    remote: false,
    description: "" as const,
    text_case: "ORIGINAL" as const,
    hanging_list: false,
    hanging_punctuation: false,
    list_spacing: 0,
    get paragraph_spacing() {
      return space.l;
    },
    paragraph_indent: 0,
    leading_trim: "NONE" as const,
    line_height: { unit: "AUTO" as const },
    text_decoration: "NONE" as const,
    get font_size() {
      return text.size["1"];
    },
    font_name: { family: "Inter" as const, style: "Light" as const },
    letter_spacing: { unit: "PERCENT" as const, value: 0 },
    get font_family() {
      return text.family.default;
    },
    get font_style() {
      return text.weight.regular;
    },
  },
  label: {
    remote: false,
    description: "" as const,
    text_case: "ORIGINAL" as const,
    hanging_list: false,
    hanging_punctuation: false,
    list_spacing: 0,
    get paragraph_spacing() {
      return space.l;
    },
    paragraph_indent: 0,
    leading_trim: "NONE" as const,
    line_height: { unit: "AUTO" as const },
    text_decoration: "NONE" as const,
    get font_size() {
      return text.size["2"];
    },
    font_name: { family: "Inter" as const, style: "Medium" as const },
    letter_spacing: { unit: "PERCENT" as const, value: 0 },
    get font_family() {
      return text.family.default;
    },
    get font_style() {
      return text.weight.bold;
    },
  },
  body: {
    remote: false,
    description: "" as const,
    text_case: "ORIGINAL" as const,
    hanging_list: false,
    hanging_punctuation: false,
    list_spacing: 0,
    get paragraph_spacing() {
      return space.l;
    },
    paragraph_indent: 0,
    leading_trim: "NONE" as const,
    line_height: { unit: "AUTO" as const },
    text_decoration: "NONE" as const,
    get font_size() {
      return text.size["2"];
    },
    font_name: { family: "Inter" as const, style: "Light" as const },
    letter_spacing: { unit: "PERCENT" as const, value: 0 },
    get font_family() {
      return text.family.default;
    },
    get font_style() {
      return text.weight.regular;
    },
  },
  body2: {
    remote: false,
    description: "" as const,
    text_case: "ORIGINAL" as const,
    hanging_list: false,
    hanging_punctuation: false,
    list_spacing: 0,
    get paragraph_spacing() {
      return space.l;
    },
    paragraph_indent: 0,
    leading_trim: "NONE" as const,
    line_height: { unit: "AUTO" as const },
    text_decoration: "NONE" as const,
    get font_size() {
      return text.size["3"];
    },
    font_name: { family: "Inter" as const, style: "Light" as const },
    letter_spacing: { unit: "PERCENT" as const, value: 0 },
    get font_family() {
      return text.family.default;
    },
    get font_style() {
      return text.weight.regular;
    },
  },
  h1: {
    remote: false,
    description: "" as const,
    text_case: "ORIGINAL" as const,
    hanging_list: false,
    hanging_punctuation: false,
    list_spacing: 0,
    get paragraph_spacing() {
      return radius.l;
    },
    paragraph_indent: 0,
    leading_trim: "NONE" as const,
    line_height: { unit: "AUTO" as const },
    text_decoration: "NONE" as const,
    get font_size() {
      return text.size["8"];
    },
    font_name: { family: "Inter" as const, style: "Medium" as const },
    letter_spacing: { unit: "PERCENT" as const, value: 0 },
    get font_family() {
      return text.family.default;
    },
    get font_style() {
      return text.weight.bold;
    },
  },
  h2: {
    remote: false,
    description: "" as const,
    text_case: "ORIGINAL" as const,
    hanging_list: false,
    hanging_punctuation: false,
    list_spacing: 0,
    get paragraph_spacing() {
      return space.l;
    },
    paragraph_indent: 0,
    leading_trim: "NONE" as const,
    line_height: { unit: "AUTO" as const },
    text_decoration: "NONE" as const,
    get font_size() {
      return text.size["7"];
    },
    font_name: { family: "Inter" as const, style: "Medium" as const },
    letter_spacing: { unit: "PERCENT" as const, value: 0 },
    get font_family() {
      return text.family.default;
    },
    get font_style() {
      return text.weight.bold;
    },
  },
  h3: {
    remote: false,
    description: "" as const,
    text_case: "ORIGINAL" as const,
    hanging_list: false,
    hanging_punctuation: false,
    list_spacing: 0,
    get paragraph_spacing() {
      return space.l;
    },
    paragraph_indent: 0,
    leading_trim: "NONE" as const,
    line_height: { unit: "AUTO" as const },
    text_decoration: "NONE" as const,
    get font_size() {
      return text.size["6"];
    },
    font_name: { family: "Inter" as const, style: "Medium" as const },
    letter_spacing: { unit: "PERCENT" as const, value: 0 },
    get font_family() {
      return text.family.default;
    },
    get font_style() {
      return text.weight.bold;
    },
  },
  h4: {
    remote: false,
    description: "" as const,
    text_case: "ORIGINAL" as const,
    hanging_list: false,
    hanging_punctuation: false,
    list_spacing: 0,
    get paragraph_spacing() {
      return space.l;
    },
    paragraph_indent: 0,
    leading_trim: "NONE" as const,
    line_height: { unit: "AUTO" as const },
    text_decoration: "NONE" as const,
    get font_size() {
      return text.size["5"];
    },
    font_name: { family: "Inter" as const, style: "Medium" as const },
    letter_spacing: { unit: "PERCENT" as const, value: 0 },
    get font_family() {
      return text.family.default;
    },
    get font_style() {
      return text.weight.bold;
    },
  },
  h5: {
    remote: false,
    description: "" as const,
    text_case: "ORIGINAL" as const,
    hanging_list: false,
    hanging_punctuation: false,
    list_spacing: 0,
    get paragraph_spacing() {
      return space.l;
    },
    paragraph_indent: 0,
    leading_trim: "NONE" as const,
    line_height: { unit: "AUTO" as const },
    text_decoration: "NONE" as const,
    get font_size() {
      return text.size["4"];
    },
    font_name: { family: "Inter" as const, style: "Medium" as const },
    letter_spacing: { unit: "PERCENT" as const, value: 0 },
    get font_family() {
      return text.family.default;
    },
    get font_style() {
      return text.weight.bold;
    },
  },
  h6: {
    remote: false,
    description: "" as const,
    text_case: "ORIGINAL" as const,
    hanging_list: false,
    hanging_punctuation: false,
    list_spacing: 0,
    get paragraph_spacing() {
      return space.l;
    },
    paragraph_indent: 0,
    leading_trim: "NONE" as const,
    line_height: { unit: "AUTO" as const },
    text_decoration: "NONE" as const,
    get font_size() {
      return text.size["3"];
    },
    font_name: { family: "Inter" as const, style: "Medium" as const },
    letter_spacing: { unit: "PERCENT" as const, value: 0 },
    get font_family() {
      return text.family.default;
    },
    get font_style() {
      return text.weight.bold;
    },
  },
};
export type Shadow = typeof shadow;
export const shadow = {
  thin: {
    "0": {
      show_shadow_behind_node: false,
      blend_mode: "NORMAL" as const,
      visible: true,
      spread: 0,
      get radius() {
        return space.m;
      },
      get color() {
        return color.black["25"];
      },
      offset: { x: 0, y: 4 },
      get offset_y() {
        return space.m;
      },
    },
  },
  thick: {
    "0": {
      show_shadow_behind_node: false,
      blend_mode: "NORMAL" as const,
      visible: true,
      spread: 0,
      radius:
        null /* Error: Skipped alias. Could not find variable with id VariableID:6:309*/,
      get color() {
        return color.black["50"];
      },
      offset: { x: 0, y: 6 },
      offset_y:
        null /* Error: Skipped alias. Could not find variable with id VariableID:6:309*/,
    },
  },
};
