import cx from 'clsx'
import { ReactNode } from "react"

const sideNoteTypes = ['note', 'info', 'success', 'warning', 'danger'] as const

export type SideNoteType = typeof sideNoteTypes[number]

export interface SideNoteProps {
  /** @default 'info */
  type?: SideNoteType
  title?: string
  children?: ReactNode
}

export function SideNote(props: SideNoteProps) {
  const type = props.type ?? 'info'
  const title = props.title ?? capitalize(type)

  const colors = {
    info: 'bg-blue-50 text-blue-900',
    success: 'bg-green-50 text-green-900',
  }

  return <aside className={cx("rounded p-6 my-6", colors[type])}>
    <strong className="text-current">{title}</strong>
    {props.children}
  </aside>
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
