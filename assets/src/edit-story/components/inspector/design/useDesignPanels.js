/*
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * External dependencies
 */
import { useCallback, useMemo } from 'react';

/**
 * Internal dependencies
 */
import { useStory } from '../../../app';
import { getPanels } from '../../panels';
import updateProperties from './updateProperties';

function useDesignPanels() {
  const {
    state: { selectedElements },
    actions: { deleteSelectedElements, updateSelectedElements },
  } = useStory();

  const panels = useMemo(() => getPanels(selectedElements), [selectedElements]);

  const onSetProperties = useCallback(
    (newPropertiesOrUpdater) => {
      updateSelectedElements({
        properties: (currentProperties) =>
          updateProperties(
            currentProperties,
            newPropertiesOrUpdater,
            /* commitValues */ true
          ),
      });
    },
    [updateSelectedElements]
  );

  return {
    panels,
    panelProperties: {
      onSetProperties,
      deleteSelectedElements,
      selectedElements,
    },
  };
}

export default useDesignPanels;
