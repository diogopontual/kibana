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

import { resolve } from 'path';
import { KIBANA_ROOT } from './paths';
import { createEsTestCluster } from '../../es';

import { setupUsers, DEFAULT_SUPERUSER_PASS } from './auth';

export async function runElasticsearch({ config, options }) {
  const { log, esFrom } = options;
  const license = config.get('esTestCluster.license');
  const esArgs = config.get('esTestCluster.serverArgs');
  const esEnvVars = config.get('esTestCluster.serverEnvVars');
  const isSecurityEnabled = esArgs.includes('xpack.security.enabled=true');

  const cluster = createEsTestCluster({
    port: config.get('servers.elasticsearch.port'),
    password: isSecurityEnabled
      ? DEFAULT_SUPERUSER_PASS
      : config.get('servers.elasticsearch.password'),
    license,
    log,
    basePath: resolve(KIBANA_ROOT, '.es'),
    esFrom: esFrom || config.get('esTestCluster.from'),
    dataArchive: config.get('esTestCluster.dataArchive'),
    esArgs,
  });

  await cluster.start(esArgs, esEnvVars);

  if (isSecurityEnabled) {
    await setupUsers(log, config.get('servers.elasticsearch.port'), [
      config.get('servers.elasticsearch'),
      config.get('servers.kibana'),
    ]);
  }

  return cluster;
}
