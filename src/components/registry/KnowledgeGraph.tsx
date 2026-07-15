"use client"

import React, { useMemo, useEffect, useState } from 'react'
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Edge,
  Node,
  MarkerType,
  BackgroundVariant
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import dagre from 'dagre'
import { GraphNodeComponent } from './GraphNode'
import { GraphNode } from '@/lib/registry/api'
import { useRouter } from 'next/navigation'

const nodeTypes = {
  axionyx: GraphNodeComponent,
}

// Dagre graph setup for hierarchical deterministic layout
const dagreGraph = new dagre.graphlib.Graph()
dagreGraph.setDefaultEdgeLabel(() => ({}))

const nodeWidth = 250
const nodeHeight = 120

const getLayoutedElements = (nodes: Node[], edges: Edge[], direction = 'TB') => {
  const isHorizontal = direction === 'LR'
  dagreGraph.setGraph({ rankdir: direction, nodesep: 50, ranksep: 100 })

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight })
  })

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target)
  })

  dagre.layout(dagreGraph)

  const newNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id)
    const newNode = {
      ...node,
      targetPosition: isHorizontal ? 'left' : 'top',
      sourcePosition: isHorizontal ? 'right' : 'bottom',
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    }
    return newNode as Node
  })

  return { nodes: newNodes, edges }
}

export function KnowledgeGraph({ centerNode }: { centerNode: GraphNode }) {
  const router = useRouter()
  
  // Convert GraphNode and its edges into React Flow format
  const initialNodes: Node[] = []
  const initialEdges: Edge[] = []
  const addedNodes = new Set<string>()

  const addNode = (id: string, type: string, label: string) => {
    if (addedNodes.has(id)) return
    addedNodes.add(id)
    initialNodes.push({
      id,
      type: 'axionyx',
      data: { id, type, label },
      position: { x: 0, y: 0 }
    })
  }

  // Add the center node
  addNode(centerNode.id, centerNode.type, centerNode.title)

  // Add all incoming edges
  centerNode.incomingEdges.forEach((edge, i) => {
    addNode(edge.from, 'Unknown', 'Related Object') // we don't have full data for related nodes without fetching, but we show IDs
    initialEdges.push({
      id: `in-${i}`,
      source: edge.from,
      target: centerNode.id,
      label: edge.relation,
      type: 'smoothstep',
      animated: true,
      labelBgPadding: [8, 4],
      labelBgBorderRadius: 4,
      labelBgStyle: { fill: 'var(--ax-surface)', fillOpacity: 0.8 },
      labelStyle: { fill: 'var(--ax-text)', fontWeight: 700, fontSize: 10, fontFamily: 'monospace' },
      style: { stroke: 'var(--ax-primary)', strokeWidth: 1.5 },
      markerEnd: { type: MarkerType.ArrowClosed, color: 'var(--ax-primary)' }
    })
  })

  // Add all outgoing edges
  centerNode.outgoingEdges.forEach((edge, i) => {
    addNode(edge.to, 'Unknown', 'Related Object')
    initialEdges.push({
      id: `out-${i}`,
      source: centerNode.id,
      target: edge.to,
      label: edge.relation,
      type: 'smoothstep',
      animated: true,
      labelBgPadding: [8, 4],
      labelBgBorderRadius: 4,
      labelBgStyle: { fill: 'var(--ax-surface)', fillOpacity: 0.8 },
      labelStyle: { fill: 'var(--ax-text)', fontWeight: 700, fontSize: 10, fontFamily: 'monospace' },
      style: { stroke: 'var(--ax-primary)', strokeWidth: 1.5 },
      markerEnd: { type: MarkerType.ArrowClosed, color: 'var(--ax-primary)' }
    })
  })

  // Apply layout
  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
    initialNodes,
    initialEdges
  )

  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges)

  // Center node color highlight hack (update the node type label if possible)
  // In a real app we'd fetch the batch of objects to get their true types and titles.

  const onNodeClick = (_: React.MouseEvent, node: Node) => {
    router.push(`/objects/${node.id}`)
  }

  return (
    <div className="w-full h-[600px] border border-[var(--ax-border)] rounded-xl overflow-hidden bg-[#0A0A0A] animate-in fade-in duration-500">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.1}
        className="axionyx-graph"
      >
        <Background color="#333" variant={BackgroundVariant.Dots} gap={20} size={1} />
        <Controls className="!bg-[var(--ax-surface)] !border-[var(--ax-border)] !fill-[var(--ax-text)]" />
      </ReactFlow>
    </div>
  )
}
