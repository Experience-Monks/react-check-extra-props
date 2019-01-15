'use strict';

const excludeFilter = require('../src/exclude-filter');

describe('Exclude filters', () => {
  test('Exclude is called with default values', () => {
    const srcProps = {};
    const validProps = {};
    const ignoreList = [];

    expect(excludeFilter(srcProps, validProps, ignoreList)).toMatchObject([]);
  });

  test('Only source properties are called and returned', () => {
    const srcProps = { test: 'test', dot: 1, dim: [1, 2] };
    const validProps = {};
    const ignoreList = [];

    expect(excludeFilter(srcProps, validProps, ignoreList)).toMatchObject(['test', 'dot', 'dim']);
  });

  test('Some of the source properties are valid', () => {
    const srcProps = { test: 'test', dot: 1, dim: [1, 2] };
    const validProps = { dot: 2, dit: 1 };
    const ignoreList = [];

    expect(excludeFilter(srcProps, validProps, ignoreList)).toMatchObject(['test', 'dim']);
  });

  test('Some of the source properties are valid and other ignored', () => {
    const srcProps = { test: 'test', dot: 1, dim: [1, 2] };
    const validProps = { dot: 2, dit: 1 };
    const ignoreList = ['dim'];

    expect(excludeFilter(srcProps, validProps, ignoreList)).toMatchObject(['test']);
  });

  test('Only valid properties and ignore but source is empty', () => {
    const srcProps = {};
    const validProps = { dot: 2, dit: 1 };
    const ignoreList = ['dim'];

    expect(excludeFilter(srcProps, validProps, ignoreList)).toMatchObject([]);
  });
});
