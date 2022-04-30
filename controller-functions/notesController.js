import Notes from '../models/notesModel.js'
import expressAsyncHandler from 'express-async-handler'

//Description : Get all notes
//Route : GET /notes
//Access : Private authAdmin

const getAllNotes = expressAsyncHandler(async (req, res) => {
  const notes = await Notes.find({})
  if (notes) {
    res.send(notes)
  } else {
    res.status(404)
    throw new Error('No Notes Added yet.')
  }
})

//Description : Creating new note
//Route : POST /notes
//Access : Private auth

const newNoteCreation = expressAsyncHandler(async (req, res) => {
  const { userId, content, title } = req.body

  const note = await Notes.create({
    userId,
    content,
    title,
  })
  if (note) {
    res.status(201)
    res.send('Note added to your Collection.')
  } else {
    res.status(500)
    throw new Error(
      'There was some error in adding your note. Please try again.'
    )
  }
})

//Description : Get a note
//Route : GET /notes/:noteid
//Access : Private auth

const getNote = expressAsyncHandler(async (req, res) => {
  const note = await Notes.findById(req.params.id)
  if (note) {
    res.send(note)
  } else {
    res.status(404)
    throw new Error('Note cannot be found.')
  }
})

//Description : Delete a note
//Route : DELETE /notes/:noteid
//Access : Private auth

const deleteNote = expressAsyncHandler(async (req, res) => {
  console.log(req.params.id)
  const note = await Notes.findById(req.params.id)
  if (note) {
    await note.remove()
    res.status(200)
    res.send('Note Deleted.')
  } else {
    res.status(404)
    throw new Error('Note cannot be found.')
  }
})

// Description Edit Existing Note
// Route       PUT /notes/:noteId
//@access      Private auth

const editNote = expressAsyncHandler(async (req, res) => {
  const { content, title } = req.body
  const note = await Notes.findById(req.params.id)
  if (note) {
    ;(note.title = title), (note.content = content)
    const updatedNote = await note.save()

    if (updatedNote) {
      res.status(201)
      res.send(updatedNote)
    } else {
      res.status(400)
      throw new Error(
        'There was some error in updating your note. Please try again.'
      )
    }
  } else {
    res.status(400)
    throw new Error(
      'There was some error in finding your note. Please try again.'
    )
  }
})

// Description GET notes of a user
// Route       GET /notes/users/:userId
//@access      Private auth

const getUserNotes = expressAsyncHandler(async (req, response) => {
  const { id } = req.body
  console.log(id)
  const notes = await Notes.find({ userId: id })
  console.log(notes)
  if (notes.length > 0) {
    console.log('entering')
    response.json(notes)
  } else {
    response.status(401)
    throw new Error('You havent added a note yet.')
  }
})

export {
  getAllNotes,
  getNote,
  getUserNotes,
  editNote,
  newNoteCreation,
  deleteNote,
}
