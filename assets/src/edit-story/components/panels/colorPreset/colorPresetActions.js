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
import { useCallback } from 'react';
import styled from 'styled-components';
import { rgba } from 'polished';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { useStory } from '../../../app/story';
import { PatternPropType } from '../../../types';

const ActionsWrapper = styled.div`
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  text-align: center;
  border-top: 1px solid rgba(229, 229, 229, 0.2);
`;

const AddColorPreset = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => rgba(theme.colors.fg.v7, 0.84)};
  cursor: pointer;
  padding: 0;
  line-height: 18px;
  font-size: 13px;
`;

function ColorPresetActions({ color }) {
  const {
    state: {
      story: { colorPresets },
    },
    actions: { updateStory },
  } = useStory();

  const handleAddColorPreset = useCallback(() => {
    if (color) {
      updateStory({
        properties: {
          colorPresets: [...colorPresets, { color }],
        },
      });
    }
  }, [color, colorPresets, updateStory]);
  return (
    <ActionsWrapper>
      <AddColorPreset onClick={handleAddColorPreset}>
        {__('+ Add to Color Preset', 'web-stories')}
      </AddColorPreset>
    </ActionsWrapper>
  );
}

ColorPresetActions.propTypes = {
  color: PatternPropType,
};

export default ColorPresetActions;
