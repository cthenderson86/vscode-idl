import {
  IParsed,
  PopulateScopeDetailAndResetTokenCache,
} from '@idl/parsing/syntax-tree';

import { GetSyntaxProblems } from '../helpers/get-syntax-problems';
import { IDLIndex } from '../idl-index.class';
import { PopulateAndValidateType } from './populate-and-validate-type';
import { PopulateUsesThese } from './populate-uses-these';
import { ValidateVariableUsage } from './tree-handlers/validate-variable-usage';

/**
 * Apply post-processing to a parsed file
 */
export function PostProcessParsed(
  index: IDLIndex,
  file: string,
  parsed: IParsed
) {
  // clear secondary problems
  parsed.postProcessProblems = [];

  /**
   * Reset cache and set scope detail if we need it
   */
  PopulateScopeDetailAndResetTokenCache(parsed);

  /**
   * Populate types of local variables
   */
  PopulateAndValidateType(index, file, parsed);

  /**
   * Validate variables
   */
  ValidateVariableUsage(parsed);

  /**
   * Populate the global tokens that we use
   */
  PopulateUsesThese(index, parsed);

  // update problems for our file
  index.trackSyntaxProblemsForFile(file, GetSyntaxProblems(parsed));
}
