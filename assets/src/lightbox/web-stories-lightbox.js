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
 * Handles the 'amp-story-player' lightbox.
 *
 * Displays the story that user interacted with in a lightbox.
 */
class Lightbox {
  constructor(wrapperDiv, lightboxElement) {
    if (!wrapperDiv || !wrapperDiv.length) {
      return;
    }

    this.lightboxInitialized = false;
    this.wrapperDiv = wrapperDiv;
    this.lightboxElement = lightboxElement;
    this.player = this.lightboxElement.querySelector('amp-story-player');

    if ('undefined' === typeof this.player) {
      return;
    }

    if (this.player.isReady && !this.lightboxInitialized) {
      this.initializeLightbox();
    }

    this.player.addEventListener('ready', () => {
      if (!this.lightboxInitialized) {
        this.initializeLightbox();
      }
    });

    // Event triggered when user clicks on close (X) button.
    this.player.addEventListener('amp-story-player-close', () => {
      this.player.pause();
      this.lightboxElement.classList.toggle('show');
    });
  }

  initializeLightbox() {
    this.stories = this.player.getStories();
    window.wsPlayer = this.player;
    this.lightboxInitialized = true;
  }
}

export default function initializeWebStoryLightbox() {
  const webStoryBlocks = document.getElementsByClassName('web-stories-list');
  const wrapperDiv = document.getElementsByClassName(
    'web-stories-list__lightbox-wrapper'
  );
  const lightboxElement = document.querySelector('.web-stories-list__lightbox');

  const lightBox = new Lightbox(wrapperDiv, lightboxElement);

  const bindStoryClickListeners = (webStoryBlock) => {
    const cards = webStoryBlock.querySelectorAll('.web-stories-list__story');

    cards.forEach((card, index) => {
      card.addEventListener('click', (event) => {
        event.preventDefault();
        lightBox.player.show(lightBox.stories[index].href);
        lightBox.lightboxElement.classList.toggle('show');
      });
    });
  };

  if ('undefined' !== typeof webStoryBlocks && lightBox) {
    Array.from(webStoryBlocks).forEach((webStoryBlock) => {
      bindStoryClickListeners(webStoryBlock);
    });
  }
}
