import { Router as router } from 'express';

import { getNotes, getNote, createNote, patchNote, deleteNote } from './notes.controller';
import { ownerGuard } from '../../shared/middlewares/owner-guard.middleware';
import { existsGuard } from '../../shared/middlewares/exists-guard.middleware';

export const notesRoutes = router();

notesRoutes.post('/', createNote);
notesRoutes.get('/', getNotes);
notesRoutes.get('/:noteId', existsGuard, getNote);
notesRoutes.patch('/:noteId', existsGuard, ownerGuard, patchNote);
notesRoutes.delete('/:noteId', existsGuard, ownerGuard, deleteNote);
