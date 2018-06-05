import React from "react";
import styled from "styled-components";
import { LargeButton, LargeSecondaryButton } from "../../Button";
import { FormattedMessage, defineMessages } from "react-intl";
import { speak } from "@wordpress/a11y/build/index";
import _every from "lodash/every";

const messages = defineMessages( {
	discardChanges: {
		id: "discard.changes",
		defaultMessage: "Discard changes",
	},
	savePassword: {
		id: "password.save",
		defaultMessage: "Save password",
	},
} );

const ButtonArea = styled.div`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	flex-direction: row-reverse;
	width: 100%;
`;

const SaveButton = styled( LargeButton )`
	margin: 1em 0;
`;

const DiscardButton = styled( LargeSecondaryButton )`
	margin: 1em 0;
	margin-right: 1em;
`;

/**
 * Returns the rendered Opens in a New Tab Message component.
 *
 * Note about recommended usage: use it as a value to pass to a react-intl
 * FormattedMessage placeholder or in any other way that the final result will
 * make this text inline with the text is added to.
 *
 * @param {ReactElement} savingMessage The feedback after pressed the save button.
 * @param {func} discardChanges The function to discard changes.
 *
 * @returns {ReactElement} The rendered NewTabMessage component.
 */
export default function getFormButtons( savingMessage, discardChanges ) {
	let message = savingMessage;
	return (
		<ButtonArea>
			<SaveButton type="submit">
				<FormattedMessage id={messages.savePassword.id} defaultMessage={messages.savePassword.defaultMessage}/>
			</SaveButton>
			<DiscardButton type="reset" onClick={ discardChanges }>
				<FormattedMessage id={messages.discardChanges.id} defaultMessage={messages.discardChanges.defaultMessage}/>
			</DiscardButton>
			{ message }
		</ButtonArea>
	);
}

/**
 * Whether a form is currently saving.
 *
 * @param { object } props The props of the form.
 *
 * @returns {boolean} Whether a form is saving.
 */
export function isSaving( props ) {
	console.log( "props of formbuttons", props.isSaving );
	return props.isSaving;
}

/**
 * Whether a form is saved.
 *
 * @param { object } props The props of the form.
 *
 * @returns {boolean} Whether a form is currently saving.
 */
export function isSaved( props ) {
	return props.isSaved && _every( [ "userFirstName", "userLastName", "email", "alternativeEmail" ], key => props[ key ] === this.state[ key ] );
}

/**
 * Announces actions after pressing form buttons
 *
 * @param { object } props The props of the form.
 * @param { func } isSaving The function being saving.
 * @param { func } isSaved The function being saved.
 *
 * @returns {boolean} Whether a form is currently saving.
 */
export function announceActions( props ) {
	let message = "";

	if ( isSaving()  ) {
		message = props.intl.formatMessage( messages.saving );
	}

	if ( isSaved( props ) ) {
		message = props.intl.formatMessage( messages.saved );
	}

	speak( message, "assertive" );
}
