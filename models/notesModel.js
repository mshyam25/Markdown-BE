import mongoose from 'mongoose'

const notesSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    content: {
      type: String,
      required: true,
      default: '',
    },
    title: {
      type: String,
      requried: true,
      default: 'markdown-notes',
    },
  },
  { timestamps: true }
)

const Notes = mongoose.model('Notes', notesSchema)

export default Notes
