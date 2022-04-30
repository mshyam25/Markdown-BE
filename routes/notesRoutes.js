import express from 'express'
import {
  deleteNote,
  editNote,
  getAllNotes,
  getNote,
  getUserNotes,
  newNoteCreation,
} from '../controller-functions/notesController.js'
import { adminAuth, auth } from '../middleware/auth.js'

const router = express.Router()

// /notes

router.route('/').post(auth, newNoteCreation).get(auth, adminAuth, getAllNotes)
router
  .route('/:id')
  .put(auth, editNote)
  .delete(auth, deleteNote)
  .get(auth, getNote)
router.route('/usernotes').post(auth, getUserNotes)

export const notesRouter = router
