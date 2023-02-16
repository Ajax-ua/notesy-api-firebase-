import { RequestHandler } from 'express';

import * as notesService from './notes.service';
import { Note } from '../../shared/models/note.model';
import { noteSchema } from '../../shared/schemas/note.schema';

export const createNote = async (req, res, next) => {
  try {
    const data = {
      ...(req.body || {}),
      userId: req.user.uid,
    };
    await noteSchema.validateAsync(data);
    
    res.json(await notesService.createNote(data));
  } catch (err) {
    next(err);
  }
};

export const getNotes: RequestHandler = async (req, res, next) => {
  try {
    res.json(await notesService.getNotes());
  } catch (err) {
    next(err);
  }
};

export const getNote: RequestHandler = async (req, res, next) => {
  try {
    res.json(await notesService.getNote(req.params.noteId));
  } catch (err) {
    next(err);
  }
};

export const patchNote: RequestHandler = async (req, res, next) => {
  try {
    const body = req.body || {};
    await noteSchema
      .fork(Object.keys(noteSchema.describe().keys), (schema) => schema.optional())
      .validateAsync(body);

    const data: Note = {
      ...body,
      id: req.params.noteId,
    };
    res.json(await notesService.patchNote(data));
  } catch (err) {
    next(err);
  }
};

export const deleteNote: RequestHandler = async (req, res, next) => {
  try {
    res.json(await notesService.deleteNote(req.params.noteId));
  } catch (err) {
    next(err);
  }
};
