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
import PropTypes from 'prop-types';
import classNames from 'classnames';

/**
 * Internal dependencies
 */
import { useConfig } from '../config';
import {
  CAROUSEL_VIEW_TYPE,
  CIRCLES_VIEW_TYPE,
  GRID_VIEW_TYPE,
} from '../constants';
import StoryCard from './storyCard';

function StoriesPreview(props) {
  const {
    attributes: { align, viewType, sizeOfCircles, fieldState, numOfColumns },
    viewAllLabel,
    stories,
  } = props;

  const { archiveURL } = useConfig();

  const blockClasses = classNames(
    {
      'is-style-default': !fieldState['show_sharp_corners'],
      'is-style-squared': fieldState['show_sharp_corners'],
      'is-carousel':
        CIRCLES_VIEW_TYPE === viewType || CAROUSEL_VIEW_TYPE === viewType,
      [`is-view-type-${viewType}`]: viewType,
      [`columns-${numOfColumns}`]: GRID_VIEW_TYPE === viewType && numOfColumns,
      [`align${align}`]: align,
    },
    'web-stories-list'
  );

  return (
    <div
      className={blockClasses}
      style={{
        '--ws-circle-size':
          'circles' === viewType && sizeOfCircles
            ? `${sizeOfCircles}px`
            : undefined,
      }}
    >
      <div className="web-stories-list__inner-wrapper">
        {stories.map((story) => {
          return (
            <StoryCard
              key={story.id}
              url={story.link}
              title={story.title.rendered}
              excerpt={story.excerpt.rendered ? story.excerpt.rendered : ''}
              date={story.date_gmt}
              author={story._embedded.author[0].name}
              poster={story.featured_media_url}
              imageOnRight={fieldState['show_image_align']}
              isShowingAuthor={fieldState['show_author']}
              isShowingDate={fieldState['show_date']}
              isShowingTitle={fieldState['show_title']}
              isShowingExcerpt={fieldState['show_excerpt']}
              sizeOfCircles={sizeOfCircles}
            />
          );
        })}
      </div>
      {fieldState['show_archive_link'] && (
        <div className="web-stories-list__archive-link">
          <a target="__blank" href={archiveURL}>
            {viewAllLabel}
          </a>
        </div>
      )}
    </div>
  );
}

StoriesPreview.propTypes = {
  attributes: PropTypes.shape({
    align: PropTypes.string,
    viewType: PropTypes.string,
    numOfColumns: PropTypes.number,
    sizeOfCircles: PropTypes.number,
    fieldState: PropTypes.object,
  }),
  stories: PropTypes.array,
  viewAllLabel: PropTypes.string,
};

export default StoriesPreview;
