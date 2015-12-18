Sites Dropdown
==============

Renders a dropdown component for selecting a site. This is the canonical site picker component for using whenever you need to offer users a site selection flow.

It support searching if you have many sites, handles sites with empty titles, sites with redirects, etc.

#### How to use:

```js
import SitesDropdown 'components/sites-dropdown';

render() {
	return (
		<SitesDropdown />
	);
}
```

#### Props

* `selected` (`number|string`) — Index or slug of the initial selection
* `showAllSites` (`bool`) — `true` to display the _All My Sites_ option
* `indicator` (`bool`) — `true` to show the status indicator badge against each site
* `autoFocus` (`bool`) — `true` to set focus in search box
* `onClose` (`function`) — called on site selection
* `onSiteSelect` (`function`) - called with the site `slug` on site selection
* `filter` (`function`) - If present, passed to `sites.filter()` to display a subset of sites. Return `true` to display a site.


