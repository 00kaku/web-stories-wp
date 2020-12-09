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
 * Import dependencies.
 */
/**
 * WordPress dependencies
 */
import { render } from '@wordpress/element';
import { dispatch, registerStore } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
/**
 * Internal dependencies
 */
import name from './store/name';
import WebStoryMCEStore from './store';
import WebStoriesModal from './containers/Modal';

/**
 * Add button to tinyMCE editor.
 */
(function () {
  tinymce.PluginManager.add('web_stories', function (editor) {
    editor.addButton('web_stories', {
      text: __('Web Stories', 'web-stories'),
      icon: 'books',
      onclick: function () {
        dispatch(name).setEditor(editor);
        dispatch(name).toggleModal(true);
      },
    });
  });
  console.log(registerStore);
})();

/**
 * Render tinyMCE settings modal.
 *
 * @class
 */
const RenderModal = () => {
  const target = document.getElementById('web-stories-tinymce');

  if (target) {
    render(<WebStoriesModal />, target);
  }
};

/**
 * Subscribe to state change in store.
 */
WebStoryMCEStore.subscribe(() => RenderModal());
