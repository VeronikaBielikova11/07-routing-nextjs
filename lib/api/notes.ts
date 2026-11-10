import type { NewNote, Note, NoteTag } from "@/types/note";
import { api } from "./api";

export interface FetchNotesParams {
  page: number;
  perPage?: number;
  search?: string;
  tag?: NoteTag;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export async function fetchNotes({
  page,
  perPage = 12,
  search,
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> {
  const { data } = await api.get<FetchNotesResponse>("/notes", {
    params: {
      page,
      perPage,
      ...(search ? { search } : {}),
      ...(tag ? { tag } : {}),
    },
  });
  return data;
}

export async function fetchNoteById(id: Note["id"]): Promise<Note> {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
}

export async function createNote(newNote: NewNote): Promise<Note> {
  const { data } = await api.post<Note>("/notes", newNote);
  return data;
}

export async function deleteNote(id: Note["id"]): Promise<Note> {
  const { data } = await api.delete<Note>(`/notes/${id}`);
  return data;
}
