import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const { width, paddingTop, paddingBottom } = attributes;

	const blockProps = useBlockProps.save({
		className: `content-section content-section--${width} content-section--pt-${paddingTop} content-section--pb-${paddingBottom}`,
	});

	return (
		<div {...blockProps}>
			<div className="content-section__container">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
