import React from "react";
import styled from "styled-components";
import colors from "yoast-components/style-guide/colors.json";
import { Row, RowResponsive, ListTable, Column, ColumnPrimary, ColumnFixedWidth, ColumnMinWidth, makeFullWidth } from "./Tables";
import { injectIntl, intlShape, FormattedDate, defineMessages } from "react-intl";
import downloadIcon from "../icons/download.svg";
import { ListHeading } from "./ListHeading";
import { LargeButton, RedButton, IconButtonLink, LargeButtonLink, makeButtonFullWidth } from "./Button";
import formatAmount from "../../../shared/currency";
import { getInvoiceUrl } from "../functions/api";
import defaults from "../config/defaults.json";

const messages = defineMessages( {
	paymentDetailsTitle: {
		id: "subscription-details.payment-details.title",
		defaultMessage: "Payment details",
	},
	invoicesTitle: {
		id: "subscription-details.invoices.title",
		defaultMessage: "Invoices",
	},
	subscriptionDetailsTitle: {
		id: "subscription-details.subscription-details.title",
		defaultMessage: "Subscription details",
	},
	startDate: {
		id: "subscription-details.payment-details.start-date",
		defaultMessage: "Start date",
	},
	nextBilling: {
		id: "subscription-details.payment-details.next-billing",
		defaultMessage: "Next billing",
	},
	addSites: {
		id: "subscription-details.subscription-details.add-sites",
		defaultMessage: "You can add { howMany } more sites to this subscription.",
	},
	changeLevel: {
		id: "subscription-details.subscription-details.change-level",
		defaultMessage: "Change subscription level",
	},
	cancelSubscription: {
		id: "subscription-details.subscription-details.cancel-subscription",
		defaultMessage: "Cancel subscription",
	},
	addSiteButton: {
		id: "subscription-details.buttons.add-site",
		defaultMessage: "Add site",
	},
	shopButton: {
		id: "subscription-details.buttons.shop",
		defaultMessage: "Shop",
	},
	cancelButton: {
		id: "subscription-details.buttons.cancel",
		defaultMessage: "Cancel",
	},
	invoiceButton: {
		id: "subscription-details.buttons.invoice",
		defaultMessage: "Invoice",
	},
} );

const SubscriptionDetailsContainer = styled.div`
	background-color: ${ colors.$color_white };
	box-shadow: 0 2px 8px 0 rgba(0,0,0,0.3);
	width: 100%;

	@media screen and ( min-width: ${ defaults.css.breakpoint.tablet }px ) {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
`;

const ColumnContainer = styled.div`
	@media screen and ( min-width: ${ defaults.css.breakpoint.tablet }px ) {
		width: calc( 50% - 10px );
	}

	@media screen and ( max-width: ${ defaults.css.breakpoint.tablet }px ) {
		width: 100%;
	}
`;

let ColumnResponsive = makeFullWidth( Column );
let ColumnFixedWidthResponsive = makeFullWidth( ColumnFixedWidth );
let ResponsiveLargeButton = makeButtonFullWidth( LargeButton );
let ResponsiveLargeButtonLink = makeButtonFullWidth( LargeButtonLink );
let ResponsiveRedButton = makeButtonFullWidth( RedButton );
let ResponsiveIconButtonLink = makeButtonFullWidth( IconButtonLink );

/**
 * The SubscriptionDetails component.
 *
 * @param {Object} props The props to use
 *
 * @returns {ReactElement} The rendered SubscriptionDetails component.
 *
 * @constructor
 */
