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
import React, { useCallback, useState } from 'react';

/**
 * Internal dependencies
 */

import AnimationTimeline from '../index';

export default {
  title: 'Animations/Timeline',
  component: AnimationTimeline,
};

export const _default = () => {
  const [animations, setAnimations] = useState(
    Array.from(Array(10).keys()).reduce((acc, id) => {
      acc[id] = {
        id,
        duration: 1000,
        offset: id % 2 ? 500 : 0,
      };
      return acc;
    }, {})
  );

  const handleUpdateAnimation = useCallback(({ id }, { duration, offset }) => {
    setAnimations((a) => {
      a[id].duration = duration;
      a[id].offset = offset;
      return { ...a };
    });
  }, []);

  return (
    <AnimationTimeline
      animations={Object.values(animations)}
      duration={3500}
      onUpdateAnimation={handleUpdateAnimation}
    />
  );
};

export const noAnimations = () => {
  const animations = Array.from(Array(10).keys()).map((id) => ({
    id,
    duration: id * 100 + 20,
  }));

  return (
    <AnimationTimeline
      animations={[]}
      duration={5000}
      onUpdateAnimation={() => {}}
    />
  );
};
