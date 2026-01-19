"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { LoadingLeaf } from "./loading-leaf";

export function QueryInput({ onSubmit, loading }: { onSubmit: (query: string) => void; loading: boolean }) {
  const [query, setQuery] = useState("");

  return (
    <div className="jungle-card p-6">
      <label className="block text-sm text-emerald-100">Treasure Map Query</label>
      <div className="mt-4 flex flex-col gap-3 md:flex-row">
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Ask about symptoms, treatments, or comparisons..."
          aria-label="Medical query"
          list="medical-suggestions"
        />
        <datalist id="medical-suggestions">
          <option value="Symptoms of malaria" />
          <option value="Compare dengue vs malaria" />
          <option value="Treatment guidelines for pneumonia" />
          <option value="Symptoms of dehydration" />
          <option value="Fever in tropical diseases" />
        </datalist>
        <Button onClick={() => onSubmit(query)} disabled={loading || !query.trim()}>
          {loading ? "Exploring..." : "Ask"}
        </Button>
      </div>
      {loading && <LoadingLeaf />}
    </div>
  );
}
