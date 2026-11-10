import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { notFound } from "next/navigation";
import { fetchNotes } from "@/lib/api";
import { NOTE_TAGS, type NoteTag } from "@/types/note";
import NotesClient from "./Notes.client";

export const dynamic = "force-dynamic";

const PER_PAGE = 12;

interface NotesByTagProps {
  params: Promise<{ slug: string[] }>;
}

export default async function NotesByTag({ params }: NotesByTagProps) {
  const { slug } = await params;
  const rawTag = slug[0];

  if (slug.length > 1) notFound();

  // "all" means no filter — the tag is not sent to the backend at all
  let tag: NoteTag | undefined;
  if (rawTag !== "all") {
    if (!NOTE_TAGS.includes(rawTag as NoteTag)) notFound();
    tag = rawTag as NoteTag;
  }

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", tag ?? "all", 1, ""],
    queryFn: () => fetchNotes({ page: 1, perPage: PER_PAGE, search: "", tag }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient key={tag ?? "all"} tag={tag} />
    </HydrationBoundary>
  );
}
