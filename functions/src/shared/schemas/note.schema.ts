import * as joi from 'joi';
import * as createHttpError from 'http-errors';

import { checkTopicExists } from '../../api/topics/topics.service';

export const noteSchema = joi
  .object({
    title: joi
      .string()
      .required()
      .max(100)
      .label('Title'),
    text: joi
      .string()
      .required()
      .label('Text'),
    topicId: joi
      .string()
      .required()
      .external(async (topicId) => {
        if (topicId && !await checkTopicExists(topicId)) {
          throw new createHttpError.UnprocessableEntity('Topic doesn\'t exist');
        }
      })
      .label('Topic'),
    userId: joi
      .string()
      .required()
      .label('User'),
  })
  .messages({
    ['string.base']: '{{#label}} must be a string',
    ['string.max']: '{{#label}} must contain maximum {{#limit}} characters',
    ['any.required']: '{{#label}} is required',
  })
  .error(err => {
    // eslint-disable-next-line no-useless-escape
    return new createHttpError.UnprocessableEntity(err[0].toString().replace(/\"/g, ''));
  });
