# OpenSearch Query Builder

A library extracted from OpenSearch Dashboard for Query DSL conversion. This package provides core functionality for OpenSearch/Elasticsearch query builder.

## 📦 Installation

```bash
npm install dsl-builder
```

```bash
yarn add dsl-builder
```

## 🚀 Key Features

### Query DSL Conversion
- KQL (Kibana Query Language) parsing and conversion
- Filter query creation and management
- OpenSearch/Elasticsearch query DSL generation

### Field Type System
- Support for various field types (string, number, date, geo, etc.)
- Specialized query processing for each field type

## 📖 Usage

### KQL Query Conversion

```typescript
import { buildOpenSearchQuery } from 'dsl-builder';

const indexPattern = {
  title: 'logs-*',
  fields: [
    { name: 'status', type: 'string' },
    { name: 'response_time', type: 'number' },
    { name: '@timestamp', type: 'date' }
  ]
};

// Convert KQL query to OpenSearch DSL
const dsl = buildOpenSearchQuery(indexPattern, [
  {
    query: 'status:error AND response_time:>500',
    language: 'kuery'
  }
]);

console.log(JSON.stringify(dsl, null, 2));
```

## 🔧 API Reference

### buildOpenSearchQuery

Converts query objects to OpenSearch DSL.

```typescript
function buildOpenSearchQuery(
  indexPattern: IndexPattern,
  queries: Query[],
  filters: Filter[] = [],
  config: QueryState = {}
): OpenSearchQuery
```

## 📁 Project Structure

```
src/
├── index_patterns/          # Index pattern related functionality
│   ├── fields/             # Field types and mapping
│   ├── index_patterns/     # Index pattern service
│   ├── lib/               # Utility library
│   └── errors/            # Error handling
├── opensearch_query/       # Query DSL conversion
│   ├── kuery/             # KQL parser and converter
│   ├── filters/           # Filter processing
│   └── opensearch_query/  # Main query builder
├── query/                 # Query types and interfaces
├── osd_field_types/       # Field type system
└── utils/                 # Common utilities
```

## 🧪 Testing

```bash
# Run tests
npm test

# Test watch mode
npm run test:watch
```

## 📦 Build

```bash
# TypeScript compilation
npm run build

# Prepare for deployment
npm run prepare
```

## 🤝 Contributing

This project was extracted from the `src/plugins/data/common/index_patterns` module of OpenSearch Dashboard. 

## 📄 License

This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

This library was extracted from the OpenSearch Dashboard project. Thanks to the OpenSearch community.

