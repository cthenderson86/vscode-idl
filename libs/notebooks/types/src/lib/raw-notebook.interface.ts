import { RawNotebookCell_1_0_0 } from './raw-notebook-1.0.0.interface';
import { RawNotebookCell_2_0_0 } from './raw-notebook-2.0.0.interface';

/**
 * First version of notebook files
 */
export type IDLRawNotebookVersion_1_0_0 = '1.0.0';

/**
 * Second version of notebook files
 */
export type IDLRawNotebookVersion_2_0_0 = '2.0.0';

/**
 * The version of our IDL notebook files
 */
export type IDLRawNotebookVersion =
  | IDLRawNotebookVersion_1_0_0
  | IDLRawNotebookVersion_2_0_0;

/**
 * Strictly typed lookup for constant
 */
interface IDLRawNotebookVersionLookup {
  /** First notebook version */
  _1_0_0: IDLRawNotebookVersion_1_0_0;
  /** Second notebook version */
  _2_0_0: IDLRawNotebookVersion_2_0_0;
}

/**
 * Lookup for raw notebook version for IDL
 */
export const IDL_RAW_NOTEBOOK_VERSION_LOOKUP: IDLRawNotebookVersionLookup = {
  _1_0_0: '1.0.0',
  _2_0_0: '2.0.0',
};

/**
 * Base metadata for notebook cell
 */
export interface IDLRawNotebookCellOutputBase {
  /** type of output */
  mime: string;
}

/**
 * The type of cell for our markdown files
 */
export type IDLRawNotebookCellType = 'code' | 'markdown';

/**
 * Base metadata for notebook cell
 */
export interface IDLRawNotebookCellBase {
  /**
   * The type of cell
   */
  type: IDLRawNotebookCellType;
  /**
   * Notebook cell metadata
   */
  metadata?: { [key: string]: any };
}

/**
 * Format for the raw notebook cell
 */
export type IDLRawNotebookCell<T extends IDLRawNotebookVersion> =
  T extends IDLRawNotebookVersion_2_0_0
    ? RawNotebookCell_2_0_0
    : T extends IDLRawNotebookVersion_1_0_0
    ? RawNotebookCell_1_0_0
    : any;

/**
 * Data structure for IDL notebooks (using VSCode example)
 *
 * DO NOT CHANGE PROPERTY NAMES AS THIS BREAKS PARSING
 */
export interface IDLRawNotebook<T extends IDLRawNotebookVersion> {
  /**
   * Version of the notebook so that, if we change the data structure, we have a
   * property to key off of for migration
   */
  version: T;
  /**
   * The cells within the notebook
   */
  cells: IDLRawNotebookCell<T>[];
  /**
   * Notebook metadata
   */
  metadata?: { [key: string]: any };
}

/**
 * Default notebook contents in case we have an empty file
 */
export const DEFAULT_NOTEBOOK: IDLRawNotebook<IDLRawNotebookVersion_2_0_0> = {
  version: '2.0.0',
  cells: [
    {
      type: 'markdown',
      content: [
        '### IDL Notebook are here!',
        '',
        `If you are new to IDL Notebooks, check out the IDL Notebook example and ENVI Notebook example to get started. You can find these in the IDL sidebar.`,
        '',
        'Notebooks are brand new to IDL and we want to make sure we take community feedback into consideration as we are developing features.',
        '',
        'If you have questions, comments, or concerns, let us know [here](https://github.com/interactive-data-language/vscode-idl/discussions/6) on GitHub.',
      ],
    },
  ],
};

/**
 * Default stringified notebook
 */
export const DEFAULT_SERIALIZED_NOTEBOOK = JSON.stringify(DEFAULT_NOTEBOOK);
