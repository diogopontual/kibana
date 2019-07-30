/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import React from 'react';
import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiTitle,
  EuiButtonEmpty,
  EuiSpacer,
  EuiFormRow,
  EuiText,
  EuiCodeEditor,
} from '@elastic/eui';
import { FormattedMessage } from '@kbn/i18n/react';
import { settingsDocumentationLink } from '../../../../lib/documentation_links';
import { Template } from '../../../../../common/types';

interface Props {
  template: Template;
  updateTemplate: (updatedTemplate: Partial<Template>) => void;
}

export const StepSettings: React.FunctionComponent<Props> = ({ template, updateTemplate }) => {
  const { settings } = template;

  return (
    <div data-test-subj="stepSettings">
      <EuiFlexGroup justifyContent="spaceBetween">
        <EuiFlexItem grow={false}>
          <EuiTitle>
            <h3>
              <FormattedMessage
                id="xpack.idxMgmt.templatesForm.stepSettings.stepTitle"
                defaultMessage="Index settings (optional)"
              />
            </h3>
          </EuiTitle>

          <EuiSpacer size="s" />

          <EuiText>
            <p>
              <FormattedMessage
                id="xpack.idxMgmt.templatesForm.stepSettings.settingsDescription"
                defaultMessage="Define how your indices behave."
              />
            </p>
          </EuiText>
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <EuiButtonEmpty
            size="s"
            flush="right"
            href={settingsDocumentationLink}
            target="_blank"
            iconType="help"
          >
            <FormattedMessage
              id="xpack.idxMgmt.templatesForm.stepSettings.docsButtonLabel"
              defaultMessage="Index settings docs"
            />
          </EuiButtonEmpty>
        </EuiFlexItem>
      </EuiFlexGroup>

      <EuiSpacer size="l" />

      {/* Settings code editor */}
      <EuiFormRow
        label={
          <FormattedMessage
            id="xpack.idxMgmt.templatesForm.stepSettings.fieldIndexSettingsLabel"
            defaultMessage="Index settings"
          />
        }
        fullWidth
      >
        <EuiCodeEditor
          mode="json"
          theme="textmate"
          width="100%"
          setOptions={{
            showLineNumbers: false,
            tabSize: 2,
            maxLines: Infinity,
          }}
          editorProps={{
            $blockScrolling: Infinity,
          }}
          showGutter={false}
          minLines={6}
          aria-label={
            <FormattedMessage
              id="xpack.idxMgmt.templatesForm.stepSettings.fieldIndexSettingsAriaLabel"
              defaultMessage="Index settings editor"
            />
          }
          value={JSON.stringify(settings, null, 2)}
          onChange={(value: string) => {
            try {
              const parsedSettings = JSON.parse(value);
              updateTemplate({ settings: parsedSettings });
            } catch (e) {
              // TODO: handle error
            }
          }}
          data-test-subj="settingsEditor"
        />
      </EuiFormRow>
    </div>
  );
};
