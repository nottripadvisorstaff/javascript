import React from "react";
import PropTypes from "prop-types";
import Button, { buttonDefaultProps, buttonPropTypes } from "./Button";

const closeIcon = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512" role="img" aria-hidden="true" focusable="false">
	{ /* eslint-disable-next-line max-len */ }
	<path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" />
</svg>;

/**
 * An Close button.
 *
 * @param {Object} props The props object.
 *
 * @returns {ReactElement} An Close button component.
 */
export const CloseButton = ( props ) => {
	return <Button
		className="yoast-close"
		aria-label="Close"
		{ ...props }
	>
		{ closeIcon }
	</Button>;
};

CloseButton.propTypes = {
	...buttonPropTypes,
	onClick: PropTypes.func.isRequired,
};

CloseButton.defaultProps = {
	...buttonDefaultProps,
	caret: false,
};

/**
 * An Close link.
 *
 * @param {Object} props The props object.
 *
 * @returns {ReactElement} An Close link component.
 */
export const CloseLink = ( props ) => {
	return <Button
		className="yoast-close"
		aria-label="Close"
		isLink={ true }
		{ ...props }
	>
		{ closeIcon }
	</Button>;
};

CloseLink.propTypes = {
	...buttonPropTypes,
	href: PropTypes.string.isRequired,
};

CloseLink.defaultProps = {
	...buttonDefaultProps,
};
