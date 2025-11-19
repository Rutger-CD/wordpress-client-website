/**
 * WordPress dependencies
 */
import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * Save component for Testimonial Block
 *
 * @param {Object} root0            - Component props
 * @param {Object} root0.attributes - Block attributes
 * @return {Element} Testimonial block save component
 */
export default function save( { attributes } ) {
	const {
		quote,
		authorName,
		authorRole,
		authorImageUrl,
		rating,
		variant,
		showRating,
	} = attributes;

	const blockProps = useBlockProps.save( {
		className: `testimonial testimonial--${ variant }`,
	} );

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
		<div { ...blockProps }>
			<div className="testimonial__container">
				{ showRating && (
					<div className="testimonial__rating">
						{ renderStars() }
					</div>
				) }

				<blockquote className="testimonial__quote">
					{ quote && (
						<RichText.Content
							tagName="p"
							value={ quote }
							className="testimonial__text"
						/>
					) }
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
						{ authorName && (
							<RichText.Content
								tagName="cite"
								value={ authorName }
								className="testimonial__author-name"
							/>
						) }
						{ authorRole && (
							<RichText.Content
								tagName="p"
								value={ authorRole }
								className="testimonial__author-role"
							/>
						) }
					</div>
				</div>
			</div>
		</div>
	);
}
