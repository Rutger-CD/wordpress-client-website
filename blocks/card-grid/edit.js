import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, MediaUpload, MediaUploadCheck, RichText } from '@wordpress/block-editor';
import { PanelBody, RangeControl, Button, TextControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
  const { columns, cards } = attributes;

  const blockProps = useBlockProps({
    className: `card-grid card-grid--columns-${columns}`,
  });

  const addCard = () => {
    const newCards = [
      ...cards,
      {
        id: Date.now(),
        image: '',
        title: 'Card Title',
        description: 'Card description goes here',
        linkUrl: '',
        linkText: 'Learn more',
      },
    ];
    setAttributes({ cards: newCards });
  };

  const updateCard = (index, field, value) => {
    const newCards = [...cards];
    newCards[index] = { ...newCards[index], [field]: value };
    setAttributes({ cards: newCards });
  };

  const removeCard = (index) => {
    const newCards = cards.filter((_, i) => i !== index);
    setAttributes({ cards: newCards });
  };

  return (
    <>
      <InspectorControls>
        <PanelBody title={__('Grid Settings', 'client-website')}>
          <RangeControl
            label={__('Columns', 'client-website')}
            value={columns}
            onChange={(value) => setAttributes({ columns: value })}
            min={2}
            max={4}
            help={__('Number of columns in the grid', 'client-website')}
          />
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        <div className="card-grid__container">
          {cards.map((card, index) => (
            <div key={card.id} className="card">
              <div className="card__image-wrapper">
                <MediaUploadCheck>
                  <MediaUpload
                    onSelect={(media) => updateCard(index, 'image', media.url)}
                    allowedTypes={['image']}
                    value={card.image}
                    render={({ open }) => (
                      <Button
                        onClick={open}
                        className={card.image ? 'card__image-button has-image' : 'card__image-button'}
                      >
                        {card.image ? (
                          <img src={card.image} alt="" className="card__image" />
                        ) : (
                          __('Upload Image', 'client-website')
                        )}
                      </Button>
                    )}
                  />
                </MediaUploadCheck>
              </div>

              <div className="card__content">
                <RichText
                  tagName="h3"
                  className="card__title"
                  value={card.title}
                  onChange={(value) => updateCard(index, 'title', value)}
                  placeholder={__('Card title...', 'client-website')}
                />

                <RichText
                  tagName="p"
                  className="card__description"
                  value={card.description}
                  onChange={(value) => updateCard(index, 'description', value)}
                  placeholder={__('Card description...', 'client-website')}
                />

                <div className="card__link-settings">
                  <TextControl
                    label={__('Link URL', 'client-website')}
                    value={card.linkUrl}
                    onChange={(value) => updateCard(index, 'linkUrl', value)}
                    placeholder="https://"
                  />
                  <TextControl
                    label={__('Link Text', 'client-website')}
                    value={card.linkText}
                    onChange={(value) => updateCard(index, 'linkText', value)}
                  />
                </div>
              </div>

              <div className="card__actions">
                <Button isDestructive onClick={() => removeCard(index)}>
                  {__('Remove Card', 'client-website')}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="card-grid__add-button">
          <Button isPrimary onClick={addCard}>
            {__('Add Card', 'client-website')}
          </Button>
        </div>
      </div>
    </>
  );
}
