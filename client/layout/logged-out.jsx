/**
 * External dependencies
 */
var React = require( 'react' ),
	classNames = require( 'classnames' ),
	connect = require( 'react-redux' ).connect;

/**
 * Internal dependencies
 */
var Masterbar = require( './masterbar' ),
	GlobalNotices = require( 'components/global-notices' ),
	notices = require( 'notices' ),
	LoggedOutLayout;

LoggedOutLayout = React.createClass( {
	displayName: 'LayoutLoggedOut',

	render: function() {
		var sectionClass = this.props.section ? ' is-section-' + this.props.section : '',
			classes = classNames( 'wp', sectionClass, {
				'has-no-sidebar': !this.props.hasSidebar
			} );

		return (
			<div className={ classes }>
				<Masterbar />
				<div id="content" className="wp-content">
					<GlobalNotices id="notices" notices={ notices.list } />
					<div id="primary" className="wp-primary wp-section" />
					<div id="secondary" className="wp-secondary" />
				</div>
				<div id="tertiary" className="wp-overlay fade-background" />
			</div>
		);
	}

} );

export default connect(
	( state ) => {
		return {
			isLoading: state.ui.isLoading,
			section: state.ui.section,
			hasSidebar: state.ui.hasSidebar
		};
	}
)( LoggedOutLayout );
