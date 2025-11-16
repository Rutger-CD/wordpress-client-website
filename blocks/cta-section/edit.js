import { __ } from '@wordpress/i18n';
import { useBlockProps, InspectorControls, RichText, URLInput } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';

export default function Edit({ attributes, setAttributes }) {
  const { heading, description, buttonText, buttonUrl, backgroundColor, textAlignment } = attributes;

  const blockProps = useBlockProps({
    className: `cta-section cta-section--${backgroundColor} cta-section--align-${textAlignment}`,
  });

  return (
    <>
      <InspectorControls>
        <PanelBody title={__('CTA Settings', 'client-website')}>
          <SelectControl
            label={__('Background Color', 'client-website')}
            value={backgroundColor}
            options={[
              { label: __('Primary', 'client-website'), value: 'primary' },
              { label: __('Secondary', 'client-website'), value: 'secondary' },
              { label: __('Neutral', 'client-website'), value: 'neutral' },
              { label: __('Gradient', 'client-website'), value: 'gradient' },
            ]}
            onChange={(value) => setAttributes({ backgroundColor: value })}
            help={__('Choose the background style', 'client-website')}
          />

          <SelectControl
            label={__('Text Alignment', 'client-website')}
            value={textAlignment}
            options={[
              { label: __('Left', 'client-website'), value: 'left' },
              { label: __('Center', 'client-website'), value: 'center' },
            ]}
            onChange={(value) => setAttributes({ textAlignment: value })}
          />
        </PanelBody>

        <PanelBody title={__('Button Settings', 'client-website')} initialOpen={false}>
          <URLInput
            label={__('Button URL', 'client-website')}
            value={buttonUrl}
            onChange={(value) => setAttributes({ buttonUrl: value })}
          />
        </PanelBody>
      </InspectorControls>

      <div {...blockProps}>
        <div className="cta-section__container">
          <div className="cta-section__content">
            <RichText
              tagName="h2"
              className="cta-section__heading"
              value={heading}
              onChange={(value) => setAttributes({ heading: value })}
              placeholder={__('Enter heading...', 'client-website')}
            />

            <RichText
              tagName="p"
              className="cta-section__description"
              value={description}
              onChange={(value) => setAttributes({ description: value })}
              placeholder={__('Enter description...', 'client-website')}
            />

            <div className="cta-section__button-wrapper">
              <RichText
                tagName="span"
                className="button button--primary button--large"
                value={buttonText}
                onChange={(value) => setAttributes({ buttonText: value })}
                placeholder={__('Button text...', 'client-website')}
                allowedFormats={[]}
              />
            </div>

            {!buttonUrl && (
              <p className="cta-section__help">
                {__('Add a button URL in the sidebar settings', 'client-website')}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
