/**
 * Internal dependencies
 */
import {
	SELECTED_SITE_SET,
	SET_SECTION,
	CURRENT_USER_ID_SET
} from 'state/action-types';

/**
 * Returns an action object to be used in signalling that a site has been set
 * as selected.
 *
 * @param  {Number} siteId Site ID
 * @return {Object}        Action object
 */
export function setSelectedSiteId( siteId ) {
	return {
		type: SELECTED_SITE_SET,
		siteId
	};
}

/**
 * Returns an action object to be used in signalling that the current user ID
 * has been set.
 *
 * @param  {Number} userId User ID
 * @return {Object}        Action object
 */
export function setCurrentUserId( userId ) {
	return {
		type: CURRENT_USER_ID_SET,
		userId
	};
}

export function setSection( section, options = {} ) {
	options.type = SET_SECTION;
	if ( section ) {
		options.section = section;
	}
	options.hasSidebar = ( options.hasSidebar === false ) ? false : true;
	return options;
}
