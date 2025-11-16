/**
 * WordPress dependencies
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * Save component for Hero Block
 *
 * @param {Object} root0            - Component props
 * @param {Object} root0.attributes - Block attributes
 * @return {Element} Hero block save component
 */
export default function save( { attributes } ) {
	const {
		heading,
		subheading,
		description,
		primaryButtonText,
		primaryButtonUrl,
		secondaryButtonText,
		secondaryButtonUrl,
		variant,
		alignment,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: `hero hero--${ variant } hero--${ alignment }`,
	} );

	return (
		<div { ...blockProps }>
			<div className="hero__container">
				<div className="hero__content">
					{ subheading && (
						<RichText.Content
							tagName="p"
							className="hero__subheading"
							value={ subheading }
						/>
					) }
					{ heading && (
						<RichText.Content
							tagName="h1"
							className="hero__heading"
							value={ heading }
						/>
					) }
					{ description && (
						<RichText.Content
							tagName="p"
							className="hero__description"
							value={ description }
						/>
					) }
					<div className="hero__actions">
						{ primaryButtonText && (
							<a
								href={ primaryButtonUrl }
								className="btn btn--primary btn--large"
							>
								{ primaryButtonText }
							</a>
						) }
						{ secondaryButtonText && (
							<a
								href={ secondaryButtonUrl }
								className="btn btn--secondary btn--large"
							>
								{ secondaryButtonText }
							</a>
						) }
					</div>
				</div>
			</div>
		</div>
	);
}
