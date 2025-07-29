import mongoose from "mongoose";

const snippetSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    default: "plaintext",
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
}, {
  timestamps: true,
});

const Snippet = mongoose.models.Snippet || mongoose.model("Snippet", snippetSchema);
export default Snippet;
