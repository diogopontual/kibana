/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, { useState, useEffect, Fragment } from 'react';
import { isEmpty, isEqual, mapValues, omit, pick } from 'lodash';
import {
  EuiButtonIcon,
  EuiFlexGroup,
  EuiFlexItem,
  EuiSpacer,
  htmlIdGenerator,
  EuiButtonEmpty,
} from '@elastic/eui';
import { FormattedMessage } from '@kbn/i18n/react';

export interface InputListConfig {
  defaultValue: InputItemModel;
  validateClass: new (value: string) => { toString(): string };
  getModelValue(item?: InputObject): InputItemModel;
  getRemoveBtnAriaLabel(model: InputModel): string;
  onChangeFn(model: InputModel): InputObject;
  hasInvalidValuesFn(model: InputModel): boolean;
  renderInputRow(
    model: InputModel,
    index: number,
    onChangeFn: (index: number, value: string, modelName: string) => void
  ): React.ReactNode;
  modelNames: string | string[];
}
interface InputModelBase {
  id: string;
}
export type InputObject = object;
export interface InputItem {
  model: string;
  value: string;
  isInvalid: boolean;
}

interface InputItemModel {
  [model: string]: InputItem;
}

// InputModel can have the following implementations:
// for Mask List - { id: 'someId', mask: { model: '', value: '', isInvalid: false }}
// for FromTo List - { id: 'someId', from: { model: '', value: '', isInvalid: false }, to: { model: '', value: '', isInvalid: false }}
export type InputModel = InputModelBase & InputItemModel;

interface InputListProps {
  config: InputListConfig;
  list: InputObject[];
  onChange(list: InputObject[]): void;
  setValidity(isValid: boolean): void;
}

const generateId = htmlIdGenerator();
const validateValue = (inputValue: string | undefined, config: InputListConfig) => {
  const result = {
    model: inputValue || '',
    isInvalid: false,
  };
  if (!inputValue) {
    result.isInvalid = false;
    return result;
  }
  try {
    const InputObject = config.validateClass;
    result.model = new InputObject(inputValue).toString();
    result.isInvalid = false;
    return result;
  } catch (e) {
    result.isInvalid = true;
    return result;
  }
};

function InputList({ config, list, onChange, setValidity }: InputListProps) {
  const [models, setModels] = useState(() =>
    list.map(
      item =>
        ({
          id: generateId(),
          ...config.getModelValue(item),
        } as InputModel)
    )
  );
  const hasInvalidValues = models.some(config.hasInvalidValuesFn);

  const updateValues = (modelList: InputModel[]) => {
    setModels(modelList);
    onChange(modelList.map(config.onChangeFn));
  };
  const onChangeValue = (index: number, value: string, modelName: string) => {
    const { model, isInvalid } = validateValue(value, config);
    updateValues(
      models.map((range, arrayIndex) =>
        arrayIndex === index
          ? {
              ...range,
              [modelName]: {
                value,
                model,
                isInvalid,
              },
            }
          : range
      )
    );
  };
  const onDelete = (id: string) => updateValues(models.filter(model => model.id !== id));
  const onAdd = () =>
    updateValues([
      ...models,
      {
        id: generateId(),
        ...config.getModelValue(),
      } as InputModel,
    ]);

  useEffect(() => {
    // resposible for setting up an initial value when there is no default value
    if (!list.length) {
      updateValues([
        {
          id: generateId(),
          ...config.defaultValue,
        } as InputModel,
      ]);
    }
  }, []);

  useEffect(() => {
    setValidity(!hasInvalidValues);
  }, [hasInvalidValues]);

  useEffect(() => {
    // responsible for discarding changes
    if (
      list.length !== models.length ||
      list.some((item, index) => {
        // make model to be the same shape as stored value
        const model: InputObject = mapValues(pick(models[index], config.modelNames), 'model');

        // we need to skip empty values since they are not stored in saved object
        return !isEqual(item, omit(model, isEmpty));
      })
    ) {
      setModels(
        list.map(
          item =>
            ({
              id: generateId(),
              ...config.getModelValue(item),
            } as InputModel)
        )
      );
    }
  }, [list]);

  return (
    <>
      {models.map((item, index) => (
        <Fragment key={item.id}>
          <EuiFlexGroup gutterSize="xs" alignItems="center">
            {config.renderInputRow(item, index, onChangeValue)}
            <EuiFlexItem grow={false}>
              <EuiButtonIcon
                aria-label={config.getRemoveBtnAriaLabel(item)}
                title={config.getRemoveBtnAriaLabel(item)}
                disabled={models.length === 1}
                color="danger"
                iconType="trash"
                onClick={() => onDelete(item.id)}
              />
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiSpacer size="xs" />
        </Fragment>
      ))}
      <EuiSpacer size="s" />
      <EuiFlexItem>
        <EuiButtonEmpty iconType="plusInCircleFilled" onClick={onAdd} size="xs">
          <FormattedMessage
            id="common.ui.aggTypes.ipRanges.addRangeButtonLabel"
            defaultMessage="Add range"
          />
        </EuiButtonEmpty>
      </EuiFlexItem>
    </>
  );
}

export { InputList };
