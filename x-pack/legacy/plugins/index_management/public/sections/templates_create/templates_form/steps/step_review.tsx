/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
import React, { Fragment } from 'react';
import { i18n } from '@kbn/i18n';
import {
  EuiFlexGroup,
  EuiTitle,
  EuiFlexItem,
  EuiSpacer,
  EuiTabbedContent,
  EuiCodeEditor,
  EuiDescriptionList,
  EuiDescriptionListTitle,
  EuiDescriptionListDescription,
  EuiText,
} from '@elastic/eui';
import { FormattedMessage } from '@kbn/i18n/react';
import { StepProps } from '../types';

const NoneDescriptionText = () => (
  <FormattedMessage
    id="xpack.idxMgmt.templatesForm.stepReview.summaryTab.noneDescriptionText"
    defaultMessage="None"
  />
);

const getDescriptionText = (data: any) => {
  const hasEntries = Object.entries(data).length > 0;

  return hasEntries ? (
    <FormattedMessage
      id="xpack.idxMgmt.templatesForm.stepReview.summaryTab.yesDescriptionText"
      defaultMessage="Yes"
    />
  ) : (
    <FormattedMessage
      id="xpack.idxMgmt.templatesForm.stepReview.summaryTab.noDescriptionText"
      defaultMessage="No"
    />
  );
};

export const StepReview: React.FunctionComponent<StepProps> = ({ template }) => {
  const { name, indexPatterns, version, order, mappings, settings, aliases } = template;

  const numIndexPatterns = indexPatterns.length;

  const SummaryTab = () => (
    <Fragment>
      <EuiSpacer size="m" />

      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiDescriptionList textStyle="reverse">
            <EuiDescriptionListTitle>
              <FormattedMessage
                id="xpack.idxMgmt.templatesForm.stepReview.summaryTab.indexPatternsLabel"
                defaultMessage="Index {numIndexPatterns, plural, one {pattern} other {patterns}}"
                values={{ numIndexPatterns }}
              />
            </EuiDescriptionListTitle>
            <EuiDescriptionListDescription>
              {numIndexPatterns > 1 ? (
                <EuiText>
                  <ul>
                    {indexPatterns.map((indexName: string, i: number) => {
                      return (
                        <li key={`${indexName}-${i}`}>
                          <EuiTitle size="xs">
                            <span>{indexName}</span>
                          </EuiTitle>
                        </li>
                      );
                    })}
                  </ul>
                </EuiText>
              ) : (
                indexPatterns.toString()
              )}
            </EuiDescriptionListDescription>

            <EuiDescriptionListTitle>
              <FormattedMessage
                id="xpack.idxMgmt.templatesForm.stepReview.summaryTab.orderLabel"
                defaultMessage="Order"
              />
            </EuiDescriptionListTitle>
            <EuiDescriptionListDescription>
              {/** TODO verify logic */}
              {typeof order !== 'undefined' ? order : <NoneDescriptionText />}
            </EuiDescriptionListDescription>

            <EuiDescriptionListTitle>
              <FormattedMessage
                id="xpack.idxMgmt.templatesForm.stepReview.summaryTab.versionLabel"
                defaultMessage="Version"
              />
            </EuiDescriptionListTitle>
            <EuiDescriptionListDescription>
              {typeof version !== 'undefined' ? version : <NoneDescriptionText />}
            </EuiDescriptionListDescription>
          </EuiDescriptionList>
        </EuiFlexItem>

        <EuiFlexItem>
          <EuiDescriptionList textStyle="reverse">
            <EuiDescriptionListTitle>
              <FormattedMessage
                id="xpack.idxMgmt.templatesForm.stepReview.summaryTab.settingsLabel"
                defaultMessage="Has index settings"
              />
            </EuiDescriptionListTitle>
            <EuiDescriptionListDescription>
              {getDescriptionText(settings)}
            </EuiDescriptionListDescription>
            <EuiDescriptionListTitle>
              <FormattedMessage
                id="xpack.idxMgmt.templatesForm.stepReview.summaryTab.mappingLabel"
                defaultMessage="Has mappings"
              />
            </EuiDescriptionListTitle>
            <EuiDescriptionListDescription>
              {getDescriptionText(mappings)}
            </EuiDescriptionListDescription>
            <EuiDescriptionListTitle>
              <FormattedMessage
                id="xpack.idxMgmt.templatesForm.stepReview.summaryTab.aliasesLabel"
                defaultMessage="Has aliases"
              />
            </EuiDescriptionListTitle>
            <EuiDescriptionListDescription>
              {getDescriptionText(aliases)}
            </EuiDescriptionListDescription>
          </EuiDescriptionList>
        </EuiFlexItem>
      </EuiFlexGroup>
    </Fragment>
  );

  const JsonTab = () => (
    <Fragment>
      <EuiSpacer size="m" />
      <EuiCodeEditor
        mode="json"
        theme="textmate"
        isReadOnly
        setOptions={{ maxLines: Infinity }}
        value={JSON.stringify(template, null, 2)} // TODO deserialize
        editorProps={{ $blockScrolling: Infinity }}
        aria-label={
          <FormattedMessage
            id="xpack.idxMgmt.templatesForm.stepReview.jsonTab.jsonAriaLabel"
            defaultMessage="Index templates payload"
          />
        }
      />
    </Fragment>
  );

  return (
    <div data-test-subj="stepSummary">
      <EuiFlexGroup justifyContent="spaceBetween">
        <EuiFlexItem grow={false}>
          <EuiTitle>
            <h3>
              <FormattedMessage
                id="xpack.idxMgmt.templatesForm.stepReview.stepTitle"
                defaultMessage="Review details for '{templateName}'"
                values={{ templateName: name }}
              />
            </h3>
          </EuiTitle>
        </EuiFlexItem>
      </EuiFlexGroup>

      <EuiSpacer size="l" />

      <EuiTabbedContent
        tabs={[
          {
            id: 'summary',
            name: i18n.translate('xpack.idxMgmt.templatesForm.stepReview.summaryTabTitle', {
              defaultMessage: 'Summary',
            }),
            content: <SummaryTab />,
          },
          {
            id: 'json',
            name: i18n.translate('xpack.idxMgmt.templatesForm.stepReview.jsonTabTitle', {
              defaultMessage: 'JSON',
            }),
            content: <JsonTab />,
          },
        ]}
      />
    </div>
  );
};
