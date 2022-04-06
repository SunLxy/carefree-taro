import { Rule } from 'rc-field-form/lib/interface';
import { FormInstance } from 'rc-field-form';

export const getRequired = (required: boolean | undefined, rules: Rule[], form: FormInstance) => {
  const isRequired =
    required !== undefined
      ? required
      : !!(
          rules &&
          rules.some((rule) => {
            if (rule && typeof rule === 'object' && rule.required && !rule.warningOnly) {
              return true;
            }
            if (typeof rule === 'function') {
              const ruleEntity = rule(form);
              return ruleEntity && ruleEntity.required && !ruleEntity.warningOnly;
            }
            return false;
          })
        );

  return isRequired;
};
