/**
 * External dependencies
 */
import React from 'react';

/**
 * Internal dependencies
 */
import SectionHeader from 'components/section-header';

export default React.createClass( {

	displayName: 'Plugins-list-header',

	propTypes: {
		bulkManagement: React.PropTypes.bool,
		site: React.PropTypes.object.isRequired,
		plugins: React.PropTypes.array.isRequired,
		selected: React.PropTypes.array.isRequired,
		onToggle: React.PropTypes.function
	},

	renderCurrentActionButtons( isWpCom ) {
		let buttons = [];
		let rightSideButtons = [];
		let leftSideButtons = [];
		let updateButtons = [];
		let activateButtons = [];

		const hasWpcomPlugins = this.props.selected.some( property( 'wpcom' ) );
		const isJetpackSelected = this.props.plugins.some( plugin => plugin.selected && 'jetpack' === plugin.slug );
		const needsRemoveButton = this.props.selected.length && ! hasWpcomPlugins && this.canUpdatePlugins() && ! isJetpackSelected;
		if ( ! this.props.bulkManagement ) {
			if ( ! isWpCom && 0 < this.state.pluginUpdateCount ) {
				rightSideButtons.push(
					<ButtonGroup key="plugins__buttons-update-all">
						<Button compact primary onClick={ this.updateAllPlugins } >
							{ this.translate( 'Update All', { context: 'button label' } ) }
						</Button>
					</ButtonGroup>
				);
			}
			rightSideButtons.push(
				<ButtonGroup key="plugins__buttons-bulk-management"><Button compact onClick={ this.toggleBulkManagement } selected={ this.props.bulkManagement }>{ this.translate( 'Edit All', { context: 'button label' } ) }</Button></ButtonGroup>
			);
			if ( ! isWpCom && this.canAddNewPlugins() ) {
				const selectedSite = this.props.sites.getSelectedSite();
				const browserUrl = '/plugins/browse' + ( selectedSite ? '/' + selectedSite.slug : '' );

				rightSideButtons.push(
					<ButtonGroup key="plugins__buttons-browser"><Button compact href={ browserUrl } onClick={ this.onBrowserLinkClick } className="plugins__browser-button"><Gridicon key="plus-icon" icon="plus-small" size={ 12 } /><Gridicon key="plugins-icon" icon="plugins" size={ 18 } /></Button></ButtonGroup>
				);
			}
		} else {
			activateButtons.push( <Button key="plugins__buttons-activate" disabled={ ! this.areSelected( 'inactive' ) } compact onClick={ this.activateSelected }>{ this.translate( 'Activate' ) }</Button> )
			let deactivateButton = isJetpackSelected
				? <Button key="plugins__buttons-deactivate" disabled={ ! this.areSelected( 'active' ) } compact onClick={ this.deactiveAndDisconnectSelected }>{ this.translate( 'Disconnect' ) }</Button>
				: <Button key="plugins__buttons-disable" disabled={ ! this.areSelected( 'active' ) } compact onClick={ this.deactivateSelected }>{ this.translate( 'Deactivate' ) }</Button>;
			activateButtons.push( deactivateButton )
			leftSideButtons.push( <ButtonGroup key="plugins__buttons-activate-buttons">{ activateButtons }</ButtonGroup> );

			if ( this.hasJetpackSelectedSites() && ! isWpCom ) {
				updateButtons.push( <Button key="plugins__buttons-autoupdate-on" disabled={ hasWpcomPlugins || ! this.canUpdatePlugins() } compact onClick={ this.setAutoupdateSelected }>{ this.translate( 'Autoupdate' ) }</Button> );
				updateButtons.push( <Button key="plugins__buttons-autoupdate-off" disabled={ hasWpcomPlugins || ! this.canUpdatePlugins() } compact onClick={ this.unsetAutoupdateSelected }>{ this.translate( 'Disable Autoupdates' ) }</Button> );

				leftSideButtons.push( <ButtonGroup key="plugins__buttons-update-buttons">{ updateButtons }</ButtonGroup> );
				leftSideButtons.push( <ButtonGroup key="plugins__buttons-remove-button"><Button disabled={ ! needsRemoveButton } compact scary onClick={ this.removePluginNotice }>{ this.translate( 'Remove' ) }</Button></ButtonGroup> );
			}

			rightSideButtons.push(
				<button key="plugins__buttons-close-button" className="plugins__section-actions-close" onClick={ this.toggleBulkManagement }>
					<span className="screen-reader-text">{ this.translate( 'Close' ) }</span>
					<Gridicon icon="cross" />
				</button>
			);
		}

		buttons.push( <span key="plugins__buttons-action-buttons" className="plugins__action-buttons">{ leftSideButtons }</span> );
		buttons.push( <span key="plugins__buttons-global-buttons" className="plugins__mode-buttons">{ rightSideButtons }</span> );

		return buttons;
	},

	renderCurrentActionDropdown() {
		let options = [];
		let actions = [];

		const hasWpcomPlugins = this.props.selected.some( property( 'wpcom' ) );
		const isJetpackSelected = this.props.plugins.some( plugin => plugin.selected && 'jetpack' === plugin.slug );
		const needsRemoveButton = !! this.props.selected.length && ! hasWpcomPlugins && this.canUpdatePlugins() && ! isJetpackSelected;

		if ( this.props.bulkManagement ) {
			options.push( <DropdownItem key="plugin__actions_title" selected={ true } v1alue="Actions">{ this.translate( 'Actions' ) }</DropdownItem> );
			options.push( <DropdownSeparator key="plugin__actions_separator_1" /> );

			options.push( <DropdownItem key="plugin__actions_activate" disabled={ ! this.areSelected( 'inactive' ) } onClick={ this.activateSelected }>{ this.translate( 'Activate' ) }</DropdownItem> );

			let deactivateAction = isJetpackSelected
				? <DropdownItem key="plugin__actions_disconnect" disabled={ ! this.areSelected( 'active' ) } onClick={ this.deactiveAndDisconnectSelected }>{ this.translate( 'Disconnect' ) }</DropdownItem>
				: <DropdownItem key="plugin__actions_deactivate" disabled={ ! this.areSelected( 'active' ) } onClick={ this.deactivateSelected }>{ this.translate( 'Deactivate' ) }</DropdownItem>;
			options.push( deactivateAction );

			if ( this.hasJetpackSelectedSites() ) {
				options.push( <DropdownSeparator key="plugin__actions_separator_2" /> );
				options.push( <DropdownItem key="plugin__actions_autoupdate" disabled={ hasWpcomPlugins || ! this.canUpdatePlugins() } onClick={ this.setAutoupdateSelected }>{ this.translate( 'Autoupdate' ) }</DropdownItem> );
				options.push( <DropdownItem key="plugin__actions_disable_autoupdate" disabled={ hasWpcomPlugins || ! this.canUpdatePlugins() } onClick={ this.unsetAutoupdateSelected }>{ this.translate( 'Disable Autoupdates' ) }</DropdownItem> );

				options.push( <DropdownSeparator key="plugin__actions_separator_3" /> );
				options.push( <DropdownItem key="plugin__actions_remove" className="plugins__actions_remove_item" disabled={ ! needsRemoveButton } onClick={ this.removePluginNotice } >{ this.translate( 'Remove' ) }</DropdownItem> );
			}

			actions.push( <SelectDropdown compact className="plugins__actions_dropdown" key="plugins__actions_dropdown" selectedText="Actions">{ options }</SelectDropdown> );
		}
		return actions;
	},



	render() {
		return (
			<SectionHeader label={ header } className={ headerClasses } key={ 'plugins__section-header-' + slug } >
				{
					! this.props.bulkManagement
						? null
						: <BulkSelect key="plugins__bulk-select"
							totalElements={ this.props.plugins.length }
							selectedElements={ this.props.length }
							onToggle={ this.props.onToggle } />
				}
				{ this.renderCurrentActionDropdown() }
				{ this.renderCurrentActionButtons( isWpCom ) }
			</SectionHeader>
		);

	}

} );