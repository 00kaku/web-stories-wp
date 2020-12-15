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
 * WordPress dependencies
 */
import { select } from '@wordpress/data';
/**
 * Internal dependencies
 */
import name from './name';

/**
 * Retrieve settings.
 *
 * @param state State of store.
 *
 * @return {Object}
 */
export function getSettings(state) {
  return state.settings;
}

/**
 * Get Modal state.
 *
 * @param  {Object} state State of the store.
 * @return {boolean} Flag for open state of modal.
 */
export function getModal(state) {
  return state.modalOpen;
}

/**
 * Get editor instance.
 *
 * @param {Object} state State for the store.
 */
export function getEditor(state) {
  return state.editor;
}

/**
 * Get current view for the store.
 *
 * @param state
 * @return {string}
 */
export function getCurrentView(state) {
  return state.currentView;
}

/**
 *Get settings for current view.
 *
 * @param state
 * @return {string}
 */
export function getCurrentViewSettings(state) {
  const currentView = select(name).getCurrentView();

  return state.settings[currentView];
}

/**
 * Get state for store.
 *
 * @param state
 * @return {Object}
 */
export function getState(state) {
  return state;
}
