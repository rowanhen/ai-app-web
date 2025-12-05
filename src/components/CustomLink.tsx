import { createLink, type LinkProps } from "@tanstack/react-router";
import * as React from "react";

interface BasicLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  // Add any additional props you want to pass to the anchor element
}

const BasicLinkComponent = React.forwardRef<HTMLAnchorElement, BasicLinkProps>(
  (props, ref) => {
    return <a ref={ref} {...props} />;
  }
);

BasicLinkComponent.displayName = "BasicLinkComponent";

const CreatedLinkComponent = createLink(BasicLinkComponent);

interface CustomLinkProps extends Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  "href"
> {
  to?: LinkProps["to"];
  href?: string;
}

export const CustomLink = React.forwardRef<HTMLAnchorElement, CustomLinkProps>(
  (props, ref) => {
    const { href, to, ...rest } = props;

    // If to is provided, render the TanStack Router Link component (internal route)
    // Prioritize internal routing over external links
    if (to) {
      return (
        <CreatedLinkComponent ref={ref} to={to} preload="intent" {...rest} />
      );
    }

    // If href is provided, render a regular anchor tag (external link)
    if (href) {
      return <a ref={ref} href={href} {...rest} />;
    }

    // Fallback to regular anchor if neither is provided
    return <a ref={ref} {...rest} />;
  }
);

CustomLink.displayName = "CustomLink";
