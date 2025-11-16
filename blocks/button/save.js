import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save( { attributes } ) {
	const { text, url, variant, size, openInNewTab } = attributes;

	const blockProps = useBlockProps.save( {
		className: `button-block align${ attributes.align || 'none' }`,
	} );

	const buttonClasses = `button button--${ variant } button--${ size }`;

	return (
		<div { ...blockProps }>
			{ url ? (
				<a
					href={ url }
					className={ buttonClasses }
					target={ openInNewTab ? '_blank' : undefined }
					rel={ openInNewTab ? 'noopener noreferrer' : undefined }
				>
					<RichText.Content value={ text } />
				</a>
			) : (
				<span className={ buttonClasses }>
					<RichText.Content value={ text } />
				</span>
			) }
		</div>
	);
}
