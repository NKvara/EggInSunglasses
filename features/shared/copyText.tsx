import React from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import toast from "react-hot-toast";

export default function CopyText({text}: {text: string}) {
  const notify = () => toast.success("Copied", {duration: 2000});

  return (
    <CopyToClipboard text={text} onCopy={() => notify()}>
      <p className="inline">{text}</p>
    </CopyToClipboard>
  );
}
