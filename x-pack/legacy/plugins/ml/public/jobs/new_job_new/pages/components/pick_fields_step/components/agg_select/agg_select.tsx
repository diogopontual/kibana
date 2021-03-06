/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import React, { FC, useContext, useState, useEffect } from 'react';
import { EuiComboBox, EuiComboBoxOptionProps, EuiFormRow } from '@elastic/eui';

import { JobCreatorContext } from '../../../job_creator_context';
import { Field, Aggregation, AggFieldPair } from '../../../../../../../../common/types/fields';

// The display label used for an aggregation e.g. sum(bytes).
export type Label = string;

// Label object structured for EUI's ComboBox.
export interface DropDownLabel {
  label: Label;
  agg: Aggregation;
  field: Field;
}

// Label object structure for EUI's ComboBox with support for nesting.
export interface DropDownOption {
  label: Label;
  options: DropDownLabel[];
}

export type DropDownProps = DropDownLabel[] | EuiComboBoxOptionProps[];

interface Props {
  fields: Field[];
  changeHandler(d: EuiComboBoxOptionProps[]): void;
  selectedOptions: EuiComboBoxOptionProps[];
  removeOptions: AggFieldPair[];
}

export const AggSelect: FC<Props> = ({ fields, changeHandler, selectedOptions, removeOptions }) => {
  const { jobValidator, jobValidatorUpdated } = useContext(JobCreatorContext);
  const [validation, setValidation] = useState(jobValidator.duplicateDetectors);
  // create list of labels based on already selected detectors
  // so they can be removed from the dropdown list
  const removeLabels = removeOptions.map(createLabel);

  const options: EuiComboBoxOptionProps[] = fields.map(f => {
    const aggOption: DropDownOption = { label: f.name, options: [] };
    if (typeof f.aggs !== 'undefined') {
      aggOption.options = f.aggs
        .map(
          a =>
            ({
              label: `${a.title}(${f.name})`,
              agg: a,
              field: f,
            } as DropDownLabel)
        )
        .filter(o => removeLabels.includes(o.label) === false);
    }
    return aggOption;
  });

  useEffect(() => {
    setValidation(jobValidator.duplicateDetectors);
  }, [jobValidatorUpdated]);

  return (
    <EuiFormRow error={validation.message} isInvalid={validation.valid === false}>
      <EuiComboBox
        singleSelection={{ asPlainText: true }}
        options={options}
        selectedOptions={selectedOptions}
        onChange={changeHandler}
        isClearable={false}
        isInvalid={validation.valid === false}
      />
    </EuiFormRow>
  );
};

export function createLabel(pair: AggFieldPair | null): string {
  return pair === null ? '' : `${pair.agg.title}(${pair.field.name})`;
}
