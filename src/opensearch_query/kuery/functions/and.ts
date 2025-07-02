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

import {IIndexPattern} from 'src/index_patterns/types'
import * as ast from '../ast'
import {KueryNode} from '../types'

export function buildNodeParams(children: KueryNode[]) {
  return {
    arguments: children,
  }
}

export function toOpenSearchQuery(
  node: KueryNode,
  indexPattern?: IIndexPattern,
  config: Record<string, any> = {},
  context: Record<string, any> = {}
) {
  const children = node.arguments || []

  // Flatten nested bool queries to reduce nesting
  const flattenedQueries: any[] = []
  
  children.forEach((child: KueryNode) => {
    const childQuery = ast.toOpenSearchQuery(child, indexPattern, config, context)
    
    // If child returns a bool query with filter, flatten it
    if (childQuery.bool && (childQuery.bool as any).filter && Array.isArray((childQuery.bool as any).filter)) {
      flattenedQueries.push(...(childQuery.bool as any).filter)
    } else {
      flattenedQueries.push(childQuery)
    }
  })

  return {
    bool: {
      filter: flattenedQueries,
    },
  }
}
