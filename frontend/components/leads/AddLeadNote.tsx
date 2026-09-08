"use client";

import { useState } from "react";
import { Plus, StickyNote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCreateLeadActivity } from "@/features/leads/hooks/useCreateLeadActivity";
interface AddLeadNoteProps {
    leadId: string;
}

export default function AddLeadNote({
    leadId,
}: AddLeadNoteProps) {
    const [note, setNote] = useState("");
    const [error, setError] = useState("");
    const createActivity = useCreateLeadActivity();
    const handleSubmit = async () => {
        const trimmedNote = note.trim();
        if (!trimmedNote) {
            setError("Please enter a note.");
            return;
        }
        setError("");

        try {
            await createActivity.mutateAsync({
                leadId,
                description: trimmedNote,
            });

            setNote("");
        } catch (error) {
            console.error("Failed to add note:", error);

            setError(
                "Failed to add note. Please try again."
            );
        }
    };

    return (
        <div className="rounded-lg border bg-white p-6">
            {/* Header */}
            <div className="flex items-center gap-2">
                <div className="rounded-lg bg-blue-50 p-2">
                    <StickyNote className="size-5 text-blue-600" />
                </div>

                <div>
                    <h2 className="text-lg font-semibold">
                        Add Note
                    </h2>

                    <p className="text-sm text-gray-500">
                        Add a note about this lead.
                    </p>
                </div>
            </div>

            {/* Note Input */}
            <div className="mt-4">
                <textarea
                    value={note}
                    onChange={(
                        event: React.ChangeEvent<HTMLTextAreaElement>
                    ) => {
                        setNote(event.target.value);
                        setError("");
                    }}
                    placeholder="Write a note..."
                    rows={4}
                    disabled={createActivity.isPending}
                    className="w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/20 disabled:cursor-not-allowed disabled:opacity-50"
                />

                {error && (
                    <p className="mt-2 text-sm text-red-500">
                        {error}
                    </p>
                )}
            </div>

            {/* Button */}
            <div className="mt-4 flex justify-end">
                <Button
                    type="button"
                    onClick={handleSubmit}
                    disabled={
                        createActivity.isPending ||
                        !note.trim()
                    }
                >
                    <Plus className="mr-2 size-4" />

                    {createActivity.isPending
                        ? "Adding..."
                        : "Add Note"}
                </Button>
            </div>
        </div>
    );
}