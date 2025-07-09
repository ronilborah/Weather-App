"use client"
import Link from "next/link"
import { Plus, Trash2 } from "lucide-react"
import { useCities } from "@/components/city-context"
import { DraggableCityCard } from "@/components/draggable-city-card"
import Silk from "@/components/silk"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
  DragOverlay,
} from "@dnd-kit/core"
import { arrayMove, SortableContext, sortableKeyboardCoordinates, rectSortingStrategy } from "@dnd-kit/sortable"
import { restrictToWindowEdges } from "@dnd-kit/modifiers"
import { useState } from "react"

export default function Home() {
  const { pinnedCities, reorderCities, clearAllCities, isLoading } = useCities()
  const [activeId, setActiveId] = useState<string | null>(null)
  const [showClearConfirm, setShowClearConfirm] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  function handleDragStart(event: DragStartEvent) {
    const { active } = event
    setActiveId(active.id as string)
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = pinnedCities.findIndex((city) => city.id === active.id)
      const newIndex = pinnedCities.findIndex((city) => city.id === over.id)

      const newOrder = arrayMove(pinnedCities, oldIndex, newIndex)
      reorderCities(newOrder)
    }

    setActiveId(null)
  }

  const handleClearAll = () => {
    clearAllCities()
    setShowClearConfirm(false)
  }

  const activeCity = pinnedCities.find((city) => city.id === activeId)

  if (isLoading) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <div className="fixed inset-0 z-0">
          <Silk speed={7} scale={2} color="#1e293b" noiseIntensity={0.8} rotation={0.1} />
        </div>
        <div className="fixed inset-0 z-10 bg-gradient-to-br from-gray-900/60 via-blue-900/40 to-gray-900/60"></div>
        <div className="relative z-20 flex items-center justify-center min-h-screen">
          <div className="text-white text-xl">Loading your cities...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Silk background */}
      <div className="fixed inset-0 z-0">
        <Silk speed={7} scale={2} color="#1e293b" noiseIntensity={0.8} rotation={0.1} />
      </div>

      {/* Gradient overlay for better contrast */}
      <div className="fixed inset-0 z-10 bg-gradient-to-br from-gray-900/60 via-blue-900/40 to-gray-900/60"></div>

      {/* Add floating action buttons */}
      <div className="fixed top-6 right-6 z-30 flex items-center gap-3">
        {pinnedCities.length > 0 && (
          <div className="relative">
            <button
              onClick={() => setShowClearConfirm(!showClearConfirm)}
              className="bg-transparent hover:bg-white/10 backdrop-blur-sm text-red-400 hover:text-red-300 p-3 rounded-xl transition-all duration-200 border border-red-400/30 hover:border-red-300/50"
            >
              <Trash2 size={20} />
            </button>

            {showClearConfirm && (
              <div className="absolute top-full right-0 mt-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-4 min-w-[200px]">
                <p className="text-white text-sm mb-3">Clear all cities?</p>
                <div className="flex gap-2">
                  <button
                    onClick={handleClearAll}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setShowClearConfirm(false)}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        <Link href="/add-city">
          <button className="bg-transparent hover:bg-white/10 backdrop-blur-sm text-blue-400 hover:text-blue-300 p-3 rounded-xl transition-all duration-200 border border-blue-400/30 hover:border-blue-300/50">
            <Plus size={20} />
          </button>
        </Link>
      </div>

      {/* Main content */}
      <main className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20">
        {pinnedCities.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-300 text-lg mb-4 drop-shadow-sm">No cities pinned yet</p>
            <p className="text-gray-400 text-sm mb-6 drop-shadow-sm">
              Add your favorite cities to see their weather at a glance
            </p>
            <Link href="/add-city">
              <button className="bg-transparent hover:bg-white/10 backdrop-blur-sm text-blue-400 hover:text-blue-300 p-4 rounded-xl transition-all duration-200 border border-blue-400/30 hover:border-blue-300/50">
                <Plus size={24} />
              </button>
            </Link>
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToWindowEdges]}
          >
            <SortableContext items={pinnedCities.map((city) => city.id)} strategy={rectSortingStrategy}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {pinnedCities.map((city) => (
                  <DraggableCityCard key={city.id} city={city} />
                ))}
              </div>
            </SortableContext>

            <DragOverlay>
              {activeCity ? (
                <div className="bg-white/20 backdrop-blur-md border border-blue-400/50 rounded-2xl p-6 shadow-2xl rotate-3 scale-105">
                  <div className="flex flex-col items-center space-y-4">
                    <h3 className="text-xl font-bold text-white text-center">{activeCity.name}</h3>
                    <div className="text-2xl">
                      {activeCity.weather === "sunny" && "☀️"}
                      {activeCity.weather === "cloudy" && "☁️"}
                      {activeCity.weather === "rainy" && "🌧️"}
                      {activeCity.weather === "snowy" && "❄️"}
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white mb-1">{activeCity.current}°C</div>
                      <div className="text-sm text-gray-300">
                        {activeCity.minTemp}°C / {activeCity.maxTemp}°C
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>
        )}
      </main>
    </div>
  )
}
