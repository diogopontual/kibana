/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */

import { monitorListQueryString } from '../../../../../legacy/plugins/uptime/public/queries';
import { expectFixtureEql } from './expect_fixture_eql';

export default function ({ getService }) {
  describe('monitorList query', () => {
    const supertest = getService('supertest');

    it('will fetch a list of all the monitors', async () => {
      const getMonitorListQuery = {
        operationName: 'MonitorList',
        query: monitorListQueryString,
        variables: {
          dateRangeStart: '2019-01-28T17:40:08.078Z',
          dateRangeEnd: '2019-01-28T19:00:16.078Z',
        },
      };
      const {
        body: { data },
      } = await supertest
        .post('/api/uptime/graphql')
        .set('kbn-xsrf', 'foo')
        .send({ ...getMonitorListQuery });

      expectFixtureEql(data, 'monitor_list');
    });

    it('will fetch a filtered list of all down monitors', async () => {
      const getMonitorListQuery = {
        operationName: 'MonitorList',
        query: monitorListQueryString,
        variables: {
          dateRangeStart: '2019-01-28T17:40:08.078Z',
          dateRangeEnd: '2019-01-28T19:00:16.078Z',
          filters: `{"bool":{"must":[{"match":{"monitor.status":{"query":"down","operator":"and"}}}]}}`,
        },
      };
      const {
        body: { data },
      } = await supertest
        .post('/api/uptime/graphql')
        .set('kbn-xsrf', 'foo')
        .send({ ...getMonitorListQuery });

      expectFixtureEql(data, 'monitor_list_down_filtered');
    });

    it('will fetch a filtered list of all up monitors', async () => {
      const getMonitorListQuery = {
        operationName: 'MonitorList',
        query: monitorListQueryString,
        variables: {
          dateRangeStart: '2019-01-28T17:40:08.078Z',
          dateRangeEnd: '2019-01-28T19:00:16.078Z',
          filters: `{"bool":{"must":[{"match":{"monitor.status":{"query":"up","operator":"and"}}}]}}`,
        },
      };
      const {
        body: { data },
      } = await supertest
        .post('/api/uptime/graphql')
        .set('kbn-xsrf', 'foo')
        .send({ ...getMonitorListQuery });
      expectFixtureEql(data, 'monitor_list_up_filtered');
    });

    // TODO: add filters for host and port
  });
}
