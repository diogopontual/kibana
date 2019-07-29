/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import React, { useRef } from 'react';
import { FormattedMessage } from '@kbn/i18n/react';
import {
  EuiFormRow,
  EuiFlexGroup,
  EuiFlexItem,
  EuiTitle,
  EuiSpacer,
  EuiText,
  EuiButtonEmpty,
} from '@elastic/eui';
import { MappingsEditor, Mappings } from '../../../../../static/ui';
import { mappingDocumentationLink } from '../../../../lib/documentation_links';

type GetMappingsEditorDataHandler = () => { isValid: boolean; data: Mappings };

export const StepMappings = () => {
  const getMappingsEditorData = useRef<GetMappingsEditorDataHandler>(() => ({
    isValid: true,
    data: {},
  }));

  const setGetMappingsEditorDataHandler = (handler: GetMappingsEditorDataHandler) =>
    (getMappingsEditorData.current = handler);

  return (
    <div data-test-subj="stepSettings">
      <EuiFlexGroup justifyContent="spaceBetween">
        <EuiFlexItem grow={false}>
          <EuiTitle>
            <h3>
              <FormattedMessage
                id="xpack.idxMgmt.templatesForm.stepMappings.stepTitle"
                defaultMessage="Mappings (optional)"
              />
            </h3>
          </EuiTitle>

          <EuiSpacer size="s" />

          <EuiText>
            <p>
              <FormattedMessage
                id="xpack.idxMgmt.templatesForm.stepMappings.mappingsDescription"
                defaultMessage="Define mappings that will be applied to a new index."
              />
            </p>
          </EuiText>
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <EuiButtonEmpty
            size="s"
            flush="right"
            href={mappingDocumentationLink}
            target="_blank"
            iconType="help"
          >
            <FormattedMessage
              id="xpack.idxMgmt.templatesForm.stepMappings.docsButtonLabel"
              defaultMessage="Mapping docs"
            />
          </EuiButtonEmpty>
        </EuiFlexItem>
      </EuiFlexGroup>

      <EuiSpacer size="l" />

      {/* Settings code editor */}
      <EuiFormRow
        label={
          <FormattedMessage
            id="xpack.idxMgmt.templatesForm.stepMappings.fieldMappingsLabel"
            defaultMessage="Mappings"
          />
        }
        fullWidth
      >
        <MappingsEditor
          setGetDataHandler={setGetMappingsEditorDataHandler}
          FormattedMessage={FormattedMessage}
        />
      </EuiFormRow>
    </div>
  );
};