function SubscriptionDetails( props ) {
	let paymentDetailTable = (
		<ListTable>
				<Row hasHeaderLabels={ false } key="start-date">
					<Column ellipsis={ true }>
						{ props.intl.formatMessage( messages.startDate ) }
					</Column>
					<Column ellipsis={ true }>
						<FormattedDate
							value={ props.startDate }
							year='numeric'
							month='long'
							day='2-digit'
						/>
					</Column>
				</Row>
				<Row hasHeaderLabels={ false } key="next-billing">
					<Column ellipsis={ true }>
						{ props.intl.formatMessage( messages.nextBilling ) }
					</Column>
					<Column ellipsis={ true }>
						<FormattedDate
							value={ props.nextBilling }
							year='numeric'
							month='long'
							day='2-digit'
						/>
					</Column>
				</Row>
		</ListTable>
	);

	let subscriptionDetailsTable = (
		<ListTable>
				<RowResponsive hasHeaderLabels={ false } key="remaining-licenses">
					<ColumnPrimary ellipsis={ true }>
						{ props.intl.formatMessage( messages.addSites, { howMany: ( props.max - props.current ) } ) }
					</ColumnPrimary>
					<ColumnResponsive>
						<ResponsiveLargeButton onClick={ props.onAddSite }>
							{ props.intl.formatMessage( messages.addSiteButton ) }
						</ResponsiveLargeButton>
					</ColumnResponsive>
				</RowResponsive>
				<RowResponsive hasHeaderLabels={ false } key="change-level">
					<ColumnPrimary ellipsis={ true }>
						{ props.intl.formatMessage( messages.changeLevel ) }
					</ColumnPrimary>
					<ColumnResponsive>
						<ResponsiveLargeButtonLink to={ props.onShop } aria-label={ props.intl.formatMessage( messages.shopButton ) }>
							{ props.intl.formatMessage( messages.shopButton ) }
						</ResponsiveLargeButtonLink>
					</ColumnResponsive>
				</RowResponsive>
				<RowResponsive hasHeaderLabels={ false } key="cancel">
					<ColumnPrimary ellipsis={ true }>
						{ props.intl.formatMessage( messages.cancelSubscription ) }
					</ColumnPrimary>
					<ColumnResponsive>
						<ResponsiveRedButton onClick={ props.onCancel }>
							{ props.intl.formatMessage( messages.cancelButton ) }
						</ResponsiveRedButton>
					</ColumnResponsive>
				</RowResponsive>
		</ListTable>
	);

	let invoicesTable = (
		<ListTable>
			{ props.invoices.map( ( invoice ) => {
				return <RowResponsive { ...invoice } hasHeaderLabels={ false } key={ invoice.invoiceId }>
					<ColumnMinWidth>
						<FormattedDate
							value={ invoice.invoiceDate }
							year='numeric'
							month='long'
							day='2-digit'
						/>
					</ColumnMinWidth>
					<ColumnMinWidth ellipsis={ true }>
						{ props.intl.formatNumber(
							formatAmount( invoice.invoiceAmount ),
							{
								style: "currency",
								currency: invoice.invoiceCurrency,
								maximumFractionDigits: 0,
							}
						) }
					</ColumnMinWidth>
					<ColumnFixedWidthResponsive>
						<ResponsiveIconButtonLink
							to={ getInvoiceUrl( invoice.invoiceId ) }
							iconSource={ downloadIcon }
							iconSize={ "16px" }>
							{ props.intl.formatMessage( messages.invoiceButton ) }
						</ResponsiveIconButtonLink>
					</ColumnFixedWidthResponsive>
				</RowResponsive>;
			} ) }
		</ListTable>
	);

	return (
		<SubscriptionDetailsContainer>
				<ColumnContainer>
					<ListHeading>
						{ props.intl.formatMessage( messages.paymentDetailsTitle ) }
					</ListHeading>
					{ paymentDetailTable }
				</ColumnContainer>
				<ColumnContainer>
					<ListHeading>
						{ props.intl.formatMessage( messages.subscriptionDetailsTitle ) }
					</ListHeading>
					{ subscriptionDetailsTable }
				</ColumnContainer>
				<ColumnContainer>
					<ListHeading>
						{ props.intl.formatMessage( messages.invoicesTitle ) }
					</ListHeading>
					{ invoicesTable }
				</ColumnContainer>
		</SubscriptionDetailsContainer>
	);
}

SubscriptionDetails.propTypes = {
	startDate: React.PropTypes.instanceOf( Date ).isRequired,
	nextBilling: React.PropTypes.instanceOf( Date ).isRequired,
	invoices: React.PropTypes.array.isRequired,
	max: React.PropTypes.number.isRequired,
	current: React.PropTypes.number.isRequired,
	onAddSite: React.PropTypes.func.isRequired,
	onShop: React.PropTypes.string.isRequired,
	onCancel: React.PropTypes.func.isRequired,
	onInvoiceDownload: React.PropTypes.func.isRequired,
	intl: intlShape.isRequired,
	subscription: React.PropTypes.string,
};

export default injectIntl( SubscriptionDetails );
