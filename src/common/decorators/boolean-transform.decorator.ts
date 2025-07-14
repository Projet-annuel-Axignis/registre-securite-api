import { Transform } from 'class-transformer';

/**
 * Transform decorator to convert string boolean values to actual booleans
 * Useful for query parameters that are always strings
 */
export const BooleanTransform = () =>
  Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  }); 