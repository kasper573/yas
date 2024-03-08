import { createContext, useContext } from "react";

export function useFileIO() {
  return useContext(FileIOContext);
}

interface FileIO {
  save(file: File): void;
}

class BrowserFileIO implements FileIO {
  static isSupported() {
    return typeof document !== "undefined";
  }

  save = (file: File) => {
    const url = URL.createObjectURL(file);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name;
    a.click();
    URL.revokeObjectURL(url);
  };
}

class NoopIO implements FileIO {
  save() {
    throw new Error("FileIO is not supported in this environment");
  }
}

function createFileIO(): FileIO {
  if (BrowserFileIO.isSupported()) {
    return new BrowserFileIO();
  }
  return new NoopIO();
}

export const FileIOContext = createContext(createFileIO());
