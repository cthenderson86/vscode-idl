import { GlobalTokens, ICompileOptions } from '@idl/data-types/core';
import { LogManager } from '@idl/logger';
import { IDL_INDEX_OPTIONS, IDLIndex } from '@idl/parsing/index';
import { ILocalTokens } from '@idl/parsing/syntax-tree';

IDL_INDEX_OPTIONS.IS_TEST = true;

describe(`[auto generated] Types from`, () => {
  it(`[auto generated] hash operations`, async () => {
    // create index
    const index = new IDLIndex(
      new LogManager({
        alert: () => {
          // do nothing
        },
      }),
      0
    );

    // test code to extract tokens from
    const code = [
      `pro hash_checks`,
      `compile_opt idl2`,
      ``,
      `a = 1 + hash()`,
      ``,
      `b = hash() + list()`,
      ``,
      `c = hash() + hash()`,
      ``,
      `d = hash() + orderedhash()`,
      ``,
      `e = hash() + dictionary()`,
      `end`,
    ];

    // extract tokens
    const tokenized = await index.getParsedProCode('not-real', code, {
      postProcess: true,
    });

    // define expected local variables
    const expectedVars: ILocalTokens = {
      func: {},
      pro: {
        hash_checks: {
          a: {
            type: 'v',
            name: 'a',
            pos: [3, 0, 1],
            meta: {
              display: 'a',
              isDefined: true,
              usage: [[3, 0, 1]],
              docs: '',
              source: 'user',
              type: [{ display: 'any', name: 'any', args: [], meta: {} }],
            },
          },
          b: {
            type: 'v',
            name: 'b',
            pos: [5, 0, 1],
            meta: {
              display: 'b',
              isDefined: true,
              usage: [[5, 0, 1]],
              docs: '',
              source: 'user',
              type: [{ display: 'any', name: 'any', args: [], meta: {} }],
            },
          },
          c: {
            type: 'v',
            name: 'c',
            pos: [7, 0, 1],
            meta: {
              display: 'c',
              isDefined: true,
              usage: [[7, 0, 1]],
              docs: '',
              source: 'user',
              type: [
                {
                  name: 'Hash',
                  display: 'Hash<any>',
                  args: [[{ name: 'any', display: 'any', args: [], meta: {} }]],
                  meta: {},
                },
              ],
            },
          },
          d: {
            type: 'v',
            name: 'd',
            pos: [9, 0, 1],
            meta: {
              display: 'd',
              isDefined: true,
              usage: [[9, 0, 1]],
              docs: '',
              source: 'user',
              type: [
                {
                  name: 'Hash',
                  display: 'Hash<any>',
                  args: [[{ name: 'any', display: 'any', args: [], meta: {} }]],
                  meta: {},
                },
              ],
            },
          },
          e: {
            type: 'v',
            name: 'e',
            pos: [11, 0, 1],
            meta: {
              display: 'e',
              isDefined: true,
              usage: [[11, 0, 1]],
              docs: '',
              source: 'user',
              type: [
                {
                  name: 'Hash',
                  display: 'Hash<any>',
                  args: [[{ name: 'any', display: 'any', args: [], meta: {} }]],
                  meta: {},
                },
              ],
            },
          },
        },
      },
      main: {},
    };

    // verify results
    expect(tokenized.local).toEqual(expectedVars);

    // define expected global variables
    const expectedGlobal: GlobalTokens = [
      {
        type: 'p',
        name: 'hash_checks',
        pos: [0, 4, 11],
        meta: {
          source: 'user',
          args: {},
          docs: '\n```idl\nhash_checks\n```\n',
          docsLookup: {},
          display: 'hash_checks',
          kws: {},
          private: false,
          struct: [],
        },
        file: 'not-real',
      },
    ];

    // verify results
    expect(tokenized.global).toEqual(expectedGlobal);

    // define expected compile options
    const expectedCompile: ICompileOptions = {
      func: {},
      pro: { hash_checks: ['idl2'] },
      main: [],
    };

    // verify results
    expect(tokenized.compile).toEqual(expectedCompile);
  });
});
