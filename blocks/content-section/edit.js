import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, InnerBlocks } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
	const { width, paddingTop, paddingBottom, backgroundColor } = attributes;

	const blockProps = useBlockProps({
		className: `content-section content-section--${width} content-section--pt-${paddingTop} content-section--pb-${paddingBottom}`,
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Section Settings', 'client-website')} initialOpen={true}>
					<SelectControl
						label={__('Width', 'client-website')}
						value={width}
						options={[
							{ label: __('Contained', 'client-website'), value: 'contained' },
							{ label: __('Wide', 'client-website'), value: 'wide' },
							{ label: __('Full Width', 'client-website'), value: 'full' },
						]}
						onChange={(value) => setAttributes({ width: value })}
					/>
					<SelectControl
						label={__('Padding Top', 'client-website')}
						value={paddingTop}
						options={[
							{ label: __('None', 'client-website'), value: 'none' },
							{ label: __('Small', 'client-website'), value: 'small' },
							{ label: __('Medium', 'client-website'), value: 'medium' },
							{ label: __('Large', 'client-website'), value: 'large' },
						]}
						onChange={(value) => setAttributes({ paddingTop: value })}
					/>
					<SelectControl
						label={__('Padding Bottom', 'client-website')}
						value={paddingBottom}
						options={[
							{ label: __('None', 'client-website'), value: 'none' },
							{ label: __('Small', 'client-website'), value: 'small' },
							{ label: __('Medium', 'client-website'), value: 'medium' },
							{ label: __('Large', 'client-website'), value: 'large' },
						]}
						onChange={(value) => setAttributes({ paddingBottom: value })}
					/>
				</PanelBody>
			</InspectorControls>

			<div {...blockProps}>
				<div className="content-section__container">
					<InnerBlocks />
				</div>
			</div>
		</>
	);
}
