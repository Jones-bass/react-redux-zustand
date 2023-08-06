import { useCurrentLesson } from "../store/slices/Player"

export function Header() {
  const { currentModule, currentLesson } = useCurrentLesson()

  if (!currentModule || !currentLesson) {
    return null
  }

  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-2xl font-bold">{currentLesson.title}</h1>
      <span className="text-sm text-zinc-400">Modulo "{currentModule.title}"</span>
    </div>
  )
}
