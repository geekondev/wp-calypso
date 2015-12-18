// External dependencies
import React from 'react';
import debugModule from 'debug';

// Internal dependencies
import ListManagementDescriptionEdit from './description-edit';
import ListManagementTags from './tags';
import ListManagementSites from './sites';
import ListStore from 'lib/reader-lists/lists';
import ReaderListsStore from 'lib/reader-lists/subscriptions';
import ReaderListsActions from 'lib/reader-lists/actions';
import smartSetState from 'lib/react-smart-set-state';
import Main from 'components/main';
import Navigation from 'reader/list-management/navigation';

const debug = debugModule( 'calypso:reader:list-management' ); //eslint-disable-line no-unused-vars

const ListManagement = React.createClass( {
	propTypes: {
		list: React.PropTypes.shape( {
			owner: React.PropTypes.string.isRequired,
			slug: React.PropTypes.string.isRequired
		} ),
		tab: React.PropTypes.oneOf( [ 'sites', 'tags', 'description-edit' ] ).isRequired,
	},

	smartSetState: smartSetState,

	getInitialState() {
		return this.getStateFromStores();
	},

	getStateFromStores() {
		// Grab the list ID from the list store
		const listDetails = ListStore.get( this.props.list.owner, this.props.list.slug );
		if ( ! listDetails && ! ReaderListsStore.isFetching() ) {
			ReaderListsActions.fetchList( this.props.list.owner, this.props.list.slug );
		}

		return { listDetails };
	},

	componentDidMount() {
		ListStore.on( 'change', this.update );
	},

	componentWillUnmount() {
		ListStore.off( 'change', this.update );
	},

	update() {
		this.smartSetState( this.getStateFromStores() );
	},

	renderTabContent() {
		switch ( this.props.tab ) {
			case 'description-edit':
				return <ListManagementDescriptionEdit list={ this.state.listDetails } />;
			case 'tags':
				return <ListManagementTags list={ this.state.listDetails } />;
			case 'sites':
				return <ListManagementSites list={ this.state.listDetails } />;
		}
	},

	render() {
		return (
			<Main className={ 'list-management-' + this.props.tab }>
				<Navigation selected={ this.props.tab } list={ this.props.list } />
				{ this.renderTabContent() }
			</Main>
		);
	}
} );

export default ListManagement;
