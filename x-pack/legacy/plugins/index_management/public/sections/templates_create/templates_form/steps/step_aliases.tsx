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
import { aliasesDocumentationLink } from '../../../../lib/documentation_links';
import { Template } from '../../../../../common/types';

interface Props {
  template: Template;
  updateTemplate: (updatedTemplate: Partial<Template>) => void;
}

export const StepAliases: React.FunctionComponent<Props> = ({}) => {
  return (
    <div data-test-subj="stepAliases">
      <EuiFlexGroup justifyContent="spaceBetween">
        <EuiFlexItem grow={false}>
          <EuiTitle>
            <h3>
              <FormattedMessage
                id="xpack.idxMgmt.templatesForm.stepAliases.stepTitle"
                defaultMessage="Aliases (optional)"
              />
            </h3>
          </EuiTitle>

          <EuiSpacer size="s" />

          <EuiText>
            <p>
              <FormattedMessage
                id="xpack.idxMgmt.templatesForm.stepAliases.aliasesDescription"
                defaultMessage="Use aliases to refer to the destination index by different names when making requests against Elasticsearch APIs."
              />
            </p>
          </EuiText>
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <EuiButtonEmpty
            size="s"
            flush="right"
            href={aliasesDocumentationLink}
            target="_blank"
            iconType="help"
          >
            <FormattedMessage
              id="xpack.idxMgmt.templatesForm.stepAliases.docsButtonLabel"
              defaultMessage="Index aliases docs"
            />
          </EuiButtonEmpty>
        </EuiFlexItem>
      </EuiFlexGroup>

      <EuiSpacer size="l" />

      {/* Aliases code editor */}
      <EuiFormRow
        label={
          <FormattedMessage
            id="xpack.idxMgmt.templatesForm.stepAliases.fieldAliasesLabel"
            defaultMessage="Aliases"
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
              id="xpack.idxMgmt.templatesForm.stepAliases.fieldAliasesAriaLabel"
              defaultMessage="Aliases editor"
            />
          }
          onChange={(value: string) => {
            // todo implement
          }}
          data-test-subj="aliasesEditor"
        />
      </EuiFormRow>
    </div>
  );
};
