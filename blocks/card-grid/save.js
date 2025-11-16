import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
  const { columns, cards } = attributes;

  const blockProps = useBlockProps.save({
    className: `card-grid card-grid--columns-${columns}`,
  });

  return (
    <div {...blockProps}>
      <div className="card-grid__container">
        {cards.map((card) => (
          <div key={card.id} className="card">
            {card.image && (
              <div className="card__image-wrapper">
                <img src={card.image} alt="" className="card__image" />
              </div>
            )}

            <div className="card__content">
              <RichText.Content tagName="h3" className="card__title" value={card.title} />
              <RichText.Content tagName="p" className="card__description" value={card.description} />

              {card.linkUrl && (
                <a href={card.linkUrl} className="card__link">
                  {card.linkText}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
