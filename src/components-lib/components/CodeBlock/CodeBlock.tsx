import styles from "./CodeBlock.module.scss";

import * as Utilities from "@common-lib/utilities";
import * as React from "react";

interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  children?: React.ReactNode;
}

const CodeBlock = React.forwardRef<HTMLPreElement, CodeBlockProps>(
  ({ children, ...rest }, ref) => {
    return (
      <pre className={styles.root} ref={ref} {...rest}>
        {String(children)
          .split("\n")
          .map((line, index) => (
            <div key={index} className={styles.line}>
              <span className={styles.number}>
                {Utilities.leftPad(String(index + 1), 3)}
              </span>
              <span className={styles.content}>{line}</span>
            </div>
          ))}
      </pre>
    );
  }
);

CodeBlock.displayName = "CodeBlock";

export default CodeBlock;
