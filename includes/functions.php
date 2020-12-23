<?php
/**
 * Miscellaneous functions.
 * These are mostly utility or wrapper functions.
 *
 * @package Google\Web_Stories
 */

/**
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

namespace Google\Web_Stories;

/**
 * Fetch stories based on customizer settings.
 *
 * @param array $args Arguments for fetching stories.
 *
 * @return string|void
 */
function stories( $args = [] ) {
	$story_query = new Story_Query( $args );
	//phpcs:disable WordPress.Security.EscapeOutput.OutputNotEscaped
	echo $story_query->render();
}

/**
 * Wrapper function for fetching field states
 * based on the view types.
 *
 * Mainly uses FieldState and Fields classes.
 *
 * @return array
 */
function fields_states() {
	$theme_support = get_stories_theme_support();
	$views         = $theme_support['view-type'];

	$fields = [
		'title',
		'author',
		'date',
		'image_align',
		'excerpt',
		'archive_link',
	];

	$field_states = [];

	/**
	 * Suppress unused local variable warning.
	 *
	 * @SuppressWarnings(PHPMD.UnusedLocalVariable)
	 */
	foreach ( $views as $view_type => $view_label ) {
		$field_state = ( new Story_Query( [ 'view_type' => $view_type ] ) )->get_renderer()->field();
		foreach ( $fields as $field ) {
			$field_states[ $view_type ][ $field ] = [
				'show'     => $field_state->$field()->show(),
				'label'    => $field_state->$field()->label(),
				'readonly' => $field_state->$field()->readonly(),
			];
		}
	}

	return $field_states;
}

/**
 * Get theme support.
 *
 * @return array
 */
function get_stories_theme_support() {
	$theme_support = get_theme_support( 'web-stories' );
	$theme_support = ! empty( $theme_support[0] ) && is_array( $theme_support[0] ) ? $theme_support[0] : [];

	$default_theme_support = [
		'view-type'                 => [
			'circles' => __( 'Circles', 'web-stories' ),
		],
		'view-type-default'         => 'circles',
		'grid-columns-default'      => 2,
		'title'                     => true,
		'title-default'             => true,
		'author'                    => true,
		'author-default'            => true,
		'date'                      => false,
		'date-default'              => false,
		'stories-archive-link'      => false,
		'stories-archive-label'     => __( 'View all stories', 'web-stories' ),
		'number-of-stories'         => 10,
		'order'                     => [
			'latest'               => __( 'Latest', 'web-stories' ),
			'oldest'               => __( 'Oldest', 'web-stories' ),
			'alphabetical'         => __( 'A -> Z', 'web-stories' ),
			'reverse-alphabetical' => __( 'Z -> A', 'web-stories' ),
		],
		'order-default'             => 'latest',
		'show-story-poster-default' => true,
	];

	$theme_support                         = wp_parse_args( $theme_support, $default_theme_support );
	$theme_support['number-of-stories']    = (int) $theme_support['number-of-stories'];
	$theme_support['grid-columns-default'] = (int) $theme_support['grid-columns-default'];

	return $theme_support;
}
