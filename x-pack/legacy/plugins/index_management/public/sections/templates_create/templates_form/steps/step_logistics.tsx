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
  EuiDescribedFormGroup,
  EuiFormRow,
  EuiFieldText,
  EuiText,
  EuiFieldNumber,
} from '@elastic/eui';
import { FormattedMessage } from '@kbn/i18n/react';
import { Template } from '../../../../../common/types';
import { templatesDocumentationLink } from '../../../../lib/documentation_links';

interface Props {
  template: Template;
  updateTemplate: (updatedTemplate: Partial<Template>) => void;
}

export const StepLogistics: React.FunctionComponent<Props> = ({ template, updateTemplate }) => {
  const { name, order, version } = template;

  return (
    <div data-test-subj="stepLogistics">
      <EuiFlexGroup justifyContent="spaceBetween">
        <EuiFlexItem grow={false}>
          <EuiTitle>
            <h3>
              <FormattedMessage
                id="xpack.idxMgmt.templatesForm.stepLogistics.stepTitle"
                defaultMessage="Logistics"
              />
            </h3>
          </EuiTitle>

          <EuiSpacer size="s" />

          <EuiText>
            <p>
              <FormattedMessage
                id="xpack.idxMgmt.templatesForm.stepLogistics.logisticsDescription"
                defaultMessage="Define index patterns and other settings that will be applied to the template."
              />
            </p>
          </EuiText>
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <EuiButtonEmpty
            size="s"
            flush="right"
            href={templatesDocumentationLink}
            target="_blank"
            iconType="help"
          >
            <FormattedMessage
              id="xpack.idxMgmt.templatesForm.stepLogistics.docsButtonLabel"
              defaultMessage="Index Templates docs"
            />
          </EuiButtonEmpty>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer size="l" />
      {/* Name */}
      <EuiDescribedFormGroup
        title={
          <EuiTitle size="s">
            <h3>
              <FormattedMessage
                id="xpack.idxMgmt.templatesForm.stepLogistics.nameTitle"
                defaultMessage="Name"
              />
            </h3>
          </EuiTitle>
        }
        description={
          <FormattedMessage
            id="xpack.idxMgmt.templatesForm.stepLogistics.nameDescription"
            defaultMessage="This name will be used as a unique identifier for this template."
          />
        }
        idAria="stepLogisticsNameDescription"
        fullWidth
      >
        <EuiFormRow
          label={
            <FormattedMessage
              id="xpack.idxMgmt.templatesForm.stepLogistics.fieldNameLabel"
              defaultMessage="Name (required)"
            />
          }
          fullWidth
        >
          <EuiFieldText
            value={name}
            onChange={e => {
              updateTemplate({ name: e.target.value });
            }}
            fullWidth
          />
        </EuiFormRow>
      </EuiDescribedFormGroup>
      {/* TODO Index patterns, fetch index patterns */}
      {/* <EuiDescribedFormGroup
        title={
          <EuiTitle size="s">
            <h3>
              <FormattedMessage
                id="xpack.idxMgmt.templatesForm.stepLogistics.indexPatternsTitle"
                defaultMessage="Index patterns"
              />
            </h3>
          </EuiTitle>
        }
        description={
          <FormattedMessage
            id="xpack.idxMgmt.templatesForm.stepLogistics.indexPatternsDescription"
            defaultMessage="Define the index patterns that will be applied to the template."
          />
        }
        idAria="stepLogisticsIndexPatternsDescription"
        fullWidth
      >
        <EuiFormRow
          label={
            <FormattedMessage
              id="xpack.idxMgmt.templatesForm.stepLogistics.fieldIndexPatternsLabel"
              defaultMessage="Index patterns (required)"
            />
          }
          fullWidth
        >
          <EuiFieldText // todo change to combo box
            onChange={e => {
              // todo implement
            }}
            fullWidth
          />
        </EuiFormRow>
      </EuiDescribedFormGroup>

      {/* Order */}
      <EuiDescribedFormGroup
        title={
          <EuiTitle size="s">
            <h3>
              <FormattedMessage
                id="xpack.idxMgmt.templatesForm.stepLogistics.orderTitle"
                defaultMessage="Order"
              />
            </h3>
          </EuiTitle>
        }
        description={
          <FormattedMessage
            id="xpack.idxMgmt.templatesForm.stepLogistics.orderDescription"
            defaultMessage="The order parameter controls the order of merging if multiple templates match an index."
          />
        }
        idAria="stepLogisticsOrderDescription"
        fullWidth
      >
        <EuiFormRow
          label={
            <FormattedMessage
              id="xpack.idxMgmt.templatesForm.stepLogistics.fieldOrderLabel"
              defaultMessage="Order"
            />
          }
          fullWidth
        >
          <EuiFieldNumber
            value={order}
            onChange={e => {
              updateTemplate({ order: Number(e.target.value) });
            }}
            fullWidth
          />
        </EuiFormRow>
      </EuiDescribedFormGroup>{' '}
      {/* Version */}
      <EuiDescribedFormGroup
        title={
          <EuiTitle size="s">
            <h3>
              <FormattedMessage
                id="xpack.idxMgmt.templatesForm.stepLogistics.versionTitle"
                defaultMessage="Version"
              />
            </h3>
          </EuiTitle>
        }
        description={
          <FormattedMessage
            id="xpack.idxMgmt.templatesForm.stepLogistics.versionDescription"
            defaultMessage="A version number can be used to simplify template management by external systems."
          />
        }
        idAria="stepLogisticsVersionDescription"
        fullWidth
      >
        <EuiFormRow
          label={
            <FormattedMessage
              id="xpack.idxMgmt.templatesForm.stepLogistics.fieldVersionLabel"
              defaultMessage="Version"
            />
          }
          fullWidth
        >
          <EuiFieldNumber
            value={version}
            onChange={e => {
              updateTemplate({ version: Number(e.target.value) });
            }}
            fullWidth
          />
        </EuiFormRow>
      </EuiDescribedFormGroup>
    </div>
  );
};
