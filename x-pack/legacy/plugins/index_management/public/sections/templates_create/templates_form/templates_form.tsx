/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
import React, { Fragment, useState } from 'react';
import { FormattedMessage } from '@kbn/i18n/react';
import {
  EuiButton,
  EuiButtonEmpty,
  EuiFlexGroup,
  EuiFlexItem,
  EuiForm,
  EuiSpacer,
} from '@elastic/eui';
import { Template } from '../../../../common/types';
import { TemplateSteps } from './template_steps';
import { StepAliases, StepLogistics, StepMappings, StepSettings, StepReview } from './steps';

const defaultTemplate: Template = {
  name: '',
  version: '',
  order: '',
  indexPatterns: [],
  settings: {},
  aliases: {},
  mappings: {},
};
interface Props {
  template: Template;
  updateTemplate: (updatedTemplate: Partial<Template>) => void;
}

export const TemplatesForm: React.FunctionComponent = ({}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [maxCompletedStep, setMaxCompletedStep] = useState<number>(0);
  const [template, setTemplate] = useState<Template>(defaultTemplate);

  const stepComponentMap: { [key: number]: React.FunctionComponent<Props> } = {
    1: StepLogistics,
    2: StepSettings,
    3: StepMappings,
    4: StepAliases,
    5: StepReview,
  };

  const lastStep = Object.keys(stepComponentMap).length;

  const CurrentStepComponent = stepComponentMap[currentStep];

  const updateTemplate = (updatedTemplate: Partial<Template>): void => {
    const newTemplate = { ...template, ...updatedTemplate };
    setTemplate(newTemplate);
  };

  const updateCurrentStep = (step: number) => {
    if (maxCompletedStep < step - 1) {
      return;
    }
    setCurrentStep(step);
    setMaxCompletedStep(step - 1);
  };

  const onBack = () => {
    const previousStep = currentStep - 1;
    setCurrentStep(previousStep);
    setMaxCompletedStep(previousStep - 1);
  };

  const onNext = () => {
    const nextStep = currentStep + 1;
    setMaxCompletedStep(Math.max(currentStep, maxCompletedStep));
    setCurrentStep(nextStep);
  };

  return (
    <Fragment>
      <TemplateSteps
        currentStep={currentStep}
        maxCompletedStep={maxCompletedStep}
        updateCurrentStep={updateCurrentStep}
      />
      <EuiSpacer size="l" />
      <EuiForm>
        <CurrentStepComponent template={template} updateTemplate={updateTemplate} />
        <EuiSpacer size="l" />

        <EuiFlexGroup>
          {currentStep > 1 ? (
            <EuiFlexItem grow={false}>
              <EuiButtonEmpty iconType="arrowLeft" onClick={() => onBack()}>
                <FormattedMessage
                  id="xpack.idxMgmt.templatesForm.backButtonLabel"
                  defaultMessage="Back"
                />
              </EuiButtonEmpty>
            </EuiFlexItem>
          ) : null}
          {currentStep < lastStep ? (
            <EuiFlexItem grow={false}>
              <EuiButton fill iconType="arrowRight" onClick={() => onNext()}>
                <FormattedMessage
                  id="xpack.idxMgmt.templatesForm.nextButtonLabel"
                  defaultMessage="Next"
                />
              </EuiButton>
            </EuiFlexItem>
          ) : null}
          {currentStep === lastStep ? (
            <EuiFlexItem grow={false}>
              <EuiButton
                fill
                color="secondary"
                iconType="check"
                onClick={() => {
                  // TODO implement
                }}
              >
                <FormattedMessage
                  id="xpack.idxMgmt.templatesForm.submitButtonLabel"
                  defaultMessage="Create template"
                />
              </EuiButton>
            </EuiFlexItem>
          ) : null}
        </EuiFlexGroup>
      </EuiForm>
      <EuiSpacer size="m" />
    </Fragment>
  );
};
