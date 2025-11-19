import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	InspectorControls,
	RichText,
	URLInput,
} from '@wordpress/block-editor';
import { PanelBody, SelectControl, ToggleControl } from '@wordpress/components';

export default function Edit( { attributes, setAttributes } ) {
	const { text, url, variant, size, openInNewTab } = attributes;

	const blockProps = useBlockProps( {
		className: `button-block align${ attributes.align || 'none' }`,
	} );

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Button Settings', 'client-website' ) }>
					<SelectControl
						label={ __( 'Variant', 'client-website' ) }
						value={ variant }
						options={ [
							{
								label: __( 'Primary', 'client-website' ),
								value: 'primary',
							},
							{
								label: __( 'Secondary', 'client-website' ),
								value: 'secondary',
							},
							{
								label: __( 'Tertiary', 'client-website' ),
								value: 'tertiary',
							},
							{
								label: __( 'Danger', 'client-website' ),
								value: 'danger',
							},
							{
								label: __( 'Success', 'client-website' ),
								value: 'success',
							},
							{
								label: __( 'Outline', 'client-website' ),
								value: 'outline',
							},
						] }
						onChange={ ( value ) =>
							setAttributes( { variant: value } )
						}
						help={ __(
							'Choose the button style',
							'client-website'
						) }
					/>

					<SelectControl
						label={ __( 'Size', 'client-website' ) }
						value={ size }
						options={ [
							{
								label: __( 'Small', 'client-website' ),
								value: 'small',
							},
							{
								label: __( 'Medium', 'client-website' ),
								value: 'medium',
							},
							{
								label: __( 'Large', 'client-website' ),
								value: 'large',
							},
						] }
						onChange={ ( value ) =>
							setAttributes( { size: value } )
						}
						help={ __(
							'Choose the button size',
							'client-website'
						) }
					/>

					<ToggleControl
						label={ __( 'Open in new tab', 'client-website' ) }
						checked={ openInNewTab }
						onChange={ ( value ) =>
							setAttributes( { openInNewTab: value } )
						}
					/>
				</PanelBody>

				<PanelBody
					title={ __( 'Link Settings', 'client-website' ) }
					initialOpen={ false }
				>
					<URLInput
						label={ __( 'URL', 'client-website' ) }
						value={ url }
						onChange={ ( value ) =>
							setAttributes( { url: value } )
						}
					/>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<RichText
					tagName="span"
					className={ `button button--${ variant } button--${ size }` }
					value={ text }
					onChange={ ( value ) => setAttributes( { text: value } ) }
					placeholder={ __( 'Button text…', 'client-website' ) }
					allowedFormats={ [] }
				/>
				{ ! url && (
					<p className="button-block__help">
						{ __(
							'Add a URL in the sidebar settings',
							'client-website'
						) }
					</p>
				) }
			</div>
		</>
	);
}
