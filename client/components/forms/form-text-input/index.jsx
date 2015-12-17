/**
 * External dependencies
 */
import React from 'react';
import classNames from 'classnames';
import omit from 'lodash/object/omit';

export default React.createClass( {

	displayName: 'FormTextInput',

	getDefaultProps() {
		return {
			isError: false,
			isValid: false,
			selectOnFocus: false,
			type: 'text'
		};
	},

	focus() {
		this.refs.textField.focus();
	},

	render() {
		const otherProps = omit( this.props, [ 'className', 'type', 'ref' ] );
		const { className, type, selectOnFocus } = this.props;
		const classes = classNames( {
			'form-text-input': true,
			'is-error': this.props.isError,
			'is-valid': this.props.isValid
		} );

		return (
			<input
				{ ...otherProps }
				ref="textField"
				type={ type }
				className={ classNames( className, classes ) }
				onClick={ selectOnFocus ? this.selectOnFocus : null }
			/>
		);
	},

	selectOnFocus( event ) {
		event.target.select();
	}

} );
