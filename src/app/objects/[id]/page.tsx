import React from 'react'
import { notFound } from 'next/navigation'
import { getObjectGraph } from '@/lib/registry/api'
import { ObjectWorkspace } from './ObjectWorkspace'

export default async function ObjectPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const node = await getObjectGraph(resolvedParams.id)

  if (!node) {
    notFound()
  }

  return (
    <div className="flex justify-center w-full">
      <ObjectWorkspace node={node} />
    </div>
  )
}
