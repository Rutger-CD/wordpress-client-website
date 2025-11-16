import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
  const { heading, description, buttonText, buttonUrl, backgroundColor, textAlignment } = attributes;

  const blockProps = useBlockProps.save({
    className: `cta-section cta-section--${backgroundColor} cta-section--align-${textAlignment}`,
  });

  return (
    <div {...blockProps}>
      <div className="cta-section__container">
        <div className="cta-section__content">
          <RichText.Content tagName="h2" className="cta-section__heading" value={heading} />

          <RichText.Content tagName="p" className="cta-section__description" value={description} />

          <div className="cta-section__button-wrapper">
            {buttonUrl ? (
              <a href={buttonUrl} className="button button--primary button--large">
                <RichText.Content value={buttonText} />
              </a>
            ) : (
              <span className="button button--primary button--large">
                <RichText.Content value={buttonText} />
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
