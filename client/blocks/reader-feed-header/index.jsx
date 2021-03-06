/**
 * External Dependencies
 */
import classnames from 'classnames';
import React, { Component } from 'react';
import url from 'url';
import { localize } from 'i18n-calypso';

/**
 * Internal Dependencies
 */
import Card from 'components/card';
import ReaderFollowButton from 'reader/follow-button';
import resizeImageUrl from 'lib/resize-image-url';
import safeImageUrl from 'lib/safe-image-url';
import Site from 'blocks/site';
import { state as feedState } from 'lib/feed-store/constants';

class FeedHeader extends Component {

	componentWillReceiveProps = ( nextProps ) => {
		if ( nextProps.site !== this.props.site || nextProps.feed !== this.props.feed ) {
			this.setState( {
				siteish: this.buildSiteish( nextProps.site, nextProps.feed )
			} );
		}
	}

	buildSiteish = ( site, feed ) => {
		// a siteish (site-ish) is our little lie to the <Site /> component
		// If we only have a feed, we make up an object that looks enough like a site to pass muster
		let siteish = site && site.toJS();
		if ( ! siteish && feed ) {
			siteish = {
				title: feed.name || ( feed.URL && url.parse( feed.URL ).hostname ) || ( feed.feed_URL && url.parse( feed.feed_URL ).hostname ),
				domain: ( feed.URL && url.parse( feed.URL ).hostname ) || ( feed.feed_URL && url.parse( feed.feed_URL ).hostname ),
				URL: feed.feed_URL || feed.URL
			};
		}
		return siteish;
	}

	state = {
		siteish: this.buildSiteish( this.props.site, this.props.feed )
	}

	getFollowerCount = ( feed, site ) => {
		if ( site && site.get( 'subscribers_count' ) ) {
			return site.get( 'subscribers_count' );
		}

		if ( feed && feed.subscribers_count > 0 ) {
			return feed.subscribers_count;
		}

		return null;
	}

	render() {
		const site = this.props.site,
			feed = this.props.feed,
			headerImage = site && site.getIn( [ 'options', 'header_image' ] ),
			headerColor = site && site.getIn( [ 'options', 'background_color' ] ),
			followerCount = this.getFollowerCount( feed, site );

		let headerImageUrl;

		if ( headerImage && headerImage.get( 'width' ) > 300 ) {
			headerImageUrl = resizeImageUrl(
				safeImageUrl( headerImage.get( 'url' ) ),
				{ w: 600 }
			);
		}

		const classes = classnames( {
			'reader-feed-header': true,
			'is-placeholder': ! this.state.siteish
		} );

		return (
			<div className={ classes }>
				<div className="reader-feed-header__follow">
					{ followerCount ? <span className="reader-feed-header__follow-count"> {
					this.props.translate( '%s follower', '%s followers',
					{ count: followerCount, args: [ this.props.numberFormat( followerCount ) ] } ) }
					</span> : null }
					{ this.props.feed && this.props.feed.state === feedState.COMPLETE ? <div className="reader-feed-header__follow-button">
						<ReaderFollowButton siteUrl={ this.props.feed.feed_URL } iconSize={ 24 } />
					</div> : null }
				</div>
				<Card className="reader-feed-header__site">
					<div className="reader-feed-header__image" style={ headerColor ? { backgroundColor: '#' + headerColor } : null }>
						{ headerImageUrl ? <img src={ headerImageUrl } /> : null }
					</div>
					{ this.state.siteish ? <Site site={ this.state.siteish } href={ this.state.siteish.URL } indicator={ false } /> : null }
					<div className="reader-feed-header__details">
						<span className="reader-feed-header__description">{ ( site && site.get( 'description' ) ) }</span>
					</div>
				</Card>
			</div>
		);
	}
}

export default localize( FeedHeader );
