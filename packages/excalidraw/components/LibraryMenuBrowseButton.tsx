import { DEFAULT_LIBRARY_URL, VERSIONS } from "@excalidraw/common";

import { t } from "../i18n";

import { useAppProps } from "./App";

import type { ExcalidrawProps, UIAppState } from "../types";

const LibraryMenuBrowseButton = ({
  theme,
  id,
  libraryReturnUrl,
}: {
  libraryReturnUrl: ExcalidrawProps["libraryReturnUrl"];
  theme: UIAppState["theme"];
  id: string;
}) => {
  const appProps = useAppProps();
  const libraryUrl =
    appProps.libraryUrl ||
    import.meta.env.VITE_APP_LIBRARY_URL ||
    DEFAULT_LIBRARY_URL;
  const referrer =
    libraryReturnUrl || window.location.origin + window.location.pathname;
  return (
    <a
      className="library-menu-browse-button"
      href={`${libraryUrl}?target=${
        window.name || "_blank"
      }&referrer=${referrer}&useHash=true&token=${id}&theme=${theme}&version=${
        VERSIONS.excalidrawLibrary
      }`}
      target="_excalidraw_libraries"
    >
      {t("labels.libraries")}
    </a>
  );
};

export default LibraryMenuBrowseButton;
