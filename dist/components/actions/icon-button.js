"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from "react";
import { cn } from "../../lib/cn";
import { useDefaultSize } from "../../provider/foundathyon-provider";
import { Tooltip } from "../overlays/tooltip";
import { Icon } from "../typography/icon";
import { Button } from "./button";
const squareClasses = {
    xs: "w-control-xs",
    sm: "w-control-sm",
    md: "w-control-md",
    lg: "w-control-lg",
};
const iconSizes = { xs: 12, sm: 14, md: 16, lg: 16 };
/**
 * IconButton — an icon-only action, always square at its row's control height
 * (§09). The API enforces the accessibility contract: `label` is required and
 * feeds both `aria-label` and the wrapping Tooltip. Under a coarse pointer the
 * touch area extends to 44px without changing the visual box.
 *
 * When to use: row and toolbar actions where the icon is unambiguous. If the
 * verb matters (destructive confirmations, primary actions), use a Button with
 * text — the button says the verb (§09).
 */
export const IconButton = forwardRef(function IconButton({ icon, label, variant = "ghost", size, loading = false, tooltipSide, className, ...props }, ref) {
    const resolvedSize = useDefaultSize(size);
    return (_jsx(Tooltip, { content: label, side: tooltipSide, children: _jsx(Button, { ref: ref, "aria-label": label, variant: variant, size: resolvedSize, loading: loading, className: cn("px-0", squareClasses[resolvedSize], className), ...props, children: _jsx(Icon, { icon: icon, size: iconSizes[resolvedSize] }) }) }));
});
