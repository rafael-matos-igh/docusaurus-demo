// Keeps openapi/conduit.json in sync with openapi/conduit.yaml (YAML is the source of truth)
// and publishes both files for download at /openapi/.
import {copyFileSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {load} from 'js-yaml';

const doc = load(readFileSync('openapi/conduit.yaml', 'utf8'));
writeFileSync('openapi/conduit.json', JSON.stringify(doc, null, 2) + '\n');

mkdirSync('static/openapi', {recursive: true});
copyFileSync('openapi/conduit.yaml', 'static/openapi/conduit.yaml');
copyFileSync('openapi/conduit.json', 'static/openapi/conduit.json');
console.log('Wrote openapi/conduit.json and copied specs to static/openapi/');
