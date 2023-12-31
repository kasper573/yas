import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import { dark } from "@yas/style/themes/dark.css";
import { light } from "@yas/style/themes/light.css";

if (ExecutionEnvironment.canUseDOM) {
  initialize();
}

function initialize() {
  const themeClassNames = new Map<string | undefined | null, string>([
    ["dark", dark],
    ["light", light],
  ]);

  const rootElement = document.documentElement;
  const setThemeClass = createClassChanger(rootElement);
  const themeAttribute = "data-theme";
  const observer = new MutationObserver(onThemeOrClassChanged);

  observer.observe(rootElement, {
    attributeFilter: [themeAttribute, "class"],
    subtree: false,
  });

  function onThemeOrClassChanged() {
    const themeName = rootElement.getAttribute(themeAttribute);
    const themeClass = themeClassNames.get(themeName);
    setThemeClass(themeClass);
  }
}

function createClassChanger(element: HTMLElement) {
  let currentClassName: string | undefined;
  return function changeClass(newClassName?: string) {
    if (newClassName && element.classList.contains(newClassName)) {
      return;
    }
    if (currentClassName) {
      element.classList.remove(currentClassName);
    }
    if (newClassName) {
      element.classList.add(newClassName);
    }
    currentClassName = newClassName;
  };
}
