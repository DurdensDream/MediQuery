export function JungleError({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-red-400/60 bg-red-50/80 p-4 text-red-700">
      {message}
    </div>
  );
}
