/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Any modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

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


import {  SavedObjectReference, SavedObjectsMigrationVersion } from './saved_objects';
import { SimpleSavedObject } from './simple_saved_object';

export interface SavedObjectsCreateOptions {
  /**
   * (Not recommended) Specify an id instead of having the saved objects service generate one for you.
   */
  id?: string;
  /** If a document with the given `id` already exists, overwrite it's contents (default=false). */
  overwrite?: boolean;
  /** {@inheritDoc SavedObjectsMigrationVersion} */
  migrationVersion?: SavedObjectsMigrationVersion;
  references?: SavedObjectReference[];
  workspaces?: string[];
}

export interface SavedObjectsBulkCreateObject<T = unknown> extends SavedObjectsCreateOptions {
  type: string;
  attributes: T;
}

/** @public */
export interface SavedObjectsBulkCreateOptions {
  /** If a document with the given `id` already exists, overwrite it's contents (default=false). */
  overwrite?: boolean;
  workspaces?: string[];
}

export interface SavedObjectsBulkUpdateObject<T = unknown> {
  type: string;
  id: string;
  attributes: T;
  version?: string;
  references?: SavedObjectReference[];
}

/** @public */
export interface SavedObjectsBulkUpdateOptions {
  namespace?: string;
}

/** @public */
export interface SavedObjectsUpdateOptions {
  version?: string;
  /** {@inheritDoc SavedObjectsMigrationVersion} */
  migrationVersion?: SavedObjectsMigrationVersion;
  references?: SavedObjectReference[];
}

/** @public */
export interface SavedObjectsBatchResponse<T = unknown> {
  savedObjects: Array<SimpleSavedObject<T>>;
}

/** @public */
export interface SavedObjectsDeleteOptions {
  /** Force deletion of an object that exists in multiple namespaces */
  force?: boolean;
}

/**
 * Return type of the Saved Objects `find()` method.
 *
 * *Note*: this type is different between the Public and Server Saved Objects
 * clients.
 *
 * @public
 */
export interface SavedObjectsFindResponsePublic<T = unknown> extends SavedObjectsBatchResponse<T> {
  total: number;
  perPage: number;
  page: number;
}

export interface SavedObjectsFindOptions {
  type?: string;
  search?: string;
  searchFields?: string[];
  page?: number;
  perPage?: number;
  fields?: string[];
  hasReference?: { type: string; id: string };
  defaultSearchOperator?: string;
  sortField?: string;
  filter?: string;
  namespaces?: string[];
  preference?: string;
  workspaces?: string[];
}

export interface SavedObjectsClientContract {
  create<T = unknown>(
    type: string,
    attributes: T,
    options?: SavedObjectsCreateOptions
  ): Promise<SimpleSavedObject<T>>;

  bulkCreate(
    objects?: SavedObjectsBulkCreateObject[],
    options?: SavedObjectsBulkCreateOptions
  ): Promise<SavedObjectsBatchResponse>;

  delete(
    type: string,
    id: string,
    options?: SavedObjectsDeleteOptions
  ): Promise<{ id: string }>;

  find<T = unknown>(
    options: SavedObjectsFindOptions
  ): Promise<SavedObjectsFindResponsePublic<T>>;

  get<T = unknown>(type: string, id: string): Promise<SimpleSavedObject<T>>;

  bulkGet<T = unknown>(
    objects?: Array<{ id: string; type: string }>
  ): Promise<SavedObjectsBatchResponse<T>>;

  update<T = unknown>(
    type: string,
    id: string,
    attributes: T,
    options?: SavedObjectsUpdateOptions
  ): Promise<SimpleSavedObject<T>>;

  bulkUpdate<T = unknown>(
    objects?: SavedObjectsBulkUpdateObject[]
  ): Promise<SavedObjectsBatchResponse>;
} 