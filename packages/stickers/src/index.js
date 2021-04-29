/*
 * Copyright 2021 Google LLC
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
 * Internal dependencies
 */
import { default as sample } from './sampleSticker';
import * as beautyStickers from './beauty';
import * as cookingStickers from './cooking';
import * as diyStickers from './diy';
import * as entertainmentStickers from './entertainment';
import * as fashionStickers from './fashion';
import * as fitnessStickers from './fitness';
import { default as travelStickers } from './travel';
import * as wellbeingStickers from './wellbeing';
import * as cookingStickersV2 from './cooking-02';
import * as wellnessStickers from './wellness';
import * as artsAndCraftStickers from './arts-and-craft';
import { default as technologyStickers } from './technology';
import { default as homeGardenStickers } from './home-garden';

export default {
  sample,
  ...beautyStickers,
  ...cookingStickers,
  ...diyStickers,
  ...entertainmentStickers,
  ...fashionStickers,
  ...fitnessStickers,
  ...travelStickers,
  ...wellbeingStickers,
  ...cookingStickersV2,
  ...wellnessStickers,
  ...artsAndCraftStickers,
  ...technologyStickers,
  ...homeGardenStickers,
};
