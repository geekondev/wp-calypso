/**
 * External dependencies
 */
import moment from 'moment';

export function getDaysUntilUserFacingExpiry( plan ) {
	const { userFacingExpiryMoment } = plan;

	return userFacingExpiryMoment.diff( moment(), 'days' );
};

export function getDaysUntilExpiry( plan ) {
	const { expiryMoment } = plan;

	return expiryMoment.diff( moment(), 'days' );
};

export function isInGracePeriod( plan ) {
	if ( getDaysUntilUserFacingExpiry( plan ) <= 0 && getDaysUntilExpiry( plan ) > 0 ) {
		return true;
	}

	return false;
};
