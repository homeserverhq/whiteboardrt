import { PRODUCT_NAME } from "@excalidraw/common";
import { Dialog } from "@excalidraw/excalidraw/components/Dialog";
import React from "react";

export const AboutDialog = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  if (!open) {
    return null;
  }

  return (
    <Dialog
      onCloseRequest={onClose}
      title={`About ${PRODUCT_NAME}`}
      size="small"
    >
      <p>
        {PRODUCT_NAME} is a collaborative whiteboard for sketching diagrams with
        a hand-drawn feel.
      </p>
      <p>
        This product is a modified fork of Excalidraw, which is Copyright (c)
        2020 Excalidraw and licensed under the MIT License. It is not affiliated
        with or endorsed by Excalidraw.
      </p>
      <p>
        <a href="/THIRD_PARTY_NOTICES.txt" target="_blank" rel="noopener">
          Third-party notices and licenses
        </a>
      </p>
      <p>
        <a href="/LICENSE" target="_blank" rel="noopener">
          MIT License
        </a>
      </p>
    </Dialog>
  );
};
