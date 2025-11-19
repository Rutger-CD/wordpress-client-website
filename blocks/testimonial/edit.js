/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	useBlockProps,
	RichText,
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
} from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	RangeControl,
	ToggleControl,
	Button,
} from '@wordpress/components';

/**
 * Edit component for Testimonial Block
 *
 * @param {Object}   root0               - Component props
 * @param {Object}   root0.attributes    - Block attributes
 * @param {Function} root0.setAttributes - Function to update attributes
 * @return {Element} Testimonial block edit component
 */
export default function Edit( { attributes, setAttributes } ) {
	const {
		quote,
		authorName,
		authorRole,
		authorImageUrl,
		authorImageId,
		rating,
		variant,
		showRating,
	} = attributes;

	const blockProps = useBlockProps( {
		className: `testimonial testimonial--${ variant }`,
	} );

	const onSelectImage = ( media ) => {
		setAttributes( {
			authorImageUrl: media.url,
			authorImageId: media.id,
		} );
	};

	const onRemoveImage = () => {
		setAttributes( {
			authorImageUrl: '',
			authorImageId: 0,
		} );
	};

	// Render stars for rating
	const renderStars = () => {
		const stars = [];
		for ( let i = 1; i <= 5; i++ ) {
			stars.push(
				<span
					key={ i }
					className={ `testimonial__star ${
						i <= rating
							? 'testimonial__star--filled'
							: 'testimonial__star--empty'
					}` }
				>
					★
				</span>
			);
		}
		return stars;
	};

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={ __( 'Testimonial Settings', 'client-website' ) }
					initialOpen={ true }
				>
					<SelectControl
						label={ __( 'Variant', 'client-website' ) }
						value={ variant }
						options={ [
							{
								label: __( 'Default', 'client-website' ),
								value: 'default',
							},
							{
								label: __( 'Card', 'client-website' ),
								value: 'card',
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
					<ToggleControl
						label={ __( 'Show Rating', 'client-website' ) }
						checked={ showRating }
						onChange={ ( value ) =>
							setAttributes( { showRating: value } )
						}
					/>
					{ showRating && (
						<RangeControl
							label={ __( 'Rating', 'client-website' ) }
							value={ rating }
							onChange={ ( value ) =>
								setAttributes( { rating: value } )
							}
							min={ 1 }
							max={ 5 }
							step={ 1 }
						/>
					) }
				</PanelBody>
				<PanelBody
					title={ __( 'Author Image', 'client-website' ) }
					initialOpen={ false }
				>
					<MediaUploadCheck>
						<MediaUpload
							onSelect={ onSelectImage }
							allowedTypes={ [ 'image' ] }
							value={ authorImageId }
							render={ ( { open } ) => (
								<div className="testimonial__image-upload">
									{ ! authorImageUrl ? (
										<Button
											onClick={ open }
											variant="secondary"
										>
											{ __(
												'Upload Author Image',
												'client-website'
											) }
										</Button>
									) : (
										<>
											<img
												src={ authorImageUrl }
												alt={ authorName }
												className="testimonial__author-image-preview"
											/>
											<Button
												onClick={ open }
												variant="secondary"
												style={ {
													marginTop: '10px',
													marginRight: '10px',
												} }
											>
												{ __(
													'Replace Image',
													'client-website'
												) }
											</Button>
											<Button
												onClick={ onRemoveImage }
												variant="tertiary"
												isDestructive
												style={ {
													marginTop: '10px',
												} }
											>
												{ __(
													'Remove Image',
													'client-website'
												) }
											</Button>
										</>
									) }
								</div>
							) }
						/>
					</MediaUploadCheck>
				</PanelBody>
			</InspectorControls>

			<div { ...blockProps }>
				<div className="testimonial__container">
					{ showRating && (
						<div className="testimonial__rating">
							{ renderStars() }
						</div>
					) }

					<blockquote className="testimonial__quote">
						<RichText
							tagName="p"
							value={ quote }
							onChange={ ( value ) =>
								setAttributes( { quote: value } )
							}
							placeholder={ __(
								'Enter testimonial quote…',
								'client-website'
							) }
							className="testimonial__text"
						/>
					</blockquote>

					<div className="testimonial__author">
						{ authorImageUrl && (
							<img
								src={ authorImageUrl }
								alt={ authorName }
								className="testimonial__author-image"
							/>
						) }
						<div className="testimonial__author-info">
							<RichText
								tagName="cite"
								value={ authorName }
								onChange={ ( value ) =>
									setAttributes( { authorName: value } )
								}
								placeholder={ __(
									'Author name…',
									'client-website'
								) }
								className="testimonial__author-name"
							/>
							<RichText
								tagName="p"
								value={ authorRole }
								onChange={ ( value ) =>
									setAttributes( { authorRole: value } )
								}
								placeholder={ __(
									'Author role…',
									'client-website'
								) }
								className="testimonial__author-role"
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
