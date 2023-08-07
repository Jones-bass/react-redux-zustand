import { MessageCircle } from "lucide-react";

import { Header } from "../components/Header";
import { Video } from "../components/Video";
import { Module } from "../components/Module";
import { useAppDispatch, useAppSelector } from "../store";
import { useEffect } from "react";
import { loadCourse, useCurrentLesson } from "../store/slices/Player";

export function Player() {
  const dispatch = useAppDispatch()
  const isCourseLoading = useAppSelector(state => state.player.isLoading)

  const modules = useAppSelector(state => {
    return state.player.course?.modules
  })

  const { currentLesson } = useCurrentLesson()

  useEffect(() => {
    dispatch(loadCourse())
  }, []);

  useEffect(() => {
    if (currentLesson) {
      document.title = `Assistindo: ${currentLesson.title}`
    }
  }, [currentLesson]);

  return (
    <div className="h-screen bg-zinc-950 text-zinc-50 flex justify-center items-center">
      <div className="flex w-[1100px] flex-col gap-6">
        <div className="flex items-center justify-between">
          <Header />

          <button className="flex items-center gap-2 rounded bg-violet-500 px-3 py-2 text-sm font-medium text-white hover:bg-violet-600">
            <MessageCircle className="w-4 h-4" />
            Deixar feedback
          </button>
        </div>

        <main className="relative flex overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900 shadow pr-80">
          <div className="flex-1">
            <Video />
          </div>
          <aside className="w-80 absolute top-0 bottom-0 right-0 border-l divide-y-2 divide-zinc-900 border-zinc-800 bg-zinc-900 overflow-y-scroll scrollbar-thin scrollbar-track-zinc-950 scrollbar-thumb-zinc-800">
            {modules && modules.map((module, index) => {
              return (
                <>
                  {isCourseLoading ? (
                    <div className="border shadow rounded-md p-4 mb-10 max-w-sm w-full mx-auto">
                      <div className="animate-pulse flex space-x-4">
                        <div className="rounded-full bg-slate-200 h-10 w-10"></div>
                        <div className="flex-1 space-y-6 py-1">
                          <div className="space-y-3">
                            <div className="grid grid-cols-3 gap-4">
                              <div className="h-2 bg-slate-200 rounded"></div>
                            </div>
                            <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Module
                      key={module.id}
                      moduleIndex={index}
                      title={module.title}
                      amountOfLessons={module.lessons.length}
                    />
                  )}
                </>
              )
            })}
          </aside>
        </main>
      </div>
    </div>
  );
}