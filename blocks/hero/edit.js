/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	InspectorControls,
	URLInput,
} from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextControl } from '@wordpress/components';

/**
 * Edit component for Hero Block
 *
 * @param {Object}   root0               - Component props
 * @param {Object}   root0.attributes    - Block attributes
 * @param {Function} root0.setAttributes - Function to update attributes
 * @return {Element} Hero block edit component
 */
export default function Edit( { attributes, setAttributes } ) {
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

	const blockProps = useBlockProps( {
		className: `hero hero--${ variant } hero--${ alignment }`,
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Hero Settings', 'client-website' ) }
					initialOpen={ true }
				>
					<SelectControl
						label={ __( 'Variant', 'client-website' ) }
						value={ variant }
						options={ [
							{
								label: __( 'Gradient', 'client-website' ),
								value: 'gradient',
							},
							{
								label: __( 'Solid', 'client-website' ),
								value: 'solid',
							},
							{
								label: __( 'Minimal', 'client-website' ),
								value: 'minimal',
							},
						] }
						onChange={ ( value ) =>
							setAttributes( { variant: value } )
						}
					/>
					<SelectControl
						label={ __( 'Alignment', 'client-website' ) }
						value={ alignment }
						options={ [
							{
								label: __( 'Left', 'client-website' ),
								value: 'left',
							},
							{
								label: __( 'Center', 'client-website' ),
								value: 'center',
							},
						] }
						onChange={ ( value ) =>
							setAttributes( { alignment: value } )
						}
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Primary Button', 'client-website' ) }
					initialOpen={ false }
				>
					<TextControl
						label={ __( 'Button Text', 'client-website' ) }
						value={ primaryButtonText }
						onChange={ ( value ) =>
							setAttributes( { primaryButtonText: value } )
						}
					/>
					<URLInput
						label={ __( 'Button URL', 'client-website' ) }
						value={ primaryButtonUrl }
						onChange={ ( value ) =>
							setAttributes( { primaryButtonUrl: value } )
						}
					/>
				</PanelBody>
				<PanelBody
					title={ __( 'Secondary Button', 'client-website' ) }
					initialOpen={ false }
				>
					<TextControl
						label={ __( 'Button Text', 'client-website' ) }
						value={ secondaryButtonText }
						onChange={ ( value ) =>
							setAttributes( { secondaryButtonText: value } )
						}
					/>
					<URLInput
						label={ __( 'Button URL', 'client-website' ) }
						value={ secondaryButtonUrl }
						onChange={ ( value ) =>
							setAttributes( { secondaryButtonUrl: value } )
						}
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="hero__container">
					<div className="hero__content">
						<RichText
							tagName="p"
							className="hero__subheading"
							value={ subheading }
							onChange={ ( value ) =>
								setAttributes( { subheading: value } )
							}
							placeholder={ __(
								'Enter subheading…',
								'client-website'
							) }
						/>
						<RichText
							tagName="h1"
							className="hero__heading"
							value={ heading }
							onChange={ ( value ) =>
								setAttributes( { heading: value } )
							}
							placeholder={ __(
								'Enter heading…',
								'client-website'
							) }
						/>
						<RichText
							tagName="p"
							className="hero__description"
							value={ description }
							onChange={ ( value ) =>
								setAttributes( { description: value } )
							}
							placeholder={ __(
								'Enter description…',
								'client-website'
							) }
						/>
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
		</>
	);
}
