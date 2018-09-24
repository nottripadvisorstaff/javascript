import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import colors from "yoast-components/style-guide/colors";
import check from "../icons/check.svg";

const CheckboxWrapper = styled.div`
	display: inline-flex;
	align-items: center;
	vertical-align: top; // Remove descender space
`;

const CheckboxInput = styled.input`
	position: absolute;
	opacity: 0;

	/* Checks our custom check mark. */
	&:checked + .checkmark {
		/* Dark pink background and white check mark */
		background-color: ${ colors.$color_pink_dark };
		background-image: url( ${ check } );
		background-repeat: no-repeat;
		background-position: center;
		background-size: 75%;
	}

	/* Adds an outline to the check mark on focus. */
	&:focus + .checkmark {
		box-shadow: inset 0 1px 8px 0 rgba(0,0,0,0.3),
			0 0 2px 2px ${ colors.$color_snippet_focus };
		/* Windows High Contrast Mode */
		outline: 2px solid transparent;
	}
`;

const Checkmark = styled.span`
	height: 25px;
	width: 25px;
	cursor: pointer;
	box-shadow: inset 0 1px 8px 0 rgba(0,0,0,0.3);
	background-color: ${ colors.$color_background_light };

	:hover {
		background-color: ${ colors.$color_grey_hover }
	};
`;

const Label = styled.label`
	cursor: pointer;
	margin-left: 8px;
`;

/**
 * Custom Yoast-styled checkbox input component.
 * (Since default checkbox element cannot be easily styled with CSS).
 */
class Checkbox extends React.Component {
	render() {
		return (
			<CheckboxWrapper>
				<CheckboxInput
					id={ this.props.id }
					onChange={ this.props.onCheck }
					checked={ this.props.checked }
					type="checkbox"
				/>
				<Checkmark className="checkmark"/>
				<Label htmlFor={ this.props.id }>{ this.props.labelText }</Label>
			</CheckboxWrapper>
		);
	}
}

Checkbox.propTypes = {
	id: PropTypes.string.isRequired,
	labelText: PropTypes.string.isRequired,
	onCheck: PropTypes.func.isRequired,
	checked: PropTypes.bool.isRequired,
};

export default Checkbox;
